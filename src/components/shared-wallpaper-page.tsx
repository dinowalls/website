"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Download, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { PublicWallpaper } from "@/lib/appwrite-wallpapers"
import { ShareDeepLinkLauncher } from "@/components/share-deeplink-launcher"

const DOWNLOAD_URL = "/#download"
const ANIMATION_DURATION_MS = 10_000
const CROSSFADE_DURATION_MS = 240
const FRAME_CACHE_NAME = "dinowalls-heic-frames-v1"

type SharedWallpaperPageProps = {
  wallpaper: PublicWallpaper | null
  sharePath: string
}

function CrossfadeFrame({
  frontSrc,
  backSrc,
  activeLayer,
  alt,
  className,
}: {
  frontSrc: string
  backSrc: string
  activeLayer: "front" | "back"
  alt: string
  className?: string
}) {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frontSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: activeLayer === "front" ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION_MS}ms ease-out`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: activeLayer === "back" ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION_MS}ms ease-out`,
        }}
      />
    </div>
  )
}

async function decodeFramesFromBytes(bytes: Uint8Array): Promise<string[]> {
  const libheifModule = await import("libheif-js/wasm-bundle")
  const libheif = libheifModule.default ?? libheifModule
  const decoder = new libheif.HeifDecoder()
  const images = decoder.decode(bytes)

  if (!images.length) {
    throw new Error("No frames found in HEIC asset")
  }

  const frameUrls = await Promise.all(
    images.map(
      (image) =>
        new Promise<string>((resolve, reject) => {
          const width = image.get_width()
          const height = image.get_height()
          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height

          const context = canvas.getContext("2d")
          if (!context) {
            reject(new Error("Canvas 2D context unavailable"))
            return
          }

          const imageData = context.createImageData(width, height)
          image.display(imageData, (displayData) => {
            if (!displayData) {
              reject(new Error("Failed to decode HEIC frame"))
              return
            }

            context.putImageData(
              new ImageData(
                new Uint8ClampedArray(displayData.data),
                displayData.width,
                displayData.height
              ),
              0,
              0
            )
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error("Failed to serialize decoded frame"))
                return
              }

              resolve(URL.createObjectURL(blob))
            }, "image/png")
          })
        })
    )
  )

  return frameUrls
}

function getFrameCacheVersion(response: Response) {
  const etag = response.headers.get("etag") || "no-etag"
  const lastModified = response.headers.get("last-modified") || "no-last-modified"
  const contentLength = response.headers.get("content-length") || "no-content-length"

  return `${etag}|${lastModified}|${contentLength}`
}

function getFrameManifestUrl(sourceUrl: string, version: string) {
  return `https://dinowalls.local/frame-manifest?source=${encodeURIComponent(sourceUrl)}&version=${encodeURIComponent(version)}`
}

function getFrameAssetUrl(sourceUrl: string, version: string, index: number) {
  return `https://dinowalls.local/frame-asset?source=${encodeURIComponent(sourceUrl)}&version=${encodeURIComponent(version)}&index=${index}`
}

async function loadCachedFrames(sourceUrl: string, version: string): Promise<string[] | null> {
  if (typeof window === "undefined" || !("caches" in window)) {
    return null
  }

  const cache = await caches.open(FRAME_CACHE_NAME)
  const manifestResponse = await cache.match(getFrameManifestUrl(sourceUrl, version))
  if (!manifestResponse) {
    return null
  }

  const manifest = (await manifestResponse.json()) as { frameCount?: number }
  if (!manifest.frameCount || manifest.frameCount < 1) {
    return null
  }

  const frames = await Promise.all(
    Array.from({ length: manifest.frameCount }, async (_, index) => {
      const frameResponse = await cache.match(getFrameAssetUrl(sourceUrl, version, index))
      if (!frameResponse) {
        throw new Error("Missing cached frame")
      }

      const blob = await frameResponse.blob()
      return URL.createObjectURL(blob)
    })
  )

  return frames
}

async function persistFramesToCache(sourceUrl: string, version: string, frameUrls: string[]) {
  if (typeof window === "undefined" || !("caches" in window)) {
    return
  }

  const cache = await caches.open(FRAME_CACHE_NAME)
  await cache.put(
    getFrameManifestUrl(sourceUrl, version),
    new Response(JSON.stringify({ frameCount: frameUrls.length }), {
      headers: { "Content-Type": "application/json" },
    })
  )

  await Promise.all(
    frameUrls.map(async (frameUrl, index) => {
      const response = await fetch(frameUrl)
      const blob = await response.blob()

      await cache.put(
        getFrameAssetUrl(sourceUrl, version, index),
        new Response(blob, {
          headers: { "Content-Type": blob.type || "image/png" },
        })
      )
    })
  )
}

async function getAnimatedFrames(sourceUrl: string): Promise<string[]> {
  const response = await fetch(sourceUrl, {
    mode: "cors",
    credentials: "omit",
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch HEIC source: ${response.status}`)
  }

  const version = getFrameCacheVersion(response)
  const cachedFrames = await loadCachedFrames(sourceUrl, version)
  if (cachedFrames) {
    return cachedFrames
  }

  const bytes = new Uint8Array(await response.arrayBuffer())
  const frameUrls = await decodeFramesFromBytes(bytes)
  void persistFramesToCache(sourceUrl, version, frameUrls)

  return frameUrls
}

export function SharedWallpaperPage({ wallpaper, sharePath }: SharedWallpaperPageProps) {
  const deepLink = wallpaper ? `dinowalls://wallpapers/${wallpaper.id}` : undefined
  const title = wallpaper?.title || "Shared wallpaper"
  const previewSource = wallpaper?.previewUrl || wallpaper?.heicUrl
  const fallbackImage = wallpaper?.thumbnailUrl || wallpaper?.imageUrl || ""
  const [animatedFrames, setAnimatedFrames] = useState<string[]>([])
  const [frameState, setFrameState] = useState({
    front: 0,
    back: 0,
    visible: "front" as "front" | "back",
  })

  useEffect(() => {
    if (!previewSource) {
      return
    }

    let isCancelled = false
    let nextFrameUrls: string[] = []

    void (async () => {
      try {
        nextFrameUrls = await getAnimatedFrames(previewSource)

        if (isCancelled) {
          for (const frameUrl of nextFrameUrls) {
            URL.revokeObjectURL(frameUrl)
          }
          return
        }

        setAnimatedFrames(nextFrameUrls)
        setFrameState({ front: 0, back: 0, visible: "front" })
      } catch {
        if (!isCancelled) {
          setAnimatedFrames([])
          setFrameState({ front: 0, back: 0, visible: "front" })
        }
      }
    })()

    return () => {
      isCancelled = true
      for (const frameUrl of nextFrameUrls) {
        URL.revokeObjectURL(frameUrl)
      }
    }
  }, [previewSource])

  useEffect(() => {
    if (animatedFrames.length < 2) {
      return
    }

    const frameDuration = Math.max(100, ANIMATION_DURATION_MS / animatedFrames.length)
    const timer = window.setInterval(() => {
      setFrameState((currentState) => {
        const currentIndex =
          currentState.visible === "front" ? currentState.front : currentState.back
        const nextIndex = (currentIndex + 1) % animatedFrames.length

        return currentState.visible === "front"
          ? { front: currentState.front, back: nextIndex, visible: "back" as const }
          : { front: nextIndex, back: currentState.back, visible: "front" as const }
      })
    }, frameDuration)

    return () => {
      window.clearInterval(timer)
    }
  }, [animatedFrames])

  const frontFrameSrc = animatedFrames[frameState.front] || fallbackImage
  const backFrameSrc = animatedFrames[frameState.back] || fallbackImage

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {wallpaper ? (
        <>
          <CrossfadeFrame
            frontSrc={frontFrameSrc}
            backSrc={backFrameSrc}
            activeLayer={frameState.visible}
            alt=""
            className="absolute inset-0"
          />
          <CrossfadeFrame
            frontSrc={frontFrameSrc}
            backSrc={backFrameSrc}
            activeLayer={frameState.visible}
            alt=""
            className="absolute inset-0 scale-[1.08] blur-3xl opacity-75"
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_35%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(180deg,rgba(9,14,24,0.18),rgba(9,14,24,0.62)_62%,rgba(9,14,24,0.78)_100%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#172033_0%,#0f172a_45%,#090d17_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(146,175,255,0.18),transparent_25%),radial-gradient(circle_at_82%_12%,rgba(255,214,143,0.14),transparent_20%)]" />
        </>
      )}

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto grid w-full max-w-[76rem] flex-1 items-center justify-center gap-8 lg:grid-cols-[22rem_24rem] lg:gap-16">
          <div className="order-1 flex justify-center">
            <div className="relative w-[16.5rem] max-w-[82vw] sm:w-[19rem] lg:w-[22rem]">
              <div className="absolute inset-[2.3%_4.6%_2.2%_4.6%] overflow-hidden rounded-[2.35rem] bg-slate-900 sm:rounded-[2.6rem]">
                {wallpaper ? (
                  <CrossfadeFrame
                    frontSrc={frontFrameSrc}
                    backSrc={backFrameSrc}
                    activeLayer={frameState.visible}
                    alt={title}
                    className="relative h-full w-full"
                  />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(180deg,#1e293b_0%,#0f172a_100%)]" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_22%,transparent_76%,rgba(15,23,42,0.22))]" />
              </div>

              <Image
                src="/mockup.png"
                alt=""
                aria-hidden
                width={890}
                height={1828}
                priority
                className="relative z-10 h-auto w-full drop-shadow-[0_40px_120px_rgba(0,0,0,0.48)]"
              />
            </div>
          </div>

          <div className="order-2 flex min-h-[16rem] flex-col justify-center rounded-[2rem] border border-white/12 bg-white/8 p-5 text-center backdrop-blur-2xl sm:p-7 lg:min-h-[28rem] lg:p-8 lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <Image
                src="/app-icon.png"
                alt="Dinowalls"
                width={64}
                height={64}
                className="h-16 w-16 rounded-[1.35rem] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              />
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/65">
                  Dinowalls
                </p>
                <h1 className="pt-2 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
                  {wallpaper ? title : "Wallpaper unavailable"}
                </h1>
              </div>
            </div>

            {deepLink ? <ShareDeepLinkLauncher deepLink={deepLink} /> : null}

            <div className="mt-8 flex flex-col gap-3">
              {deepLink ? (
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-white px-6 text-sm font-medium text-slate-950 hover:bg-white/90"
                  asChild
                >
                  <a href={deepLink}>
                    <ExternalLink className="size-4" />
                    Open in Dinowalls
                  </a>
                </Button>
              ) : null}

              <Button
                size="lg"
                variant="ghost"
                className="h-12 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-medium text-white hover:bg-white/14"
                asChild
              >
                <Link href={DOWNLOAD_URL}>
                  <Download className="size-4" />
                  Download the app
                </Link>
              </Button>
            </div>

            <div className="mt-auto pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white"
              >
                Back to Dinowalls
                <ArrowUpRight className="size-4" />
              </Link>
              {!wallpaper ? <p className="pt-3 text-xs text-white/45">{sharePath}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

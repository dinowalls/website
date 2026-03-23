"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

const heroFrames = [
  { imageUrl: "/tahoe/1.jpeg", label: "Sunrise", timeLabel: "6:12 AM", minuteAnchor: 300 },
  { imageUrl: "/tahoe/2.jpeg", label: "Morning", timeLabel: "7:40 AM", minuteAnchor: 420 },
  { imageUrl: "/tahoe/3.jpeg", label: "Daylight", timeLabel: "5:00 PM", minuteAnchor: 1020 },
  { imageUrl: "/tahoe/4.jpeg", label: "Late sunset", timeLabel: "6:00 PM", minuteAnchor: 1080 },
  { imageUrl: "/tahoe/5.jpeg", label: "Golden hour", timeLabel: "7:00 PM", minuteAnchor: 1140 },
  { imageUrl: "/tahoe/6.jpeg", label: "Dusk", timeLabel: "9:00 PM", minuteAnchor: 1260 },
  { imageUrl: "/tahoe/7.jpeg", label: "Night", timeLabel: "2:00 AM", minuteAnchor: 120 },
]

function WallpaperLayers({
  currentIndex,
  incomingIndex,
  imageClassName,
  className,
}: {
  currentIndex: number
  incomingIndex: number | null
  imageClassName?: string
  className?: string
}) {
  return (
    <div className={className}>
      <div
        className={`absolute inset-0 bg-cover bg-center ${imageClassName ?? ""}`}
        style={{
          backgroundImage: `url(${heroFrames[currentIndex].imageUrl})`,
        }}
      />
      {incomingIndex !== null ? (
        <div
          key={`incoming-${heroFrames[incomingIndex].imageUrl}`}
          className={`hero-crossfade-in absolute inset-0 bg-cover bg-center ${imageClassName ?? ""}`}
          style={{
            backgroundImage: `url(${heroFrames[incomingIndex].imageUrl})`,
          }}
        />
      ) : null}
    </div>
  )
}

function getCurrentMinutes() {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

function minutesToFrameIndex(minutes: number) {
  for (let index = 0; index < heroFrames.length; index += 1) {
    const start = heroFrames[index].minuteAnchor
    const end = heroFrames[(index + 1) % heroFrames.length].minuteAnchor

    if (start <= end) {
      if (minutes >= start && minutes < end) return index
    } else if (minutes >= start || minutes < end) {
      return index
    }
  }

  return 0
}

export function HeroSection() {
  const initialIndex = useMemo(() => minutesToFrameIndex(getCurrentMinutes()), [])
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null)
  const fadeTimeoutRef = useRef<number | null>(null)
  const currentIndexRef = useRef(initialIndex)
  const incomingIndexRef = useRef<number | null>(null)

  useEffect(() => {
    heroFrames.forEach((frame) => {
      const preloadImage = new window.Image()
      preloadImage.src = frame.imageUrl
    })
  }, [])

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    incomingIndexRef.current = incomingIndex
  }, [incomingIndex])

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current != null) {
        window.clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [])

  const startTransition = (nextIndex: number) => {
    if (nextIndex === currentIndexRef.current || nextIndex === incomingIndexRef.current) return

    if (fadeTimeoutRef.current != null) {
      window.clearTimeout(fadeTimeoutRef.current)
      fadeTimeoutRef.current = null
    }

    incomingIndexRef.current = nextIndex
    setIncomingIndex(nextIndex)

    fadeTimeoutRef.current = window.setTimeout(() => {
      currentIndexRef.current = nextIndex
      incomingIndexRef.current = null
      setCurrentIndex(nextIndex)
      setIncomingIndex(null)
      fadeTimeoutRef.current = null
    }, 1200)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % heroFrames.length
      startTransition(nextIndex)
    }, 1500)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const activeWallpaper = heroFrames[currentIndex]
  const wallpaperMoments = useMemo(() => ["Sunrise", "Day", "Sunset", "Night"], [])

  return (
    <section className="relative isolate flex min-h-screen overflow-hidden px-5 pb-10 pt-24 sm:min-h-[100svh] sm:px-8 lg:h-[100svh] lg:px-10 lg:pb-10 lg:pt-24">
      <div className="hero-shell-gradient absolute inset-0 -z-20" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[linear-gradient(180deg,rgba(8,14,24,0.12),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 lg:grid-cols-[minmax(0,31rem)_minmax(17rem,22rem)] lg:justify-between lg:gap-12">
        <div className="max-w-xl space-y-8 lg:justify-self-start">
          <div className="space-y-5">
            <Badge
              variant="outline"
              className="rounded-full border-white/70 bg-white/65 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-slate-700 backdrop-blur-md dark:border-white/15 dark:bg-white/8 dark:text-slate-200"
            >
              Dinowalls
            </Badge>
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Wallpapers that change with the sun
              </p>
              <h1 className="max-w-md text-5xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl [font-family:var(--font-display)]">
                Your iPhone,
                <br />
                in daylight.
              </h1>
            </div>
            <p className="max-w-md text-lg leading-7 text-slate-600 dark:text-slate-300 sm:text-xl">
              Dynamic wallpapers that shift from sunrise to night automatically.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-slate-950 px-6 text-sm font-medium text-white shadow-[0_18px_50px_-20px_rgba(15,23,42,0.7)] hover:bg-slate-800"
              asChild
            >
              <a href="#download">
                <Download className="size-4" />
                Download for iPhone
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 rounded-full border border-white/60 bg-white/55 px-6 text-sm font-medium text-slate-700 backdrop-blur-md hover:bg-white/80 dark:border-white/12 dark:bg-white/8 dark:text-slate-100 dark:hover:bg-white/12"
              asChild
            >
              <a href="#gallery">Browse wallpapers</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            {wallpaperMoments.map((moment) => (
              <span key={moment} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                {moment}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[24rem] items-center justify-center self-stretch lg:min-h-0 lg:justify-self-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.75),_rgba(255,255,255,0)_65%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_rgba(255,255,255,0)_65%)]" />
          <div className="relative w-[13.75rem] shrink-0 sm:w-[15.5rem] lg:w-[17rem]">
            <div className="absolute inset-[2.3%_4.6%_2.2%_4.6%] z-0 pointer-events-none overflow-visible rounded-[2rem] sm:rounded-[2.25rem]">
              <div className="hero-screen-glow absolute inset-0 rounded-[inherit]">
                <WallpaperLayers
                  currentIndex={currentIndex}
                  incomingIndex={incomingIndex}
                  className="absolute inset-0 rounded-[inherit]"
                  imageClassName="scale-[1.06]"
                />
              </div>
            </div>

            <div className="absolute inset-[2.3%_4.6%_2.2%_4.6%] overflow-hidden rounded-[2rem] bg-slate-900 sm:rounded-[2.25rem]">
              <WallpaperLayers
                currentIndex={currentIndex}
                incomingIndex={incomingIndex}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_26%,transparent_72%,rgba(15,23,42,0.18))]" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/78 sm:px-5">
                <span>{activeWallpaper.label}</span>
                <span>{activeWallpaper.timeLabel}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="rounded-[1.25rem] border border-white/18 bg-black/18 px-3 py-2.5 text-white/92 backdrop-blur-md">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/64">
                    Live preview
                  </p>
                  <p className="mt-1.5 text-sm font-medium sm:text-base">Matches the sky outside.</p>
                </div>
              </div>
            </div>

            <Image
              src="/mockup.png"
              alt=""
              aria-hidden
              width={890}
              height={1828}
              priority
              className="relative z-10 h-auto w-full drop-shadow-[0_28px_70px_rgba(15,23,42,0.28)]"
            />
          </div>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50">
            {heroFrames.map((wallpaper, index) => (
              <button
                key={wallpaper.label}
                type="button"
                aria-label={`Show ${wallpaper.label} wallpaper`}
                onClick={() => {
                  if (index === currentIndex) return
                  startTransition(index)
                }}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-slate-900 dark:bg-white" : "w-3 bg-slate-400/70 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

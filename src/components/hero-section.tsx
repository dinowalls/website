"use client";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Sparkles, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
function BackgroundSlideshow({
  images,
  interval = 5000,
  controlledIndex,
}: {
  images: string[]
  interval?: number
  controlledIndex?: number | null
}) {
  // current visible index
  const [current, setCurrent] = useState<number>(0)
  // previous index used for fade-out layer
  const [prev, setPrev] = useState<number | null>(null)
  // visibility flags
  const [prevVisible, setPrevVisible] = useState(true)
  const [currentVisible, setCurrentVisible] = useState(true)
  // transition duration (ms)
  const duration = 1000

  const currentRef = useRef(current)
  useEffect(() => {
    currentRef.current = current
  }, [current])

  // debounce timer and pending index to coalesce rapid index requests (e.g. slider scrubbing)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingIndexRef = useRef<number | null>(null)
  const DEBOUNCE_MS = 80

  // initialize fallback to first image to avoid a blank/gray frame
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(images[0] ?? null)

  const animateToImmediate = useCallback(async (nextIndex: number) => {
    if (nextIndex === currentRef.current) return
    const prevIndex = currentRef.current

    // ensure next image is loaded/decoded before starting the transition
    const src = images[nextIndex]
    // normalize to pathname for consistent keys
    let srcKey = src
    try {
      srcKey = new URL(src, window.location.origin).pathname
    } catch {}

    // Use an Image probe to reliably detect when the src is available/decoded.
    // This works both for cached and network-loaded images.
    if (!loadedRef.current[srcKey]) {
      await new Promise<void>((resolve) => {
        const probe = new window.Image()
        let resolved = false
        const onDone = () => {
          if (resolved) return
          resolved = true
          loadedRef.current[srcKey] = true
          resolve()
        }
        probe.onload = onDone
        probe.onerror = onDone
        // assign src after handlers to avoid missing cached onload timings
        probe.src = src
        // as an extra safety, resolve after a short timeout to avoid locking forever
        setTimeout(onDone, 2000)
      })
    }

      // set fallback to incoming image so the background shows it immediately
    setFallbackSrc(src)

      // Prepare to transition: set the current index and start with the
      // incoming image hidden so we can animate it in while fading out prev.
      setCurrent(nextIndex)
      setPrev(prevIndex)
      setPrevVisible(true)
      // ensure the incoming image starts hidden for an animated fade-in
      setCurrentVisible(false)

      if (loadedRef.current[srcKey]) {
        // image already loaded/decoded — animate the crossfade: bring current up and fade prev out
        // use a single requestAnimationFrame so the browser paints the incoming image
        // in its initial hidden state before we toggle opacities to animate.
        requestAnimationFrame(() => {
          setCurrentVisible(true)
          setPrevVisible(false)
        })
        setTimeout(() => setPrev(null), duration)
      } else {
        // wait for onLoad before revealing; mark a pending transition
        transitionPendingRef.current = { src: srcKey, prev: prevIndex }
      }
  }, [images])

  // Scheduler wraps animateToImmediate to debounce rapid requests (keeps UX smooth when scrubbing)
  const scheduleAnimateTo = useCallback((nextIndex: number) => {
    // always set last requested fallback immediately so the background shows the target image
    const src = images[nextIndex]
    if (src) setFallbackSrc(src)

    // if a timer already pending, replace the pending index and restart timer
    pendingIndexRef.current = nextIndex
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      const idx = pendingIndexRef.current
      pendingIndexRef.current = null
      debounceTimerRef.current = null
      if (typeof idx === "number") animateToImmediate(idx)
    }, DEBOUNCE_MS)
  }, [animateToImmediate, images])

  const loadedRef = useRef<Record<string, boolean>>({})
  const transitionPendingRef = useRef<{ src: string; prev: number | null } | null>(null)

  // aggressively preload and decode all images so they are cached and ready
  useEffect(() => {
    if (!images || images.length === 0) return
    const loaded: Record<string, boolean> = {}
    // try to decode all images in parallel and mark as loaded when done
    images.forEach((src) => {
      try {
        const img = new window.Image()
        img.src = src
        img.onload = () => {
          let key = src
          try {
            key = new URL(src, window.location.origin).pathname
          } catch {}
          loaded[key] = true
          loadedRef.current[key] = true
        }
        const dec = (img as HTMLImageElement & { decode?: () => Promise<void> }).decode
        if (typeof dec === "function") {
          dec()
            .then(() => {
              let key = src
              try {
                key = new URL(src, window.location.origin).pathname
              } catch {}
              loaded[key] = true
              loadedRef.current[key] = true
            })
            .catch(() => {
              /* ignore decode errors */
            })
        }
      } catch {
        // ignore
      }
    })
    // ensure fallback is set
    setFallbackSrc((s) => s ?? images[0] ?? null)
    // don't await here; let individual onload handlers update loadedRef
  }, [images])

  // cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
    }
  }, [])

  // autoplay when controlledIndex is not provided
  useEffect(() => {
    if (typeof controlledIndex === "number") return
    if (!images || images.length === 0) return
    const t = setInterval(() => {
      const next = (currentRef.current + 1) % images.length
      scheduleAnimateTo(next)
    }, interval)
    return () => clearInterval(t)
  }, [images, interval, controlledIndex, scheduleAnimateTo])
  // include animateTo in deps (defined with useCallback)

  // when controlledIndex changes, animate to it
  useEffect(() => {
    if (typeof controlledIndex !== "number") return
    scheduleAnimateTo(controlledIndex)
  }, [controlledIndex, scheduleAnimateTo])

  // NOTE: we intentionally omit animateToImmediate from deps here; scheduleAnimateTo is stable

  return (
    <div className="absolute inset-0 -z-10">
      {/* preload images to avoid flicker / blank frames when switching backgrounds */}
      {/* (preloading happens below in an effect) */}
  {/* removed global dark overlay to keep images unaltered */}

      {/* fallback background using prev image to avoid flashes during decode */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${fallbackSrc ?? images[current]})`,
          // ensure there's a safe dark background color if images briefly fail to render
          backgroundColor: "#0b1220",
        }}
      />

      {/* previous image (fading out) - use next/image for optimized decode/compositing */}
      {prev != null && (
        <Image
          key={`prev-${prev}`}
          src={images[prev]}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
          style={{
            opacity: prevVisible ? 1 : 0,
            transition: `opacity ${duration}ms ease`,
            willChange: "opacity",
          }}
        />
      )}

      {/* current image (fading in) */}
      <Image
        key={`current-${current}`}
        src={images[current]}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover"
        onLoad={(e) => {
          // normalize loaded src to pathname so it matches the keys used elsewhere
          let srcPath: string
          try {
            srcPath = new URL((e.currentTarget as HTMLImageElement).src).pathname
          } catch {
            srcPath = (e.currentTarget as HTMLImageElement).src
          }
          // mark loaded
          loadedRef.current[srcPath] = true
          // if there's a pending transition for this src, perform the fade
          const pending = transitionPendingRef.current
          if (pending && pending.src === srcPath) {
            // make current visible and then fade out the previous after the next paint
            requestAnimationFrame(() => {
              setCurrentVisible(true)
              setPrevVisible(false)
            })
            // clear prev after duration
            setTimeout(() => setPrev(null), duration)
            transitionPendingRef.current = null
          }
        }}
        style={{
          opacity: currentVisible ? 1 : 0,
          transition: `opacity ${duration}ms ease`,
          willChange: "opacity",
        }}
      />

  {/* no overlay — images are shown as-is to avoid darkening */}
    </div>
  )
}

function TimeSlider({
  minutes,
  fractional,
  onMinutesChange,
  onInteractionStart,
  onInteractionEnd,
  startMinute = 300,
}: {
  minutes: number
  fractional?: number
  onMinutesChange: (m: number) => void
  onInteractionStart?: () => void
  // onInteractionEnd receives the final absolute minutes (0..1439) when available
  onInteractionEnd?: (finalMinutes?: number) => void
  startMinute?: number
}) {
  const formatLabel = (m: number) => {
    const hh = Math.floor(m / 60)
    const mm = m % 60
    const ampm = hh >= 12 ? "PM" : "AM"
    const hour12 = hh % 12 === 0 ? 12 : hh % 12
    return `${hour12}:${mm.toString().padStart(2, "0")} ${ampm}`
  }

  // Compute the slider's relative position so the left-most position represents startMinute
  // relativeValue in [0..1439] where absolute minutes = (startMinute + relativeValue) % 1440
  const base = typeof fractional === "number" ? fractional : minutes
  const relativeValue = ((base - startMinute) + 1440) % 1440

  // local dragging state so the Slider follows the pointer responsively
  const [isDragging, setIsDragging] = useState(false)
  const localRelRef = useRef<number>(relativeValue)
  const [localRel, setLocalRel] = useState<number>(relativeValue)

  // keep local value in sync when not dragging
  useEffect(() => {
    if (!isDragging) {
      localRelRef.current = relativeValue
      setLocalRel(relativeValue)
    }
  }, [relativeValue, isDragging])

  return (
    <div className="absolute left-0 right-0 bottom-8 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl supports-[backdrop-filter]:bg-background/10 supports-[backdrop-filter]:dark:bg-background/30 backdrop-blur-xl border border-border/10 dark:border-border/5 p-4 shadow-xl bg-background/95 shadow-xl p-4">
          <div className="flex items-center justify-between text-sm text-white/75 mb-2">
            <div className="font-medium flex items-center gap-2">
              <button onClick={() => onMinutesChange(startMinute)} aria-label="Jump to sunrise">
                <Sun className="w-5 h-5" />
              </button>
              <span className="sr-only">Sunrise time</span>
            </div>
            <div className="font-medium">{formatLabel(minutes)}</div>
            <div className="font-medium flex items-center gap-2">
              <button onClick={() => onMinutesChange((startMinute + 1439) % 1440)} aria-label="Jump to night">
                <Moon className="w-5 h-5" />
              </button>
              <span className="sr-only">Night time</span>
            </div>
          </div>

          <div className="py-2">
            <Slider
              aria-label="Time of day slider"
              min={0}
              max={1439}
              // fully controlled value
              value={[localRel]}
              onPointerDown={() => {
                setIsDragging(true)
                onInteractionStart?.()
                // initialize localRel from the current controlled state
                localRelRef.current = localRel
                if (typeof window !== "undefined") {
                  const onUp = () => {
                    setIsDragging(false)
                    // compute final absolute minutes from localRelRef
                    const relFinal = localRelRef.current
                    const absFinal = (startMinute + Math.round(relFinal)) % 1440
                    onInteractionEnd?.(absFinal)
                  }
                  // listen once for pointerup and pointercancel to ensure we always get a final event
                  window.addEventListener("pointerup", onUp, { once: true })
                  window.addEventListener("pointercancel", onUp, { once: true })
                }
              }}
              onFocus={() => {
                setIsDragging(true)
                onInteractionStart?.()
              }}
              onBlur={() => {
                setIsDragging(false)
                const relFinal = localRelRef.current
                const absFinal = (startMinute + Math.round(relFinal)) % 1440
                onInteractionEnd?.(absFinal)
              }}
              onValueChange={(vals) => {
                const rel = Number(vals[0] ?? 0)
                setLocalRel(rel)
                localRelRef.current = rel
                const abs = (startMinute + rel) % 1440
                onMinutesChange(abs)
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const images = useMemo(() => [
    "/tahoe/1.jpeg",
    "/tahoe/2.jpeg",
    "/tahoe/3.jpeg",
    "/tahoe/4.jpeg",
    "/tahoe/5.jpeg",
    "/tahoe/6.jpeg",
    "/tahoe/7.jpeg",
  ], [])

  // minutes since midnight (0..1439)
  const getCurrentMinutes = () => {
    const d = new Date()
    return d.getHours() * 60 + d.getMinutes()
  }

  const [minutes, setMinutes] = useState<number>(getCurrentMinutes())
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const mountedRef = useRef(false)
  // track fractional minutes for smooth motion
  const fractionalRef = useRef<number>(getCurrentMinutes())
  // resume timer ref to manage autoplay resume after interaction
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  

  // Initialize minutes from browser time only once on mount, then run a constant-rate animation loop.
  useEffect(() => {
    // on first mount, set the minutes from the clock
    if (!mountedRef.current) {
      setMinutes(getCurrentMinutes())
      mountedRef.current = true
    }

    let raf = 0
    let last = performance.now()
    // how many minutes to advance per second; set to 1 => 1 minute per real second
    const minutesPerSecond = 24

    const loop = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (!isUserInteracting) {
        fractionalRef.current = (fractionalRef.current + dt * minutesPerSecond) % 1440
        const integerMinutes = Math.floor(fractionalRef.current)
        setMinutes(integerMinutes)
      }
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isUserInteracting])

  // When user changes slider, temporarily pause autoplay and schedule resume
  const handleMinutesChange = (m: number) => {
    setMinutes(m)
    setIsUserInteracting(true)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
    // resume autoplay shortly after user input stops (3s)
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
      resumeTimeoutRef.current = null
    }, 3000)
  }

  const handleInteractionStart = () => {
    setIsUserInteracting(true)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  const handleInteractionEnd = (finalMinutes?: number) => {
    if (typeof finalMinutes === "number") {
      // ensure fractionalRef continues from where the user left off
      fractionalRef.current = finalMinutes
      setMinutes(finalMinutes)
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
    // resume autoplay 3s after interaction ends
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
      resumeTimeoutRef.current = null
    }, 3000)
  }

  // anchors must match the order: sunrise, day, sunset1, sunset2, sunset3, night1, night2
  const anchors = [300, 420, 1020, 1080, 1140, 1260, 120]

  const minutesToIndex = (m: number) => {
    // Assign each minute to the anchor whose interval is [anchor, nextAnchor)
    // This ensures an anchor's image is shown from its anchor time until the next anchor.
    for (let i = 0; i < anchors.length; i++) {
      const start = anchors[i]
      const end = anchors[(i + 1) % anchors.length]
      if (start <= end) {
        if (m >= start && m < end) return i
      } else {
        // wrapping interval (e.g., 23:00 -> 05:00)
        if (m >= start || m < end) return i
      }
    }
    // fallback
    return 0
  }

  const controlledIndex = minutesToIndex(minutes)

  return (
    <section className="relative overflow-hidden py-0 lg:min-h-screen">
      {/* Background slideshow */}
      <BackgroundSlideshow images={images} interval={6000} controlledIndex={controlledIndex} />

      <div className="container mx-auto px-4 relative lg:h-screen h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full lg:h-screen place-items-center px-12">
          <div className="relative max-w-4xl w-full">
            {/* Liquid glass backdrop */}
            <div className="absolute -inset-4 rounded-2xl supports-[backdrop-filter]:bg-background/10 supports-[backdrop-filter]:dark:bg-background/30 backdrop-blur-xl border border-border/10 dark:border-border/5 p-4 shadow-xl bg-background/95 shadow-xl"></div>
            <div className="relative space-y-8 p-6 lg:p-10">
              {/* Floating app icon in the text card (top-right) */}
              <div className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 rounded-3xl shadow-xl transform rotate-6 overflow-hidden bg-gradient-to-br from-primary to-accent">
                <Image src="/app-icon.png" alt="" width={128} height={128} className="w-full h-full object-cover" aria-hidden />
              </div>
              {/* Decorative liquid blobs */}
              <div className="pointer-events-none absolute -top-6 -left-6 w-28 h-28 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl opacity-60"></div>
              <div className="pointer-events-none absolute -bottom-8 -right-8 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-50"></div>
            <Badge variant="secondary" className="w-fit">
              <Sparkles className="w-4 h-4 mr-2" />
              {"Now with AI Creation"}
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl xl:text-6xl font-bold text-white leading-tight">
                {"Dynamic Wallpapers That "}
                <span className="text-primary">{"Evolve"}</span>
                {" With Your Day"}
              </h1>
              <p className="text-xl text-white/85 leading-relaxed max-w-lg">
                {
                  "Transform your iPhone with wallpapers that automatically change from sunrise to sunset. Create stunning AI-powered designs or explore our curated collection."
                }
              </p>
            </div>

            <div className="flex flex-col md:flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                <Download className="w-5 h-5 mr-2" />
                {"Download for iOS"}
              </Button>
              <Button variant="outline" size="lg" className="text-lg text-background px-8 bg-transparent">
                {"Explore Free Catalog"}
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/85">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {"Free Forever"}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                {"iOS 14+"}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {"1000+ Wallpapers"}
              </div>
            </div>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center">
            <div className="relative mx-auto w-80 h-[60vh] lg:w-96 lg:h-[78vh]">
              {/* App Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 lg:w-auto lg:h-full p-6 flex items-center justify-center">
                  <Image
                    src="/mockup.png"
                    alt="App mockup"
                    width={420}
                    height={920}
                    className="w-auto h-full object-contain"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/50 backdrop-blur-xl rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/50 backdrop-blur-xl rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-secondary/30 backdrop-blur-xl rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
  {/* Time slider */}
  <TimeSlider
    minutes={minutes}
    fractional={!isUserInteracting ? fractionalRef.current : undefined}
    onMinutesChange={(m) => handleMinutesChange(m)}
    onInteractionStart={handleInteractionStart}
    onInteractionEnd={handleInteractionEnd}
    startMinute={anchors[0]}
  />
      </div>
    </section>
  )
}

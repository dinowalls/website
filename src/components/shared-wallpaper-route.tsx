"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  getWallpaperById,
  getWallpaperByShareToken,
  type PublicWallpaper,
} from "@/lib/appwrite-wallpapers"
import { SharedWallpaperPage } from "@/components/shared-wallpaper-page"

type SharedWallpaperRouteProps = {
  mode: "share" | "wallpaper"
}

export function SharedWallpaperRoute({ mode }: SharedWallpaperRouteProps) {
  const searchParams = useSearchParams()
  const paramName = mode === "share" ? "token" : "id"
  const value = searchParams.get(paramName)?.trim() || ""
  const [wallpaper, setWallpaper] = useState<PublicWallpaper | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(value))

  useEffect(() => {
    let isCancelled = false

    if (!value) {
      setWallpaper(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    const loadWallpaper =
      mode === "share"
        ? getWallpaperByShareToken(value)
        : getWallpaperById(value)

    void loadWallpaper.then((nextWallpaper) => {
      if (isCancelled) {
        return
      }

      setWallpaper(nextWallpaper)
      setIsLoading(false)
    })

    return () => {
      isCancelled = true
    }
  }, [mode, value])

  const sharePath = value ? `/${mode}/${value}` : `/${mode}`

  return (
    <SharedWallpaperPage
      wallpaper={wallpaper}
      sharePath={sharePath}
      isLoading={isLoading}
    />
  )
}

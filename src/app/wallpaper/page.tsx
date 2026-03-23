import type { Metadata } from "next"
import { Suspense } from "react"
import { SharedWallpaperPage } from "@/components/shared-wallpaper-page"
import { SharedWallpaperRoute } from "@/components/shared-wallpaper-route"

export const metadata: Metadata = {
  title: "Wallpaper | Dinowalls",
  description: "Open a Dinowalls wallpaper or download the app to explore more.",
}

export default function WallpaperPage() {
  return (
    <Suspense
      fallback={<SharedWallpaperPage wallpaper={null} sharePath="/wallpaper" isLoading />}
    >
      <SharedWallpaperRoute mode="wallpaper" />
    </Suspense>
  )
}

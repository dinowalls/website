import type { Metadata } from "next"
import { Suspense } from "react"
import { SharedWallpaperPage } from "@/components/shared-wallpaper-page"
import { SharedWallpaperRoute } from "@/components/shared-wallpaper-route"

export const metadata: Metadata = {
  title: "Shared wallpaper | Dinowalls",
  description: "Open a shared Dinowalls wallpaper or download the app to explore more.",
}

export default function SharePage() {
  return (
    <Suspense fallback={<SharedWallpaperPage wallpaper={null} sharePath="/share" isLoading />}>
      <SharedWallpaperRoute mode="share" />
    </Suspense>
  )
}

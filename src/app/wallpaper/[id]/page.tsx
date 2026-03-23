import type { Metadata } from "next"
import { SharedWallpaperPage } from "@/components/shared-wallpaper-page"
import { getWallpaperById } from "@/lib/appwrite-wallpapers"

type WallpaperPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: WallpaperPageProps): Promise<Metadata> {
  const { id } = await params
  const wallpaper = await getWallpaperById(id)
  const title = wallpaper ? `${wallpaper.title} | Dinowalls` : "Wallpaper | Dinowalls"
  const description = wallpaper
    ? `Open ${wallpaper.title} in Dinowalls, or preview it on the web before downloading the app.`
    : "Open a Dinowalls wallpaper or download the app to explore more."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: wallpaper ? [{ url: wallpaper.imageUrl, alt: wallpaper.title }] : undefined,
    },
    twitter: {
      card: wallpaper ? "summary_large_image" : "summary",
      title,
      description,
      images: wallpaper ? [wallpaper.imageUrl] : undefined,
    },
  }
}

export default async function WallpaperPage({ params }: WallpaperPageProps) {
  const { id } = await params
  const wallpaper = await getWallpaperById(id)

  return <SharedWallpaperPage wallpaper={wallpaper} sharePath={`/wallpaper/${id}`} />
}

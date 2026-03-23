import type { Metadata } from "next"
import { SharedWallpaperPage } from "@/components/shared-wallpaper-page"
import { getWallpaperByShareToken } from "@/lib/appwrite-wallpapers"

type SharePageProps = {
  params: Promise<{ token: string }>
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { token } = await params
  const wallpaper = await getWallpaperByShareToken(token)
  const title = wallpaper ? `${wallpaper.title} | Dinowalls` : "Shared wallpaper | Dinowalls"
  const description = wallpaper
    ? `Open ${wallpaper.title} in Dinowalls, or preview it on the web before downloading the app.`
    : "Open a shared Dinowalls wallpaper or download the app to explore more."

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

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params
  const wallpaper = await getWallpaperByShareToken(token)

  return <SharedWallpaperPage wallpaper={wallpaper} sharePath={`/share/${token}`} />
}

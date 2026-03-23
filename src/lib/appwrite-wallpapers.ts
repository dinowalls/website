export type PublicWallpaper = {
  id: string
  title: string
  imageUrl: string
  thumbnailUrl?: string
  previewUrl?: string
  heicUrl?: string
  shareToken?: string
  timeKey?: string
  visibility: string
  likesCount: number
  viewsCount: number
  activeUsesCount: number
  createdAt: string
}

type AppwriteWallpaperRow = {
  $id: string
  $createdAt: string
  title?: string
  thumbnail_url?: string
  preview_url?: string
  heic_url?: string
  share_token?: string
  time_key?: string
  visibility?: string
  likes_count?: number
  views_count?: number
  active_uses_count?: number
}

const APPWRITE_ENDPOINT = "https://auth.dinowalls.app/v1"
const APPWRITE_PROJECT_ID = "691d71dc001c0927c0db"
const APPWRITE_DATABASE_ID = "691d732100374df62b36"
const APPWRITE_WALLPAPERS_TABLE_ID = "wallpapers"

export const fallbackWallpapers: PublicWallpaper[] = [
  {
    id: "fallback-sunrise",
    title: "Mountain Dawn",
    imageUrl: "/mountain-sunrise-landscape-wallpaper.jpg",
    timeKey: "fallback:h24",
    visibility: "public",
    likesCount: 0,
    viewsCount: 0,
    activeUsesCount: 0,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-city",
    title: "City Lights",
    imageUrl: "/city-skyline-night-lights-wallpaper.jpg",
    timeKey: "fallback:h24",
    visibility: "public",
    likesCount: 0,
    viewsCount: 0,
    activeUsesCount: 0,
    createdAt: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "fallback-ocean",
    title: "Ocean Waves",
    imageUrl: "/ocean-waves-sunset-wallpaper.jpg",
    timeKey: "fallback:h24",
    visibility: "public",
    likesCount: 0,
    viewsCount: 0,
    activeUsesCount: 0,
    createdAt: "2026-01-03T00:00:00.000Z",
  },
  {
    id: "fallback-forest",
    title: "Forest Path",
    imageUrl: "/forest-path-morning-light-wallpaper.jpg",
    timeKey: "fallback:h24",
    visibility: "public",
    likesCount: 0,
    viewsCount: 0,
    activeUsesCount: 0,
    createdAt: "2026-01-04T00:00:00.000Z",
  },
  {
    id: "fallback-desert",
    title: "Desert Dunes",
    imageUrl: "/desert-sand-dunes-golden-hour-wallpaper.jpg",
    timeKey: "fallback:solar",
    visibility: "public",
    likesCount: 0,
    viewsCount: 0,
    activeUsesCount: 0,
    createdAt: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "fallback-neon",
    title: "Neon Dreams",
    imageUrl: "/neon-cyberpunk-abstract-wallpaper.jpg",
    timeKey: "fallback:h24",
    visibility: "public",
    likesCount: 0,
    viewsCount: 0,
    activeUsesCount: 0,
    createdAt: "2026-01-06T00:00:00.000Z",
  },
]

function mapWallpaper(row: AppwriteWallpaperRow): PublicWallpaper | null {
  const imageUrl = row.thumbnail_url || row.preview_url || row.heic_url
  if (!imageUrl) return null

  return {
    id: row.$id,
    title: row.title?.trim() || "Wallpaper",
    imageUrl,
    thumbnailUrl: row.thumbnail_url,
    previewUrl: row.preview_url,
    heicUrl: row.heic_url,
    shareToken: row.share_token,
    timeKey: row.time_key,
    visibility: row.visibility || "public",
    likesCount: row.likes_count ?? 0,
    viewsCount: row.views_count ?? 0,
    activeUsesCount: row.active_uses_count ?? 0,
    createdAt: row.$createdAt,
  }
}

async function fetchWallpaperRows({
  queries,
  limit,
}: {
  queries?: string[]
  limit?: number
} = {}): Promise<AppwriteWallpaperRow[]> {
  const params = new URLSearchParams()

  for (const query of queries ?? []) {
    params.append("queries[]", query)
  }

  if (typeof limit === "number") {
    params.set("limit", String(limit))
  }

  const queryString = params.toString()
  const response = await fetch(
    `${APPWRITE_ENDPOINT}/tablesdb/${APPWRITE_DATABASE_ID}/tables/${APPWRITE_WALLPAPERS_TABLE_ID}/rows${queryString ? `?${queryString}` : ""}`,
    {
      headers: {
        "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        "X-Appwrite-Response-Format": "1.8.0",
      },
      next: { revalidate: 300 },
    }
  )

  if (!response.ok) {
    throw new Error(`Appwrite wallpapers request failed with ${response.status}`)
  }

  const data = (await response.json()) as { rows?: AppwriteWallpaperRow[] }
  return data.rows ?? []
}

function isPublicWallpaper(wallpaper: PublicWallpaper | null): wallpaper is PublicWallpaper {
  return wallpaper !== null && wallpaper.visibility.toLowerCase() === "public"
}

export async function getWallpaperById(id: string): Promise<PublicWallpaper | null> {
  try {
    const response = await fetch(
      `${APPWRITE_ENDPOINT}/tablesdb/${APPWRITE_DATABASE_ID}/tables/${APPWRITE_WALLPAPERS_TABLE_ID}/rows/${id}`,
      {
        headers: {
          "X-Appwrite-Project": APPWRITE_PROJECT_ID,
          "X-Appwrite-Response-Format": "1.8.0",
        },
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      return null
    }

    const wallpaper = mapWallpaper((await response.json()) as AppwriteWallpaperRow)
    return isPublicWallpaper(wallpaper) ? wallpaper : null
  } catch {
    return null
  }
}

export async function getWallpaperByShareToken(token: string): Promise<PublicWallpaper | null> {
  try {
    const rows = await fetchWallpaperRows({
      queries: [`equal("share_token",${JSON.stringify([token])})`],
      limit: 1,
    })

    const wallpaper = mapWallpaper(rows[0])
    return isPublicWallpaper(wallpaper) ? wallpaper : null
  } catch {
    return null
  }
}

export async function getPublicWallpapers(limit = 18): Promise<PublicWallpaper[]> {
  try {
    const wallpapers = (await fetchWallpaperRows())
      .map(mapWallpaper)
      .filter(isPublicWallpaper)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, limit)

    return wallpapers.length > 0 ? wallpapers : fallbackWallpapers.slice(0, limit)
  } catch {
    return fallbackWallpapers.slice(0, limit)
  }
}

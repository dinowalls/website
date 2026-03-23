import Image from "next/image"
import type { PublicWallpaper } from "@/lib/appwrite-wallpapers"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

function WallpaperCard({
  image,
  title,
}: {
  image: string
  title: string
}) {
  return (
    <figure
      className={cn(
        "group relative w-[15rem] cursor-pointer overflow-hidden rounded-[1.8rem] border border-white/65 bg-white/75 p-2 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/70 dark:hover:bg-slate-900/85 sm:w-[17rem]"
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-slate-200">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 17rem, 15rem"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_35%,rgba(15,23,42,0.18)_100%)]" />
      </div>
      <div className="px-1 pb-1 pt-4">
        <figcaption className="truncate text-base font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
          {title}
        </figcaption>
      </div>
    </figure>
  )
}

export function WallpaperMarquee({ wallpapers }: { wallpapers: PublicWallpaper[] }) {
  const galleryWallpapers = wallpapers.map((wallpaper) => ({
    id: wallpaper.id,
    title: wallpaper.title,
    image: wallpaper.imageUrl,
  }))
  const firstColumn = galleryWallpapers.filter((_, index) => index % 3 === 0)
  const secondColumn = galleryWallpapers.filter((_, index) => index % 3 === 1)
  const thirdColumn = galleryWallpapers.filter((_, index) => index % 3 === 2)

  return (
    <section id="gallery" className="overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Gallery</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl [font-family:var(--font-display)]">
            A wallpaper library with actual atmosphere.
          </h2>
        </div>
        <p className="max-w-md text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          Browse nature, abstract, and city sets that feel different at 7 AM than they do after dark.
        </p>
      </div>

      <div className="relative mx-auto grid h-[34rem] max-w-7xl grid-cols-1 items-center justify-center gap-4 overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(239,244,250,0.88))] px-3 py-4 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] backdrop-blur-md dark:border-white/8 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.82),rgba(10,17,29,0.94))] sm:h-[38rem] sm:px-5 sm:py-6 md:grid-cols-3 md:gap-5">
        <Marquee vertical className="-mt-12 h-full [--duration:58s] [--gap:1.25rem]">
          {firstColumn.map((wallpaper) => (
            <WallpaperCard
              key={wallpaper.id}
              image={wallpaper.image}
              title={wallpaper.title}
            />
          ))}
        </Marquee>
        <Marquee reverse vertical className="hidden h-full md:flex [--duration:62s] [--gap:1.25rem]">
          {secondColumn.map((wallpaper) => (
            <WallpaperCard
              key={wallpaper.id}
              image={wallpaper.image}
              title={wallpaper.title}
            />
          ))}
        </Marquee>
        <Marquee vertical className="mt-10 hidden h-full md:flex [--duration:56s] [--gap:1.25rem]">
          {thirdColumn.map((wallpaper) => (
            <WallpaperCard
              key={wallpaper.id}
              image={wallpaper.image}
              title={wallpaper.title}
            />
          ))}
        </Marquee>
        <div className="gallery-fade-top pointer-events-none absolute inset-x-0 top-0 h-28" />
        <div className="gallery-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-28" />
      </div>
    </section>
  )
}

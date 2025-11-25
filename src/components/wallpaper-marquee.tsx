import Image from "next/image"

export function WallpaperMarquee() {
  const wallpapers = [
    {
      id: 1,
      title: "Mountain Dawn",
      category: "Nature",
      image: "/mountain-sunrise-landscape-wallpaper.jpg",
    },
    {
      id: 2,
      title: "City Lights",
      category: "Urban",
      image: "/city-skyline-night-lights-wallpaper.jpg",
    },
    {
      id: 3,
      title: "Ocean Waves",
      category: "Nature",
      image: "/ocean-waves-sunset-wallpaper.jpg",
    },
    {
      id: 4,
      title: "Abstract Flow",
      category: "Abstract",
      image: "/abstract-flowing-colors-wallpaper.jpg",
    },
    {
      id: 5,
      title: "Forest Path",
      category: "Nature",
      image: "/forest-path-morning-light-wallpaper.jpg",
    },
    {
      id: 6,
      title: "Neon Dreams",
      category: "Abstract",
      image: "/neon-cyberpunk-abstract-wallpaper.jpg",
    },
    {
      id: 7,
      title: "Desert Dunes",
      category: "Nature",
      image: "/desert-sand-dunes-golden-hour-wallpaper.jpg",
    },
    {
      id: 8,
      title: "Space Nebula",
      category: "Space",
      image: "/space-nebula-stars-galaxy-wallpaper.jpg",
    },
  ]

  // Duplicate the array to create seamless loop
  const duplicatedWallpapers = [...wallpapers, ...wallpapers]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Thousands of Dynamic Wallpapers</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Discover our ever-growing collection of wallpapers that transform throughout the day
          </p>
        </div>
      </div>

      <div className="relative max-h-[600px] max-w-[1000px] overflow-hidden container mx-auto px-4">
        {/* Left column - scrolling up */}
        <div className="absolute left-4 md:left-8 lg:left-16 w-48 md:w-56 lg:w-64 h-full">
          <div className="animate-marquee-up space-y-4">
            {duplicatedWallpapers.map((wallpaper, index) => (
              <div key={`left-${wallpaper.id}-${index}`} className="relative group cursor-pointer">
                <div className="aspect-[3/4] h-64 md:h-72 lg:h-80 rounded-2xl relative overflow-hidden bg-muted">
                  <Image
                    src={wallpaper.image || "/placeholder.svg"}
                    alt={wallpaper.title}
                    fill
                    sizes="(min-width: 1024px) 16rem, (min-width: 768px) 14rem, 12rem"
                    className="absolute inset-0 object-cover block transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/0 via-black/0 to-transparent group-hover:from-black/50 group-hover:via-black/10 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold text-sm text-white drop-shadow-lg">{wallpaper.title}</p>
                    <p className="text-xs text-white/90 drop-shadow-lg">{wallpaper.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center column - scrolling down */}
        <div className="mx-auto w-48 md:w-56 lg:w-64 h-full">
          <div className="animate-marquee-down space-y-4">
            {duplicatedWallpapers.slice(2).map((wallpaper, index) => (
              <div key={`center-${wallpaper.id}-${index}`} className="relative group cursor-pointer">
                <div className="aspect-[3/4] h-64 md:h-72 lg:h-80 rounded-2xl relative overflow-hidden bg-muted">
                  <Image
                    src={wallpaper.image || "/placeholder.svg"}
                    alt={wallpaper.title}
                    fill
                    sizes="(min-width: 1024px) 16rem, (min-width: 768px) 14rem, 12rem"
                    className="absolute inset-0 object-cover block transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/0 via-black/0 to-transparent group-hover:from-black/50 group-hover:via-black/10 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold text-sm text-white drop-shadow-lg">{wallpaper.title}</p>
                    <p className="text-xs text-white/90 drop-shadow-lg">{wallpaper.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - scrolling up */}
        <div className="absolute right-4 md:right-8 lg:right-16 top-0 w-48 md:w-56 lg:w-64 h-full">
          <div className="animate-marquee-up space-y-4" style={{ animationDelay: "-10s" }}>
            {duplicatedWallpapers.slice(4).map((wallpaper, index) => (
              <div key={`right-${wallpaper.id}-${index}`} className="relative group cursor-pointer">
                <div className="aspect-[3/4] h-64 md:h-72 lg:h-80 rounded-2xl relative overflow-hidden bg-muted">
                  <Image
                    src={wallpaper.image || "/placeholder.svg"}
                    alt={wallpaper.title}
                    fill
                    sizes="(min-width: 1024px) 16rem, (min-width: 768px) 14rem, 12rem"
                    className="absolute inset-0 object-cover block transition-transform duration-300 group-hover:scale-105"
                  />
                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/0 via-black/0 to-transparent group-hover:from-black/50 group-hover:via-black/10 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold text-sm text-white drop-shadow-lg">{wallpaper.title}</p>
                    <p className="text-xs text-white/90 drop-shadow-lg">{wallpaper.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  )
}

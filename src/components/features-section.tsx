const features = [
  {
    title: "Sunrise to night",
    description: "Each wallpaper moves through the day on its own, so your lock screen always feels current.",
  },
  {
    title: "Built for discovery",
    description: "Browse a growing collection of scenes, moods, and places that already know how to shift with light.",
  },
  {
    title: "Create your own",
    description: "Make a dynamic set from your own photos or generate a full day cycle with AI tools.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Why it feels better</p>
          <h2 className="max-w-sm text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl [font-family:var(--font-display)]">
            One idea, done clearly.
          </h2>
          <p className="max-w-md text-lg leading-7 text-slate-600 dark:text-slate-300">
            Dinowalls keeps the promise simple: wallpapers that change with the sun, and tools to find or make the ones you want.
          </p>
        </div>

        <div className="grid gap-0 border-t border-slate-200/80 dark:border-slate-800 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group border-b border-slate-200/80 py-8 transition-colors dark:border-slate-800 lg:border-b-0 lg:border-l lg:px-8 lg:py-6 first:lg:border-l-0"
            >
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400 transition-colors group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-300">
                0{features.indexOf(feature) + 1}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-xs text-base leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

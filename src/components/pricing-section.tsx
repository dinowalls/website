import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section id="download" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.25rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(243,246,251,0.88))] p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.75),rgba(10,17,29,0.9))] lg:grid-cols-[1.25fr_0.85fr] lg:p-12">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Free to browse. Pro to create.</p>
          <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl [font-family:var(--font-display)]">
            Start with the catalog, then build your own day cycle.
          </h2>
          <p className="max-w-2xl text-lg leading-7 text-slate-600 dark:text-slate-300">
            Explore dynamic wallpapers for free, or unlock AI and creation tools when you want something more personal.
          </p>
        </div>

        <div className="grid gap-6 border-t border-slate-200/80 pt-6 dark:border-slate-800 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Included free</p>
            <p className="mt-3 text-xl font-medium text-slate-900 dark:text-white">Discovery, downloads, and time-based wallpapers.</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Upgrade when ready</p>
            <p className="mt-3 text-xl font-medium text-slate-900 dark:text-white">AI creation, custom sets, and deeper control.</p>
          </div>
          <Button
            size="lg"
            className="mt-2 h-12 rounded-full bg-slate-950 px-6 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            asChild
          >
            <a href="#">Download Dinowalls</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

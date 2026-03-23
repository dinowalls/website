import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 px-5 py-14 dark:border-slate-800 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl">
                <Image
                  src="/app-icon.png"
                  alt="Dinowalls"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">Dinowalls</h3>
                <p className="text-slate-500 dark:text-slate-400">Wallpapers that change with the sun.</p>
              </div>
            </div>
          </div>

          <p className="max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
            Discover dynamic wallpapers, build your own sets, and keep your iPhone feeling tied to the time outside.
          </p>

          <Button
            size="lg"
            className="h-12 rounded-full bg-slate-950 px-6 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            asChild
          >
            <a href="#download">
              <Download className="w-5 h-5 mr-2" />
              Download
            </a>
          </Button>
        </div>

        <div className="space-y-4 text-sm">
          <p className="text-slate-500 dark:text-slate-400">© 2026 Dinowalls</p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacy" className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

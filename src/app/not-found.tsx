"use client"

import Link from "next/link"
import { useEffect } from "react"

function buildPagesRedirect(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)

  for (const routeName of ["share", "wallpaper"] as const) {
    const routeIndex = segments.indexOf(routeName)
    if (routeIndex === -1 || segments.length <= routeIndex + 1) {
      continue
    }

    const prefix = segments.slice(0, routeIndex).join("/")
    const value = decodeURIComponent(segments.slice(routeIndex + 1).join("/"))
    const redirectUrl = new URL(window.location.href)

    redirectUrl.pathname = `/${prefix ? `${prefix}/` : ""}${routeName}`
    redirectUrl.searchParams.set(routeName === "share" ? "token" : "id", value)

    return redirectUrl.toString()
  }

  return null
}

export default function NotFound() {
  useEffect(() => {
    const redirectUrl = buildPagesRedirect(window.location.pathname)
    if (redirectUrl) {
      window.location.replace(redirectUrl)
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-white/68">
          The page may have moved, or the link may be incomplete.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-white/90"
        >
          Back to Dinowalls
        </Link>
      </div>
    </main>
  )
}

"use client"

import { useEffect } from "react"

type ShareDeepLinkLauncherProps = {
  deepLink: string
}

export function ShareDeepLinkLauncher({ deepLink }: ShareDeepLinkLauncherProps) {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const shouldAttempt =
      /iphone|ipad|ipod/.test(userAgent) ||
      (userAgent.includes("macintosh") && "ontouchend" in document)

    if (!shouldAttempt) {
      return
    }

    const launchTimer = window.setTimeout(() => {
      window.location.href = deepLink
    }, 200)

    return () => {
      window.clearTimeout(launchTimer)
    }
  }, [deepLink])

  return null
}

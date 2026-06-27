"use client"

import { useEffect, useState } from "react"

export function ProgressBar() {
  const [width, setWidth] = useState("0%")

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setWidth(`${Math.min(window.scrollY / h, 1) * 100}%`)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return <div className="progress-bar" style={{ width }} />
}

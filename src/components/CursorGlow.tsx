"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/ThemeContext"

export function CursorGlow() {
  const elRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (theme !== "dark") return
    const el = elRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [theme])

  if (theme !== "dark") return null

  return <div ref={elRef} className="cursor-glow" style={{ left: -200, top: -200 }} />
}

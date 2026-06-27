"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/lib/ThemeContext"

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const { theme } = useTheme()

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  if (theme !== "dark") return null

  return (
    <div
      className="cursor-glow"
      style={{ left: pos.x, right: "auto", top: pos.y }}
    />
  )
}

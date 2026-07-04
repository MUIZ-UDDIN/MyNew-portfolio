"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { testimonials } from "@/data/profile"

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col flex-shrink-0 w-[300px] sm:w-[360px] mx-3 tilt-card">
      <Quote className="w-6 h-6 text-purple-400/30 mb-4" />
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1 italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star
            key={j}
            className={`w-3 h-3 ${
              j < Math.floor(t.rating) ? "text-yellow-400 fill-yellow-400" : "text-[var(--color-text-muted)]"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--color-text)] font-medium">{t.author}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{t.role}</p>
        </div>
        {t.amount && (
          <span className="text-xs text-green-400/80 font-mono">{t.amount}</span>
        )}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const speedRef = useRef(0.5)
  const posRef = useRef(0)
  const draggingRef = useRef(false)
  const dragStartRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const [trackWidth, setTrackWidth] = useState(0)

  useEffect(() => {
    const check = () => {
      speedRef.current = window.innerWidth < 768 ? 1 : 0.5
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2)
    }
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el || trackWidth === 0) return

    let rafId: number

    const tick = () => {
      if (!isPausedRef.current && !draggingRef.current) {
        posRef.current -= speedRef.current
        if (posRef.current <= -trackWidth) {
          posRef.current += trackWidth
        }
        el.style.transform = `translateX(${posRef.current}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [trackWidth])

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    isPausedRef.current = true
    dragStartRef.current = e.clientX
    dragStartPosRef.current = posRef.current
    const el = trackRef.current
    if (el) el.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const delta = e.clientX - dragStartRef.current
    posRef.current = dragStartPosRef.current + delta
    const el = trackRef.current
    if (el) el.style.transform = `translateX(${posRef.current}px)`
  }

  const handlePointerUp = () => {
    draggingRef.current = false
    isPausedRef.current = false
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div
          ref={trackRef}
          className="flex"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => { if (!draggingRef.current) isPausedRef.current = true }}
          onMouseLeave={() => { if (!draggingRef.current) isPausedRef.current = false }}
          onTouchStart={() => { isPausedRef.current = true }}
          onTouchEnd={() => { isPausedRef.current = false }}
          onWheel={() => {
            isPausedRef.current = true
            setTimeout(() => { isPausedRef.current = false }, 3000)
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

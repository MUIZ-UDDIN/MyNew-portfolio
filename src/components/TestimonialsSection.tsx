"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { testimonials } from "@/data/profile"

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -3, rotateX: 1, rotateY: 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="glass rounded-2xl p-6 flex flex-col flex-shrink-0 w-[300px] sm:w-[360px]"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
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
    </motion.div>
  )
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const speedRef = useRef(0.5)
  const posRef = useRef(0)
  const dragStartRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const [trackWidth, setTrackWidth] = useState(0)

  useEffect(() => {
    const check = () => {
      speedRef.current = window.innerWidth < 768 ? 1.2 : 0.6
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
      if (!isPausedRef.current) {
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
    isPausedRef.current = true
    dragStartRef.current = e.clientX
    dragStartPosRef.current = posRef.current

    const handleMove = (ev: PointerEvent) => {
      const delta = ev.clientX - dragStartRef.current
      posRef.current = dragStartPosRef.current + delta
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`
      }
    }

    const handleUp = () => {
      isPausedRef.current = false
      document.removeEventListener("pointermove", handleMove)
      document.removeEventListener("pointerup", handleUp)
    }

    document.addEventListener("pointermove", handleMove)
    document.addEventListener("pointerup", handleUp)
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

      <div className="select-none">
        <div
          ref={trackRef}
          className="flex gap-6 pl-4 sm:pl-6 lg:pl-0"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onMouseEnter={() => { isPausedRef.current = true }}
          onMouseLeave={() => { isPausedRef.current = false }}
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

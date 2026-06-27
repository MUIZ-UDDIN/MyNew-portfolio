"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { profile } from "@/data/profile"

const stats: { label: string; value: string }[] = [
  { label: "Job Success", value: `${profile.upwork.jobSuccess}%` },
  { label: "Earnings", value: profile.upwork.totalEarnings },
  { label: "Jobs Done", value: String(profile.upwork.totalJobs) },
  { label: "Hours Logged", value: `${profile.upwork.totalHours}+` },
]

function useInViewport(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return inView
}

function AnimatedCounter({ value: fullValue }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInViewport(ref)
  const [display, setDisplay] = useState("0")

  const numeric = parseInt(fullValue.replace(/[^0-9]/g, ""), 10)
  const prefix = fullValue.match(/^[^0-9]+/)?.[0] || ""
  const suffix = fullValue.match(/[^0-9]+$/)?.[0] || ""

  useEffect(() => {
    if (!inView || isNaN(numeric)) {
      setDisplay("0")
      return
    }
    let current = 0
    const steps = 40
    const increment = Math.max(1, Math.floor(numeric / steps))
    const timer = setInterval(() => {
      current += increment
      if (current >= numeric) {
        setDisplay(fullValue)
        clearInterval(timer)
      } else {
        setDisplay(`${prefix}${current}${suffix}`)
      }
    }, 35)
    return () => clearInterval(timer)
  }, [inView, numeric, prefix, suffix, fullValue])

  return <span ref={ref} className="tabular-nums">{display}</span>
}

export function StatsCounter() {
  return (
    <section className="relative py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-4 sm:p-6 text-center glass-hover tilt-card"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">{stat.label}</div>
              {stat.label === "Job Success" && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-medium">
                  Top Rated
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

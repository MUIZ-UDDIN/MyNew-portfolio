"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Star, Quote } from "lucide-react"
import { testimonials } from "@/data/profile"

export function TestimonialsSection() {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const maxVisible = isMobile ? 3 : 6
  const visible = expanded ? testimonials : testimonials.slice(0, maxVisible)
  const hasMore = testimonials.length > maxVisible

  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={expanded ? "all" : maxVisible}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((t, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="glass rounded-2xl p-6 flex flex-col glass-hover tilt-card"
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
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="cursor-pointer inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all group"
            >
              <span>{expanded ? "Show less" : `Show ${testimonials.length - maxVisible} more`}</span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

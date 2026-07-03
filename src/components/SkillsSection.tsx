"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { skills } from "@/data/profile"

const DESKTOP_MAX = 6
const MOBILE_MAX = 3

export function SkillsSection() {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const entries = Object.entries(skills)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const maxVisible = isMobile ? MOBILE_MAX : DESKTOP_MAX
  const visible = expanded ? entries : entries.slice(0, maxVisible)
  const hasMore = entries.length > maxVisible

  useEffect(() => {
    if (!expanded || !ref.current) return
    const el = ref.current
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setExpanded(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [expanded])

  return (
    <section id="skills" className="relative py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Technologies I work with daily to build production-ready AI solutions
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            ref={ref}
            key={expanded ? "all" : maxVisible}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {visible.map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="glass rounded-2xl p-6 glass-hover tilt-card"
              >
                <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    >
                      {skill}
                    </span>
                  ))}
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
              <span>{expanded ? "Show less" : `Show ${entries.length - maxVisible} more`}</span>
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

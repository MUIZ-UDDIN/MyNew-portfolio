"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowDown, ChevronDown } from "lucide-react"
import { GithubIcon, UpworkIcon } from "@/lib/icons"
import dynamic from "next/dynamic"
import { ProfileImage } from "./ProfileImage"
import { profile } from "@/data/profile"

const ThreeScene = dynamic(() => import("./ThreeScene").then((m) => ({ default: m.ThreeScene })), {
  ssr: false,
})

export function HeroSection() {
  const [expanded, setExpanded] = useState(false)
  const [collapsedH, setCollapsedH] = useState(80)
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        const s = getComputedStyle(textRef.current)
        const fs = parseFloat(s.fontSize)
        const lh = s.lineHeight === "normal" ? 1.625 : parseFloat(s.lineHeight)
        setCollapsedH(Math.round(fs * lh * 3))
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 scroll-mt-16"
    >
      <ThreeScene noPost />

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--color-bg-secondary) 100%)",
          opacity: 0.85,
        }}
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -120, rotateY: 25 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="shrink-0"
          >
            <ProfileImage />
          </motion.div>

          <div className="text-center lg:text-left flex-1">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for projects
            </motion.div>

            <div className="relative overflow-hidden mb-4">
              <motion.h1
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                <span className="text-[var(--color-text)]">Hi, I&apos;m </span>
                <span className="gradient-text">{profile.name}</span>
              </motion.h1>

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              className="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-secondary)] font-light mb-6"
            >
              {profile.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mb-8"
            >
              <div
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                style={{ maxHeight: expanded ? 500 : collapsedH }}
              >
                <p ref={textRef} className="max-w-xl text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {profile.tagline}, {profile.heroSubtext}
                </p>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="cursor-pointer mt-1 inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {expanded ? "Show less" : "Read more"}
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center gap-4 flex-wrap justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-8 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Projects
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="flex items-center gap-6 mt-8 justify-center lg:justify-start"
            >
              {[
                { Icon: GithubIcon, href: profile.social.github, label: "GitHub" },
                { Icon: UpworkIcon, href: profile.social.upwork, label: "Upwork" },
              ].map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + i * 0.15, duration: 0.5 }}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"

export function ProfileImage() {
  const ref = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 15 })
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    mouseX.set((x - centerX) / centerX * 15)
    mouseY.set((y - centerY) / centerY * -15)
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative w-48 sm:w-56 lg:w-64 mx-auto mb-8 rounded-2xl cursor-pointer aspect-[3/4]"
    >
      {/* Glow follow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 transition-all duration-200"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(124,58,237,0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-2xl p-[1px]">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 via-transparent to-cyan-400" />
      </div>

      {/* Image container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-purple-500/5 ring-1 ring-[var(--color-border)]">
        {!loaded && !imgError && (
          <div className="absolute inset-0 bg-[var(--color-bg-card)] animate-pulse" />
        )}

        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <p className="text-xs text-[var(--color-text-muted)]">Add photo</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl overflow-hidden" style={{ position: 'relative', background: 'var(--color-bg-card)' }}>
            <div className="w-full h-full relative">
              <Image
                src="/ProfileBG2.webp"
                alt="Muiz Ud Din"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 35%' }}
                onLoad={() => setLoaded(true)}
                onError={() => setImgError(true)}
                priority
                quality={85}
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
              />
            </div>
          </div>
        )}

        {/* Shimmer overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent ${glowPos.x - 20}%, rgba(255,255,255,0.05) ${glowPos.x}%, transparent ${glowPos.x + 20}%)`,
          }}
        />
      </div>

      {/* Floating glow ring */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(124,58,237,0.08) 0%, transparent 50%)`,
          filter: "blur(20px)",
          zIndex: -1,
        }}
      />
    </motion.div>
  )
}

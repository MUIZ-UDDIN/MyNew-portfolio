"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { testimonials } from "@/data/profile"

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col flex-shrink-0 w-[340px] sm:w-[380px] mx-3 tilt-card">
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
  return (
    <section className="relative py-24 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 50s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

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

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="marquee-track flex">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

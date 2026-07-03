"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import { experience } from "@/data/profile"

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Professional journey building AI solutions and software systems
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/30 to-transparent" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-20"
              >
                <div className="absolute left-6 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 border-2 border-[var(--color-bg)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-text)" }} />
                </div>

                <div className="glass rounded-2xl p-6 glass-hover tilt-card">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                      <h3 className="text-[var(--color-text)] font-semibold">{exp.role}</h3>
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">{exp.period}</span>
                  </div>
                  <p className="text-sm gradient-text mb-2 font-medium">{exp.company}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

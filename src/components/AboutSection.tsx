"use client"

import { motion } from "framer-motion"
import { Code2, Brain, Rocket, Shield } from "lucide-react"
import { profile } from "@/data/profile"

const highlights = [
  {
    icon: Brain,
    title: "Data Science & ML",
    description: "Designing high-performance ML pipelines with advanced Data Analytics, NLP, and Deep Learning.",
  },
  {
    icon: Rocket,
    title: "Generative AI & LLMs",
    description: "Building LLM Agents, RAG systems, and Full-Stack AI applications from ground up.",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end architecture with React, Node.js, Python, and scalable infrastructure.",
  },
  {
    icon: Shield,
    title: "Automation & DevOps",
    description: "Robust automation with Python, n8n, Docker, and VPS deployment for production systems.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {profile.about[0]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 glass-hover tilt-card hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-[var(--color-text)] font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          className="glass rounded-2xl p-8 tilt-card"
        >
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Education</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile.education.map((edu, i) => (
              <div key={`${edu.degree}-${i}`} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-purple-500/30 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[var(--color-text)] text-sm font-medium">{edu.degree}</p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-1">{edu.school}</p>
                  <p className="text-[var(--color-text-muted)] text-[10px] mt-0.5">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

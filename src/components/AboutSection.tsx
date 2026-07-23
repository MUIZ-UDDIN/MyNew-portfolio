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
    description: "End-to-end workflow automation with n8n, Make, and Zapier. Plus Docker, VPS deployment, and CI/CD for production systems.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 scroll-mt-16">
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

        </div>
    </section>
  )
}

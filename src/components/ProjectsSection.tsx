"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { GithubIcon } from "@/lib/icons"
import { projects } from "@/data/projects"

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

export function ProjectsSection() {
  const [active, setActive] = useState("All")
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active)
  const maxVisible = isMobile ? 3 : 6
  const visible = expanded ? filtered : filtered.slice(0, maxVisible)
  const hasMore = filtered.length > maxVisible

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Real-world projects showcasing my expertise in AI, ML, and full-stack development
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setExpanded(false) }}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                active === cat
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium scale-105"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card)] hover:border-purple-500/30 hover:scale-105 border border-[var(--color-border)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${active}-${expanded ? "all" : maxVisible}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="glass rounded-2xl p-6 glass-hover flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-purple-400 font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.private && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">
                        Private
                      </span>
                    )}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        aria-label={`${project.title} GitHub`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    ) : project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-xs"
                        aria-label={`${project.title} site`}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <svg className="w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {project.highlights && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-bg-card)] text-[var(--color-text-muted)]"
                    >
                      {t}
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
              <span>{expanded ? "Show less" : `Show ${filtered.length - maxVisible} more`}</span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.span>
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/MUIZ-UDDIN"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <GithubIcon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" />
            <span className="relative">
              View all on GitHub
              <span className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

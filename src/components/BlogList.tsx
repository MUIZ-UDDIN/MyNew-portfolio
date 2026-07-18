"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CalendarDays, Clock, ArrowLeft, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import type { PostMeta } from "@/data/posts"

const categories = ["All", "Personal", "General"] as const
type Category = (typeof categories)[number]
const PER_PAGE = 9

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

interface Props {
  posts: PostMeta[]
  allTags: string[]
  currentPage: number
}

export function BlogList({ posts, allTags, currentPage }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [showAllTags, setShowAllTags] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  const filtered = selectedCategory === "All"
    ? posts
    : posts.filter((p) => p.category === selectedCategory)

  const filteredTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const post of filtered) {
      for (const tag of post.tags) {
        tagSet.add(tag)
      }
    }
    return Array.from(tagSet).sort()
  }, [filtered])

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const safePage = Math.max(1, Math.min(currentPage, totalPages))
  const pagePosts = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const visibleTags = showAllTags ? filteredTags : filteredTags.slice(0, 15)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
    className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Thoughts on AI engineering, web scraping, LLM agents, MLOps, and building production systems.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative">
            <motion.div
              layout
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
              className="flex items-center gap-1.5"
            >
              <motion.button
                layout
                onClick={() => setCatOpen(!catOpen)}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                {selectedCategory}
                <motion.span
                  animate={{ rotate: catOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </motion.button>
              <motion.div
                layout
                initial={false}
                animate={{
                  width: catOpen ? "auto" : 0,
                  opacity: catOpen ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5 overflow-hidden"
              >
                {categories.filter((c) => c !== selectedCategory).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCatOpen(false) }}
                    className="shrink-0 px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-purple-500/30 transition-all duration-200 cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div layout className="flex flex-wrap gap-2 mb-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          {filteredTags.length > 15 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              {showAllTags ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {showAllTags ? "Show less" : "Show all tags"}
            </button>
          )}
        </motion.div>

        {pagePosts.length === 0 ? (
          <p className="text-center text-[var(--color-text-secondary)] mt-16">No {selectedCategory.toLowerCase()} posts yet.</p>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pagePosts.map((post) => (
                <motion.div key={post.slug} variants={cardVariants}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group glass rounded-xl p-6 glass-hover block h-full transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`shrink-0 px-2 py-0.5 text-[10px] font-medium rounded-full border ${
                          post.category === "Personal"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-base font-semibold mb-2 text-[var(--color-text)] group-hover:text-purple-400 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mt-auto">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex items-center justify-center gap-4 mt-12">
              {safePage > 1 ? (
                <Link
                  href={safePage === 2 ? "/blog" : `/blog?page=${safePage - 1}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-purple-500/30 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span />
              )}
              <span className="text-sm text-[var(--color-text-muted)]">
                Page {safePage} of {totalPages}
              </span>
              {safePage < totalPages ? (
                <Link
                  href={`/blog?page=${safePage + 1}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-purple-500/30 transition-all duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--header-glass)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/#hero" className="text-lg font-bold tracking-tight group">
            <span className="gradient-text">MUIZ</span>
            <span className="text-[var(--color-text-muted)]"> UD DIN</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[var(--color-bg-card)] active:scale-95 group"
              >
                {item.label}
                <span className="absolute -bottom-px left-1/2 w-0 h-px bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/#contact"
              className="relative text-sm px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              <span className="relative z-10">Hire Me</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-8 h-8 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[1.5px] bg-[var(--color-text)] transition-colors"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5 h-[1.5px] bg-[var(--color-text)] transition-colors"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[1.5px] bg-[var(--color-text)] transition-colors"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--color-border)]"
            style={{ background: "var(--color-bg-secondary)" }}
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card)] hover:scale-[1.02] rounded-lg transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm text-center bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-medium mt-2 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
              >
                Hire Me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

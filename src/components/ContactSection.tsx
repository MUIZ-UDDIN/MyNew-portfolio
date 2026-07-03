"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Clock, AlertCircle } from "lucide-react"
import { profile } from "@/data/profile"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const email = profile.email || "muizdin143@outlook.com"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError("")
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setError("Server error. Please email me directly.")
      }
    } catch {
      setError("Could not reach server. Please email me directly.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s work together to build something amazing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            className="lg:col-span-2 space-y-4"
          >
            <a href={`mailto:${email}`} className="block">
              <div className="glass rounded-2xl p-5 flex items-center gap-4 glass-hover tilt-card">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">Email</p>
                  <p className="text-sm text-[var(--color-text)]">{email}</p>
                </div>
              </div>
            </a>
            <div className="glass rounded-2xl p-5 flex items-center gap-4 glass-hover tilt-card">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Location</p>
                <p className="text-sm text-[var(--color-text)]">{profile.location}</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 flex items-center gap-4 glass-hover tilt-card">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Response Time</p>
                <p className="text-sm text-[var(--color-text)]">{profile.upwork.responseTime}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 text-center tilt-card">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Message Sent!</h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                  Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 sm:p-8 space-y-5 tilt-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs text-[var(--color-text-muted)] mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-[var(--color-text-muted)] mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs text-[var(--color-text-muted)] mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-[var(--color-text-muted)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-500/10 px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {error}{" "}
                      <a href={`mailto:${email}`} className="underline hover:text-amber-300">
                        {email}
                      </a>
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:-translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

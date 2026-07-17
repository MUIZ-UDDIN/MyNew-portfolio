"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "bot"
  text: string
}

const suggestions = [
  "What services do you offer?",
  "What tech stack do you use?",
  "Tell me about your experience",
  "How can I hire you?",
]

const urlRegex = /(https?:\/\/[^\s)]+)/g

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    const urlParts = part.split(urlRegex)
    if (urlParts.length === 1) return part
    return urlParts.map((seg, j) =>
      seg.match(urlRegex) ? (
        <a
          key={j}
          href={seg}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline break-all"
        >
          {seg}
        </a>
      ) : (
        seg
      )
    )
  })
}

function BotMessage({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} className="h-2" />
        if (trimmed.startsWith("- ")) {
          return <div key={i} className="mb-1 ml-2">• {renderInline(trimmed.slice(2))}</div>
        }
        if (trimmed.match(/^\d+\.\s/)) {
          return <div key={i} className="mb-1">{renderInline(trimmed)}</div>
        }
        return <div key={i} className="mb-1">{renderInline(trimmed)}</div>
      })}
    </span>
  )
}

function TypewriterMessage({ text, onDone, scrollRef }: { text: string; onDone: () => void; scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const [displayed, setDisplayed] = useState("")
  const doneRef = useRef(false)

  useEffect(() => {
    setDisplayed("")
    doneRef.current = false
    let i = 0
    const speed = 15

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
      if (i >= text.length) {
        clearInterval(interval)
        if (!doneRef.current) {
          doneRef.current = true
          onDone()
        }
      }
    }, speed)

    return () => {
      clearInterval(interval)
      doneRef.current = true
    }
  }, [text, onDone, scrollRef])

  return (
    <>
      <BotMessage text={displayed} />
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-purple-400 ml-0.5 animate-pulse align-middle" />
      )}
    </>
  )
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-0.5">
      Thinking
      <span className="animate-[bounce_1s_infinite_0ms]">.</span>
      <span className="animate-[bounce_1s_infinite_200ms]">.</span>
      <span className="animate-[bounce_1s_infinite_400ms]">.</span>
    </span>
  )
}

export function FaqChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! Ask me anything about Muiz's work, skills, or experience." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [typingIndex, setTypingIndex] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading, typingIndex])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()
      const reply = data.reply || "Hi! Ask me anything about Muiz's work, skills, or experience."
      setMessages((prev) => [...prev, { role: "bot", text: reply }])
      setTypingIndex(messages.length + 1)
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "I'm having trouble connecting. Please try again." }])
      setTypingIndex(messages.length + 1)
    } finally {
      setLoading(false)
    }
  }, [loading, messages.length])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl border border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
              style={{ background: "var(--color-bg-card)", maxHeight: "500px" }}
            >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-[var(--color-text)]">Ask Muiz's AI</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ maxHeight: "320px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "bot" ? "bg-purple-500/20" : "bg-cyan-500/20"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot className="w-4 h-4 text-purple-400" />
                    ) : (
                      <User className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed break-words ${
                      msg.role === "bot"
                        ? "bg-[var(--color-bg)] text-[var(--color-text)]"
                        : "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    }`}
                  >
                    {msg.role === "bot" && i !== 0 && typingIndex === i ? (
                      <TypewriterMessage text={msg.text} onDone={() => setTypingIndex(null)} scrollRef={bottomRef} />
                    ) : (
                      msg.role === "bot" ? <BotMessage text={msg.text} /> : msg.text
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="max-w-[80%] rounded-xl px-3 py-2 text-sm bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                    <LoadingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/60 text-[var(--color-text)] hover:bg-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer backdrop-blur-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-[var(--color-border)] p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask a question..."
                className="flex-1 text-sm rounded-xl px-3 py-2 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-purple-500/50 transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white flex items-center justify-center shrink-0 hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

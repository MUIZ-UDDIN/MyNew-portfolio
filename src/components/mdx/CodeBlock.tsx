"use client"

import { ComponentPropsWithoutRef, useState, useRef } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    const code = codeRef.current?.querySelector("code")?.textContent || ""
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 p-1.5 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-purple-500/30 opacity-0 group-hover:opacity-100 transition-all duration-200"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre
        ref={codeRef}
        className={`overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-sm leading-relaxed ${className || ""}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

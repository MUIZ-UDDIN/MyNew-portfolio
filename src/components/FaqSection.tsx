"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { FaqItem } from "@/data/posts"

export function FaqSection({ faq, slug }: { faq: FaqItem[]; slug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: `https://muizuddin.com/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Quick answers to common questions about this project.
        </p>
        <div className="space-y-2">
          {faq.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]/50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-3.5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

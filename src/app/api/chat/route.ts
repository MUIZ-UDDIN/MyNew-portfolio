import { NextRequest, NextResponse } from "next/server"
import { buildPortfolioContext } from "@/lib/portfolio-context"

async function fetchWithRetry(url: string, options: RequestInit, retries = 2): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { ...options, signal: AbortSignal.timeout(30000) })
      return res
    } catch (err) {
      if (i === retries) throw err
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
    }
  }
  throw new Error("fetch failed")
}

const fallbackReply = "I'm having trouble connecting right now. Please try again in a moment or reach out to Muiz directly at muizdin143@outlook.com."

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Hi! Ask me anything about Muiz's work, skills, or experience." })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: fallbackReply })
    }

    const context = buildPortfolioContext()

    const res = await fetchWithRetry("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: context },
          { role: "user", content: message },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ reply: fallbackReply })
    }

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || fallbackReply

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ reply: fallbackReply })
  }
}

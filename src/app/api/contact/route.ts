import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!resend) {
      console.log("RESEND_API_KEY not configured. Logging message:")
      console.log({ name, email, subject, message })
      return NextResponse.json({ status: "ok", message: "Message received (dev mode)" })
    }

    const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "muueezgamings@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `<p><strong>Name:</strong> ${escape(name)}</p><p><strong>Email:</strong> ${escape(email)}</p><p><strong>Subject:</strong> ${escape(subject)}</p><p><strong>Message:</strong> ${escape(message)}</p>`,
    })

    return NextResponse.json({ status: "ok", message: "Thank you! I'll get back to you soon." })
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

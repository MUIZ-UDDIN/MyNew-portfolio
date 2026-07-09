import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Muiz Ud Din | Data Scientist & Full-Stack AI Engineer"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 40%, #0f1a2e 100%)",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative accent */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-2px",
            color: "#ffffff",
            display: "flex",
            gap: "12px",
          }}
        >
          <span>MUIZ</span>
          <span style={{ color: "#6b7280" }}>UD DIN</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#9ca3af",
            marginTop: "16px",
            letterSpacing: "1px",
          }}
        >
          Data Scientist & Full-Stack AI Engineer
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            borderRadius: "2px",
            marginTop: "24px",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            color: "#6b7280",
            marginTop: "24px",
            letterSpacing: "0.5px",
          }}
        >
          Python · LLM Agents · RAG · ML · Web Scraping
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}

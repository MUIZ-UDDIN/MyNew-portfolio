import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { ThemeProvider } from "@/lib/ThemeContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProgressBar } from "@/components/ProgressBar"
import { CursorGlow } from "@/components/CursorGlow"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Muiz Ud Din | Data Scientist & Full-Stack AI Engineer",
    template: "%s | Muiz Ud Din",
  },
  description:
    "Top Rated Data Scientist and Full-Stack AI Engineer specializing in Python automation, LLM Agents, RAG systems, web scraping, and Generative AI. 4+ years building end-to-end AI solutions from frontend to deployment for global clients.",
  keywords: [
    "Data Scientist",
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Generative AI",
    "Python",
    "React",
    "Next.js",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Automation",
    "Web Scraping",
    "LLM Agents",
    "RAG Systems",
    "LangChain",
    "TensorFlow",
    "PyTorch",
    "Docker",
    "Upwork Top Rated",
  ],
  authors: [{ name: "Muiz Ud Din" }],
  creator: "Muiz Ud Din",
  publisher: "Muiz Ud Din",
  metadataBase: new URL("https://muizuddin.com"),
  alternates: {
    canonical: "https://muizuddin.com",
    types: {
      "application/rss+xml": "https://muizuddin.com/rss.xml",
    },
  },
  appleWebApp: { title: "Muiz Ud Din" },
  applicationName: "Muiz Ud Din Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Muiz Ud Din - Data Scientist & AI Engineer",
    title: "Muiz Ud Din | Data Scientist & Full-Stack AI Engineer",
    description:
      "Top Rated Data Scientist and Full-Stack AI Engineer with 4+ years of experience. Specializing in Python automation, LLM Agents, RAG, web scraping, and Generative AI for global clients.",
    url: "https://muizuddin.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muiz Ud Din - Data Scientist & AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muiz Ud Din | Data Scientist & Full-Stack AI Engineer",
    description:
      "Top Rated Data Scientist and Full-Stack AI Engineer with 4+ years of experience. Specializing in Python automation, LLM Agents, RAG, web scraping, and Generative AI.",
    images: ["/og-image.png"],
    creator: "@muizuddin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/FaviconProfileBG.png",
    apple: "/ProfileBG.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="RiMAN2I_sldZAiR-3vjSp7G_v0nMMHTqZfoxYWTfVVU" />
        <meta name="google-site-verification" content="nsEHXi17mOeok3M9wSXOStaicZKo-a7hp88d-wvmg80" />
        <link rel="preconnect" href="https://muizuddin.com" />
        <link rel="dns-prefetch" href="https://muizuddin.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Muiz Ud Din — Insights" href="https://muizuddin.com/rss.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Muiz Ud Din",
                url: "https://muizuddin.com",
                jobTitle: "Data Scientist & Full-Stack AI Engineer",
                knowsAbout: [
                  "Machine Learning",
                  "Deep Learning",
                  "Natural Language Processing",
                  "Generative AI",
                  "Python",
                  "React",
                  "Next.js",
                  "Full-Stack Development",
                  "LLM Agents",
                  "RAG Systems",
                  "Web Scraping",
                  "LangChain",
                  "Docker",
                  "Automation",
                ],
                alumniOf: ["Karakarum International University", "GCCES"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Muiz Ud Din",
                url: "https://muizuddin.com",
                description:
                  "Top Rated Data Scientist and Full-Stack AI Engineer specializing in Python automation, LLM Agents, RAG, web scraping, and Generative AI.",
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ProgressBar />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <CursorGlow />
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Analytics debug={false} />
          <SpeedInsights debug={false} />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

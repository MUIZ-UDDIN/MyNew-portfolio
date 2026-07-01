import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
    "Top Rated Data Scientist and AI Engineer specializing in Python automation, ML, NLP, and Generative AI. 4+ years building production-ready AI solutions for global clients.",
  keywords: [
    "Data Scientist",
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Generative AI",
    "Python",
    "React",
    "Full-Stack AI",
    "Automation",
    "Upwork Top Rated",
  ],
  authors: [{ name: "Muiz Ud Din" }],
  creator: "Muiz Ud Din",
  publisher: "Muiz Ud Din",
  metadataBase: new URL("https://muizuddin.vercel.app"),
  appleWebApp: { title: "Muiz Ud Din" },
  applicationName: "Muiz Ud Din Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Muiz Ud Din - Data Scientist & AI Engineer",
    title: "Muiz Ud Din | Data Scientist & Full-Stack AI Engineer",
    description:
      "Top Rated Data Scientist and AI Engineer with 4+ years of experience. Specializing in Python automation, ML, NLP, and Generative AI for global clients.",
    url: "https://muizuddin.vercel.app",
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
      "Top Rated Data Scientist and AI Engineer with 4+ years of experience. Specializing in Python automation, ML, NLP, and Generative AI.",
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
    icon: "/ProfileBG.png",
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
    >
      <head>
        <meta name="google-site-verification" content="RiMAN2I_sldZAiR-3vjSp7G_v0nMMHTqZfoxYWTfVVU" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muiz Ud Din",
              url: "https://muizuddin.vercel.app",
              jobTitle: "Data Scientist & Full-Stack AI Engineer",
              knowsAbout: [
                "Machine Learning",
                "Deep Learning",
                "Natural Language Processing",
                "Generative AI",
                "Python",
                "React",
                "Full-Stack Development",
              ],
              alumniOf: ["Karakarum International University", "GCCES"],
            }),
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
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

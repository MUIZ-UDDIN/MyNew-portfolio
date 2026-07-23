import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, ArrowLeft, Tag, Mail } from "lucide-react"
import { posts } from "@/data/posts"
import { PageTransition } from "@/components/PageTransition"
import { FaqSection } from "@/components/FaqSection"
import "highlight.js/styles/github-dark.css"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://muizuddin.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `https://muizuddin.com/blog/${slug}`,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  }
}

const mdxModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "automating-data-extraction": () => import("@/../content/blog/automating-data-extraction.mdx"),
  "building-massive-sports-data-pipeline": () => import("@/../content/blog/building-massive-sports-data-pipeline.mdx"),
  "building-saas-crm-sunstone": () => import("@/../content/blog/building-saas-crm-sunstone.mdx"),
  "echosentinel-market-intelligence": () => import("@/../content/blog/echosentinel-market-intelligence.mdx"),
  "autoanalyst-research-agent": () => import("@/../content/blog/autoanalyst-research-agent.mdx"),
  "cogniflow-rag-platform": () => import("@/../content/blog/cogniflow-rag-platform.mdx"),
  "kimi-k3-vs-fable5-vs-gpt56": () => import("@/../content/blog/kimi-k3-vs-fable5-vs-gpt56.mdx"),
  "building-ai-faq-chatbot-groq": () => import("@/../content/blog/building-ai-faq-chatbot-groq.mdx"),
  "nexusscout-ai-lead-generation": () => import("@/../content/blog/nexusscout-ai-lead-generation.mdx"),
  "opencode-vs-paid-ides-free-ai-coding": () => import("@/../content/blog/opencode-vs-paid-ides-free-ai-coding.mdx"),
  "trigger-based-sales-intelligence-engine": () => import("@/../content/blog/trigger-based-sales-intelligence-engine.mdx"),
  "self-host-n8n-free-docker-cloudflare-tunnel": () => import("@/../content/blog/self-host-n8n-free-docker-cloudflare-tunnel.mdx"),
}

function RelatedPosts({ currentSlug, currentTags }: { currentSlug: string; currentTags: string[] }) {
  const related = posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      relevance: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 2)

  if (related.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
      <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Related Articles</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group glass rounded-xl p-4 glass-hover transition-all duration-300"
          >
            <div className="flex flex-wrap gap-1 mb-2">
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-purple-400 transition-colors leading-snug">
              {p.title}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const loader = mdxModules[slug]
  if (!loader) notFound()

  const MDXContent = (await loader()).default

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Muiz Ud Din",
      url: "https://muizuddin.com",
    },
    url: `https://muizuddin.com/blog/${slug}`,
    image: "https://muizuddin.com/og-default.webp",
  }

  return (
    <PageTransition>
    <div className="min-h-screen pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Insights
        </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                  post.category === "Personal"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}
              >
                {post.category}
              </span>
              {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text)] mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div className="prose-custom">
          <MDXContent />
        </div>

        <FaqSection faq={post.faq} slug={slug} />

        <RelatedPosts currentSlug={slug} currentTags={post.tags} />

        <footer className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Work with me
            </a>
          </div>
        </footer>
      </article>
    </div>
    </PageTransition>
  )
}

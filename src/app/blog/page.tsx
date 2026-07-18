import type { Metadata } from "next"
import { posts, getAllTags } from "@/data/posts"
import { BlogList } from "@/components/BlogList"

export const metadata: Metadata = {
  title: "AI Engineering Blog — Tutorials, Case Studies & Project Walkthroughs | Muiz Ud Din",
  description:
    "Learn how to build AI agents, SaaS platforms, automation systems, and data pipelines. In-depth tutorials on FastAPI, React, Python, WebSockets, RAG systems, and production deployment.",
  alternates: {
    canonical: "https://muizuddin.com/blog",
  },
  openGraph: {
    title: "AI Engineering Blog — Tutorials & Case Studies",
    description:
      "Learn how to build AI agents, SaaS platforms, automation systems, and data pipelines with step-by-step tutorials.",
    url: "https://muizuddin.com/blog",
    type: "website",
  },
  twitter: {
    title: "AI Engineering Blog — Tutorials & Case Studies",
    description:
      "Learn how to build AI agents, SaaS platforms, automation systems, and data pipelines with step-by-step tutorials.",
  },
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const currentPage = parseInt(params.page || "1", 10) || 1
  const allTags = getAllTags()

  return <BlogList posts={posts} allTags={allTags} currentPage={currentPage} />
}

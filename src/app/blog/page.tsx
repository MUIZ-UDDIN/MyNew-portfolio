import type { Metadata } from "next"
import { posts, getAllTags } from "@/data/posts"
import { BlogList } from "@/components/BlogList"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thoughts on AI engineering, web scraping, LLM agents, MLOps, and building production systems. By Muiz Ud Din.",
}

export default function BlogPage() {
  const allTags = getAllTags()

  return <BlogList posts={posts} allTags={allTags} />
}

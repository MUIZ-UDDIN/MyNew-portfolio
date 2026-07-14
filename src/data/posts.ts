export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: string
}

export const posts: PostMeta[] = [
  {
    slug: "automating-data-extraction",
    title: "Automating CS2 Game Data with Selenium, Multi-VM Architecture & Cookie Management",
    date: "2026-07-06",
    excerpt:
      "How I built a CS2 automation system for a client — managing Steam logins, cookie expiry, game launches, and web scraping across 5 machines with SSH and Docker.",
    tags: ["Python", "FastAPI", "Selenium", "React", "Docker", "Automation", "Case Study"],
    readTime: "8 min read",
  },
  {
    slug: "building-massive-sports-data-pipeline",
    title: "Building a 100K+ Sports Data Pipeline with Kimi 2.5, Gemini & Claude CLI",
    date: "2026-07-14",
    excerpt:
      "How I built a massive sports dataset using Kimi 2.5's free NVIDIA API, verified with Google Gemini, researched with Claude CLI, and cached intelligently across 4000+ sports with retry logic.",
    tags: ["Python", "Kimi 2.5", "Gemini", "Claude", "Data Pipeline", "Cache", "API", "Automation"],
    readTime: "10 min read",
  },
]

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

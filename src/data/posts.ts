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
    slug: "building-rag-pipeline",
    title: "Building a RAG Pipeline from Scratch",
    date: "2025-12-15",
    excerpt:
      "A step-by-step guide to building a production-ready Retrieval-Augmented Generation pipeline using LangChain, Pinecone, and OpenAI. Covers chunking strategies, embedding selection, and query optimization.",
    tags: ["RAG", "LangChain", "LLM", "Tutorial"],
    readTime: "8 min read",
  },
  {
    slug: "automating-data-extraction",
    title: "Automating Data Extraction with LLM Agents",
    date: "2025-11-20",
    excerpt:
      "How I built an autonomous web scraping agent that uses LLMs to navigate sites, extract structured data, and handle CAPTCHAs and anti-bot measures — a case study from a client project.",
    tags: ["Web Scraping", "LLM Agents", "Automation", "Case Study"],
    readTime: "10 min read",
  },
  {
    slug: "lessons-from-deploying-ml",
    title: "What I Learned Deploying My First ML Model to Production",
    date: "2025-10-08",
    excerpt:
      "Lessons from taking a Python notebook to a live FastAPI endpoint with Docker, CI/CD, monitoring, and all the edge cases that broke in between. Spoiler: the model was the easy part.",
    tags: ["MLOps", "Docker", "Deployment", "Lessons Learned"],
    readTime: "6 min read",
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

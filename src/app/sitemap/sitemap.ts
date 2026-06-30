import type { MetadataRoute } from "next"

export const dynamic = "force-dynamic"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://muizuddin.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ]
}

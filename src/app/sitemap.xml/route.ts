export async function GET() {
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://muizuddin.vercel.app</loc>\n    <lastmod>2026-06-30</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n'

  return new Response(xml, {
    headers: {
      "content-type": "text/xml; charset=utf-8",
      "content-encoding": "identity",
      "cache-control": "no-cache, no-store, must-revalidate",
    },
  })
}

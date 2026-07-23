# Muiz Ud Din — Portfolio

Personal portfolio and blog built with [Next.js](https://nextjs.org) (App Router), TypeScript, Tailwind CSS, and Framer Motion. Deployed on Vercel.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS variables, dark/light themes
- **Animation:** Framer Motion
- **Content:** MDX (blog posts), RSS feed, sitemap
- **AI:** Groq-powered FAQ chatbot (Llama 3.3 70B)
- **SEO:** JSON-LD (Person, BlogPosting, FAQPage, WebSite), OG/Twitter cards, canonical URLs, sitemap

## Features

- Blog with 12 posts (latest-first, paginated at 9 per page)
- Category filter (All / Personal / General) and tag cloud
- AI FAQ chatbot with typewriter effect, clickable links, and portfolio context
- Dark/light theme
- Responsive design
- RSS feed
- JSON-LD structured data for SEO

## Getting Started

```bash
npm install
npm run dev
# or
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```bash
GROQ_API_KEY=           # Required for FAQ chatbot
RESEND_API_KEY=         # Required for contact form
RECAPTCHA_SECRET_KEY=   # Required for contact form spam protection
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |

## License

MIT
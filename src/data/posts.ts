export interface FaqItem {
  q: string
  a: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: string
  category: "Personal" | "General"
  faq: FaqItem[]
}

export const posts: PostMeta[] = [
  {
    slug: "automating-data-extraction",
    title: "How to Automate CS2 Game Data Extraction with Selenium, Multi-VM Architecture & Cookie Management",
    date: "2026-07-06",
    excerpt:
      "Step-by-step guide to building a distributed CS2 automation system across 5 machines — managing Steam login cookies, launching game instances via SSH, and scraping XP data with Selenium and Docker.",
    tags: ["Python", "Selenium", "Automation", "Docker", "SSH", "FastAPI", "Steam", "Vite", "Tailwind CSS"],
    readTime: "8 min read",
    category: "Personal",
    faq: [
      {
        q: "How do you manage Steam login cookies for automation?",
        a: "The system uses Selenium to capture Steam session cookies after a manual login, stores them persistently, and distributes them to worker VMs via SSH. Each worker refreshes cookies before launching CS2 to avoid re-authentication.",
      },
      {
        q: "Can you automate CS2 without getting banned?",
        a: "The approach focuses on data extraction (XP tracking, match history) — not gameplay automation. Using real Steam accounts with proper delays between actions and realistic mouse movements minimizes detection risk.",
      },
      {
        q: "What's the best architecture for multi-machine game automation?",
        a: "A FastAPI orchestrator on a central server delegates tasks to 5 worker VMs via SSH. Each worker runs Selenium in a Docker container and reports results back. This scales horizontally — add more VMs for more accounts.",
      },
    ],
  },
  {
    slug: "building-massive-sports-data-pipeline",
    title: "How to Build a 100K+ Sports Data Pipeline with Claude, Kimi 2.5, Gemini & API Caching",
    date: "2026-07-14",
    excerpt:
      "Tutorial on building a massive sports dataset using Claude for automation code, Kimi 2.5 for generation, Gemini for verification — with smart caching and retry logic across 4000+ sports entities.",
    tags: ["Python", "Claude", "Gemini", "Kimi 2.5", "Data Pipeline", "API", "Caching", "Automation", "Web Scraping", "Google Sheets"],
    readTime: "10 min read",
    category: "Personal",
    faq: [
      {
        q: "How do you cache API responses for large sports datasets?",
        a: "A Redis-backed caching layer with TTL stores all API responses. Before any API call, the pipeline checks the cache — 90% of requests for a 100K+ dataset hit the cache, drastically reducing costs and latency.",
      },
      {
        q: "Which AI model is best for automation code generation?",
        a: "Claude excels at writing reliable automation scripts with error handling. Kimi 2.5 is strongest for generating diverse synthetic data. Gemini is best for cross-referencing and verifying outputs against known sources.",
      },
    ],
  },
  {
    slug: "building-saas-crm-sunstone",
    title: "How to Build an Enterprise SaaS CRM with FastAPI, React, Twilio & Claude",
    date: "2026-07-18",
    excerpt:
      "Complete walkthrough of building a production SaaS CRM with role-based access, real-time analytics, Twilio voice/SMS integration, Gmail contact sync, and WebSocket-powered dashboards deployed on a Hostinger VPS.",
    tags: ["FastAPI", "React", "Twilio", "PostgreSQL", "SaaS", "CRM", "WebSocket", "Claude", "Python", "Vite", "Gmail API"],
    readTime: "12 min read",
    category: "Personal",
    faq: [
      {
        q: "How do you implement role-based access control in FastAPI?",
        a: "Using FastAPI dependencies with JWT tokens that encode user roles. A `RoleChecker` dependency wraps every protected endpoint, verifying the user's role matches required permissions before allowing access.",
      },
      {
        q: "What's the best way to integrate Twilio with FastAPI for voice calls?",
        a: "Twilio's Programmable Voice API connects via webhooks. FastAPI exposes a `/voice` endpoint that Twilio calls when a call connects. The endpoint returns TwiML instructions (say, gather, redirect) to control the call flow.",
      },
      {
        q: "How do you sync Gmail contacts into a CRM?",
        a: "Using Google's People API with OAuth 2.0. The backend authenticates once, stores the refresh token, and runs periodic sync jobs to pull contacts. A background task in FastAPI's `BackgroundTasks` handles the sync asynchronously.",
      },
    ],
  },
  {
    slug: "echosentinel-market-intelligence",
    title: "How to Build a Real-Time Market Sentiment Analyzer with FastAPI, VADER NLP & Docker",
    date: "2026-07-18",
    excerpt:
      "Build an autonomous market sentiment analysis platform that harvests news, classifies headlines with VADER NLP, and visualizes Bullish/Bearish trends on a live dashboard — all containerized with Docker Compose.",
    tags: ["Python", "FastAPI", "VADER", "NLP", "Docker", "Sentiment Analysis", "News API", "Real-time"],
    readTime: "8 min read",
    category: "Personal",
    faq: [
      {
        q: "What is VADER and how does it work for sentiment analysis?",
        a: "VADER (Valence Aware Dictionary and sEntiment Reasoner) is a lexicon and rule-based sentiment analysis tool tuned for social media. It scores text as positive, negative, or neutral by matching words against a pre-built sentiment dictionary and accounting for intensifiers and negations.",
      },
      {
        q: "How do you containerize a real-time sentiment analysis app?",
        a: "Docker Compose orchestrates three services: a FastAPI backend that processes news headlines with VADER, a PostgreSQL database for storing results, and a Next.js frontend that visualizes bullish/bearish trends on a live dashboard.",
      },
    ],
  },
  {
    slug: "autoanalyst-research-agent",
    title: "How to Build an Autonomous AI Research Agent with Groq, Tavily & WebSocket Streaming",
    date: "2026-07-18",
    excerpt:
      "Tutorial on building an AI research agent with multi-step reasoning — uses Groq LLaMA 3.1 for planning, Tavily for web search, WebSockets for real-time streaming, and Next.js for the dashboard.",
    tags: ["Python", "Groq", "Tavily", "Next.js", "WebSocket", "AI Agent", "LLM", "FastAPI", "TypeScript"],
    readTime: "9 min read",
    category: "Personal",
    faq: [
      {
        q: "How do you build an AI research agent with multi-step reasoning?",
        a: "The agent uses a ReAct (Reasoning + Acting) loop: it plans the next research step, calls Tavily search or a reasoning tool, observes the result, and iterates. Groq's LLaMA 3.1 powers the planning and summarization at each step.",
      },
      {
        q: "What is Tavily and how does it improve web search for AI agents?",
        a: "Tavily is a search API optimized for AI agents. Unlike Google Search, it returns clean, structured results with summaries instead of raw HTML, making it easy for LLMs to parse and reason about search results without extra processing.",
      },
    ],
  },
  {
    slug: "cogniflow-rag-platform",
    title: "How to Build a Real-Time RAG Platform with ChromaDB, FastAPI, Groq & PDF Ingestion",
    date: "2026-07-18",
    excerpt:
      "Step-by-step guide to building a Retrieval-Augmented Generation system with auto PDF ingestion, ChromaDB vector search, overlapping chunk windows, and WebSocket streaming for citation-backed answers.",
    tags: ["Python", "ChromaDB", "FastAPI", "RAG", "Next.js", "Groq", "Vector Search", "NLP", "PDF"],
    readTime: "9 min read",
    category: "Personal",
    faq: [
      {
        q: "What is RAG and how does ChromaDB enable it?",
        a: "RAG (Retrieval-Augmented Generation) combines vector search with LLMs. ChromaDB stores document embeddings and retrieves the most relevant chunks for a query. The LLM then generates answers grounded in those retrieved chunks, reducing hallucinations.",
      },
      {
        q: "How do you ingest PDFs into a vector database?",
        a: "PDFs are parsed with PyMuPDF, split into overlapping chunks (256 tokens with 32-token overlap), embedded using sentence-transformers, and stored in ChromaDB. The overlap ensures no context is lost at chunk boundaries during retrieval.",
      },
    ],
  },
  {
    slug: "kimi-k3-vs-fable5-vs-gpt56",
    title: "Kimi K3 vs Fable 5 vs GPT 5.6 — Which AI Model Wins in 2026? (Free vs Paid Benchmarks)",
    date: "2026-07-18",
    excerpt:
      "Hands-on comparison of Kimi K3 (free), Fable 5, and GPT 5.6 across coding, reasoning, writing, and speed benchmarks. See which model is best for your budget and use case.",
    tags: ["Kimi K3", "Fable 5", "GPT 5.6", "AI Models", "Comparison", "Benchmark", "LLM", "Python", "FastAPI"],
    readTime: "8 min read",
    category: "General",
    faq: [
      {
        q: "Which free AI model is best for coding in 2026?",
        a: "Kimi K3 leads among free models for coding with competitive scores across Python, TypeScript, and Rust benchmarks. Its 128K context window also allows it to handle entire codebases in a single prompt, which paid models like GPT 5.6 charge a premium for.",
      },
      {
        q: "Is Kimi K3 really free and unlimited?",
        a: "Yes, Kimi K3 offers free access with no daily usage caps for individual users through their web interface. API access via the Moonshot platform has competitive pricing ($0.01/M tokens) that is significantly cheaper than GPT 5.6's $15/M tokens.",
      },
      {
        q: "How does Fable 5 compare to GPT 5.6 for enterprise use?",
        a: "Fable 5 offers comparable reasoning quality to GPT 5.6 at roughly half the price per token. It excels at structured output and function calling, making it ideal for enterprise agent workflows. GPT 5.6 still leads in creative writing and nuanced instruction following.",
      },
    ],
  },
  {
    slug: "building-ai-faq-chatbot-groq",
    title: "How to Build an AI FAQ Chatbot with Groq, Llama 3.3 & Next.js (Typewriter Effect, Clickable Links)",
    date: "2026-07-18",
    excerpt:
      "Step-by-step guide to building a floating AI FAQ chatbot with Groq's Llama 3.3 70B, a typewriter text effect, markdown rendering with clickable links, auto-scroll, outside-click-to-close, and error-resilient API calls.",
    tags: ["Next.js", "Groq", "Llama 3.3", "Chatbot", "TypeScript", "React", "AI", "FastAPI", "WebSocket", "Tailwind CSS"],
    readTime: "10 min read",
    category: "Personal",
    faq: [
      {
        q: "How do you build a typewriter text effect in React?",
        a: "Use a `useEffect` with `setInterval` that increments a character counter. Each tick adds one more character to the displayed string. Auto-scroll the chat container using a ref and `scrollIntoView({ behavior: 'smooth' })` on each update.",
      },
      {
        q: "What's the best way to handle API errors in a chatbot gracefully?",
        a: "Wrap the API call in a retry function with exponential backoff (2 retries, 1s/2s delays). If all retries fail, return a friendly fallback message like 'I'm having trouble connecting. Please try again or reach out via email.' Never show raw error text to users.",
      },
    ],
  },
  {
    slug: "nexusscout-ai-lead-generation",
    title: "How to Build an Autonomous B2B Lead Generation Engine with Playwright, Groq & Resend",
    date: "2026-07-18",
    excerpt:
      "Build a three-agent AI pipeline that scrapes Google Maps for businesses, enriches data with email extraction, and sends personalized AI-generated outreach emails — all from a Next.js dashboard with Playwright automation.",
    tags: ["Playwright", "Groq", "Next.js", "FastAPI", "AI Agent", "Web Scraping", "Automation", "Python", "Resend", "Lead Generation"],
    readTime: "10 min read",
    category: "Personal",
    faq: [
      {
        q: "How do you scrape Google Maps without getting blocked?",
        a: "Use Playwright with the `playwright-stealth` plugin that patches headless browser detection signals. Add random mouse movements, human-like scrolling, and request delays between 2-5 seconds. Rotating user agents and using residential proxies helps for larger scrapes.",
      },
      {
        q: "How do you generate personalized outreach emails with AI?",
        a: "Feed the lead's business name, website content, and category into Groq's Llama 3.3 70B with a prompt that asks for a short, warm opening line referencing their specific business type. The model generates unique copy that sounds human, not templated.",
      },
    ],
  },
  {
    slug: "opencode-vs-paid-ides-free-ai-coding",
    title: "I Ditched Claude Opus & Paid IDEs for OpenCode + DeepSeek V4 Flash Free — Here's Why It Costs Me Nothing",
    date: "2026-07-18",
    excerpt:
      "Real comparison of OpenCode vs Cursor, Windsurf, Claude Code, and GitHub Copilot — why I switched from paying $150+/month for Claude Sonnet 4.6 and Opus 4.6 to OpenCode IDE extension + DeepSeek V4 Flash Free at exactly $0, with MCP servers making it even more powerful.",
    tags: ["OpenCode", "DeepSeek", "Cursor", "Windsurf", "Claude Code", "GitHub Copilot", "AI Agent", "MCP", "LLM", "Coding Agent"],
    readTime: "8 min read",
    category: "General",
    faq: [
      {
        q: "How can I use OpenCode for free without paying for API keys?",
        a: "OpenCode itself is free and open source (MIT license). For the model, DeepSeek V4 Flash Free is available through DeepSeek's API and OpenRouter at no cost — no credit card needed, no usage limits. Install the OpenCode IDE extension, connect to DeepSeek V4 Flash Free, and you have a top-tier AI coding agent for exactly $0/month.",
      },
      {
        q: "What is DeepSeek V4 Flash Free and how does it compare to Claude Opus?",
        a: "DeepSeek V4 Flash Free is an open-source LLM that scores ~73% on SWE-bench Verified — about 90% of Claude Opus 4.6's 84% performance. For daily coding tasks like debugging, refactoring, and test writing, the quality difference is barely noticeable. The key difference: DeepSeek V4 Flash Free costs $0 while Opus costs $0.42 per task.",
      },
      {
        q: "Does OpenCode work as an IDE extension or only in the terminal?",
        a: "OpenCode works both ways. It has a terminal/CLI interface, a desktop app, and IDE extensions for VS Code, Cursor, Windsurf, and VSCodium. You can install it as an extension in your existing IDE — same keybindings, same theme, same workflow, just with an AI agent panel added.",
      },
      {
        q: "What makes OpenCode better than paid IDEs aside from price?",
        a: "OpenCode is model-agnostic (75+ providers), supports MCP servers for external tool integration (databases, APIs, browsers), runs fully offline with local models, and has no feature walls or request limits. Paid IDEs lock you to specific models and meter agent requests behind $20–$40/month subscriptions.",
      },
    ],
  },
  {
    slug: "trigger-based-sales-intelligence-engine",
    title: "How to Build a Trigger-Based Sales Intelligence Engine with n8n, Groq, Playwright & Human-in-the-Loop",
    date: "2026-07-23",
    excerpt:
      "Step-by-step guide to building a decentralized autonomous sales pipeline that monitors global news for funding rounds, leadership changes, and M&A — then scores leads with Groq LLM, scouts websites with Playwright, and sends personalized emails via a Slack human-in-the-loop approval gate.",
    tags: ["n8n", "Groq", "Playwright", "FastAPI", "Python", "Slack", "Resend", "AI Agent", "Automation", "Lead Generation", "LLM", "SQLite", "Docker", "Cloudflare"],
    readTime: "10 min read",
    category: "Personal",
    faq: [
      {
        q: "What is a Trigger-Based Sales Intelligence Engine?",
        a: "A decentralized system that monitors global news events (funding rounds, leadership changes, M&A) in real-time, scores them by sales potential, enriches lead data via web reconnaissance, and sends personalized outreach through a human-in-the-loop approval workflow — all in under 10 minutes per event.",
      },
      {
        q: "How does the human-in-the-loop approval work?",
        a: "The system pauses at the email dispatch stage and sends a rich notification to Slack containing the lead intelligence, AI-generated copy, and a click-to-approve button. The email is only sent when a human physically clicks approve, preventing any accidental or inappropriate outreach.",
      },
      {
        q: "What makes this different from traditional lead generation?",
        a: "Traditional tools batch-process leads on schedules. TBSIE is event-driven — it reacts to real-world business triggers as they happen. It also uses AI for both lead scoring and personalized copywriting, with a focus on timing and context rather than volume.",
      },
    ],
  },
  {
    slug: "self-host-n8n-free-docker-cloudflare-tunnel",
    title: "How to Self-Host n8n for Free Without the 14-Day Trial (Docker + Cloudflare Tunnel Guide)",
    date: "2026-07-23",
    excerpt:
      "Step-by-step guide to running n8n locally on Docker and exposing it online with Cloudflare Tunnel — unlimited workflows, public webhooks, full data privacy, and zero subscription costs. One instance powers all your automation.",
    tags: ["n8n", "Docker", "Cloudflare", "Automation", "Self-Hosted", "DevOps", "Webhook", "Python", "Open Source"],
    readTime: "8 min read",
    category: "General",
    faq: [
      {
        q: "How do I run n8n for free without the 14-day trial?",
        a: "Run n8n locally with Docker and expose it via Cloudflare Tunnel. The n8n software itself is free and open source — only their cloud hosting costs money. Self-hosting gives you the same features with no trial expiry and no usage limits.",
      },
      {
        q: "What are the limitations of Cloudflare's free tunnel for n8n?",
        a: "The free plan caps payloads at 50MB per request and doesn't support WebSocket proxying. For automation workflows using HTTP webhooks (Slack, Resend, GitHub, Stripe, RSS), this is sufficient. Paid plans ($20/month) remove both limits.",
      },
      {
        q: "Can I run multiple n8n workflows on the same instance?",
        a: "Yes. One Docker container handles unlimited workflows simultaneously. I run over 15 workflows including a sales intelligence engine, RSS monitors, Slack bots, and invoice handlers — all on one self-hosted instance with no performance issues.",
      },
    ],
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

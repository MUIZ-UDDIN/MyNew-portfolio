export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  url?: string
  category: string
  highlights?: string[]
  private?: boolean
}

export const projects: Project[] = [
  {
    title: "Sunstone CRM",
    description: "Enterprise CRM platform for companies to analyze every business detail — quotes, deals, and customer insights. Integrated with Twilio for SMS, live chat & calls, Gmail API for contact sync, and real-time analytics dashboards.",
    tech: ["React", "Node.js", "Twilio", "PostgreSQL", "Gmail API"],
    url: "https://www.sunstonecrm.com/auth/login",
    category: "Full-Stack",
    highlights: ["Twilio integration", "Gmail API sync", "Real-time analytics"],
    private: true,
  },
  {
    title: "CS2 Automation System",
    description: "Full automation suite for CS2 deployed on client's remote VMs via SSH. Automates Steam login, cookie management, session handling, and in-game tasks — tracking XP/level progression and executing recurring gameplay workflows.",
    tech: ["Python", "Selenium", "Playwright", "SSH", "Linux"],
    category: "Automation",
    highlights: ["SSH deployment", "Steam automation", "Gameplay workflows"],
    private: true,
  },
  {
    title: "Sports Data Intelligence",
    description: "Fully automated data pipelines collecting millions of data points on lesser-known sports worldwide. Researched sport origins, founder biographies, top players with career stats. Mapped equipment ecosystems using free & low-cost APIs to minimize client costs while delivering enterprise-grade data accuracy.",
    tech: ["Python", "Web Scraping", "PostgreSQL", "API Integration", "Data Pipelines"],
    category: "Data Science",
    highlights: ["Million-scale dataset", "Low-cost APIs", "Equipment ecosystem mapping"],
    private: true,
  },
  {
    title: "AutoAnalyst Engine",
    description: "An autonomous AI research agent capable of multi-step reasoning, live web exploration via Tavily, and automated report generation. Built with Python, Groq Function Calling, and an iterative 'Plan-Act-Observe' loop.",
    tech: ["Python", "Groq", "Tavily", "LangChain", "Next.js"],
    github: "https://github.com/MUIZ-UDDIN/AutoAnalyst-Engine",
    category: "Generative AI",
    highlights: ["Multi-step reasoning", "Live web exploration", "Automated report generation"],
  },
  {
    title: "CogniFlow",
    description: "Autonomous RAG Intelligence Platform for real-time document analysis with a streaming FastAPI backend, ChromaDB vector search, and a live-sync Next.js dashboard.",
    tech: ["Python", "FastAPI", "ChromaDB", "Next.js", "LangChain"],
    github: "https://github.com/MUIZ-UDDIN/CogniFlow",
    category: "Generative AI",
    highlights: ["Real-time document analysis", "Vector search", "Streaming backend"],
  },
  {
    title: "EchoSentinel",
    description: "End-to-end sentiment analysis platform with FastAPI backend, SQLAlchemy persistence, and a real-time dashboard to monitor market trends from global news sources.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "JavaScript"],
    github: "https://github.com/MUIZ-UDDIN/EchoSentinel",
    category: "Data Science",
    highlights: ["Real-time monitoring", "News aggregation", "Sentiment scoring"],
  },
  {
    title: "Face Recognition (FaceNet)",
    description: "Face recognition system using FaceNet architecture for accurate facial identification and verification.",
    tech: ["Python", "TensorFlow", "FaceNet", "OpenCV"],
    github: "https://github.com/MUIZ-UDDIN/FaceRecog_FaceNet",
    category: "Computer Vision",
  },
  {
    title: "Fake News Detection",
    description: "NLP-based fake news detection system using machine learning classifiers to identify misinformation.",
    tech: ["Python", "NLP", "Scikit-learn", "NLTK"],
    github: "https://github.com/MUIZ-UDDIN/FakeNews_Detaction",
    category: "NLP",
  },
  {
    title: "Sentiment Analysis",
    description: "Sentiment analysis tool for text classification using natural language processing techniques.",
    tech: ["Python", "NLP", "NLTK", "Scikit-learn"],
    github: "https://github.com/MUIZ-UDDIN/Sentiment_analysis",
    category: "NLP",
  },
  {
    title: "Win Predictor",
    description: "ML-based prediction model for sports outcomes. Capstone project demonstrating end-to-end data science workflow.",
    tech: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    github: "https://github.com/MUIZ-UDDIN/Win_Predictor",
    category: "Data Science",
  },
]

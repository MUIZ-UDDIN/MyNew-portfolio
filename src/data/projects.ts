export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  category: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    title: "AutoAnalyst Engine",
    description: "An autonomous AI research agent capable of multi-step reasoning, live web exploration via Tavily, and automated report generation. Built with Python, Groq Function Calling, and an iterative 'Plan-Act-Observe' loop.",
    tech: ["Python", "Groq", "Tavily", "LangChain", "Next.js"],
    github: "https://github.com/MUIZ-UDDIN/AutoAnalyst-Engine",
    category: "Generative AI",
    highlights: ["Multi-step reasoning", "Live web exploration", "Automated report generation"],
  },
  {
    title: "Face Recognition (FaceNet)",
    description: "Face recognition system using FaceNet architecture for accurate facial identification and verification.",
    tech: ["Python", "TensorFlow", "FaceNet", "OpenCV"],
    github: "https://github.com/MUIZ-UDDIN/FaceRecog_FaceNet",
    category: "Computer Vision",
  },
  {
    title: "Image Classification",
    description: "Image classification pipeline using Scikit-learn with feature extraction and multiple classifier models.",
    tech: ["Python", "Scikit-learn", "NumPy", "Pandas"],
    github: "https://github.com/MUIZ-UDDIN/ImageClassification_Sklearn",
    category: "Machine Learning",
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

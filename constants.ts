import { Experience, Project, SkillMetric, Education, Certification, TechItem } from './types';

export const RESUME_CONTEXT = `
Gaurav Mahale is an AI Product Builder & Product Manager, specialising in Generative AI, LLM Evaluations, and End-to-End Product Life-cycles.
Location: Pune, India. Open to hybrid/remote roles. Contact: mahalegauravk@gmail.com
Headline: AI Product Builder | LLM Evals · RAG · Fine-Tuning | Open to AI PM Roles

About:
Building products at the frontier of applied AI. 
I am an AI Product Manager who independently designs, builds, and ships LLM-based platforms using modern stacks (Next.js, Python, Supabase) and frontier models (Claude, GPT, Google Gemini, Groq). 

My edge is practical, shipped experience. From framing product visions and scoping MVPs, to designing structured prompt architectures and evaluating model outputs, I treat every iteration as a product sprint. Previously, I honed a deep analytical rigour by managing complex £50M+ financial portfolios — a domain expertise I now leverage to build high-stakes, precision-focused AI tools.

Currently seeking AI Product Management roles where end-to-end building experience and structured product thinking can drive transformative AI solutions.
`;

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Trainer & Prompt Engineer",
    company: "Pareto.AI",
    period: "Dec 2025 - Present",
    type: 'AI',
    description: [
      "Train and fine-tune Large Language Models (LLMs) on complex analytical tasks through rigorous structured evaluation (evals) and prompt engineering.",
      "Iteratively evaluate AI outputs against strict expert benchmarks to enhance model accuracy, reasoning capabilities, and factual alignment.",
      "Develop progressively complex prompt scenarios involving forward dependencies, multi-hop reasoning, and constrained summarisation.",
      "Apply deep domain expertise (honed from 8+ years analysing complex datasets in banking) to bridge the gap between raw model capability and reliable real-world workflow automation."
    ]
  },
  {
    role: "Product Builder (Independent)",
    company: "AI & Automation Projects",
    period: "2023 - Present",
    type: 'AI',
    description: [
      "Shipped multiple AI products end-to-end: owning problem discovery, PRD scoping, prompt architecture, UI/UX, and production deployments.",
      "Conducted iterative development cycles: prioritised feature backlogs (memory systems, voice cloning, API routing), wrote user stories, and shipped incremental releases.",
      "Defined go-to-market and monetisation strategies, treating every launch as a data-driven product sprint with defined KPIs.",
      "Direct technical implementation across Python, Next.js, FastAPI, Supabase, Vercel, and various LLM APIs."
    ]
  },
  {
    role: "Past Domain Experience: Corporate Analytics & Lending",
    company: "Yes Bank / HDFC Bank / Suraksha ARC",
    period: "Sep 2017 - Present",
    type: 'Finance',
    description: [
      "8+ years of analytical and cross-functional leadership, managing high-stakes portfolios exceeding ₹5,000M.",
      "Designed data-driven early warning systems (EWS) using predictive analytics to flag delinquency risk, proving an ability to turn raw data into actionable product features.",
      "Built and maintained complex business intelligence dashboards tracking portfolio health, leading to real-time decision-making for senior management.",
      "Led full project lifecycles from client discovery and appraisal through to cross-functional coordination across legal, compliance, and engineering/operations teams."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "AI Persona Interaction Platform",
    date: "Oct 2025",
    description: "Conceived and launched a B2C AI platform serving 500+ monthly users. Defined product strategy, persona taxonomy, and monetisation while maintaining strict character consistency.",
    tech: ["Next.js 14", "Supabase", "Gemini 1.5 Flash", "Groq Llama 3.3 70B", "Vercel"],
    metrics: "500 MAU",
    link: "https://ai-spirit.in",
    image: "/ai-spirit.png",
    category: 'build',
    problem: "Generic chatbots lack personality consistency. Users want meaningful interactions that feel authentic, but existing solutions struggle with maintaining consistent character and memory across sessions.",
    approach: [
      "Structured prompt engineering used to maintain consistent persona tone, identity, and memory context across sessions",
      "Iterative A/B testing on onboarding flows and persona engagement mechanics to drive user retention",
      "Full product lifecycle owned end-to-end: idea → PRD → build → deploy → user feedback → iteration"
    ],
    keyInsights: [
      "Persona consistency is the core driver of engagement - users return when characters stay 'in character'",
      "Structured prompt engineering solved a non-trivial LLM reliability challenge for memory",
      "A/B testing flows increased retention noticeably"
    ],
    outcomes: [
      "Grown to 500 Monthly Active Users (MAU)",
      "Maintained consistent persona tone for complex and nuanced AI characters"
    ]
  },
  {
    title: "AI-Powered Intelligence Platform",
    date: "Dec 2025",
    description: "Full-stack AI platform built to automate comprehensive analytical memo generation from long-form complex reports — reducing a 4–6 hour manual analysis process to under 15 minutes.",
    tech: ["Python", "FastAPI", "Gemini API", "Claude API", "Next.js 16", "SQLite"],
    metrics: "80% Time Save",
    category: 'build',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Analysts spend excessively repetitive hours manually extracting data and writing synthesis memos. The manual process is error-prone and bottlenecks workflow.",
    approach: [
      "Defined product vision and mapped user journeys as primary functional personas",
      "Drafted LLM prompt architectures specifically tuned for high-fidelity data extraction",
      "Oversaw testing and verified output accuracy against actual human-produced benchmarks"
    ],
    keyInsights: [
      "Matching the output a senior analyst would produce manually built immense enterprise trust",
      "Iterating rigorously on prompt constraints was more effective than raw model switching"
    ],
    outcomes: [
      "Reduced a 4–6 hour manual analysis process to under 15 minutes",
      "Shipped with multi-format exports (Excel & PDF) perfectly aligned to business reporting standards"
    ]
  },
  {
    title: "Automated Multi-Portal Job Logic",
    date: "Jan 2026",
    description: "Designed a local solution to the massive signal-to-noise ratio in manual web searching. Configured an automated daily digest with AI-driven relevance scoring (0–100).",
    tech: ["Python", "Flask", "Ollama/Mistral", "Selenium", "Telegram Bot API"],
    metrics: "2x Daily Automated",
    category: 'build',
    problem: "Manual discovery across fragmented portals is a massive pain point due to search noise and inefficiencies.",
    approach: [
      "Constructed a technical pipeline that scrapes listings twice daily",
      "Implemented a local LLM matching engine against target profiles using semantic logic",
      "Validiated product-market fit through self-use, iterating heavily on the zero-friction digest delivery"
    ],
    keyInsights: [
      "Eliminating the manual evaluation step via LLMs dramatically increased process velocity",
      "Daily active integration tests proved the pipeline's robustness in production"
    ],
    outcomes: [
      "Fully automated the discovery pipeline with zero time spent on manual browsing",
      "Shipped a web dashboard for settings management and digest history"
    ]
  },
  {
    title: "Discord AI Web Scraper Bot",
    date: "Jan 2026",
    description: "AI-powered Discord bot that scrapes any webpage and enables natural conversation about its content. Users can ask questions, get summaries, or extract specific information from URLs.",
    tech: ["Python", "Discord.py", "Groq API", "Llama 3.3 70B", "BeautifulSoup"],
    metrics: "Live Bot",
    category: 'build',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Fragmented context switching between browser and chat when researching collaboratively.",
    approach: [
      "Built a Discord bot that listens and auto-detects URLs within chat contexts",
      "Integrated Groq's API for ultra-fast Llama 3.3 70B inference speeds",
      "Architected a robust conversation memory system for follow-up queries"
    ],
    keyInsights: ["Conversation memory transforms simple utility into prolonged engagement", "Auto-URL detection drastically reduces user friction"],
    outcomes: ["Built fully functional bot running 24/7", "Supports natural conversation seamlessly integrated into group chats"]
  }
];

export const SKILL_DATA: SkillMetric[] = [
  { subject: 'AI Product Strategy', A: 95, fullMark: 100 },
  { subject: 'Prompt Engineering', A: 95, fullMark: 100 },
  { subject: 'LLM Evaluation (Evals)', A: 90, fullMark: 100 },
  { subject: 'Agile & Execution', A: 90, fullMark: 100 },
  { subject: 'Technical Build (Python/JS)', A: 85, fullMark: 100 },
];

export const STOCK_TICKER_ITEMS = [
  "GMHL: AI BUILDER",
  "DOMAIN: TECH & AI PM",
  "FOCUS: LLM EVALS · RAG",
  "STACK: NEXT.JS · PYTHON · PROMPT",
  "TRAINING: PARETO.AI",
  "RATING: STRONG BUY"
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "Indian Institute of Management Sirmaur",
    degree: "PGPM (Post Graduate Programme in Management)",
    year: "2015 - 2017",
    id: "EDU-01"
  },
  {
    institution: "University of Pune",
    degree: "Bachelor of Engineering (B.E.)",
    year: "2010 - 2014",
    id: "EDU-02"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "IBM AI Product Management",
    issuer: "Coursera",
    year: "2024",
    id: "CRT-01"
  },
  {
    name: "Top 5% Professional Product Management",
    issuer: "HelloPM",
    year: "2023",
    id: "CRT-02"
  },
  {
    name: "Agile Foundations",
    issuer: "PMI",
    year: "2025",
    id: "CRT-03"
  },
  {
    name: "Technical Product Management",
    issuer: "LinkedIn Learning",
    year: "2023",
    id: "CRT-04"
  }
];

export const TECH_STACK: TechItem[] = [
  { id: "LLM", name: "LLM Evaluation & Evals", category: "AI Skills", price: "250.00", change: "+25.2%" },
  { id: "PRMPT", name: "Prompt Architecture", category: "AI Skills", price: "248.50", change: "+14.1%" },
  { id: "RAG", name: "RAG & Vector DBs", category: "AI Skills", price: "180.20", change: "+11.5%" },
  { id: "PRD", name: "PRD & Product Strategy", category: "PM Skills", price: "160.40", change: "+8.4%" },
  { id: "API", name: "API & Backend Integrations", category: "Tech", price: "135.10", change: "+5.2%" },
  { id: "PYTH", name: "Python / FastAPI", category: "Tech", price: "128.50", change: "+6.1%" },
  { id: "NXT", name: "Next.js / TypeScript", category: "Tech", price: "118.45", change: "+4.4%" }
];
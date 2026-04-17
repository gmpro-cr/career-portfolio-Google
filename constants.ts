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
    description: "Architected and shipped a B2C AI platform serving 500+ MAU. Applied rigorous product thinking to solve LLM hallucination and persona drift, using structured evals to define character taxonomy, memory systems, and retention-driven engagement mechanics.",
    tech: ["Next.js 14", "Supabase", "Gemini 1.5 Flash", "Groq Llama 3.3 70B", "Vercel"],
    metrics: "500 MAU",
    link: "https://ai-spirit.in",
    image: "/ai-spirit.png",
    category: 'build',
    flowType: 'persona',
    problem: "Generic AI chatbots fail at long-term engagement because they lack character consistency and memory. Users crave authentic, persistent relationships, but foundational models inherently drift from their system prompts during extended multi-turn conversations.",
    approach: [
      "Conducted user research to define core user personas and the engagement loops that drive retention.",
      "Designed a sophisticated prompt architecture utilizing dynamic memory injection (via Supabase) to establish long-term context.",
      "Implemented custom LLM evaluations to quantitatively measure 'persona adherence' and reduce out-of-character responses.",
      "Iterated on the onboarding funnel using A/B testing, minimizing friction to the first 'aha' moment."
    ],
    keyInsights: [
      "Product-Market Fit is deeply tied to emotional consistency; users forgive logic errors, but bounce immediately if the AI breaks character.",
      "Prompt engineering isn't just text tweaking—it's a core product feature. Structuring memory drastically outperformed raw model iteration.",
      "Engagement loops require proactive AI interactions, prompting users rather than waiting for them."
    ],
    outcomes: [
      "Grown to 500 Monthly Active Users (MAU) driven by organic retention loops",
      "Maintained consistent persona tone for complex and nuanced AI characters over 50+ turn conversations"
    ]
  },
  {
    title: "Enterprise AI Credit Analyst Platform",
    date: "Dec 2025",
    description: "Engineered an enterprise-grade AI intelligence system tailored for complex credit risk analysis. Transformed an unstructured, 100-page deterministic financial review process into a 15-minute automated workflow.",
    tech: ["Python", "FastAPI", "Gemini API", "Claude API", "Next.js 16", "SQLite"],
    metrics: "80% Time Save",
    category: 'build',
    flowType: 'credit',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Senior analysts spend 4–6 hours manually scrubbing 100+ page annual reports for data extraction and subjective risk synthesis. This is a low-leverage bottleneck prone to human error, restricting the volume of transactions evaluated.",
    approach: [
      "Mapped the end-to-end user journey of a Credit Analyst to identify exact bottlenecks in the legacy workflow.",
      "Architected a deterministic pre-computation layer in Python to handle hard logic, leaving the LLM purely for narrative synthesis and risk scoring.",
      "Developed evaluation rubrics to benchmark the AI's credit memos against historical ground truths written by human analysts.",
      "Designed a UI that allowed 'human-in-the-loop' editing, recognizing that enterprise users need control and transparency, not black-box automation."
    ],
    keyInsights: [
      "Trust is the bottleneck in enterprise AI. Delivering an export format that mirrored existing compliance templates was crucial for adoption.",
      "LLMs are terrible at math but incredible at synthesis. Separating deterministic parsing from probabilistic generation solved 90% of accuracy issues.",
      "Human-in-the-loop (HITL) isn't a crutch; it's a necessary product feature for high-stakes enterprise deployments."
    ],
    outcomes: [
      "Reduced a 4–6 hour manual analysis process to under 15 minutes",
      "Shipped with multi-format exports (Excel & PDF) perfectly aligned to business reporting standards"
    ]
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
import { Experience, Project, SkillMetric, Education, Certification, TechItem } from './types';

export const RESUME_CONTEXT = `
Gaurav Mahale — AI Product Builder | Finance Domain Expert
Location: Pune, India. Open to hybrid/remote roles. Contact: mahalegauravk@gmail.com
LinkedIn: https://www.linkedin.com/in/mahalegauravk

Summary: AI Product Builder and Finance Domain Expert with 9+ years in banking, credit risk, and portfolio management.
Independently designed, built, and shipped 3 LLM-based platforms using Claude, Cursor and Groq API.
Experienced across the full product lifecycle: problem discovery, MVP scoping, prompt engineering, stakeholder alignment, and iterative releases.
Seeking AI Product Management roles where finance expertise and practical AI-building experience combine to create transformative products.
`;

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Product Evaluator & Domain Expert",
    company: "Pareto.AI",
    period: "Dec 2025 – Present",
    type: 'AI',
    description: [
      "Train and fine-tune Large Language Models on financial modelling, document generation, and presentation creation through structured evaluation (evals) and prompt engineering.",
      "Evaluate and iteratively improve AI outputs for corporate credit analysis, financial projections, and business documentation against expert benchmarks.",
      "Apply banking domain expertise to enhance LLM accuracy in corporate finance tasks, bridging the gap between raw model capability and real-world financial workflows.",
    ]
  },
  {
    role: "Product Manager",
    company: "Yes Bank Limited",
    period: "Apr 2022 – Present",
    type: 'Finance',
    description: [
      "Managed end-to-end wholesale credit programmes — owning the full project lifecycle from client discovery and credit appraisal through to disbursement and post-disbursement monitoring.",
      "Authored comprehensive Credit Appraisal Memorandums (the banking equivalent of PRDs) for portfolios worth 500 Cr+, synthesising financial analysis, risk assessment, and industry research.",
      "Validated borrower needs through structured discovery — identifying pain points across working capital, term loans, and trade finance — and translated insights into tailored product proposals.",
      "Built early-warning monitoring frameworks post-disbursement to reduce delinquency risk and improve portfolio retention.",
    ]
  },
  {
    role: "Product Portfolio Manager",
    company: "HDFC Bank Limited",
    period: "Jan 2020 – Apr 2022",
    type: 'Finance',
    description: [
      "Designed data-driven solutions to minimise delinquency risk using predictive analytics and early warning signals, reducing portfolio (200 Cr+) stress across Maharashtra and Goa.",
      "Built and maintained PowerBI and Excel dashboards tracking default probabilities, portfolio health, and loan concentration risk — enabling real-time decision-making for senior management.",
      "Created sector-specific credit and financial models for real estate, energy, and hospitality segments, enabling faster and more accurate underwriting decisions.",
    ]
  },
  {
    role: "Operations Manager",
    company: "Suraksha Asset Reconstruction Ltd.",
    period: "Sep 2017 – Jan 2020",
    type: 'Finance',
    description: [
      "Analysed financial health and recovery potential of NPA accounts offered for sale by scheduled commercial banks, assessing credit risk and resolution feasibility for Large Corporate portfolios.",
      "Supported acquisition of a stressed account with debt of ~9,000 Cr under the Insolvency and Bankruptcy Code (IBC), coordinating between bank officials, legal counsel, and management.",
      "Conducted due diligence and loan documentation for cases exceeding 50 Cr, ensuring regulatory compliance and internal credit policy adherence.",
    ]
  },
];

export const PROJECTS: Project[] = [
  {
    title: "AI Persona Interaction Platform",
    date: "Oct 2025",
    description: "Conceived and launched a B2C AI product with 350+ personas. Defined product strategy, persona prompts, a freemium monetisation model (Razorpay), and go-to-market approach — treating each launch as a product sprint with defined KPIs for engagement and retention.",
    tech: ["Next.js", "Supabase", "Gemini 1.5 Flash", "Groq Llama 3.3", "Google OAuth", "Sarvam TTS", "Mixpanel", "Vercel"],
    metrics: "500+ MAU",
    link: "https://ai-spirit.in",
    image: "/ai-spirit.png",
    category: 'build',
    flowType: 'persona',
    problem: "Generic AI chatbots fail at long-term engagement because they lack character consistency and memory. Users crave authentic, persistent relationships, but foundational models inherently drift from their system prompts during extended multi-turn conversations — destroying immersion and user trust.",
    approach: [
      "Defined product strategy and persona taxonomy: character archetypes, memory structures, and engagement loops through user research on retention drivers.",
      "Designed a prompt architecture with dynamic memory injection via Supabase — long-term context retrieval to maintain persona fidelity across sessions.",
      "Implemented custom LLM evals to quantitatively score 'persona adherence' and reduce out-of-character responses across Gemini and Groq models.",
      "Ran iterative product sprints: shipped voice cloning (Sarvam TTS), mobile UI, real-time news awareness, and freemium paywall (Razorpay) as incremental releases.",
      "Tracked engagement via Mixpanel — iterated the onboarding funnel using A/B testing to minimise friction to first 'aha' moment.",
    ],
    keyInsights: [
      "Product-Market Fit is tied to emotional consistency. Users forgive logic errors but bounce immediately on character drift.",
      "Prompt engineering is a core product feature, not a config detail. Structured memory retrieval outperformed raw model iteration 3:1 on persona consistency.",
      "Proactive AI interactions — the AI initiating messages, not waiting — dramatically improved D7 retention.",
    ],
    outcomes: [
      "Grown to 500+ Monthly Active Users driven by organic retention loops.",
      "Maintained consistent persona tone across 50+ turn conversations.",
      "Shipped freemium monetisation (Razorpay) with defined conversion KPIs.",
    ],
    technicalDetails: {
      architecture: "Next.js frontend on Vercel communicates with Supabase (PostgreSQL) for user state and long-term memory retrieval. API routes fan out to a LLM router that selects Gemini 1.5 Flash (for speed) or Groq Llama 3.3 70B (for depth) depending on the persona context. Persona responses are evaluated by a lightweight eval layer before delivery.",
      dataFlow: [
        { step: "User message received by Next.js API route" },
        { step: "Supabase queried for persona definition + last N memory chunks" },
        { step: "Prompt assembled: system persona + memory context + user input" },
        { step: "LLM router dispatches to Gemini 1.5 Flash or Groq Llama 3.3" },
        { step: "Persona eval scores output for character consistency" },
        { step: "Response streamed to frontend; memory chunk persisted to Supabase" },
      ],
    },
  },
  {
    title: "AI Credit Intelligence Platform",
    date: "Dec 2025",
    description: "Identified and solved a real enterprise bottleneck: CAM preparation takes analysts 4–6 hours due to manual extraction from annual reports. Scoped the MVP with Claude Code, mapped user journeys for relationship managers and credit analysts, and shipped a platform that reduces CAM prep time to under 1 hour.",
    tech: ["Python", "FastAPI", "Next.js 16", "Google Gemini API", "Claude API", "Supabase", "SQLite", "OpenPyXL", "PDFMiner", "GitHub"],
    metrics: "–80% time",
    category: 'build',
    flowType: 'credit',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Senior analysts spend 4–6 hours manually scrubbing 100+ page annual reports for data extraction and subjective risk synthesis. This low-leverage bottleneck is prone to human error and restricts the volume of transactions that can be evaluated per analyst per day.",
    approach: [
      "Mapped the end-to-end user journey of a Credit Analyst to identify the exact bottlenecks: PDF extraction, financial normalisation, and narrative risk synthesis.",
      "Architected a deterministic pre-computation layer in Python (PDFMiner + custom parsers) to handle hard financial extraction logic — keeping the LLM purely for narrative synthesis and risk scoring.",
      "Designed LLM evaluation rubrics to benchmark AI-generated credit memos against historical ground truths written by senior analysts.",
      "Built a human-in-the-loop editing UI: enterprise users need transparency and control, not black-box output they cannot audit.",
      "Shipped multi-format exports (Excel via OpenPyXL + PDF) that mirror existing bank reporting standards — zero adoption friction.",
    ],
    keyInsights: [
      "Trust is the adoption bottleneck in enterprise AI. Matching the exact output format of existing compliance templates was the single most important product decision.",
      "LLMs are poor at deterministic arithmetic but excellent at narrative synthesis. Separating parsing from generation solved 90% of accuracy issues.",
      "Human-in-the-loop is not a crutch — it's a mandatory product feature for high-stakes regulated environments.",
    ],
    outcomes: [
      "Reduced CAM preparation from 4–6 hours to under 1 hour — an 80%+ time saving.",
      "Shipped with dual export formats (Excel + PDF) perfectly aligned to bank reporting standards.",
      "Validated accuracy against real CAMs across live banking use cases.",
    ],
    technicalDetails: {
      architecture: "FastAPI backend orchestrates a two-stage pipeline: Stage 1 is deterministic Python extraction (PDFMiner + rule-based parsers for financial tables, ratios, and company details). Stage 2 passes structured JSON to the LLM layer (Gemini API + Claude API) for narrative synthesis and risk commentary. Results are persisted in SQLite and served to the Next.js 16 frontend. Exports are generated server-side via OpenPyXL (Excel) and a PDF renderer.",
      dataFlow: [
        { step: "PDF uploaded via Next.js frontend to FastAPI endpoint" },
        { step: "PDFMiner extracts raw text; rule-based parser isolates financial tables" },
        { step: "Structured JSON built: P&L, Balance Sheet, Ratios, Company Profile" },
        { step: "Gemini API generates narrative risk commentary from structured JSON" },
        { step: "Claude API performs cross-validation and flags inconsistencies" },
        { step: "Credit Memo assembled and persisted; Excel + PDF export generated" },
      ],
    },
  },
  {
    title: "Automated Job Discovery Agent",
    date: "Jan 2026",
    description: "Defined the product as a solution to a personal pain point: noise and inefficiency in manual job searching across fragmented portals. Designed the full UX — preference configuration, AI-driven relevance scoring (0–100), and a daily digest with matched roles and hiring manager LinkedIn details. Surfaces ~10 matched roles across 5+ portals with zero manual intervention.",
    tech: ["Python", "Flask", "Ollama / Mistral 7B", "Selenium", "SQLite", "APScheduler", "Telegram Bot API", "BeautifulSoup"],
    metrics: "100% automated",
    category: 'build',
    flowType: 'job',
    githubUrl: "https://github.com/gmpro-cr",
    problem: "Job hunting is a high-noise, low-signal data problem. Portals are flooded with irrelevant listings, forcing candidates to manually filter hundreds of results daily — an inefficient, demoralising process that scales inversely with the quality of roles available.",
    approach: [
      "Engineered a resilient Selenium + BeautifulSoup scraping pipeline across Naukri, LinkedIn, and Foundit — handling dynamic pagination, session management, and anti-scrape patterns.",
      "Integrated Ollama running Mistral 7B locally to semantically score job descriptions (0–100) against a target candidate profile — zero API cost, full offline capability.",
      "Designed a push-notification delivery model: high-scored jobs delivered as a Telegram digest daily, flipping search from 'pull' (user browses) to 'push' (agent delivers).",
      "Built a Flask web dashboard for preference configuration, portal selection, and digest history — treating each iteration as a product release with defined success metrics.",
      "Validated PMF through self-use over 3 months; iterated scoring model and portal coverage based on real output quality.",
    ],
    keyInsights: [
      "Local LLMs (Ollama/Mistral) are a competitive advantage for personal automation: zero cost, offline, fast, and sufficient reasoning for relevance filtering.",
      "The core AI value here is not generation — it's high-fidelity signal filtering from a noisy dataset.",
      "Zero-friction delivery (a Telegram push) vastly outperforms requiring users to log into another dashboard.",
    ],
    outcomes: [
      "100% automation of top-of-funnel job discovery across 5+ portals.",
      "Surfaces ~10 matched roles daily with hiring manager LinkedIn details.",
      "Reduced daily search time from 2 hours to a 5-minute digest review.",
    ],
    technicalDetails: {
      architecture: "APScheduler triggers the pipeline daily at a configured time. Selenium (headless Chrome) scrapes job listings from Naukri, LinkedIn, and Foundit with BeautifulSoup parsing. Raw listings are stored in SQLite. Ollama (Mistral 7B, running locally) scores each listing against the candidate profile JSON (0–100). Scores above the threshold are formatted into a digest and delivered via Telegram Bot API. A Flask web app provides a settings dashboard and digest history viewer.",
      dataFlow: [
        { step: "APScheduler triggers daily scrape at configured time" },
        { step: "Selenium scrapes Naukri, LinkedIn, Foundit job listings" },
        { step: "BeautifulSoup parses raw HTML; listings stored in SQLite" },
        { step: "Ollama (Mistral 7B, local) scores each listing 0–100 vs profile" },
        { step: "Jobs scoring >70 selected; hiring manager details appended" },
        { step: "Telegram Bot API delivers formatted daily digest to user" },
      ],
    },
  }
];

export const SKILL_DATA: SkillMetric[] = [
  { subject: 'AI Product Strategy', A: 93, fullMark: 100 },
  { subject: 'Prompt Engineering', A: 91, fullMark: 100 },
  { subject: 'LLM Evaluation (Evals)', A: 87, fullMark: 100 },
  { subject: 'Agile & Execution', A: 88, fullMark: 100 },
  { subject: 'Technical Build (Python/JS)', A: 82, fullMark: 100 },
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "Indian Institute of Management Sirmaur",
    degree: "PGPM (MBA Equivalent)",
    year: "Aug 2015 – Apr 2017",
    id: "EDU-01"
  },
  {
    institution: "University of Pune",
    degree: "B.E. – Electronics & Telecommunication",
    year: "Aug 2010 – Apr 2014",
    id: "EDU-02"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "IBM AI Product Management",
    issuer: "Coursera",
    year: "Jun 2025",
    id: "CRT-01"
  },
  {
    name: "Product Management Certification",
    issuer: "HelloPM",
    year: "Oct 2025",
    id: "CRT-02"
  },
  {
    name: "Agile Foundations",
    issuer: "PMI",
    year: "May 2025",
    id: "CRT-03"
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

export const STOCK_TICKER_ITEMS = [
  "GMHL: AI BUILDER",
  "DOMAIN: FINANCE + AI PM",
  "FOCUS: LLM EVALS · RAG",
  "STACK: NEXT.JS · PYTHON · PROMPT",
  "TRAINING: PARETO.AI",
  "RATING: STRONG BUY"
];

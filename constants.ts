import { Experience, Project, Education, Certification, ProjectTheme } from './types';

/* ═══════════════════════════════════════════════════════════════
   PER-PROJECT THEMES — each project owns a distinct color identity.
   Shared by Home cards and ProjectDetail diagrams.
   ═══════════════════════════════════════════════════════════════ */
export const THEMES: Record<string, ProjectTheme> = {
  // Persona — violet / indigo
  'ai-persona-interaction-platform': {
    accent: '#8B5CF6', accentDark: '#6D28D9', accentBg: '#F5F3FF', accentBorder: '#8B5CF6',
    ramp: [
      { bg: '#EEF2FF', border: '#6366F1', text: '#4338CA', dot: '#6366F1' }, // indigo
      { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9', dot: '#8B5CF6' }, // violet
      { bg: '#FAF5FF', border: '#A855F7', text: '#7E22CE', dot: '#A855F7' }, // purple
      { bg: '#FDF4FF', border: '#D946EF', text: '#A21CAF', dot: '#D946EF' }, // fuchsia
      { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' }, // blue
    ],
  },
  // Credit — emerald / teal
  'ai-credit-intelligence-platform': {
    accent: '#10B981', accentDark: '#065F46', accentBg: '#ECFDF5', accentBorder: '#10B981',
    ramp: [
      { bg: '#F0FDFA', border: '#14B8A6', text: '#0F766E', dot: '#14B8A6' }, // teal
      { bg: '#ECFDF5', border: '#10B981', text: '#065F46', dot: '#10B981' }, // emerald
      { bg: '#F0FDF4', border: '#22C55E', text: '#15803D', dot: '#22C55E' }, // green
      { bg: '#ECFEFF', border: '#06B6D4', text: '#0E7490', dot: '#06B6D4' }, // cyan
      { bg: '#F7FEE7', border: '#84CC16', text: '#4D7C0F', dot: '#84CC16' }, // lime
    ],
  },
  // Job Agent — royal blue (matches the deployed product)
  'automated-job-discovery-agent': {
    accent: '#2563EB', accentDark: '#1E40AF', accentBg: '#EFF4FF', accentBorder: '#2563EB',
    ramp: [
      { bg: '#EFF4FF', border: '#2563EB', text: '#1E40AF', dot: '#2563EB' }, // royal blue
      { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' }, // blue
      { bg: '#F0F9FF', border: '#0EA5E9', text: '#0369A1', dot: '#0EA5E9' }, // sky
      { bg: '#EEF2FF', border: '#6366F1', text: '#4338CA', dot: '#6366F1' }, // indigo
      { bg: '#ECFEFF', border: '#06B6D4', text: '#0E7490', dot: '#06B6D4' }, // cyan
    ],
  },
  // AI Engineering — slate / indigo (engineering, blueprint feel)
  'ai-engineering-field-guide': {
    accent: '#475569', accentDark: '#334155', accentBg: '#F1F5F9', accentBorder: '#475569',
    ramp: [
      { bg: '#F1F5F9', border: '#475569', text: '#334155', dot: '#475569' }, // slate
      { bg: '#EEF2FF', border: '#6366F1', text: '#4338CA', dot: '#6366F1' }, // indigo
      { bg: '#F8FAFC', border: '#64748B', text: '#334155', dot: '#64748B' }, // slate-light
      { bg: '#EEF4FF', border: '#4F46E5', text: '#3730A3', dot: '#4F46E5' }, // indigo deep
      { bg: '#F0F9FF', border: '#0EA5E9', text: '#0369A1', dot: '#0EA5E9' }, // sky pop
    ],
  },
  // PyQuest — amber / gold (matches the product's warm parchment-and-arcade feel)
  'pyquest-learn-python-by-writing-it': {
    accent: '#D97706', accentDark: '#92400E', accentBg: '#FFFBEB', accentBorder: '#D97706',
    ramp: [
      { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', dot: '#F59E0B' }, // amber
      { bg: '#FFF7ED', border: '#F97316', text: '#9A3412', dot: '#F97316' }, // orange
      { bg: '#FEFCE8', border: '#EAB308', text: '#854D0E', dot: '#EAB308' }, // yellow
      { bg: '#FFF1F2', border: '#F43F5E', text: '#9F1239', dot: '#F43F5E' }, // rose pop
      { bg: '#F0F9FF', border: '#0EA5E9', text: '#0369A1', dot: '#0EA5E9' }, // sky counter
    ],
  },
  // SQLQuest — deep terminal green (matches the product's "Green Bar" phosphor identity)
  'sqlquest-learn-sql-on-real-postgres': {
    accent: '#16A34A', accentDark: '#14532D', accentBg: '#F0FDF4', accentBorder: '#16A34A',
    ramp: [
      { bg: '#F0FDF4', border: '#16A34A', text: '#14532D', dot: '#16A34A' }, // green
      { bg: '#ECFDF5', border: '#059669', text: '#064E3B', dot: '#059669' }, // deep emerald
      { bg: '#F7FEE7', border: '#65A30D', text: '#3F6212', dot: '#65A30D' }, // lime-dark
      { bg: '#F0FDFA', border: '#0D9488', text: '#134E4A', dot: '#0D9488' }, // teal-dark
      { bg: '#F8FAFC', border: '#475569', text: '#334155', dot: '#475569' }, // slate counter
    ],
  },
};

export const FALLBACK_THEME: ProjectTheme = {
  accent: '#8B5CF6', accentDark: '#6D28D9', accentBg: '#F5F3FF', accentBorder: '#8B5CF6',
  ramp: [
    { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9', dot: '#8B5CF6' },
    { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' },
    { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', dot: '#F59E0B' },
    { bg: '#ECFDF5', border: '#10B981', text: '#065F46', dot: '#10B981' },
    { bg: '#FFF1F2', border: '#F43F5E', text: '#9F1239', dot: '#F43F5E' },
  ],
};

export const getTheme = (slug: string): ProjectTheme => THEMES[slug] ?? FALLBACK_THEME;

export const RESUME_CONTEXT = `
Gaurav Mahale — AI Product Builder | Finance Domain Expert
Location: Pune, India. Open to hybrid/remote roles. Contact: mahalegauravk@gmail.com
LinkedIn: https://www.linkedin.com/in/mahalegauravk

Summary: AI Product Builder and Finance Domain Expert with 9+ years in banking, credit risk, and portfolio management.
Independently designed, built, and shipped 6 products — 4 LLM-based platforms and 2 browser-native learning tools (PyQuest, SQLQuest) — using Claude, Cursor and Groq API.
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
    slug: "ai-persona-interaction-platform",
    date: "Oct 2025",
    description: "Conceived and launched a B2C AI product with 350+ personas across 40 categories. Applied a 10-item JTBD framework to identify five distinct user segments (career professionals, self-improvement seekers, spiritual explorers, entertainment/pop-culture fans, companion seekers) — each with different WTP, session frequency, and retention drivers. Defined North Star Metric as Messages Sent Per Day, ran a formal production readiness audit before launch, and shipped a freemium monetisation model (Razorpay) targeting ₹10K MRR.",
    cardSummary: "Found the gap between admiring someone and talking to them, chose Messages Sent Per Day as the North Star, and redesigned onboarding around a 3× retention signal from Mixpanel cohorts. Now at 500+ MAU with zero paid acquisition.",
    tech: ["Next.js", "Supabase", "Gemini 1.5 Flash", "Groq Llama 3.3", "Google OAuth", "Sarvam TTS", "Mixpanel", "Vercel"],
    metrics: "500+ MAU",
    link: "https://ai-spirit.in",
    image: "/ai-spirit.png",
    cardFlow: ["Browse", "Chat", "Remember", "Retain"],
    category: 'build',
    flowType: 'persona',
    problem: "Generic AI chatbots fail at long-term engagement because they lack character consistency and memory. Users crave authentic, persistent relationships, but foundational models inherently drift from their system prompts during extended multi-turn conversations — destroying immersion and user trust.",
    approach: [
      "Applied a formal JTBD framework: identified 10 distinct user jobs, then prioritised the top 4 (personalised advice, spiritual guidance on-demand, motivation via tough-love figures, companionship) as the product's core loop — each with different persona archetypes, session patterns, and conversion triggers.",
      "Set 'Messages Sent Per Day' as the North Star Metric — deliberately chosen because it captures functional value delivery, engagement depth, and retention signal in a single number. Supporting metrics: messages/session > 5, sessions/user/week > 2, unique personas/user > 3.",
      "Designed a prompt architecture with dynamic memory injection via Supabase — long-term context retrieval to maintain persona fidelity. Ran quantified persona-adherence evals, treating character consistency as a KPI iterated like an A/B test variant, not a vibe.",
      "Ran a pre-launch production readiness audit: identified and resolved 6 critical issues (rate limiting, API key rotation, connection pooling, error monitoring via Sentry, performance monitoring, content moderation) before going live.",
      "India-first positioning as a deliberate defensibility strategy: 40 categories include culturally specific personas (Chanakya, Sadhguru, Shah Rukh Khan, Osho) unavailable on Western platforms. Competitive moat: India-first + 350+ personas + emotional engagement categories that Character.AI and Replika don't serve.",
    ],
    keyInsights: [
      "PMF signal identified through data: users who have 5+ conversations with 2+ different personas in their first week are retained at 3x the rate of single-persona users. Redesigned onboarding to expose users to 3+ personas before the end of session 1.",
      "Proactive AI interactions — the AI initiating the conversation on session 2 — lifted D7 retention dramatically. Discovered this mid-build from Mixpanel cohort data; would have designed the onboarding funnel around it from day one.",
      "India-first is not just a positioning choice — it is the moat. Most AI persona platforms are Western-centric; owning culturally resonant personas (Hinglish, Indian business icons, Bollywood, spiritual figures) creates a defensible niche that global incumbents cannot easily replicate.",
    ],
    outcomes: [
      "Grown to 500+ Monthly Active Users (DAU/MAU ~10%) driven by organic retention loops — zero paid acquisition.",
      "350+ personas across 40 categories; maintained consistent persona tone across 50+ turn conversations.",
      "Shipped freemium monetisation (Razorpay ₹249/mo) with OKR target: 3% free → paid conversion, ₹10K MRR.",
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
    reflection: "If I were starting over, I'd ship proactive AI-initiated interactions from week one, not month three. Our Mixpanel data made the impact obvious in retrospect — D7 retention lifted dramatically when the AI sent the first message — but I'd assumed the engagement burden sat with the user. The second thing I'd change: I'd have defined the 'aha' moment explicitly before writing a line of code. Users who experienced a single moment of unexpected-but-consistent character behaviour converted to 30-day actives at far higher rates; I discovered this pattern mid-build instead of designing the onboarding funnel around it from the start. What I'd build next: a creator-side tool that lets users publish their own personas, transforming the platform from a catalogue into a marketplace with network-effect dynamics.",
  },
  {
    title: "AI Credit Intelligence Platform",
    slug: "ai-credit-intelligence-platform",
    date: "Dec 2025",
    image: "/credit-platform.png",
    cardFlow: ["Upload", "Extract", "Research", "Export"],
    cardSummary: "Nine years of writing credit memos located the real bottleneck: extraction, not judgment. A deterministic Python engine does the math, the LLM only writes narrative — cutting CAM preparation from 4–6 hours to under 1.",
    description: "Identified and solved a real enterprise bottleneck: CAM preparation takes analysts 4–6 hours due to manual extraction from annual reports. Scoped the MVP using 9 years of lived experience writing CAMs at Yes Bank and HDFC. Built a two-stage pipeline: a deterministic Python engine (PDFMiner + Screener.in + Yahoo Finance + BSE annual reports) followed by a Karpathy-style autonomous research loop that self-scores its own knowledge completeness (threshold: 85%) before passing structured JSON to the LLM for narrative synthesis.",
    tech: ["Python", "FastAPI", "Next.js 16", "Google Gemini API", "Claude API", "Supabase", "SQLite", "OpenPyXL", "PDFMiner", "GitHub"],
    metrics: "–80% time",
    category: 'build',
    flowType: 'credit',
    problem: "Senior analysts spend 4–6 hours manually scrubbing 100+ page annual reports for data extraction and subjective risk synthesis. This low-leverage bottleneck is prone to human error and restricts the volume of transactions that can be evaluated per analyst per day.",
    approach: [
      "Mapped the end-to-end journey of a credit analyst to identify the exact bottleneck: not judgment (which takes minutes) but mechanical extraction — 40 pages of ratio calculations that Python can do in 4 seconds, and 30 tabs of web research that an AI agent can synthesise in under a minute.",
      "Built a Karpathy-style autonomous research loop: the AI agent searches Screener.in, Yahoo Finance, BSE filings, and open web for promoter pledging, rating downgrades, court cases, and industry headwinds — then self-scores its own knowledge completeness (0–100%) and keeps searching until it reaches an 85% threshold before stopping.",
      "Strict architectural separation: the Python engine handles all deterministic arithmetic (DSCR, D/E, ICR, 12 key ratios) and auto-flags 10 risk patterns (e.g., profits not backed by operating cash flows, surging leverage). The LLM never touches math — it only synthesises narrative from pre-verified structured JSON.",
      "Built per-section confidence scoring (High / Medium / Low) into the output — analysts can see exactly where the AI is uncertain, enabling targeted human review instead of full re-checks.",
      "Shipped dual export formats (Excel via OpenPyXL + PDF) that mirror bank reporting templates exactly. Format familiarity turned out to be the adoption bottleneck — resistance dropped overnight once the output matched what analysts already submitted to credit committees.",
    ],
    keyInsights: [
      "Trust architecture precedes feature architecture in regulated environments. Format familiarity was the actual adoption bottleneck — not accuracy. Analysts didn't need a better AI; they needed AI output in the exact template their credit committee already accepted.",
      "LLMs are poor at deterministic arithmetic but excellent at narrative synthesis. Separating parsing from generation solved 90% of accuracy issues. Per-section confidence scoring gave analysts a clear 'where to review' signal rather than a black box.",
      "Human-in-the-loop is not a compromise — it is the core value proposition in a regulated environment. Analysts wanted to own the final output; AI's job is to produce the draft, not make the decision.",
    ],
    outcomes: [
      "Reduced CAM preparation from 4–6 hours to under 1 hour — an 80%+ time saving per analyst per proposal.",
      "Autonomous research loop surfaces promoter pledging, court cases, and rating downgrades from Screener.in, Yahoo Finance, and BSE filings without manual web searching.",
      "Dual export (Excel + PDF) aligned to bank reporting standards; confidence scoring per section reduces targeted review time further.",
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
    reflection: "The biggest product lesson here was that trust architecture precedes feature architecture. I assumed accuracy would be the adoption bottleneck; it turned out to be format familiarity. The moment we mirrored the exact Excel template that analysts already submitted to credit committees, resistance dropped sharply. I would have run format-discovery interviews in week one rather than week six. The second lesson: human-in-the-loop is not a compromise — it is the core value proposition in regulated environments. Analysts didn't want to delegate decisions to the AI; they wanted the AI to produce the draft so they could own the final output. That's a fundamentally different product contract, and I'd have designed the editing UI around that insight from the start rather than treating it as a late-stage UX polish decision.",
  },
  {
    title: "Automated Job Discovery Agent",
    slug: "automated-job-discovery-agent",
    date: "Jan 2026",
    image: "/job-agent.png",
    cardFlow: ["Scrape", "Score", "Filter", "Deliver"],
    cardSummary: "Two hours of daily portal-browsing became a 5-minute Telegram digest: six portals scraped, every listing scored 0–100 by a local LLM, only matches above a calibrated 65-point threshold delivered. Now live as a multi-user product.",
    description: "Defined the product as a solution to a personal pain point: 2 hours of daily manual searching across fragmented portals. Built a 6-portal scraper (LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs) that runs twice daily via APScheduler, semantically scores each listing 0–100 against a candidate profile using Ollama (Mistral 7B, fully local — zero API cost), and delivers the top matches as a Telegram digest. Database currently holds 7,413 catalogued jobs with deduplication via portal + company + role + location fingerprint.",
    tech: ["Python", "Flask", "Ollama / Mistral 7B", "Selenium", "SQLite", "APScheduler", "Telegram Bot API", "BeautifulSoup"],
    metrics: "2h → 5min daily",
    category: 'build',
    flowType: 'job',
    link: "https://job-search-agent-green.vercel.app",
    problem: "Job hunting is a high-noise, low-signal data problem. Portals are flooded with irrelevant listings, forcing candidates to manually filter hundreds of results daily — an inefficient, demoralising process that scales inversely with the quality of roles available.",
    approach: [
      "Engineered a resilient Selenium + BeautifulSoup scraping pipeline across 6 portals (LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs), each requiring different anti-scrape handling, session management, and pagination logic. Results cached for 12 hours to avoid hammering the same portal twice.",
      "Integrated Ollama running Mistral 7B locally to semantically score job descriptions (0–100) against the candidate profile. Set a 65-point hard threshold: only jobs scoring ≥65 reach the daily digest — jobs below threshold are stored but excluded, keeping signal-to-noise high.",
      "Built anti-duplicate fingerprinting: each job gets a unique hash of portal + company + role + location. Before any save, the system checks if that hash already exists — silently skips duplicates. Result: 7,413 clean, deduplicated jobs in the database.",
      "Designed a push-notification delivery model: top-scored jobs delivered as a Telegram digest daily, flipping search from 'pull' (user browses portals) to 'push' (agent delivers curated shortlist). Zero dashboard login required.",
      "Validated PMF through 3 months of self-use with real job-search volume; then identified the scale blocker — scoring model was calibrated to one profile and broke for others — and redesigned multi-user architecture with Neon Postgres and Vercel Blob.",
    ],
    keyInsights: [
      "Local LLMs (Ollama/Mistral 7B) are a viable architecture for personal automation: zero API cost, fully offline, fast enough for batch scoring, and sufficient reasoning quality for relevance filtering at this signal level.",
      "The core AI value is not generation — it's high-fidelity signal filtering. The 65-point threshold is the product's most important parameter: too low floods the digest with noise; too high misses real opportunities. Calibration is an ongoing product decision, not a one-time config.",
      "Self-use is the fastest path to a first version but the slowest path to a second. Discovering the scoring model broke for other users only after sharing it was a critical design failure — the multi-user rebuild now designs the profile configuration as a conversational onboarding flow, not a JSON file.",
    ],
    outcomes: [
      "100% automation of top-of-funnel job discovery across 6 portals; 7,413 jobs catalogued and deduplicated in the live database.",
      "Surfaces ~10 matched roles daily (from a pool of 200–500 raw listings per run) with hiring manager LinkedIn details via Apollo enrichment.",
      "Reduced daily search time from 2 hours to a 5-minute digest review.",
    ],
    technicalDetails: {
      architecture: "APScheduler triggers the pipeline twice daily. Selenium (headless Chrome) scrapes job listings from six portals — LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs — with BeautifulSoup parsing. Raw listings are stored in SQLite. Ollama (Mistral 7B, running locally) scores each listing against the candidate profile JSON (0–100). Scores at or above the 65-point threshold are formatted into a digest and delivered via Telegram Bot API. A Flask web app provides a settings dashboard and digest history viewer.",
      dataFlow: [
        { step: "APScheduler triggers the scrape twice daily" },
        { step: "Selenium scrapes 6 portals: LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs" },
        { step: "BeautifulSoup parses raw HTML; listings deduplicated and stored in SQLite" },
        { step: "Ollama (Mistral 7B, local) scores each listing 0–100 vs profile" },
        { step: "Jobs scoring ≥65 selected; hiring manager details appended" },
        { step: "Telegram Bot API delivers formatted daily digest to user" },
      ],
    },
    reflection: "Self-use validation is a fast path to shipping but a slow path to scale. My scoring model was calibrated to my own profile and worked well for me and inconsistently for anyone else — a blind spot I only noticed when sharing it. If I were building for multiple users from day one, the first thing I'd redesign is the profile configuration: the current JSON config is too technical and creates a high setup cost that most people won't clear. I'd replace it with a conversational onboarding flow that builds the profile through questions. The second thing I'd add is a feedback loop — when a user applies to or dismisses a suggested role, the relevance model updates its weights. That feedback flywheel is what makes the tool compoundingly more accurate over time, and it's the difference between a personal script and a product with network value. I've since started building the multi-user version with both of these lessons designed in from the start.",
  },
  {
    title: "AI Engineering Field Guide",
    slug: "ai-engineering-field-guide",
    date: "Jun 2026",
    image: "/ai-engineering.png",
    description: "Read Chip Huyen's 535-page 'AI Engineering' (O'Reilly, 2025) cover-to-cover and distilled all 10 chapters into a data-driven companion site — sections, key concepts, terms, takeaways, and cross-chapter connections. Built 29 interactive + descriptive diagrams from a single reusable component, client-side Cmd+K search, and localStorage read-progress. The centrepiece is an 'Ask the book' RAG chatbot: a Vercel serverless function runs TF-IDF lexical retrieval over 1,325 server-side chunks of the full book text, then Gemini 2.0 Flash generates a grounded, chapter-cited answer.",
    tech: ["React 19", "Vite", "Tailwind v4", "TypeScript", "Gemini 2.0 Flash", "TF-IDF RAG", "Vercel", "Framer Motion"],
    metrics: "10 chapters live",
    link: "https://ai-engineering-guide-livid.vercel.app",
    cardFlow: ["Read", "Distill", "Retrieve", "Cite"],
    cardSummary: "A 535-page book turned into a reference product: all 10 chapters distilled into structured data, 29 diagrams from one reusable component, and an 'Ask the book' RAG that answers with chapter citations.",
    category: 'build',
    flowType: 'book',
    problem: "Dense technical books are read once and forgotten. 'AI Engineering' is the canonical text for building on top of foundation models, but 535 pages of linear PDF is hard to revisit, impossible to search semantically, and gives you no way to ask 'where does the book talk about X?'. The knowledge is locked in a format that doesn't match how people actually reference it.",
    approach: [
      "Read the full 535-page book and made an explicit content-vs-template separation: every chapter is pure data (src/data/chapters/ch01–ch10.ts — sections, key concepts, terms, takeaways, connections) and generic UI templates render it. Improving content never touches UI; the structure scales to any book.",
      "Designed one reusable Diagram component with 9 visual types (pipeline, loop, comparison, slider, venn, pyramid, bars, flow, curve) so the 29 diagrams across chapters stay visually consistent and are authored declaratively in each chapter's data — not hand-built per page.",
      "Built the RAG retrieval layer deliberately server-side: 1,325 chunks of full book text live only in api/_book-chunks.json and never enter the client bundle. TF-IDF lexical retrieval runs in a Vercel serverless function, keeping the client light and the source text private.",
      "Grounded every chatbot answer in retrieved chunks and forced chapter citations via Gemini 2.0 Flash — so 'Ask the book' answers from the book, with provenance, rather than hallucinating from the model's general training.",
      "Added zero-friction navigation primitives a reference tool needs: hash-routed deep links (#/chapter/N/section), client-side Cmd+K search, collapsible sidebar, and localStorage read-progress — so returning readers resume exactly where they left off.",
    ],
    keyInsights: [
      "Separating content (data) from presentation (templates) is the highest-leverage architectural decision for a knowledge product. It turned 'improve a chapter' from an engineering task into a data edit, and makes the whole site re-targetable to another book without UI work.",
      "RAG quality is a retrieval problem before it's a generation problem. Forcing chapter citations and grounding strictly in retrieved chunks did more for answer trust than any prompt tuning — users can verify, so they believe.",
      "Keeping the full book corpus server-side (never in the client bundle) is both a respect-the-source decision and a performance one: the client stays tiny while the function holds the heavy text.",
    ],
    outcomes: [
      "All 10 chapters distilled and shipped with 29 interactive/descriptive diagrams from one reusable component.",
      "'Ask the book' answers grounded in 1,325 retrieved chunks with chapter citations — graceful fallback when the API key is absent.",
      "Live and auto-deploying on Vercel (GitHub-connected); Cmd+K search and read-progress make it a genuine reference tool, not a one-time read.",
    ],
    technicalDetails: {
      architecture: "A React 19 + Vite SPA renders chapter data through generic templates and a single reusable Diagram component. Navigation is hash-routed with client-side Cmd+K search and localStorage progress. The 'Ask the book' feature calls a Vercel serverless function (api/chat.ts) that performs TF-IDF lexical retrieval over 1,325 full-text chunks (api/_book-chunks.json, server-side only), then passes the top chunks to Gemini 2.0 Flash to generate a grounded, chapter-cited answer.",
      dataFlow: [
        { step: "Reader asks a question in the 'Ask the book' widget" },
        { step: "Question POSTed to Vercel serverless function api/chat.ts" },
        { step: "TF-IDF retrieves top chunks from 1,325 server-side book chunks" },
        { step: "Retrieved chunks + question assembled into a grounded prompt" },
        { step: "Gemini 2.0 Flash generates an answer with chapter citations" },
        { step: "Answer streamed back to the client with its source chapters" },
      ],
    },
    reflection: "If I were starting over, I'd invest earlier in chunking strategy — TF-IDF lexical retrieval is fast and private but it misses paraphrased questions where the vocabulary doesn't overlap the text; a hybrid with embeddings would lift recall on conceptual queries. I'd also have designed the diagram schema before writing chapter content, not alongside it — a few diagrams had to be reshaped once the component's 9 types stabilised. The biggest validation: the content/template split paid for itself the first time I wanted to revise a chapter and realised it was a one-line data change. The natural next build is letting a reader upload their own PDF and get the same distilled, searchable, ask-anything treatment — turning a single-book companion into a general reading tool.",
  },
  {
    title: "PyQuest — Learn Python by Writing It",
    slug: "pyquest-learn-python-by-writing-it",
    date: "Jul 2026",
    image: "/pyquest.png",
    description: "A gamified Python course where real Python runs in the browser tab — no signup, no install, no backend. Pyodide (CPython compiled to WebAssembly) executes every learner's code client-side, so the first print() works seconds after landing. 20 stages and 56 exercises across 3 tracks (beginner to expert), with XP, level titles, and 'Firewall' checkpoint challenges that gate progression the way a game gates levels. Deployed as a fully static site: zero servers, zero cost per learner, infinitely cacheable.",
    cardSummary: "Learn-to-code sites make you watch; PyQuest makes you type. Real CPython (via Pyodide/WASM) runs in the browser tab itself — 20 stages, 56 exercises, XP and Firewall bosses, zero installs, zero backend, zero cost per learner.",
    tech: ["Python", "Pyodide (WASM)", "Vanilla JS", "CSS", "localStorage", "Vercel"],
    metrics: "56 exercises",
    link: "https://pyquest-one.vercel.app",
    cardFlow: ["Read", "Type", "Run", "Level up"],
    category: 'build',
    flowType: 'python',
    problem: "Most 'learn Python' resources are passive — videos and articles where the learner watches someone else code. The alternatives demand setup (install Python, pick an editor, fight PATH errors) that kills beginners before their first print(). The gap: a zero-friction environment where writing and running real code is the very first interaction, not the reward after an hour of configuration.",
    approach: [
      "Chose Pyodide — CPython compiled to WebAssembly — so learners run genuine Python, not a lookalike interpreter. Error messages, f-strings, generators, decorators: everything behaves exactly as it will on their own machine later.",
      "Shipped the whole product as a static site. No accounts, no server, no database — progress lives in localStorage. That decision makes each additional learner literally free and removes every signup-wall drop-off from the funnel.",
      "Designed progression as a game: XP per exercise, level titles (Hatchling upward), and 'Firewall' boss challenges after each stage that must be passed to advance — spaced retrieval disguised as play.",
      "Structured 20 stages / 56 exercises into 3 tracks so the same product serves a first-day beginner and someone brushing up on classes and generators — sequencing is the curriculum, tracks are the difficulty dial.",
      "Kept the runtime honest about loading: Pyodide is a heavyweight download, so it loads in the background with a visible status ('Python loads with your first lesson') while the learner reads stage one — perceived latency near zero.",
    ],
    keyInsights: [
      "Time-to-first-run is the single conversion metric that matters for a learning tool. Every second between landing and successfully running code is funnel leakage; PyQuest collapses it to one click.",
      "Real toolchains beat simplified ones even for beginners. A fake interpreter teaches a fake language; Pyodide means the error a learner sees in the browser is the same error they'll see in a terminal next month.",
      "Static-site economics change what's worth building: with zero marginal cost per user, a free education product needs no monetisation plan to be sustainable — it only needs to stay cheap.",
    ],
    outcomes: [
      "20 stages, 56 exercises, and 3 tracks live — from first print() to classes, generators, and decorators — all runnable in the browser.",
      "Zero-install, zero-account onboarding: real Python executes seconds after page load, with progress persisted locally.",
      "Fully static deployment on Vercel with GitHub auto-deploy — no servers to run, no per-learner cost.",
    ],
    technicalDetails: {
      architecture: "A fully static site: HTML/CSS/JS served from Vercel's CDN. Pyodide (CPython 3.x compiled to WebAssembly) is lazy-loaded in the background on first visit and cached by the browser. Exercises define expected outputs and assertion checks; learner code executes in the Pyodide runtime sandboxed inside the tab, stdout is captured and compared, and XP/progress state is written to localStorage. No network calls after initial load — the whole course works offline.",
      dataFlow: [
        { step: "Learner opens a stage; exercise prompt and starter code render instantly" },
        { step: "Pyodide (CPython → WASM) finishes lazy-loading in the background" },
        { step: "Learner edits code and hits Run" },
        { step: "Code executes in-tab; stdout and exceptions are captured" },
        { step: "Checker compares output against the exercise's assertions" },
        { step: "Pass: XP awarded, progress saved to localStorage, next node unlocks" },
      ],
    },
    reflection: "The lesson I keep re-learning: distribution constraints are design gifts. Committing to 'no backend, ever' forced every feature through a filter — could it work as static files? — and the product got simpler and faster each time the answer had to be yes. What I'd do differently: instrument earlier. localStorage-only progress means I have no aggregate view of where learners actually quit; even privacy-respecting, aggregate-only telemetry from day one would have told me which of the 56 exercises is the real difficulty cliff. Next: an in-browser 'projects' tier where learners build something multi-file, because exercises teach syntax but projects create programmers.",
  },
  {
    title: "SQLQuest — Real Postgres in the Browser",
    slug: "sqlquest-learn-sql-on-real-postgres",
    date: "Jul 2026",
    image: "/sqlquest.png",
    description: "An interactive SQL course where a full PostgreSQL 18 database boots inside the browser tab via PGlite (Postgres compiled to WebAssembly). 34 stages and 148 exercises take a learner from their first SELECT to window frames, query plans, CTE recursion, and row-level security — every concept typed, run, and answered with real rows from a real engine. No account, no install, no server. Verified by a 204-test suite that runs every exercise against the actual engine before each deploy.",
    cardSummary: "Not a SQL simulator — the real thing: PostgreSQL 18 boots inside the browser tab via PGlite. 34 stages and 148 exercises from SELECT to window frames and query plans, backed by a 204-test suite that runs every exercise against the live engine.",
    tech: ["PostgreSQL 18", "PGlite (WASM)", "JavaScript", "Node test suite", "Vercel", "Web Analytics"],
    metrics: "148 exercises",
    link: "https://sqlquest-nine.vercel.app",
    cardFlow: ["Write SQL", "Run", "Rows back", "Advance"],
    category: 'build',
    flowType: 'sql',
    problem: "SQL tutorials mostly fake it: canned result tables, toy interpreters that accept only the blessed answer, or hosted sandboxes that need signup and still time out. Learners never touch a real engine — so they never see a real query plan, a real NULL surprise, or a real error message — and the skill doesn't transfer to the job.",
    approach: [
      "Built on PGlite — genuine PostgreSQL 18 compiled to WebAssembly — so every lesson runs against the same engine learners will use at work. NULL three-valued logic, window frames, EXPLAIN plans: all real, because the database is.",
      "Scoped an ambitious curriculum deliberately: 34 stages / 148 exercises across Foundations, Aggregation & Joins, and Composition tiers — going far past most courses into materialized views, recursion, query plans, and row-level security.",
      "Treated the exercises themselves as a tested product surface: a 204-test suite executes every exercise's setup, solution, and checker against the actual engine, so a curriculum edit can't silently break a lesson. All 204 green before any deploy.",
      "Designed the 'Green Bar' identity around the phosphor-terminal heritage of databases — stark type, terminal green, tabular rows — so the product looks like the discipline it teaches.",
      "Made reach a feature: mobile-friendly layout, accessible tabs with aria-live result announcements, and a no-account model — the whole course is one URL away on any device.",
    ],
    keyInsights: [
      "Authenticity is a moat in education products. 'Real Postgres in your tab' is a one-line pitch no canned-results competitor can copy without rebuilding on WASM — the engine choice is the differentiation.",
      "Curriculum is code: once every exercise runs in CI against the real engine, content quality stops being an editorial hope and becomes a build gate. The 204-test suite caught breakages no human proofread would.",
      "The checker design shapes learning more than the lesson text. Comparing result rows (not query strings) means any correct SQL passes — learners are free to find their own path to the answer, which is how confidence actually forms.",
    ],
    outcomes: [
      "34 stages and 148 exercises live — from first SELECT through window functions, CTE recursion, EXPLAIN, and row-level security — on real PostgreSQL 18.",
      "204-test suite green across every exercise; content changes are gated by tests against the live engine before deploy.",
      "Zero-account, mobile-friendly, screen-reader-accessible product live on Vercel with Web Analytics measuring real usage.",
    ],
    technicalDetails: {
      architecture: "A static site that boots PGlite — PostgreSQL 18 compiled to WebAssembly — inside the browser tab on demand. Each stage ships declarative exercise data: seed SQL, prompt, and a row-level checker. The learner's query runs against the in-tab Postgres instance; result rows are rendered and compared to the expected relation (order-insensitive where appropriate), so any semantically correct query passes. A Node test suite (204 tests) replays every exercise against the same engine in CI. Progress persists locally; Vercel serves the static bundle with cache-busted assets and Web Analytics.",
      dataFlow: [
        { step: "Learner opens SQLQuest; static bundle loads from Vercel CDN" },
        { step: "PGlite boots PostgreSQL 18 in the tab; stage seed SQL creates tables" },
        { step: "Learner writes a query and runs it" },
        { step: "Real Postgres executes it; rows (or the real error) come back" },
        { step: "Checker compares result rows to the expected relation" },
        { step: "Pass: XP awarded, progress stored, next stage unlocks" },
      ],
    },
    reflection: "SQLQuest confirmed a thesis PyQuest suggested: the WASM-ization of real engines is a product unlock for education, not just an engineering trick — the moment the real tool runs client-side, the whole cost-and-friction structure of teaching it collapses. What I'd do differently: I'd design the checker contract before writing a single exercise. Retrofitting row-comparison semantics (ordering, NULLs, float tolerance) across early exercises cost more than building the 148 exercises themselves. And I'd ship the test suite from exercise one — the 204 tests transformed content editing from nervous to fearless, which is precisely when curriculum quality started compounding. Next: a shared-dataset capstone tier where learners answer open analytical questions instead of guided exercises.",
  }
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

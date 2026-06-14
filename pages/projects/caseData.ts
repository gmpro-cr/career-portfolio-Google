/* ═══════════════════════════════════════════════════════════════
   Shared case-study data + types for the bespoke project pages.
   ═══════════════════════════════════════════════════════════════ */
import type { Project, ProjectTheme } from '../../types';

export interface JourneyStep { phase: string; action: string; emotion: string }
export interface CompetitorRow { feature: string; values: (boolean | string)[] }
export interface MetricCard { value: string; label: string; sub: string }
export interface RoadmapPhase { phase: string; status: 'shipped' | 'building' | 'planned'; quarter?: string; items: string[] }
export interface ArchLayer { label: string; color: string; bg: string; nodes: string[] }

export interface ProjectExtra {
  journey: JourneyStep[];
  competitors: { columns: string[]; rows: CompetitorRow[] };
  metrics: MetricCard[];
  problemStatement: string;
  discovery: string;
  userPersona: { name: string; role: string; painPoint: string };
  pmInsight: string;
  roadmap: RoadmapPhase[];
  architecture: ArchLayer[];
}

export interface CaseProps {
  project: Project;
  extras: ProjectExtra;
  theme: ProjectTheme;
}

export const PROJECT_EXTRAS: Record<string, ProjectExtra> = {

  'ai-persona-interaction-platform': {
    problemStatement: 'Generic AI chatbots fail at long-term engagement because they lack character consistency and memory. Users crave authentic, persistent relationships with figures they admire — but foundational models drift from their system prompts during extended conversations, destroying immersion and user trust.',

    discovery: "While building side projects I kept watching people switch between ChatGPT and YouTube — trying to \"talk to\" Elon, Naval, or Sadhguru. ChatGPT answered as itself. YouTube was one-way. The parasocial relationship — feeling close to someone you'll never actually meet — was deeply real. But there was no product that closed the loop from admiration to actual dialogue. That gap was the product.",

    userPersona: {
      name: 'Priya, 28 · Marketing Manager, Mumbai',
      role: 'Primary user archetype identified through user interviews',
      painPoint: '"I\'ve watched every Elon Musk interview. I follow Naval on Twitter. But I can\'t actually ask them about my specific situation — whether to leave my stable job for a startup. I just want 20 minutes with someone whose thinking I trust."',
    },

    journey: [
      { phase: 'Discover',  action: 'Browses 350+ curated AI personas by category — Business, Spirituality, Entertainment, Fitness',    emotion: 'Curious'    },
      { phase: 'Onboard',   action: 'Starts first conversation with chosen persona. Guest mode — zero friction, no signup required',      emotion: 'Cautious'   },
      { phase: 'Engage',    action: 'AI recalls context from earlier in the conversation. First moment of unexpected-but-consistent character', emotion: 'Surprised'  },
      { phase: 'Habit',     action: 'Persona initiates a check-in next session — "Last time you were thinking about the startup…"',    emotion: 'Attached'   },
      { phase: 'Convert',   action: 'Upgrades to premium (Razorpay ₹199/mo) for unlimited conversations and exclusive personas',        emotion: 'Loyal'      },
    ],

    pmInsight: "North Star Metric: Messages Sent Per Day — deliberately chosen because it captures functional value delivery, engagement depth, and retention in a single number. PMF signal identified through Mixpanel cohort data: users who have 5+ conversations with 2+ different personas in their first week are retained at 3x the D30 rate of single-persona users. That insight drove a full onboarding redesign to expose users to 3+ personas before the end of session 1. The second unlock: when the AI initiates the conversation on session 2 rather than waiting for the user — D7 retention lifted significantly. Both discoveries came from data, mid-build, when I should have designed for them from day one.",

    roadmap: [
      { phase: 'Foundation',  status: 'shipped', quarter: 'Oct 2025', items: ['350+ curated personas across 6 categories', 'Guest mode — no signup required', 'Google OAuth (2 clicks to start)', 'Gemini 1.5 Flash + Groq Llama 3.3 LLM router', 'Mobile-responsive UI', 'Freemium paywall (Razorpay)'] },
      { phase: 'Engagement',  status: 'shipped', quarter: 'Nov 2025', items: ['Sarvam TTS voice synthesis', 'Cross-session memory via Supabase', 'Real-time news injection (all personas aware of today\'s date + headlines)', 'Custom persona creation', 'Mixpanel analytics + A/B testing on onboarding'] },
      { phase: 'Monetisation', status: 'building', quarter: 'Q2 2026', items: ['Tiered subscriptions (₹199/₹499/mo)', 'Exclusive premium personas', 'Conversation history + search', 'Persona recommendations by mood'] },
      { phase: 'Scale', status: 'planned', quarter: 'Q4 2026', items: ['Creator persona marketplace', 'Persona debates (multi-AI conversation)', 'iOS + Android apps', '100+ Hindi/regional language personas', 'Enterprise white-label licensing'] },
    ],

    architecture: [
      { label: 'Frontend',    color: '#3B82F6', bg: '#EFF6FF', nodes: ['Next.js on Vercel', 'Tailwind CSS', 'Chat UI', 'Persona Browser', 'Auth (Google OAuth)'] },
      { label: 'API Layer',   color: '#8B5CF6', bg: '#F5F3FF', nodes: ['Next.js API Routes', 'LLM Router', 'Persona Eval (drift scorer)', 'Rate Limiter', 'Sarvam TTS'] },
      { label: 'AI Engine',   color: '#10B981', bg: '#ECFDF5', nodes: ['Gemini 1.5 Flash (speed)', 'Groq Llama 3.3 70B (depth)', 'Real-time news context', 'Persona system prompts'] },
      { label: 'Data Layer',  color: '#F97316', bg: '#FFF7ED', nodes: ['Supabase Postgres', 'Conversation memory chunks', 'Persona library (350+)', 'User state + billing'] },
    ],

    competitors: {
      columns: ['AI Spirit', 'Character.AI', 'Replika', 'Crushon.AI'],
      rows: [
        { feature: 'Persistent cross-session memory',          values: [true,  false, true,  false] },
        { feature: '370+ distinct curated personas',           values: [true,  true,  false, false] },
        { feature: 'India-first personas (Hinglish, Indian icons)', values: [true, false, false, false] },
        { feature: 'Voice synthesis (Sarvam TTS)',             values: [true,  false, true,  false] },
        { feature: 'Quantified persona fidelity evals',        values: [true,  false, false, false] },
        { feature: 'Real-time news awareness',                 values: [true,  false, false, false] },
        { feature: 'Custom persona creation',                  values: [true,  true,  false, false] },
        { feature: 'Proactive AI-initiated messages',          values: [true,  false, true,  false] },
        { feature: 'India payment integration (Razorpay)',     values: [true,  false, false, false] },
      ],
    },

    metrics: [
      { value: '500+', label: 'Monthly Active Users',      sub: 'Organic — zero paid acquisition; DAU/MAU ~10%' },
      { value: '3×',   label: 'D7 retention lift',         sub: 'When AI initiates message on session 2 vs waiting' },
      { value: '370+', label: 'Curated AI personas',       sub: '40 categories — Business · Spiritual · Entertainment · Companion · Anime' },
      { value: '5',    label: 'User segments mapped',      sub: 'Priya (career) · Arjun (self-improvement) · Sneha (spiritual) · Rohan (entertainment) · Meera (companion)' },
    ],
  },

  'ai-credit-intelligence-platform': {
    problemStatement: 'Senior credit analysts spend 4–6 hours manually scrubbing 100+ page annual reports for data extraction and subjective risk synthesis. This low-leverage bottleneck is prone to human error and restricts the volume of transactions that can be evaluated per analyst per day — every hour spent extracting is an hour not spent thinking.',

    discovery: "After 9 years writing Credit Appraisal Memorandums at Yes Bank and HDFC, I knew exactly where the 4–6 hours went: not in judgment, but in extraction. Forty pages of ratio calculations that Python could do in 4 seconds. Thirty tabs of company research that an AI agent could synthesise in a minute. The bottleneck wasn't intelligence — it was mechanical labour. That was the product.",

    userPersona: {
      name: 'Rahul, 34 · Credit Analyst, Mid-Size Private Bank',
      role: 'Primary user — relationship managers and credit underwriters in commercial banks',
      painPoint: '"I spend the first 4 hours of every proposal just extracting numbers from the annual report. By the time I start the actual analysis, my attention is shot. I want to spend my time on judgment, not on copy-paste from PDFs."',
    },

    journey: [
      { phase: 'Upload',     action: 'Analyst uploads borrower\'s annual report PDF (100+ pages). System immediately starts extraction — no configuration required', emotion: 'Hopeful'     },
      { phase: 'Extract',    action: 'Python engine auto-parses P&L, Balance Sheet, Cash Flow, and 12 key ratios (DSCR, D/E, ICR). Red flags auto-flagged', emotion: 'Watching'    },
      { phase: 'Research',   action: 'Karpathy-style AI agent searches the web: promoter pledging, rating downgrades, court cases, industry headwinds', emotion: 'Impressed'   },
      { phase: 'Synthesise', action: 'Gemini API generates full 8-section CAM narrative. Claude API cross-validates and flags inconsistencies', emotion: 'Reviewing'   },
      { phase: 'Edit',       action: 'Analyst reviews AI draft in HITL editor. Adjusts commentary, locks reviewed sections', emotion: 'In control'  },
      { phase: 'Export',     action: 'Downloads bank-format Excel (OpenPyXL) + PDF in one click. Matches committee templates exactly', emotion: 'Confident'   },
    ],

    pmInsight: "Trust architecture precedes feature architecture in regulated environments. My first assumption was that accuracy would be the adoption bottleneck. It wasn't — format familiarity was. The moment we mirrored the exact Excel template analysts already submitted to credit committees, resistance dropped overnight. Second: the Karpathy-style research loop with self-scoring (stops at 85% knowledge completeness) was a PM decision as much as a technical one — it meant the AI never delivered a shallow summary when more data was findable, without running forever. Third: per-section confidence scoring (High/Medium/Low) transformed the HITL editor from a 'check everything' workflow to a 'review the uncertain sections' workflow — drastically cutting review time.",

    roadmap: [
      { phase: 'Core Engine', status: 'shipped', quarter: 'Dec 2025', items: ['PDF upload + PDFMiner extraction', 'Auto financial ratio calculation (DSCR, D/E, ICR)', '8-section CAM generation via Gemini API', 'Risk flag auto-detection (10 flags)', 'Basic HITL editing UI'] },
      { phase: 'Enterprise Polish', status: 'shipped', quarter: 'Jan 2026', items: ['Claude API cross-validation layer', 'Excel export (OpenPyXL) — bank template format', 'PDF export', 'Karpathy autonomous web research loop', 'Confidence scoring per section (High/Medium/Low)'] },
      { phase: 'Collaboration', status: 'building', quarter: 'Q2 2026', items: ['Version history (save + diff snapshots)', 'Section locking after reviewer sign-off', 'Excel/CMA file upload (in addition to PDF)', 'Multi-user team accounts', 'Screener.in direct integration'] },
      { phase: 'Platform', status: 'planned', quarter: 'Q4 2026', items: ['Bank-wide API access', 'Custom CAM template configuration per institution', 'Audit trail + compliance logging', 'Automated early warning monitoring', 'Integration with CBS (core banking)'] },
    ],

    architecture: [
      { label: 'Frontend',    color: '#3B82F6', bg: '#EFF6FF', nodes: ['Next.js 16 on Vercel', 'shadcn/ui + Radix', 'HITL Editor (CamNoteEditor)', 'Section locking UI', 'Export controls'] },
      { label: 'API Server',  color: '#8B5CF6', bg: '#F5F3FF', nodes: ['Express 5 (TypeScript)', 'Cases CRUD (Supabase)', 'Proxies to Python engine', 'Auth middleware', 'Version history'] },
      { label: 'AI Engine',   color: '#10B981', bg: '#ECFDF5', nodes: ['FastAPI (Python 3.13)', 'PDFMiner extraction', 'Rule-based ratio parser', 'Karpathy research loop', 'Gemini API · Claude API (cross-validation)'] },
      { label: 'Data Layer',  color: '#F97316', bg: '#FFF7ED', nodes: ['Supabase Postgres', 'SQLite (local dev)', 'Screener.in · Yahoo Finance · BSE filings', 'OpenPyXL (Excel)', 'PDF renderer'] },
    ],

    competitors: {
      columns: ['CreditGuard AI', 'Manual Process', 'Generic LLM (ChatGPT)', 'Legacy Tools'],
      rows: [
        { feature: 'CAM preparation time',                   values: ['< 1 hour',  '4–6 hours', '1–2 hours',  '2–3 hours'] },
        { feature: 'Bank-format Excel output',               values: [true,         true,         false,         false] },
        { feature: 'Screener.in + Yahoo Finance + BSE data', values: [true,         false,        false,         'Partial'] },
        { feature: 'Deterministic math (no hallucinations)', values: [true,         true,         false,         true] },
        { feature: 'Autonomous web research (self-scoring)', values: [true,         false,        false,         false] },
        { feature: '10 auto-detected risk flags',            values: [true,         false,        false,         false] },
        { feature: 'Human-in-the-loop editor',               values: [true,         true,         false,         false] },
        { feature: 'Per-section confidence scoring',         values: [true,         false,        false,         false] },
      ],
    },

    metrics: [
      { value: '–80%', label: 'CAM prep time',          sub: '4–6 hours reduced to under 1 hour per analyst per proposal' },
      { value: '10',   label: 'Auto-detected risk flags', sub: 'e.g. profits not backed by operating cash flow, surging leverage' },
      { value: '85%',  label: 'Research completeness threshold', sub: 'AI self-scores and keeps searching until it hits this bar' },
      { value: '3',    label: 'Confidence levels per section', sub: 'High / Medium / Low — analysts review uncertain sections only' },
    ],
  },

  'automated-job-discovery-agent': {
    problemStatement: 'Job hunting is a high-noise, low-signal data problem. Portals are flooded with irrelevant listings — "Senior Product Manager" roles that are actually customer support, or Bangalore jobs that are listed in Mumbai. Manual filtering consumes 2+ hours every morning with no compounding value.',

    discovery: "I was spending 2 hours every morning clicking through Naukri and LinkedIn. Same irrelevant listings, same filters, same frustration. I built a Python script to automate the scraping. Then added scoring via Ollama. Then a Telegram notification so I wouldn't even need to check a dashboard. Three weeks later I had a product. The pivot to multi-user came when 5 friends asked for the same thing — that's when I knew it wasn't just a personal script.",

    userPersona: {
      name: 'Gaurav (self-use → validated with 5 peers)',
      role: 'AI PM candidates transitioning from traditional finance/operations to product roles',
      painPoint: '"I apply to 10 jobs a day but 7 of them aren\'t really right for me — I only realise after reading 3 paragraphs in. I need someone to do the filtering before it reaches me, not after."',
    },

    journey: [
      { phase: 'Configure',  action: 'Sets candidate profile: target roles, preferred companies, locations, and must-have skills via web dashboard', emotion: 'Optimistic'  },
      { phase: 'Schedule',   action: 'Agent runs via GitHub Actions cron twice daily. No server running 24/7 — zero infrastructure cost', emotion: 'Hands-off'   },
      { phase: 'Scrape',     action: 'Selenium scrapes LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs — 6 portals in parallel. Anti-scrape handling included', emotion: 'Automated'   },
      { phase: 'Score',      action: 'Ollama (Mistral 7B, running locally) semantic-scores each listing 0–100 against the candidate profile. Apollo Enricher appends hiring manager details', emotion: 'Filtered'    },
      { phase: 'Deliver',    action: 'Telegram digest arrives: top 10 roles with score, match reasoning, and hiring manager LinkedIn. 5-minute review vs 2-hour browse', emotion: 'Delighted'   },
    ],

    pmInsight: "The 65-point relevance threshold is the product's most important parameter — and it is a product decision, not a config setting. Too low and the digest is noise. Too high and real opportunities are missed. I calibrated it empirically over 3 months of self-use with 7,413 catalogued jobs as ground truth. The second insight: self-use is the fastest path to a first version but the slowest path to a second. My scoring model was perfectly calibrated to my profile and broke for others. The multi-user rewrite taught me: conversational onboarding (ask questions, build the profile) beats a JSON config file that most people won't fill out correctly. The feedback flywheel — when a user applies to or dismisses a role, the relevance model updates its weights — is what separates a personal script from a product with compounding accuracy. Both are now designed into the current rebuild.",

    roadmap: [
      { phase: 'Personal Agent', status: 'shipped', quarter: 'Jan 2026', items: ['6-portal scraper (LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs)', 'Ollama Mistral 7B local scoring (0–100)', 'Telegram daily digest', 'Flask web dashboard + settings', 'APScheduler daily cron', 'SQLite local database'] },
      { phase: 'Multi-User SaaS', status: 'shipped', quarter: 'Feb 2026', items: ['Google OAuth multi-user login', 'Neon Postgres (user-scoped data)', 'Vercel Blob (digests + PRDs per user)', 'GitHub Actions cron (no server needed)', 'Vercel deployment (production URL live)', 'Apollo Enricher for hiring manager details'] },
      { phase: 'Smart Filtering', status: 'building', quarter: 'Q2 2026', items: ['Conversational onboarding (replaces JSON config)', 'Apply/dismiss feedback loop (model updates weights)', 'PRD generator for applied roles', 'Hiring manager outreach drafts via AI'] },
      { phase: 'Distribution', status: 'planned', quarter: 'Q3 2026', items: ['One-click Fly.io deploy button', 'Freemium model (₹499/mo unlimited)', 'Stripe payments', 'Resume-to-profile auto-import', 'Community scoring model (shared learnings)'] },
    ],

    architecture: [
      { label: 'Trigger',     color: '#F43F5E', bg: '#FFF1F2', nodes: ['GitHub Actions cron (2×/day)', 'APScheduler (local)', 'Manual run via Flask dashboard'] },
      { label: 'Scraping',    color: '#F59E0B', bg: '#FFFBEB', nodes: ['Selenium + headless Chrome', 'BeautifulSoup HTML parser', 'LinkedIn · Naukri · Indeed · HiringCafe · Wellfound · IIMJobs'] },
      { label: 'AI Layer',    color: '#8B5CF6', bg: '#F5F3FF', nodes: ['Ollama Mistral 7B (local scoring)', 'Apollo Enricher (hiring manager data)', 'PRD Generator (AI-written role briefs)'] },
      { label: 'Data',        color: '#F97316', bg: '#FFF7ED', nodes: ['Neon Postgres (cloud, per-user)', 'SQLite (local dev)', 'Vercel Blob (digests, PRDs)', 'User preferences JSON'] },
      { label: 'Delivery',    color: '#10B981', bg: '#ECFDF5', nodes: ['Telegram Bot API (daily digest)', 'Flask web dashboard (settings, history)', 'Email notifier (Resend)', 'Vercel serverless (production)'] },
    ],

    competitors: {
      columns: ['Job Agent', 'Manual Search', 'Naukri Alerts', 'LinkedIn EasyApply'],
      rows: [
        { feature: 'Daily active search time',                   values: ['5 min',  '2 hours', '30 min', '45 min'] },
        { feature: 'AI semantic scoring (0–100, ≥65 threshold)', values: [true,     false,     false,    false] },
        { feature: 'Multi-portal coverage (6 portals)',          values: [true,     false,     true,     false] },
        { feature: 'Deduplication (fingerprint-based)',          values: [true,     false,     false,    false] },
        { feature: 'Hiring manager details (Apollo enrichment)', values: [true,     false,     false,    false] },
        { feature: 'Push notification (Telegram)',               values: [true,     false,     true,     false] },
        { feature: 'Zero manual browsing needed',                values: [true,     false,     false,    false] },
        { feature: 'Feedback loop (apply → model learns)',       values: [true,     false,     false,    false] },
      ],
    },

    metrics: [
      { value: '7,413', label: 'Jobs catalogued',       sub: 'Deduplicated via portal + company + role + location fingerprint' },
      { value: '65',    label: 'Relevance threshold',   sub: 'Jobs scoring ≥65 reach the digest; below threshold stored but excluded' },
      { value: '~10',   label: 'Matched roles per day', sub: 'From 200–500 raw listings per run; with hiring manager details' },
      { value: '–2h',   label: 'Daily time saved',      sub: 'From 2-hour manual browse to 5-minute digest review' },
    ],
  },

  'ai-engineering-field-guide': {
    problemStatement: 'Dense technical books are read once and forgotten. "AI Engineering" is the canonical text for building on foundation models — but 535 pages of linear PDF is impossible to search semantically and gives you no way to ask "where does the book cover X?". The knowledge is locked in a format that does not match how people actually reference it.',

    discovery: "I read \"AI Engineering\" cover-to-cover while building my own LLM products and kept flipping back to find the one paragraph on evals, or RAG chunking, or inference optimisation. The PDF couldn't help me — no search that understood meaning, no deep links, no way to ask it a question. I realised the most useful thing wasn't a summary; it was making the book itself queryable and navigable. That gap — between owning the knowledge and being able to reach it on demand — was the product.",

    userPersona: {
      name: 'AI builders & PMs learning to ship on foundation models',
      role: 'Engineers, AI PMs, and founders using the book as an ongoing reference, not a one-time read',
      painPoint: '"I read the book months ago. Now I\'m building a RAG system and I know the answer is in there somewhere — but I don\'t want to re-skim 80 pages to find the chunking trade-offs. I want to ask the book and get the answer with the chapter it came from."',
    },

    journey: [
      { phase: 'Land',     action: 'Arrives at the field guide — a reading map of all 10 chapters with an overview of what each covers', emotion: 'Oriented'  },
      { phase: 'Explore',  action: 'Opens a chapter: sections, key concepts, terms, and interactive diagrams render from structured data', emotion: 'Engaged'   },
      { phase: 'Search',   action: 'Hits Cmd+K to jump straight to a concept across all chapters — client-side, instant', emotion: 'In flow'   },
      { phase: 'Ask',      action: '"Ask the book" — types a real question; RAG retrieves relevant chunks and answers with chapter citations', emotion: 'Trusting'  },
      { phase: 'Return',   action: 'Comes back days later; localStorage read-progress resumes exactly where they left off', emotion: 'Hooked'    },
    ],

    pmInsight: "The defining product decision was treating this as a reference tool, not a summary. A summary is read once; a reference is returned to — so I optimised for retrieval, not for prose. That drove three choices: (1) content as pure data so any chapter is a one-line edit and the whole site re-targets to another book for free; (2) RAG answers grounded strictly in retrieved chunks with forced chapter citations, because verifiability is what makes a reader trust an AI answer over re-reading the source; (3) full book text kept server-side only, so the client stays tiny and the source stays private. Retrieval quality — not generation — is where trust is won or lost.",

    roadmap: [
      { phase: 'Content Engine', status: 'shipped', quarter: 'Jun 2026', items: ['Full 535-page book read + distilled', 'All 10 chapters as structured data', 'Reusable Diagram component (9 types)', '29 interactive + descriptive diagrams', 'Overview + reading map'] },
      { phase: 'Reference Tooling', status: 'shipped', quarter: 'Jun 2026', items: ['Hash-routed deep links (#/chapter/N/section)', 'Client-side Cmd+K search', 'localStorage read-progress', 'Collapsible desktop sidebar', 'Editorial design (Fraunces + Geist)'] },
      { phase: 'Ask the Book (RAG)', status: 'shipped', quarter: 'Jun 2026', items: ['1,325 server-side book chunks', 'TF-IDF lexical retrieval (Vercel function)', 'Gemini 2.0 Flash grounded generation', 'Chapter citations on every answer', 'Graceful fallback without API key'] },
      { phase: 'General Reading Tool', status: 'planned', quarter: 'Q4 2026', items: ['Hybrid retrieval (embeddings + TF-IDF)', 'Upload-your-own-PDF support', 'Per-reader highlights + notes', 'Multi-book library', 'Shareable answer links'] },
    ],

    architecture: [
      { label: 'Frontend',   color: '#3B82F6', bg: '#EFF6FF', nodes: ['React 19 + Vite SPA', 'Hash routing + deep links', 'Cmd+K search', 'Diagram component (9 types)', 'localStorage progress'] },
      { label: 'Content',    color: '#0EA5E9', bg: '#F0F9FF', nodes: ['ch01–ch10.ts (structured data)', 'book.ts (overview / map)', 'Generic render templates', 'Declarative diagram data'] },
      { label: 'RAG API',    color: '#6366F1', bg: '#EEF2FF', nodes: ['Vercel serverless (api/chat.ts)', 'TF-IDF lexical retrieval', 'Gemini 2.0 Flash', 'Chapter-cited answers'] },
      { label: 'Data',       color: '#64748B', bg: '#F8FAFC', nodes: ['_book-chunks.json (1,325 chunks)', 'Server-side only (never bundled)', 'GEMINI_API_KEY env', 'Vercel auto-deploy'] },
    ],

    competitors: {
      columns: ['Field Guide', 'Raw PDF', 'ChatGPT + paste', 'Generic notes app'],
      rows: [
        { feature: 'Semantic "ask the book" with citations',  values: [true,  false, 'Partial', false] },
        { feature: 'Grounded in the actual book text',         values: [true,  true,  false,    false] },
        { feature: 'Interactive diagrams per concept',         values: [true,  false, false,    false] },
        { feature: 'Cmd+K cross-chapter search',               values: [true,  'Partial', false, true] },
        { feature: 'Deep-linkable sections',                   values: [true,  false, false,    'Partial'] },
        { feature: 'Read-progress that resumes',               values: [true,  false, false,    false] },
        { feature: 'Source text kept private (server-side)',   values: [true,  true,  false,    true] },
        { feature: 'Re-targetable to any book (data-driven)',  values: [true,  false, false,    false] },
      ],
    },

    metrics: [
      { value: '10',     label: 'Chapters distilled',     sub: 'Full 535-page book read cover-to-cover, then structured into data' },
      { value: '29',     label: 'Interactive diagrams',   sub: 'From one reusable component with 9 visual types' },
      { value: '1,325',  label: 'RAG book chunks',        sub: 'Server-side only — never shipped in the client bundle' },
      { value: '100%',   label: 'Answers cited',          sub: 'Every "Ask the book" response grounded with its source chapter' },
    ],
  },
};

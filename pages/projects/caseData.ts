/* ═══════════════════════════════════════════════════════════════
   Shared case-study data + types for the bespoke project pages.
   ═══════════════════════════════════════════════════════════════ */
import type { Project, ProjectTheme } from '../../types';

export interface JourneyStep { phase: string; action: string; emotion: string }
export interface CompetitorRow { feature: string; values: (boolean | string)[] }
export interface MetricCard { value: string; label: string; sub: string }
export interface RoadmapPhase { phase: string; status: 'shipped' | 'building' | 'planned'; quarter?: string; items: string[] }
export interface ArchLayer { label: string; color: string; bg: string; nodes: string[] }

export interface CaseTitle { lead: string; italic: string }

export interface ProjectExtra {
  /** Per-case section headlines so the four cases don't share one template voice */
  outcomesTitle: CaseTitle;
  roadmapTitle: CaseTitle;
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
    outcomesTitle: { lead: 'What 500 users', italic: 'taught the product.' },
    roadmapTitle: { lead: 'From catalogue', italic: 'to marketplace.' },
    problemStatement: 'Generic AI chatbots fail at long-term engagement because they lack character consistency and memory. Users crave authentic, persistent relationships with figures they admire — but foundational models drift from their system prompts during extended conversations, destroying immersion and user trust.',

    discovery: "While building side projects I kept watching people switch between ChatGPT and YouTube — trying to \"talk to\" Elon, Naval, or Sadhguru. ChatGPT answered as itself. YouTube was one-way. The parasocial relationship — feeling close to someone you'll never actually meet — was deeply real. But there was no product that closed the loop from admiration to actual dialogue. That gap was the product.",

    userPersona: {
      name: 'Priya, 28 · Marketing Manager, Mumbai',
      role: 'Primary user archetype from early-user conversations and Mixpanel cohorts',
      painPoint: '"I\'ve watched every Elon Musk interview. I follow Naval on Twitter. But I can\'t actually ask them about my specific situation — whether to leave my stable job for a startup. I just want 20 minutes with someone whose thinking I trust."',
    },

    journey: [
      { phase: 'Discover',  action: 'Browses 350+ curated AI personas by category — Business, Spirituality, Entertainment, Fitness',    emotion: 'Curious'    },
      { phase: 'Onboard',   action: 'Starts first conversation with chosen persona. Guest mode — zero friction, no signup required',      emotion: 'Cautious'   },
      { phase: 'Engage',    action: 'AI recalls context from earlier in the conversation. First moment of unexpected-but-consistent character', emotion: 'Surprised'  },
      { phase: 'Habit',     action: 'Persona initiates a check-in next session — "Last time you were thinking about the startup…"',    emotion: 'Attached'   },
      { phase: 'Convert',   action: 'Upgrades to premium (Razorpay ₹249/mo) for unlimited conversations and exclusive personas',        emotion: 'Loyal'      },
    ],

    pmInsight: "North Star Metric: Messages Sent Per Day — deliberately chosen because it captures functional value delivery, engagement depth, and retention in a single number. PMF signal identified through Mixpanel cohort data: users who have 5+ conversations with 2+ different personas in their first week are retained at 3x the D30 rate of single-persona users. That insight drove a full onboarding redesign to expose users to 3+ personas before the end of session 1. The second unlock: when the AI initiates the conversation on session 2 rather than waiting for the user — D7 retention lifted significantly. Both discoveries came from data, mid-build, when I should have designed for them from day one.",

    roadmap: [
      { phase: 'Foundation',  status: 'shipped', quarter: 'Oct 2025', items: ['350+ curated personas across 6 launch categories (now 40)', 'Guest mode — no signup required', 'Google OAuth (2 clicks to start)', 'Gemini 1.5 Flash + Groq Llama 3.3 LLM router', 'Mobile-responsive UI', 'Freemium paywall (Razorpay)'] },
      { phase: 'Engagement',  status: 'shipped', quarter: 'Nov 2025', items: ['Sarvam TTS voice synthesis', 'Cross-session memory via Supabase', 'Real-time news injection (all personas aware of today\'s date + headlines)', 'Custom persona creation', 'Mixpanel analytics + A/B testing on onboarding'] },
      { phase: 'Monetisation', status: 'building', quarter: 'Q2 2026', items: ['Premium tier live at ₹249/mo; annual + higher tiers next', 'Exclusive premium personas', 'Conversation history + search', 'Persona recommendations by mood'] },
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
        { feature: '350+ distinct curated personas',           values: [true,  true,  false, false] },
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
      { value: '350+', label: 'Curated AI personas',       sub: '40 categories — Business · Spiritual · Entertainment · Companion · Anime' },
      { value: '5',    label: 'User segments mapped',      sub: 'Priya (career) · Arjun (self-improvement) · Sneha (spiritual) · Rohan (entertainment) · Meera (companion)' },
    ],
  },

  'ai-credit-intelligence-platform': {
    outcomesTitle: { lead: 'Hours returned', italic: 'to judgment.' },
    roadmapTitle: { lead: 'From one analyst', italic: 'to a platform.' },
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
    outcomesTitle: { lead: 'The search that', italic: 'runs itself.' },
    roadmapTitle: { lead: 'From personal script', italic: 'to product.' },
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
    outcomesTitle: { lead: 'A book you', italic: 'can ask.' },
    roadmapTitle: { lead: 'From one book', italic: 'to any book.' },
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

  'pyquest-learn-python-by-writing-it': {
    outcomesTitle: { lead: 'Type first,', italic: 'install never.' },
    roadmapTitle: { lead: 'From exercises', italic: 'to programmers.' },
    problemStatement: 'Most "learn Python" resources are passive — videos where the learner watches someone else code — and the active alternatives demand an install-and-configure gauntlet that kills beginners before their first print(). The missing product: an environment where writing and running real code is the very first interaction, not the reward after an hour of setup.',

    discovery: "Watching friends try to start Python, the pattern was identical: enthusiasm, then a wall of installers, PATH errors, and editor choices — and most never wrote a line. The insight wasn't that people need better lessons; it's that the first ten minutes decide everything. When I found Pyodide could run genuine CPython inside a browser tab, the product became obvious: collapse time-to-first-run to a single click, then keep people typing with game mechanics.",

    userPersona: {
      name: 'Asha, 24 · Analyst who wants to automate her spreadsheets',
      role: 'Complete beginners and returners who stalled at environment setup',
      painPoint: '"Every Python tutorial starts with installing things. I once spent an evening on an installer error and never got to the actual code. I just want to type something and see it run — today, on the laptop I already have."',
    },

    journey: [
      { phase: 'Land',      action: 'Opens PyQuest — a code editor with runnable starter code is the hero, not a syllabus. Pyodide loads quietly in the background', emotion: 'Curious'   },
      { phase: 'First run', action: 'Types a change, hits Run — real CPython executes in the tab and output appears. No install, no signup', emotion: 'Hooked'    },
      { phase: 'Progress',  action: 'Clears exercises, earns XP, watches level titles climb from Hatchling upward. Progress saves to localStorage automatically', emotion: 'Motivated' },
      { phase: 'Boss fight', action: 'Hits a Firewall — a checkpoint challenge gating the next stage that forces recall of everything so far', emotion: 'Challenged' },
      { phase: 'Return',    action: 'Comes back days later on the same device; the trail resumes exactly where she left off, XP intact', emotion: 'Committed'  },
    ],

    pmInsight: "Time-to-first-run is the whole funnel for a learning tool — every second between landing and successfully executing code is leakage. That single metric drove the three defining decisions: Pyodide over a fake interpreter (real errors teach real Python), static-site-only over accounts-and-backend (zero signup friction, zero marginal cost per learner), and background runtime loading with an honest status line so a heavyweight WASM download never blocks the first lesson. The game layer — XP, levels, Firewall bosses — isn't decoration; it's spaced retrieval disguised as play, and it's what turns a first run into a second session.",

    roadmap: [
      { phase: 'Core Course', status: 'shipped', quarter: 'Jul 2026', items: ['20 stages / 56 exercises across 3 tracks', 'Pyodide runtime — real CPython in the tab', 'Output + assertion checker per exercise', 'XP, level titles, Firewall checkpoints', 'localStorage progress'] },
      { phase: 'Ship & Distribute', status: 'shipped', quarter: 'Jul 2026', items: ['Fully static deploy on Vercel CDN', 'GitHub auto-deploy on push', 'Background runtime loading with status line', 'Works offline after first load'] },
      { phase: 'Instrumentation', status: 'building', quarter: 'Q3 2026', items: ['Aggregate, privacy-respecting drop-off telemetry', 'Per-exercise difficulty calibration', 'Hint system for the hardest cliffs'] },
      { phase: 'Projects Tier', status: 'planned', quarter: 'Q4 2026', items: ['Multi-file in-browser projects', 'Shareable completed-project links', 'Community challenge stages', 'Certificates of completion'] },
    ],

    architecture: [
      { label: 'Frontend',  color: '#F59E0B', bg: '#FFFBEB', nodes: ['Static HTML/CSS/JS', 'Code editor + Run button', 'Journey trail UI', 'XP + level system'] },
      { label: 'Runtime',   color: '#F97316', bg: '#FFF7ED', nodes: ['Pyodide — CPython on WASM', 'Lazy background load', 'In-tab sandboxed execution', 'stdout + exception capture'] },
      { label: 'Curriculum', color: '#EAB308', bg: '#FEFCE8', nodes: ['20 stages / 56 exercises', '3 tracks (beginner → expert)', 'Assertion checkers', 'Firewall boss challenges'] },
      { label: 'Data',      color: '#0EA5E9', bg: '#F0F9FF', nodes: ['localStorage progress + XP', 'No accounts, no server', 'Vercel CDN + auto-deploy'] },
    ],

    competitors: {
      columns: ['PyQuest', 'Video courses', 'Codecademy-style', 'Local install + book'],
      rows: [
        { feature: 'Time to first running code',        values: ['seconds', 'never in-lesson', 'minutes + signup', 'hours'] },
        { feature: 'Real CPython (not a lookalike)',    values: [true,  false, 'Partial', true] },
        { feature: 'Zero install',                      values: [true,  true,  true,  false] },
        { feature: 'Zero account required',             values: [true,  false, false, true] },
        { feature: 'Game progression (XP, bosses)',     values: [true,  false, 'Partial', false] },
        { feature: 'Works offline after first load',    values: [true,  false, false, true] },
        { feature: 'Free at any scale (static)',        values: [true,  false, false, true] },
      ],
    },

    metrics: [
      { value: '56',  label: 'Exercises live',        sub: '20 stages across 3 tracks — first print() to classes, generators, decorators' },
      { value: '0',   label: 'Installs or accounts',  sub: 'Real CPython via Pyodide/WASM runs in the tab itself' },
      { value: '~1s', label: 'To first code run',     sub: 'Runtime lazy-loads in the background while the learner reads stage one' },
      { value: '₹0',  label: 'Cost per learner',      sub: 'Fully static — every additional learner is free to serve' },
    ],
  },

  'sqlquest-learn-sql-on-real-postgres': {
    outcomesTitle: { lead: 'Real rows,', italic: 'real engine.' },
    roadmapTitle: { lead: 'From guided drills', italic: 'to open questions.' },
    problemStatement: 'SQL tutorials mostly fake it: canned result tables, toy interpreters that accept only the blessed answer, or hosted sandboxes gated behind signup. Learners never touch a real engine — never see a genuine query plan, a NULL surprise, or an honest error message — so the skill fails to transfer to the first day of a real job.',

    discovery: "After shipping PyQuest I kept asking: which other skill is taught almost entirely through fakes? SQL was the standout — I'd spent nine years in banking watching analysts learn it badly from canned-table tutorials, then flounder against a production database. PGlite had just made full PostgreSQL 18 bootable inside a browser tab. The product wrote itself: the first SQL course where the database is not simulated, one URL, no account, and the deepest curriculum I could test-gate.",

    userPersona: {
      name: 'Rohit, 26 · Operations analyst moving into data',
      role: 'Analysts and career-switchers who need job-transferable SQL, not tutorial SQL',
      painPoint: '"I finished two SQL tutorials and still froze the first time I ran a query at work — the error messages, the NULLs, the query plan, none of it looked like the tutorial. I want to practise on the real thing before it counts."',
    },

    journey: [
      { phase: 'Land',    action: 'Opens SQLQuest — "a full PostgreSQL 18 runs inside this browser tab." One click starts the database', emotion: 'Skeptical'  },
      { phase: 'Query',   action: 'Types a first SELECT against seeded tables; real rows come back from a real engine', emotion: 'Convinced'  },
      { phase: 'Stumble', action: 'Hits a genuine Postgres error, a NULL three-valued-logic surprise — and learns what tutorials skip', emotion: 'Learning'   },
      { phase: 'Deepen',  action: 'Progresses through joins into window frames, CTE recursion, EXPLAIN plans, row-level security', emotion: 'Confident'  },
      { phase: 'Return',  action: 'Resumes on mobile during a commute — same URL, no account, progress intact', emotion: 'Committed'  },
    ],

    pmInsight: "Two decisions defined the product. First, authenticity as differentiation: 'real Postgres in your tab' is a one-line pitch no canned-results competitor can match without rebuilding on WASM — the engine choice is the moat. Second, curriculum-as-code: a 204-test suite replays every exercise (seed, solution, checker) against the actual engine before any deploy, which turned content editing from an editorial hope into a build gate. The subtler call was the checker contract — comparing result rows rather than query text — so any semantically correct SQL passes. That freedom to find your own path to the answer is where learner confidence actually comes from, and it's invisible in a feature list.",

    roadmap: [
      { phase: 'Foundations', status: 'shipped', quarter: 'Jul 2026', items: ['PGlite — PostgreSQL 18 in the tab', '34 stages / 148 exercises across 3 tiers', 'Row-level result checker (any correct SQL passes)', '"Green Bar" phosphor-terminal identity'] },
      { phase: 'Quality Gate', status: 'shipped', quarter: 'Jul 2026', items: ['204-test suite against the live engine', 'Tests gate every deploy', 'Cache-busted asset versioning', 'GitHub auto-deploy on push'] },
      { phase: 'Reach', status: 'shipped', quarter: 'Jul 2026', items: ['Mobile-friendly layout', 'Accessible tabs + aria-live result announcements', 'Vercel Web Analytics', 'No-account, one-URL distribution'] },
      { phase: 'Capstone Tier', status: 'planned', quarter: 'Q4 2026', items: ['Shared-dataset analytical capstones', 'Open questions instead of guided drills', 'EXPLAIN-plan reading challenges', 'Shareable solved-query links'] },
    ],

    architecture: [
      { label: 'Frontend',   color: '#16A34A', bg: '#F0FDF4', nodes: ['Static JS app ("Green Bar" UI)', 'SQL editor + result table', 'Accessible tabs (aria-live)', 'Mobile layout'] },
      { label: 'Engine',     color: '#059669', bg: '#ECFDF5', nodes: ['PGlite — Postgres 18 on WASM', 'Boots in-tab on demand', 'Per-stage seed SQL', 'Real errors, real EXPLAIN'] },
      { label: 'Curriculum', color: '#65A30D', bg: '#F7FEE7', nodes: ['34 stages / 148 exercises', 'Declarative exercise data', 'Row-comparison checkers', 'Foundations → Composition tiers'] },
      { label: 'Quality',    color: '#475569', bg: '#F8FAFC', nodes: ['204-test Node suite', 'Every exercise replayed in CI', 'Vercel deploy + Web Analytics'] },
    ],

    competitors: {
      columns: ['SQLQuest', 'W3Schools-style', 'Hosted sandboxes', 'Local Postgres'],
      rows: [
        { feature: 'Real PostgreSQL engine',            values: [true,  false, true,  true] },
        { feature: 'Zero signup / zero install',        values: [true,  true,  false, false] },
        { feature: 'Query plans, RLS, window frames',   values: [true,  false, 'Partial', true] },
        { feature: 'Any correct query passes',          values: [true,  false, 'Partial', 'n/a'] },
        { feature: 'Exercise suite tested in CI',       values: [true,  false, false, false] },
        { feature: 'Works on a phone',                  values: [true,  true,  'Partial', false] },
        { feature: 'Free at any scale (static)',        values: [true,  true,  false, true] },
      ],
    },

    metrics: [
      { value: '148', label: 'Exercises live',        sub: '34 stages — first SELECT to window frames, recursion, and row-level security' },
      { value: '204', label: 'Tests green',           sub: 'Every exercise replayed against the real engine before each deploy' },
      { value: '18',  label: 'Postgres major version', sub: 'Genuine PostgreSQL via PGlite/WASM — not a simulator' },
      { value: '0',   label: 'Accounts required',     sub: 'One URL on any device; progress persists locally' },
    ],
  },

  'vaani-voice-banking-agent': {
    outcomesTitle: { lead: 'Guardrails that', italic: 'hold under pressure.' },
    roadmapTitle: { lead: 'From ledger', italic: 'to a live call.' },
    problemStatement: 'Bank IVR trees force a caller through a menu maze for something a conversation would settle in one turn — and the moment it needs to actually move money, the IVR gives up and routes to a queue. A voice agent that can complete the transaction itself needs to be trusted with money without trusting the model with the database.',

    discovery: "Nine years watching bank contact centres route every real request to a queue, while the IVR only ever handled the trivial ones, made the shape of the opportunity obvious: the parts of a call that need a human are exactly the parts that need trust, not intelligence. Gemini Live made speech-to-speech agents good enough to hold a real conversation — the open question was whether one could actually be trusted with money. So I built the control plane first: the ledger, the gateway, the policy engine, all fully tested before a single line of agent code existed, specifically to find out whether 'the model has no database credentials' holds up when a real caller is trying to move real money.",

    userPersona: {
      name: 'Priya Sharma — the demo\'s seeded persona',
      role: 'Signed-in netbanking customer: savings + credit card, ~40 transactions over 60 days',
      painPoint: '"I don\'t want to sit on hold to dispute a charge or check whether my card is blocked. If I can just say it and have it actually happen — verified, confirmed, logged — that\'s the whole point."',
    },

    journey: [
      { phase: 'Call',    action: 'Opens the ABC Bank dashboard and starts a call with the assistant — the microphone stays off until turned on', emotion: 'Cautious' },
      { phase: 'Verify',  action: 'States name and date of birth; a PIN check moves the session from identified to authenticated', emotion: 'Watched'  },
      { phase: 'Ask',     action: 'Asks to move ₹12,000 to a payee; the agent quotes the transfer and reads the exact amount back aloud', emotion: 'Listening' },
      { phase: 'Confirm', action: 'Confirms; a one-time step-up code is requested and read back — the token is spent by exactly one transfer', emotion: 'Assured'   },
      { phase: 'See it land', action: 'The netbanking dashboard refreshes on its own — the caller watches their own balance change rather than being told it changed', emotion: 'Convinced' },
    ],

    pmInsight: "A prompt is a request; a gateway is a guarantee. The system prompt asks the model to verify identity and read back a transfer before confirming it — but nothing in that prompt is trusted to hold, because a sympathetic story ('I'm her husband, she asked me to call') is exactly the kind of pressure a prompt cannot be relied on to resist. Every rule that actually matters — identity, the four money gates, an ownership re-check on every account and payee, audit redaction — is enforced again in code the model cannot see or persuade. The eval suite is built around proving that boundary, not proving the model is polite: assertions check the tool-call sequence and the ledger, never the wording, so a refusal phrased differently every run still passes and a stated balance that was never actually fetched always fails.",

    roadmap: [
      { phase: 'Ledger + Gateway', status: 'shipped', quarter: 'Aug 2026', items: ['Double-entry Postgres ledger — BIGINT paise, zero-sum postings, append-only', 'Four-gate tool gateway: session, trust level, confirmation token, step-up OTP', 'Pure-function policy engine — caps, new-payee cooling-off, velocity routing', 'Idempotency keys on every money-moving call'] },
      { phase: 'Agent + Voice', status: 'shipped', quarter: 'Aug 2026', items: ['Provider-agnostic text agent with a model fallback chain', 'Gemini Live speech-to-speech over a WebSocket relay', 'Barge-in during a readback invalidates the confirmation', 'Dummy ABC Bank dashboard hosting the call widget'] },
      { phase: 'Evals + Hardening', status: 'shipped', quarter: 'Aug 2026', items: ['28 core regression + 103 persona-batch live scenarios', '189 unit and contract tests', 'Public /dev page with dated, real failures and fixes', 'Loan-eligibility answers and a sales-agent role, eligibility-gated'] },
      { phase: 'Next', status: 'planned', quarter: 'Q4 2026', items: ['Run the full eval suite end-to-end against a paid model tier', 'Call-resume past Vercel’s five-minute function timeout', 'SMS-based step-up in place of the demo-mode on-screen code'] },
    ],

    architecture: [
      { label: 'Voice',          color: '#0D9488', bg: '#F0FDFA', nodes: ['Gemini Live (native audio)', 'WebSocket relay', 'Input/output transcription', 'Barge-in detection'] },
      { label: 'Control plane',  color: '#D97706', bg: '#FFFBEB', nodes: ['dispatch() gateway', 'Policy engine (pure function)', 'Confirmation token + step-up OTP', 'Audit log (redacted)'] },
      { label: 'Ledger',         color: '#16A34A', bg: '#F0FDF4', nodes: ['Postgres (Neon)', 'Double-entry postings', 'SERIALIZABLE solvency checks', 'Idempotency keys'] },
      { label: 'Surface',        color: '#475569', bg: '#F8FAFC', nodes: ['Dummy ABC Bank dashboard', 'Vanilla JS, no framework', 'Vercel Node Functions', '/dev page + live log'] },
    ],

    competitors: {
      columns: ['Vaani', 'Traditional IVR', 'Generic chat banking bot', 'Human call centre'],
      rows: [
        { feature: 'Completes a real transaction, not just Q&A', values: [true, false, false, true] },
        { feature: 'Model never holds a database credential',    values: [true, 'n/a', false, 'n/a'] },
        { feature: 'Every money move needs step-up + readback',  values: [true, 'Partial', false, true] },
        { feature: 'Full audit trail, including denials',        values: [true, 'Partial', false, 'Partial'] },
        { feature: 'Available instantly, no queue',               values: [true, true, true, false] },
        { feature: 'Handles a natural spoken request',            values: [true, false, 'Partial', true] },
        { feature: 'Tested against adversarial pressure',         values: [true, false, false, false] },
      ],
    },

    metrics: [
      { value: '131', label: 'Live scripted scenarios', sub: '28 core regression + 103 persona-batch, run against the real model' },
      { value: '189', label: 'Unit + contract tests',   sub: 'Deterministic — every tool and ledger invariant checked on every change' },
      { value: '0',   label: 'DB credentials held by the model', sub: 'Every call routes through one server-side gateway' },
      { value: '4',   label: 'Gates before money moves', sub: 'Session, trust level, confirmation token, step-up OTP — in order' },
    ],
  },
};

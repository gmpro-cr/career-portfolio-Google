import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, CheckCircle,
  Lightbulb, User, ChartLine, Rocket, Wrench, Clock,
} from '@phosphor-icons/react';
import { PROJECTS, getTheme } from '../constants';
import type { ProjectTheme } from '../types';

/* ─── Scroll-reveal hook ─────────────────────────────────────── */
const EASE_STR = 'cubic-bezier(0.32, 0.72, 0, 1)';
function useReveal(margin = '-5%') {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 0.6s ${EASE_STR} ${delay}s, transform 0.6s ${EASE_STR} ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── Eyebrow pill ───────────────────────────────────────────── */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="eyebrow">{children}</span>
);

/* ─── Status colors (roadmap — semantic, shared across projects) ─ */
const STATUS_COLORS = {
  shipped:  { label: 'Shipped',  bg: '#ECFDF5', border: '#10B981', text: '#065F46', dot: '#10B981' },
  building: { label: 'In Progress', bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' },
  planned:  { label: 'Planned',  bg: '#F9FAFB', border: '#D1D5DB', text: '#6B7280', dot: '#9CA3AF' },
};

/* ═══════════════════════════════════════════════════════════════
   DATA TYPES
   ═══════════════════════════════════════════════════════════════ */
interface JourneyStep { phase: string; action: string; emotion: string }
interface CompetitorRow { feature: string; values: (boolean | string)[] }
interface MetricCard { value: string; label: string; sub: string }
interface RoadmapPhase { phase: string; status: 'shipped' | 'building' | 'planned'; quarter?: string; items: string[] }
interface ArchLayer { label: string; color: string; bg: string; nodes: string[] }

interface ProjectExtra {
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

/* ═══════════════════════════════════════════════════════════════
   RICH PROJECT DATA (real research from each codebase)
   ═══════════════════════════════════════════════════════════════ */
const PROJECT_EXTRAS: Record<string, ProjectExtra> = {

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
      { phase: 'Habit',     action: 'Persona initiates a check-in next session — \"Last time you were thinking about the startup…\"',    emotion: 'Attached'   },
      { phase: 'Convert',   action: 'Upgrades to premium (Razorpay ₹199/mo) for unlimited conversations and exclusive personas',        emotion: 'Loyal'      },
    ],

    pmInsight: "North Star Metric: Messages Sent Per Day — deliberately chosen because it captures functional value delivery, engagement depth, and retention in a single number. PMF signal identified through Mixpanel cohort data: users who have 5+ conversations with 2+ different personas in their first week are retained at 3x the D30 rate of single-persona users. That insight drove a full onboarding redesign to expose users to 3+ personas before the end of session 1. The second unlock: when the AI initiates the conversation on session 2 rather than waiting for the user — D7 retention lifted significantly. Both discoveries came from data, mid-build, when I should have designed for them from day one.",

    roadmap: [
      {
        phase: 'Foundation',
        status: 'shipped',
        quarter: 'Oct 2025',
        items: ['350+ curated personas across 6 categories', 'Guest mode — no signup required', 'Google OAuth (2 clicks to start)', 'Gemini 1.5 Flash + Groq Llama 3.3 LLM router', 'Mobile-responsive UI', 'Freemium paywall (Razorpay)'],
      },
      {
        phase: 'Engagement',
        status: 'shipped',
        quarter: 'Nov 2025',
        items: ['Sarvam TTS voice synthesis', 'Cross-session memory via Supabase', 'Real-time news injection (all personas aware of today\'s date + headlines)', 'Custom persona creation', 'Mixpanel analytics + A/B testing on onboarding'],
      },
      {
        phase: 'Monetisation',
        status: 'building',
        quarter: 'Q2 2026',
        items: ['Tiered subscriptions (₹199/₹499/mo)', 'Exclusive premium personas', 'Conversation history + search', 'Persona recommendations by mood'],
      },
      {
        phase: 'Scale',
        status: 'planned',
        quarter: 'Q4 2026',
        items: ['Creator persona marketplace', 'Persona debates (multi-AI conversation)', 'iOS + Android apps', '100+ Hindi/regional language personas', 'Enterprise white-label licensing'],
      },
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

  /* ─── CreditGuard AI ──────────────────────────────────────── */
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
      {
        phase: 'Core Engine',
        status: 'shipped',
        quarter: 'Dec 2025',
        items: ['PDF upload + PDFMiner extraction', 'Auto financial ratio calculation (DSCR, D/E, ICR)', '8-section CAM generation via Gemini API', 'Risk flag auto-detection (10 flags)', 'Basic HITL editing UI'],
      },
      {
        phase: 'Enterprise Polish',
        status: 'shipped',
        quarter: 'Jan 2026',
        items: ['Claude API cross-validation layer', 'Excel export (OpenPyXL) — bank template format', 'PDF export', 'Karpathy autonomous web research loop', 'Confidence scoring per section (High/Medium/Low)'],
      },
      {
        phase: 'Collaboration',
        status: 'building',
        quarter: 'Q2 2026',
        items: ['Version history (save + diff snapshots)', 'Section locking after reviewer sign-off', 'Excel/CMA file upload (in addition to PDF)', 'Multi-user team accounts', 'Screener.in direct integration'],
      },
      {
        phase: 'Platform',
        status: 'planned',
        quarter: 'Q4 2026',
        items: ['Bank-wide API access', 'Custom CAM template configuration per institution', 'Audit trail + compliance logging', 'Automated early warning monitoring', 'Integration with CBS (core banking)'],
      },
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

  /* ─── Job Search Agent ────────────────────────────────────── */
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
      {
        phase: 'Personal Agent',
        status: 'shipped',
        quarter: 'Jan 2026',
        items: ['6-portal scraper (LinkedIn, Naukri, Indeed, HiringCafe, Wellfound, IIMJobs)', 'Ollama Mistral 7B local scoring (0–100)', 'Telegram daily digest', 'Flask web dashboard + settings', 'APScheduler daily cron', 'SQLite local database'],
      },
      {
        phase: 'Multi-User SaaS',
        status: 'shipped',
        quarter: 'Feb 2026',
        items: ['Google OAuth multi-user login', 'Neon Postgres (user-scoped data)', 'Vercel Blob (digests + PRDs per user)', 'GitHub Actions cron (no server needed)', 'Vercel deployment (production URL live)', 'Apollo Enricher for hiring manager details'],
      },
      {
        phase: 'Smart Filtering',
        status: 'building',
        quarter: 'Q2 2026',
        items: ['Conversational onboarding (replaces JSON config)', 'Apply/dismiss feedback loop (model updates weights)', 'PRD generator for applied roles', 'Hiring manager outreach drafts via AI'],
      },
      {
        phase: 'Distribution',
        status: 'planned',
        quarter: 'Q3 2026',
        items: ['One-click Fly.io deploy button', 'Freemium model (₹499/mo unlimited)', 'Stripe payments', 'Resume-to-profile auto-import', 'Community scoring model (shared learnings)'],
      },
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

  /* ─── AI Engineering Field Guide ──────────────────────────── */
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
      {
        phase: 'Content Engine',
        status: 'shipped',
        quarter: 'Jun 2026',
        items: ['Full 535-page book read + distilled', 'All 10 chapters as structured data', 'Reusable Diagram component (9 types)', '29 interactive + descriptive diagrams', 'Overview + reading map'],
      },
      {
        phase: 'Reference Tooling',
        status: 'shipped',
        quarter: 'Jun 2026',
        items: ['Hash-routed deep links (#/chapter/N/section)', 'Client-side Cmd+K search', 'localStorage read-progress', 'Collapsible desktop sidebar', 'Editorial design (Fraunces + Geist)'],
      },
      {
        phase: 'Ask the Book (RAG)',
        status: 'shipped',
        quarter: 'Jun 2026',
        items: ['1,325 server-side book chunks', 'TF-IDF lexical retrieval (Vercel function)', 'Gemini 2.0 Flash grounded generation', 'Chapter citations on every answer', 'Graceful fallback without API key'],
      },
      {
        phase: 'General Reading Tool',
        status: 'planned',
        quarter: 'Q4 2026',
        items: ['Hybrid retrieval (embeddings + TF-IDF)', 'Upload-your-own-PDF support', 'Per-reader highlights + notes', 'Multi-book library', 'Shareable answer links'],
      },
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

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Colorful User Journey Map
   ═══════════════════════════════════════════════════════════════ */
function JourneyMap({ steps, theme }: { steps: JourneyStep[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-4%');
  const ramp = theme.ramp;
  return (
    <div ref={ref}>
      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-0 md:hidden">
        {steps.map((step, i) => {
          const c = ramp[i % ramp.length];
          return (
            <React.Fragment key={i}>
              <div className="flex gap-4 items-stretch" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(12px)',
                transition: `opacity 0.45s ${EASE_STR} ${i * 0.07}s, transform 0.45s ${EASE_STR} ${i * 0.07}s`,
              }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                    style={{ background: c.dot }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 my-1" style={{ background: `${c.border}40` }} />}
                </div>
                <div className={`flex-1 ${i < steps.length - 1 ? 'pb-4' : ''}`}>
                  <div style={{ background: c.bg, border: `1px solid ${c.border}50`, borderRadius: '1.25rem', padding: '14px 16px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: c.text, fontWeight: 700, marginBottom: 4 }}>{step.phase}</p>
                    <p style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.55 }}>{step.action}</p>
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${c.border}30`, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: c.text, opacity: 0.7 }}>Feeling</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: c.text }}>{step.emotion}</span>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-stretch gap-0">
        {steps.map((step, i) => {
          const c = ramp[i % ramp.length];
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center flex-1" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ${EASE_STR} ${i * 0.08}s, transform 0.5s ${EASE_STR} ${i * 0.08}s`,
                minWidth: 0,
              }}>
                <div className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center mb-3 flex-shrink-0"
                  style={{ background: c.dot }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ background: c.bg, border: `1px solid ${c.border}50`, borderRadius: '1.25rem', padding: '16px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: c.text, fontWeight: 700 }}>{step.phase}</p>
                  <p style={{ fontSize: '12px', color: '#44403C', lineHeight: 1.55, flex: 1 }}>{step.action}</p>
                  <div style={{ paddingTop: 10, borderTop: `1px solid ${c.border}30` }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: c.text, opacity: 0.7, marginBottom: 2 }}>Feeling</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: c.text }}>{step.emotion}</p>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-start pt-10 flex-shrink-0 px-1.5" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ${EASE_STR} ${i * 0.08 + 0.15}s` }}>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                    <path d="M0 5h14M10 1l4 4-4 4" stroke={c.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Compact Mini Pipeline (hero — no scroll reveal needed)
   ═══════════════════════════════════════════════════════════════ */
function MiniPipeline({ steps, theme }: { steps: { step: string }[]; theme: ProjectTheme }) {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2.5">
      {steps.map((s, i) => {
        const r = theme.ramp[i % theme.ramp.length];
        const c = { bg: r.bg, border: r.border, text: r.text, num: r.dot };
        return (
          <div key={i} style={{
            background: c.bg,
            border: `1px solid ${c.border}50`,
            borderRadius: '1.125rem',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: '50%',
              background: c.num, color: 'white',
              fontSize: '10px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 1,
            }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: '13px', color: c.text, lineHeight: 1.45, flex: 1 }}>{s.step}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Colorful Data Pipeline
   ═══════════════════════════════════════════════════════════════ */
function PipelineDiagram({ steps, theme }: { steps: { step: string }[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="space-y-0">
      {steps.map((s, i) => {
        const r = theme.ramp[i % theme.ramp.length];
        const c = { bg: r.bg, border: r.border, text: r.text, num: r.dot };
        return (
          <React.Fragment key={i}>
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-12px)',
              transition: `opacity 0.4s ${EASE_STR} ${i * 0.07}s, transform 0.4s ${EASE_STR} ${i * 0.07}s`,
            }}>
              <div style={{ background: c.bg, border: `1px solid ${c.border}40`, borderRadius: '1.25rem', padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: c.num,
                  color: 'white', fontSize: '10px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.55, flex: 1, paddingTop: 6 }}>{s.step}</p>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.num, opacity: 0.5, flexShrink: 0, marginTop: 12 }} />
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex flex-col items-center py-0.5" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.25s ${EASE_STR} ${i * 0.07 + 0.18}s` }} aria-hidden>
                <div className="w-px h-3" style={{ background: c.border, opacity: 0.4 }} />
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <path d="M5 7L0.67 0.875H9.33L5 7Z" fill={c.border} fillOpacity="0.5" />
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: System Architecture Schematic (themed boxes + connectors)
   ═══════════════════════════════════════════════════════════════ */
function SystemDiagram({ layers, theme }: { layers: ArchLayer[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="space-y-0">
      {layers.map((layer, li) => {
        const c = theme.ramp[li % theme.ramp.length];
        return (
          <React.Fragment key={li}>
            {/* Layer band */}
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(10px)',
              transition: `opacity 0.45s ${EASE_STR} ${li * 0.1}s, transform 0.45s ${EASE_STR} ${li * 0.1}s`,
            }}>
              <div style={{
                background: c.bg,
                border: `1px solid ${c.border}55`,
                borderRadius: '1rem',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                {/* Band label */}
                <div className="flex items-center gap-2">
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                  <span style={{ color: c.text, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>
                    {layer.label}
                  </span>
                </div>
                {/* Node boxes */}
                <div className="flex flex-wrap gap-2">
                  {layer.nodes.map((node, ni) => (
                    <span key={ni} style={{
                      background: '#FFFFFF',
                      border: `1px solid ${c.border}55`,
                      color: c.text,
                      fontSize: '11px',
                      fontWeight: 500,
                      padding: '6px 12px',
                      borderRadius: '0.6rem',
                      boxShadow: `0 1px 2px ${c.border}1A`,
                      whiteSpace: 'nowrap',
                    }}>{node}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Connector between bands */}
            {li < layers.length - 1 && (
              <div className="flex flex-col items-center" style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.3s ${EASE_STR} ${li * 0.1 + 0.14}s`,
              }} aria-hidden>
                <div style={{ width: 1.5, height: 14, background: `${c.border}66` }} />
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ marginTop: -1 }}>
                  <path d="M6 8L0.804 0.5H11.196L6 8Z" fill={c.border} fillOpacity="0.55" />
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Product Roadmap Timeline
   ═══════════════════════════════════════════════════════════════ */
function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
      {phases.map((phase, i) => {
        const s = STATUS_COLORS[phase.status];
        return (
          <div key={i} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: `opacity 0.5s ${EASE_STR} ${i * 0.08}s, transform 0.5s ${EASE_STR} ${i * 0.08}s`,
          }}>
            <div style={{
              background: s.bg,
              border: `1px solid ${s.border}50`,
              borderRadius: '1.25rem',
              padding: '18px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}>
              <div className="flex items-center justify-between mb-3">
                <span style={{
                  background: 'white',
                  border: `1px solid ${s.border}`,
                  color: s.text,
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '9999px',
                }}>{s.label}</span>
                {phase.quarter && (
                  <span style={{ fontSize: '10px', color: s.text, opacity: 0.7, fontWeight: 500 }}>{phase.quarter}</span>
                )}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A1410', marginBottom: 10 }}>{phase.phase}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                {phase.items.map((item, ii) => (
                  <li key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%', background: s.dot,
                      flexShrink: 0, marginTop: 6,
                    }} />
                    <span style={{ fontSize: '11.5px', color: '#57534E', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Competitive Analysis Grid
   ═══════════════════════════════════════════════════════════════ */
function CompetitiveGrid({ columns, rows }: { columns: string[]; rows: CompetitorRow[] }) {
  const [ref, visible] = useReveal('-4%');
  const ours = columns[0];
  return (
    <div ref={ref}>
      <p className="text-[10px] text-ink-muted mb-3 md:hidden">← Scroll to compare →</p>
      <div className="w-full overflow-x-auto pb-2">
        <table className="w-full min-w-[560px] border-collapse" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR} 0.1s` }}>
          <thead>
            <tr>
              <th className="text-left pb-4 pr-6 w-[40%]">
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#78716C', fontWeight: 600 }}>Feature</span>
              </th>
              {columns.map((col, ci) => (
                <th key={ci} className="text-center pb-4 px-3">
                  {col === ours ? (
                    <span style={{
                      background: '#1A1410', color: 'white',
                      fontSize: '11px', fontWeight: 700,
                      padding: '4px 12px', borderRadius: '9999px',
                      display: 'inline-block',
                    }}>{col}</span>
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#78716C' }}>{col}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{
                borderTop: '1px solid #E8E3DC',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(8px)',
                transition: `opacity 0.4s ${EASE_STR} ${0.15 + ri * 0.05}s, transform 0.4s ${EASE_STR} ${0.15 + ri * 0.05}s`,
              }}>
                <td style={{ fontSize: '13px', color: '#57534E', padding: '13px 24px 13px 0', lineHeight: 1.4 }}>{row.feature}</td>
                {row.values.map((val, vi) => {
                  const isOurs = vi === 0;
                  return (
                    <td key={vi} className="text-center px-3 py-3" style={{ background: isOurs ? 'rgba(26,20,16,0.03)' : undefined }}>
                      {val === true && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 22, height: 22, borderRadius: '50%',
                          background: isOurs ? '#10B981' : '#D1FAE5',
                        }}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke={isOurs ? 'white' : '#065F46'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                      {val === false && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 22, height: 22, borderRadius: '50%',
                          background: '#F5F5F4',
                        }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="rgba(26,20,16,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      )}
                      {val !== true && val !== false && (
                        <span style={{ fontSize: '12px', fontWeight: isOurs ? 700 : 500, color: isOurs ? '#1A1410' : '#78716C' }}>{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Outcome Metrics
   ═══════════════════════════════════════════════════════════════ */
function MetricsRow({ metrics, theme }: { metrics: MetricCard[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {metrics.map((m, i) => {
        const r = theme.ramp[i % theme.ramp.length];
        const c = { bg: r.bg, border: r.border, accent: r.text };
        return (
          <div key={i} style={{
            background: c.bg,
            border: `1px solid ${c.border}50`,
            borderRadius: '1.25rem',
            padding: '20px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: `opacity 0.5s ${EASE_STR} ${i * 0.07}s, transform 0.5s ${EASE_STR} ${i * 0.07}s`,
          }}>
            <p style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: c.accent, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 300 }}>{m.value}</p>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#1A1410', marginTop: 6, marginBottom: 4 }}>{m.label}</p>
            <p style={{ fontSize: '11px', color: '#78716C', lineHeight: 1.5 }}>{m.sub}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function ProjectDetail() {
  const { slug }   = useParams<{ slug: string }>();
  const navigate   = useNavigate();
  const project    = PROJECTS.find(p => p.slug === slug);
  const extras     = slug ? PROJECT_EXTRAS[slug] : undefined;
  const theme      = getTheme(slug ?? '');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project || !extras) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-ink mb-4">Project not found</p>
          <Link to="/" className="text-ink-muted hover:text-ink text-sm transition-colors">← Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const currentIdx  = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">

      {/* ── Back nav ────────────────────────────────────────────── */}
      <div className="pt-20 md:pt-28 pb-4 px-4 md:px-12 max-w-6xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors duration-200 group"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white group-hover:border-ink/20 transition-colors duration-200">
            <ArrowLeft size={13} weight="light" />
          </span>
          Back
        </button>
        <div className="flex items-center gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink-muted transition-colors">
              Live site <ArrowUpRight size={13} weight="light" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
              <GithubLogo size={14} weight="light" /> GitHub
            </a>
          )}
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="py-10 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
              <Eyebrow>{project.category === 'build' ? 'Shipped Product' : 'Case Study'}</Eyebrow>
              <span className="font-display italic text-sm text-ink-muted">{project.date}</span>
              {project.metrics && (
                <span className="font-display italic text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}55`, color: theme.accentDark }}>
                  {project.metrics}
                </span>
              )}
            </div>
            <h1
              className="font-display font-light leading-[0.95] tracking-tight text-ink"
              style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}
            >
              {project.title}
            </h1>
            <p className="mt-4 md:mt-6 text-sm md:text-lg text-ink/60 leading-relaxed">
              {project.description}
            </p>
            {project.technicalDetails?.dataFlow && project.technicalDetails.dataFlow.length > 0 && (
              <div className="mt-6 md:mt-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">How it works</p>
                <MiniPipeline steps={project.technicalDetails.dataFlow} theme={theme} />
              </div>
            )}
            <div className="mt-5 md:mt-8 flex flex-wrap gap-1.5 md:gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hero screenshot ──────────────────────────────────────── */}
      {project.image && (
        <div className="max-w-6xl mx-auto px-4 md:px-12 pb-10 md:pb-16">
          <Reveal delay={0.15}>
            <div className="bezel" style={{ background: '#FDFBF7', borderRadius: '1.5rem' }}>
              <div className="bezel-core overflow-hidden" style={{ borderRadius: 'calc(1.5rem - 0.375rem)' }}>
                <img
                  src={project.image}
                  alt={`${project.title} homepage`}
                  className="w-full object-cover object-top"
                  style={{ maxHeight: 'clamp(200px, 40vw, 520px)' }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Problem Statement ────────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5 md:mb-8">The Problem</p>
            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ background: theme.accent }} />
              <p className="font-display font-light text-ink leading-[1.45] tracking-tight"
                style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>
                &ldquo;{extras.problemStatement}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Discovery Story ──────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            {/* Origin story */}
            <Reveal delay={0.06}>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={14} weight="light" className="text-ink-muted" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">How I Found This Problem</p>
              </div>
              <p className="text-sm text-ink/75 leading-relaxed">{extras.discovery}</p>
            </Reveal>
            {/* User persona */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <User size={14} weight="light" className="text-ink-muted" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Archetypal User</p>
              </div>
              <div style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}50`, borderRadius: '1.25rem', padding: '20px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#1A1410', marginBottom: 4 }}>{extras.userPersona.name}</p>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: theme.accentDark, fontWeight: 600, marginBottom: 12, opacity: 0.85 }}>{extras.userPersona.role}</p>
                <div style={{ paddingTop: 12, borderTop: `1px solid ${theme.accentBorder}30` }}>
                  <p style={{ fontSize: '12px', color: theme.accentDark, lineHeight: 1.6, fontStyle: 'italic' }}>{extras.userPersona.painPoint}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── User Journey Map ─────────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <div className="flex items-center gap-2 mb-2">
              <ChartLine size={14} weight="light" className="text-ink-muted" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">User Journey Map</p>
            </div>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">
              From first touch to <em className="italic font-normal text-ink-muted">loyal retention.</em>
            </h2>
          </Reveal>
          <JourneyMap steps={extras.journey} theme={theme} />
        </div>
      </section>

      {/* ── PM Approach + Key Decisions ──────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-16">
              PM Approach &amp; <em className="italic font-normal text-ink-muted">Key Decisions</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5 md:mb-8">Discovery → Ship → Iterate</p>
              <ul className="space-y-6">
                {project.approach?.map((item, i) => (
                  <React.Fragment key={i}>
                    <Reveal delay={0.04 + i * 0.05}>
                      <li className="flex gap-4">
                        <span style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: theme.ramp[i % theme.ramp.length].dot,
                          color: 'white', fontSize: '10px', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 2,
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-ink/80 leading-relaxed text-justify hyphens-auto">{item}</p>
                      </li>
                    </Reveal>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5 md:mb-8">Critical Product Decisions</p>
              <div className="space-y-3">
                {project.keyInsights?.map((item, i) => (
                  <React.Fragment key={i}>
                    <Reveal delay={0.06 + i * 0.06}>
                      <div style={{
                        background: '#FDFBF7',
                        border: `1px solid ${theme.ramp[i % theme.ramp.length].border}50`,
                        borderRadius: '1.25rem',
                        padding: '14px 18px',
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                      }}>
                        <CheckCircle size={16} weight="fill"
                          style={{ color: theme.ramp[i % theme.ramp.length].dot, flexShrink: 0, marginTop: 1 }} />
                        <p className="text-sm text-ink/85 leading-relaxed">{item}</p>
                      </div>
                    </Reveal>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Architecture ────────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <div className="flex items-center gap-2 mb-2">
              <Wrench size={14} weight="light" className="text-ink-muted" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">System Architecture</p>
            </div>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">
              How it works — <em className="italic font-normal text-ink-muted">layer by layer.</em>
            </h2>
            <p className="text-sm text-ink/60 leading-relaxed max-w-2xl mb-8 md:mb-14">
              {project.technicalDetails?.architecture}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <SystemDiagram layers={extras.architecture} theme={theme} />
            <div className="space-y-4 md:space-y-6">
              {/* PM Insight */}
              <Reveal delay={0.1}>
                <div style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '20px 22px' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 10 }}>PM Insight</p>
                  <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
                </div>
              </Reveal>
              {/* Data pipeline */}
              <Reveal delay={0.14}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">Data Flow</p>
                <PipelineDiagram steps={project.technicalDetails?.dataFlow ?? []} theme={theme} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Roadmap ──────────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <div className="flex items-center gap-2 mb-2">
              <Rocket size={14} weight="light" className="text-ink-muted" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Product Roadmap</p>
            </div>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">
              From MVP to <em className="italic font-normal text-ink-muted">platform-scale.</em>
            </h2>
          </Reveal>
          <RoadmapTimeline phases={extras.roadmap} />
        </div>
      </section>

      {/* ── Outcomes / Metrics ───────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <div className="flex items-center gap-2 mb-2">
              <ChartLine size={14} weight="light" className="text-ink-muted" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Measured Impact</p>
            </div>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">
              Outcomes that <em className="italic font-normal text-ink-muted">actually moved the needle.</em>
            </h2>
          </Reveal>
          <MetricsRow metrics={extras.metrics} theme={theme} />
          {project.outcomes && (
            <Reveal delay={0.1}>
              <ul className="mt-10 md:mt-12 space-y-4 max-w-2xl">
                {project.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-base text-ink/75 leading-relaxed">
                    <span className="flex-shrink-0 block w-4 h-px bg-ink-muted/50 mt-3" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Reflection ───────────────────────────────────────────── */}
      {project.reflection && (
        <section className="py-12 md:py-28 bg-paper border-t border-hairline">
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Reveal delay={0.06}>
              <div className="flex items-center gap-2 mb-5">
                <Clock size={14} weight="light" className="text-ink-muted" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Reflection</p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-4">What I&rsquo;d do differently</p>
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0 w-1 rounded-full bg-ink/15 self-stretch" />
                <p className="font-display font-light text-ink/80 leading-relaxed tracking-tight"
                  style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)' }}>
                  {project.reflection}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Next Project ─────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6">Next Project</p>
            <Link to={`/project/${nextProject.slug}`} className="group flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display font-light text-2xl md:text-5xl text-ink leading-tight tracking-tight group-hover:text-ink-muted transition-colors duration-500">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{nextProject.date} · {nextProject.metrics}</p>
              </div>
              <span className="flex-shrink-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px">
                <ArrowRight size={16} weight="light" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

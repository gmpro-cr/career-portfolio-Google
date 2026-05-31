import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, CheckCircle,
  Lightbulb, User, ChartLine, Rocket, Wrench, Clock,
} from '@phosphor-icons/react';
import { PROJECTS } from '../constants';

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

/* ─── Color palettes ─────────────────────────────────────────── */
const PHASE_COLORS = [
  { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9', dot: '#8B5CF6' }, // violet
  { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' }, // blue
  { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', dot: '#F59E0B' }, // amber
  { bg: '#ECFDF5', border: '#10B981', text: '#065F46', dot: '#10B981' }, // emerald
  { bg: '#FFF1F2', border: '#F43F5E', text: '#9F1239', dot: '#F43F5E' }, // rose
];

const STATUS_COLORS = {
  shipped:  { label: 'Shipped',  bg: '#ECFDF5', border: '#10B981', text: '#065F46', dot: '#10B981' },
  building: { label: 'In Progress', bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' },
  planned:  { label: 'Planned',  bg: '#F9FAFB', border: '#D1D5DB', text: '#6B7280', dot: '#9CA3AF' },
};

function getPipelineColor(step: string, idx: number) {
  const s = step.toLowerCase();
  if (s.match(/upload|trigger|received|request|start/))
    return { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', num: '#3B82F6' };
  if (s.match(/extract|parse|scrape|pdfminer|selenium|beautifu|raw text|html|table/))
    return { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', num: '#F59E0B' };
  if (s.match(/llm|gemini|claude|ollama|mistral|groq|generat|synthesise|synthesize|score|commentary|narrative|draft|ai agent|researcher/))
    return { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9', num: '#8B5CF6' };
  if (s.match(/supabase|sqlite|database|persist|stored|neon|blob|memory|db|saves/))
    return { bg: '#FFF7ED', border: '#F97316', text: '#9A3412', num: '#F97316' };
  if (s.match(/export|telegram|deliver|stream|response|excel|pdf|assembled|digest|output|download/))
    return { bg: '#ECFDF5', border: '#10B981', text: '#065F46', num: '#10B981' };
  const fallbacks = [
    { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', num: '#3B82F6' },
    { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', num: '#F59E0B' },
    { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9', num: '#8B5CF6' },
    { bg: '#FFF7ED', border: '#F97316', text: '#9A3412', num: '#F97316' },
    { bg: '#ECFDF5', border: '#10B981', text: '#065F46', num: '#10B981' },
  ];
  return fallbacks[idx % fallbacks.length];
}

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

    pmInsight: "Prompt architecture is a product feature, not a config detail. The system prompt that maintains character fidelity across 50+ turns is as important to retention as the UI. We ran quantified persona-drift evals — treating character consistency as a KPI, not a vibe — and iterated the prompts like A/B test variants until D7 retention lifted. The single biggest unlock: when the AI initiates the conversation on session 2 rather than waiting for the user.",

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
      columns: ['AI Spirit', 'Character.AI', 'Replika', 'Chai'],
      rows: [
        { feature: 'Persistent cross-session memory',          values: [true,  false, true,  false] },
        { feature: '350+ distinct curated personas',           values: [true,  true,  false, true ] },
        { feature: 'Voice synthesis (Sarvam TTS)',             values: [true,  false, true,  false] },
        { feature: 'Persona fidelity evals (scored)',          values: [true,  false, false, false] },
        { feature: 'Real-time news awareness',                 values: [true,  false, false, false] },
        { feature: 'Custom persona creation',                  values: [true,  true,  false, false] },
        { feature: 'Indian market & pricing (Razorpay)',       values: [true,  false, false, false] },
        { feature: 'Proactive AI-initiated messages',          values: [true,  false, true,  false] },
      ],
    },

    metrics: [
      { value: '500+', label: 'Monthly Active Users',      sub: 'Organic retention — zero paid acquisition spend' },
      { value: '50+',  label: 'Turns per conversation',    sub: 'Consistent persona tone maintained end-to-end' },
      { value: '3×',   label: 'D7 retention lift',         sub: 'When AI initiates message on session 2 vs waiting' },
      { value: '350+', label: 'Curated AI personas',       sub: 'Business · Spiritual · Entertainment · Fitness · Historical' },
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

    pmInsight: "Trust architecture precedes feature architecture in regulated environments. My first assumption was that accuracy would be the adoption bottleneck. It wasn't — format familiarity was. The moment we mirrored the exact Excel template analysts already submitted to credit committees, resistance dropped overnight. The second insight: human-in-the-loop is not a compromise — it is the core value proposition. Analysts didn't want to delegate decisions to AI; they wanted AI to produce the draft so they could own the final output. That's a fundamentally different product contract.",

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
      { label: 'Data Layer',  color: '#F97316', bg: '#FFF7ED', nodes: ['Supabase Postgres', 'SQLite (local dev)', 'cases · memo_sections · risk_flags', 'OpenPyXL (Excel)', 'PDF renderer'] },
    ],

    competitors: {
      columns: ['CreditGuard AI', 'Manual Process', 'Generic LLM (ChatGPT)', 'Legacy Tools'],
      rows: [
        { feature: 'CAM preparation time',             values: ['< 1 hour', '4–6 hours',    '1–2 hours',  '2–3 hours'] },
        { feature: 'Bank-format Excel output',         values: [true,        true,            false,         false] },
        { feature: 'PDF export',                       values: [true,        false,           false,         'Partial'] },
        { feature: 'Deterministic math (no hallucinations)', values: [true,  true,            false,         true] },
        { feature: 'Autonomous web research',          values: [true,        false,           false,         false] },
        { feature: 'Human-in-the-loop editor',         values: [true,        true,            false,         false] },
        { feature: 'Dual LLM cross-validation',        values: [true,        false,           false,         false] },
        { feature: 'Confidence scoring per section',   values: [true,        false,           false,         false] },
      ],
    },

    metrics: [
      { value: '–80%', label: 'CAM prep time',         sub: '4–6 hours reduced to under 1 hour per analyst' },
      { value: '12',   label: 'CAM sections auto-built', sub: 'End-to-end from raw annual report PDF input' },
      { value: '2',    label: 'LLMs cross-validating',  sub: 'Gemini generates · Claude flags inconsistencies' },
      { value: '2',    label: 'Export formats',         sub: 'Excel (OpenPyXL) + PDF in bank report standards' },
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

    pmInsight: "Self-use is the fastest path to a first version but the slowest path to a second. My scoring model was perfectly calibrated to my profile — and broke for everyone else. The multi-user rewrite taught me: an onboarding flow that asks questions beats a JSON config file. The second missing feature: when a user applies to or dismisses a role, the relevance model should update its weights. That feedback flywheel is what separates a personal script from a product with compounding accuracy. Both are now designed into the current rebuild.",

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
        { feature: 'Daily active search time',              values: ['5 min',  '2 hours', '30 min', '45 min'] },
        { feature: 'AI relevance scoring (0–100)',          values: [true,     false,     false,    false] },
        { feature: 'Multi-portal coverage (6 portals)',     values: [true,     false,     true,     false] },
        { feature: 'Hiring manager details appended',       values: [true,     false,     false,    false] },
        { feature: 'Push notification (Telegram)',          values: [true,     false,     true,     false] },
        { feature: 'Zero manual browsing needed',           values: [true,     false,     false,    false] },
        { feature: 'Feedback loop (apply → model learns)',  values: [true,     false,     false,    false] },
        { feature: 'AI-written PRD per applied role',       values: [true,     false,     false,    false] },
      ],
    },

    metrics: [
      { value: '100%', label: 'Discovery automated',   sub: 'Zero manual browsing across 6 portals daily' },
      { value: '~10',  label: 'Matched roles per day', sub: 'With hiring manager LinkedIn details appended' },
      { value: '–2h',  label: 'Daily time saved',      sub: 'From 2-hour browse to 5-minute digest review' },
      { value: '₹0',   label: 'API cost (local LLM)',  sub: 'Ollama + Mistral 7B — fully offline, no cloud billing' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Colorful User Journey Map
   ═══════════════════════════════════════════════════════════════ */
function JourneyMap({ steps }: { steps: JourneyStep[] }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref}>
      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-0 md:hidden">
        {steps.map((step, i) => {
          const c = PHASE_COLORS[i % PHASE_COLORS.length];
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
          const c = PHASE_COLORS[i % PHASE_COLORS.length];
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
   DIAGRAM: Colorful Data Pipeline
   ═══════════════════════════════════════════════════════════════ */
function PipelineDiagram({ steps }: { steps: { step: string }[] }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="space-y-0">
      {steps.map((s, i) => {
        const c = getPipelineColor(s.step, i);
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
   DIAGRAM: Architecture Layers
   ═══════════════════════════════════════════════════════════════ */
function ArchitectureFlow({ layers }: { layers: ArchLayer[] }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="space-y-2 md:space-y-3">
      {layers.map((layer, li) => (
        <React.Fragment key={li}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateX(-10px)',
            transition: `opacity 0.45s ${EASE_STR} ${li * 0.09}s, transform 0.45s ${EASE_STR} ${li * 0.09}s`,
          }}>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-20 md:w-24 text-right pt-1.5">
                <span style={{ color: layer.color, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, lineHeight: 1.2, display: 'block' }}>
                  {layer.label}
                </span>
              </div>
              <div className="flex-shrink-0 w-px self-stretch" style={{ background: `${layer.color}40`, minHeight: 32 }} />
              <div className="flex flex-wrap gap-1.5 flex-1 pb-1">
                {layer.nodes.map((node, ni) => (
                  <span key={ni} style={{
                    background: layer.bg,
                    border: `1px solid ${layer.color}50`,
                    color: layer.color,
                    fontSize: '11px',
                    fontWeight: 500,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                  }}>{node}</span>
                ))}
              </div>
            </div>
          </div>
          {li < layers.length - 1 && (
            <div className="pl-[5.5rem] md:pl-[6.5rem]" style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.3s ${EASE_STR} ${li * 0.09 + 0.12}s`,
            }}>
              <div className="ml-3 md:ml-4">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                  <path d="M6 1v10M2 8l4 4 4-4" stroke={layer.color} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
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
function MetricsRow({ metrics }: { metrics: MetricCard[] }) {
  const [ref, visible] = useReveal();
  const METRIC_COLORS = [
    { bg: '#F5F3FF', border: '#8B5CF6', accent: '#6D28D9' },
    { bg: '#ECFDF5', border: '#10B981', accent: '#065F46' },
    { bg: '#EFF6FF', border: '#3B82F6', accent: '#1D4ED8' },
    { bg: '#FFFBEB', border: '#F59E0B', accent: '#92400E' },
  ];
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {metrics.map((m, i) => {
        const c = METRIC_COLORS[i % METRIC_COLORS.length];
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
      <section className="relative py-10 md:py-24 overflow-hidden">
        {project.image && (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              filter: 'blur(0px) brightness(0.06) saturate(0.4)',
            }} />
            <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-paper/70 to-paper" />
          </>
        )}
        <div className="relative max-w-6xl mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
              <Eyebrow>{project.category === 'build' ? 'Shipped Product' : 'Case Study'}</Eyebrow>
              <span className="font-display italic text-sm text-ink-muted">{project.date}</span>
              {project.metrics && (
                <span className="font-display italic text-sm font-semibold px-3 py-1 rounded-full border border-hairline text-ink"
                  style={{ background: 'rgba(253,251,247,0.9)' }}>
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
            <p className="mt-4 md:mt-6 max-w-2xl text-sm md:text-lg text-ink/60 leading-relaxed">
              {project.description}
            </p>
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
              <div className="flex-shrink-0 w-1 rounded-full bg-ink/20 self-stretch" />
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
              <div style={{ background: '#F5F3FF', border: '1px solid #8B5CF650', borderRadius: '1.25rem', padding: '20px' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#1A1410', marginBottom: 4 }}>{extras.userPersona.name}</p>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#6D28D9', fontWeight: 600, marginBottom: 12, opacity: 0.8 }}>{extras.userPersona.role}</p>
                <div style={{ paddingTop: 12, borderTop: '1px solid #8B5CF630' }}>
                  <p style={{ fontSize: '12px', color: '#4C1D95', lineHeight: 1.6, fontStyle: 'italic' }}>{extras.userPersona.painPoint}</p>
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
          <JourneyMap steps={extras.journey} />
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
                          background: PHASE_COLORS[i % PHASE_COLORS.length].dot,
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
                        border: `1px solid ${PHASE_COLORS[i % PHASE_COLORS.length].border}50`,
                        borderRadius: '1.25rem',
                        padding: '14px 18px',
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                      }}>
                        <CheckCircle size={16} weight="fill"
                          style={{ color: PHASE_COLORS[i % PHASE_COLORS.length].dot, flexShrink: 0, marginTop: 1 }} />
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
            <ArchitectureFlow layers={extras.architecture} />
            <div className="space-y-4 md:space-y-6">
              {/* PM Insight */}
              <Reveal delay={0.1}>
                <div style={{ background: '#F5F3FF', border: '1px solid #8B5CF640', borderRadius: '1.25rem', padding: '20px 22px' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6D28D9', fontWeight: 700, marginBottom: 10 }}>PM Insight</p>
                  <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
                </div>
              </Reveal>
              {/* Data pipeline */}
              <Reveal delay={0.14}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">Data Flow</p>
                <PipelineDiagram steps={project.technicalDetails?.dataFlow ?? []} />
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
          <MetricsRow metrics={extras.metrics} />
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

      {/* ── Competitive Analysis ─────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2">Competitive Landscape</p>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-14">
              Where this product <em className="italic font-normal text-ink-muted">sits in the market.</em>
            </h2>
          </Reveal>
          <CompetitiveGrid columns={extras.competitors.columns} rows={extras.competitors.rows} />
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

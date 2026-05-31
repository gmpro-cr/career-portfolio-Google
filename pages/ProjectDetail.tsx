import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, CheckCircle,
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

/* ═══════════════════════════════════════════════════════════════
   PROJECT-SPECIFIC DATA (competitive, journey, metrics)
   ═══════════════════════════════════════════════════════════════ */
interface JourneyStep { phase: string; action: string; emotion: string }
interface CompetitorRow { feature: string; values: (boolean | string)[] }
interface MetricCard { value: string; label: string; sub: string }

interface ProjectExtra {
  journey: JourneyStep[];
  competitors: { columns: string[]; rows: CompetitorRow[] };
  metrics: MetricCard[];
  problemStatement: string;
}

const PROJECT_EXTRAS: Record<string, ProjectExtra> = {
  'ai-persona-interaction-platform': {
    problemStatement: 'Generic AI chatbots fail at long-term engagement because they lack character consistency and memory — users crave authentic, persistent relationships, but foundational models drift and destroy immersion.',
    journey: [
      { phase: 'Discover',  action: 'Browses 350+ AI personas by category',         emotion: 'Curious'   },
      { phase: 'Onboard',   action: 'Starts first conversation with a persona',      emotion: 'Cautious'  },
      { phase: 'Engage',    action: 'AI recalls past context — feels like memory',   emotion: 'Surprised' },
      { phase: 'Habit',     action: 'Returns daily; persona initiates check-in',     emotion: 'Attached'  },
      { phase: 'Convert',   action: 'Upgrades to premium for unlimited access',      emotion: 'Loyal'     },
    ],
    competitors: {
      columns: ['AI Spirit', 'Character.AI', 'Replika', 'Chai'],
      rows: [
        { feature: 'Persistent cross-session memory', values: [true,  false, true,  false] },
        { feature: '350+ distinct personas',          values: [true,  true,  false, true ] },
        { feature: 'Voice synthesis (TTS)',           values: [true,  false, true,  false] },
        { feature: 'Persona fidelity evals',          values: [true,  false, false, false] },
        { feature: 'Freemium + Razorpay monetisation',values: [true,  true,  true,  true ] },
        { feature: 'Indian market & pricing focus',   values: [true,  false, false, false] },
      ],
    },
    metrics: [
      { value: '500+', label: 'Monthly Active Users',      sub: 'Organic retention loops, no paid acquisition' },
      { value: '50+',  label: 'Turns per conversation',    sub: 'Consistent persona tone maintained throughout' },
      { value: '3×',   label: 'D7 retention lift',         sub: 'When AI initiates the first message' },
      { value: '₹0',   label: 'Paid acquisition spend',    sub: 'Purely word-of-mouth and in-product sharing' },
    ],
  },
  'ai-credit-intelligence-platform': {
    problemStatement: 'Senior analysts spend 4–6 hours manually scrubbing 100+ page annual reports. This low-leverage bottleneck is prone to error and restricts transaction volume — the cost is paid by every deal the team can\'t evaluate.',
    journey: [
      { phase: 'Upload',    action: 'Analyst uploads annual report PDF',             emotion: 'Hopeful'    },
      { phase: 'Extract',   action: 'System auto-parses P&L, balance sheet, ratios', emotion: 'Watching'   },
      { phase: 'Synthesise',action: 'LLM generates narrative risk commentary',       emotion: 'Reviewing'  },
      { phase: 'Edit',      action: 'Analyst adjusts and annotates draft CAM',       emotion: 'In control' },
      { phase: 'Export',    action: 'Downloads bank-format Excel + PDF in one click',emotion: 'Confident'  },
    ],
    competitors: {
      columns: ['CreditGuard AI', 'Manual Process', 'Generic LLM (ChatGPT)', 'Legacy Tools'],
      rows: [
        { feature: 'CAM preparation time',         values: ['< 1 hour', '4–6 hours', '1–2 hours', '2–3 hours'] },
        { feature: 'Bank-format Excel output',     values: [true,  true,  false, false] },
        { feature: 'PDF export',                   values: [true,  false, false, 'Partial'] },
        { feature: 'Human-in-the-loop editing',    values: [true,  true,  false, false] },
        { feature: 'No hallucinations on numbers', values: [true,  true,  false, false] },
        { feature: 'Dual LLM cross-validation',    values: [true,  false, false, false] },
      ],
    },
    metrics: [
      { value: '–80%', label: 'CAM preparation time',   sub: '4–6 hours reduced to under 1 hour per analyst' },
      { value: '2',    label: 'Export formats shipped',  sub: 'Excel (OpenPyXL) + PDF in bank report standards' },
      { value: '12',   label: 'CAM sections auto-built', sub: 'End-to-end from raw annual report input' },
      { value: '2',    label: 'LLMs cross-validating',   sub: 'Gemini synthesis + Claude flags inconsistencies' },
    ],
  },
  'automated-job-discovery-agent': {
    problemStatement: 'Job hunting is a high-noise, low-signal data problem. Portals flood candidates with irrelevant listings, forcing 2+ hours of daily manual filtering — an inefficient process that scales inversely with the quality of roles.',
    journey: [
      { phase: 'Configure', action: 'Sets candidate profile, target roles & portals', emotion: 'Optimistic'  },
      { phase: 'Schedule',  action: 'Agent runs automatically every morning at 7AM',  emotion: 'Hands-off'  },
      { phase: 'Scrape',    action: 'Selenium collects listings from 5+ job portals',  emotion: 'Automated'  },
      { phase: 'Score',     action: 'Ollama (Mistral 7B) scores each role 0–100',     emotion: 'Filtered'   },
      { phase: 'Deliver',   action: 'Telegram digest arrives: top 10 roles + HMs',    emotion: 'Delighted'  },
    ],
    competitors: {
      columns: ['Job Agent', 'Manual Search', 'Naukri Alerts', 'LinkedIn EasyApply'],
      rows: [
        { feature: 'Daily time cost',              values: ['5 min', '2 hours', '30 min', '45 min'] },
        { feature: 'AI relevance scoring (0–100)', values: [true,  false, false, false] },
        { feature: 'Multi-portal coverage (5+)',   values: [true,  false, true,  false] },
        { feature: 'Push notification delivery',   values: [true,  false, true,  false] },
        { feature: 'Hiring manager details',       values: [true,  false, false, false] },
        { feature: 'Zero manual browsing needed',  values: [true,  false, false, false] },
      ],
    },
    metrics: [
      { value: '100%', label: 'Discovery automated',   sub: 'Zero manual browsing across 5+ job portals daily' },
      { value: '~10',  label: 'Matched roles per day',  sub: 'With hiring manager LinkedIn details appended' },
      { value: '–2h',  label: 'Daily time saved',       sub: 'From 2-hour browse to 5-minute digest review' },
      { value: '₹0',   label: 'API cost (local LLM)',   sub: 'Ollama/Mistral 7B runs fully offline on device' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: User Journey Map
   ═══════════════════════════════════════════════════════════════ */
function JourneyMap({ steps }: { steps: JourneyStep[] }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref}>
      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-0 md:hidden">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className="flex gap-4 items-stretch"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(12px)',
                transition: `opacity 0.45s ${EASE_STR} ${i * 0.07}s, transform 0.45s ${EASE_STR} ${i * 0.07}s`,
              }}
            >
              {/* Step indicator + vertical line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-ink text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-ink/10 my-1" />}
              </div>
              {/* Content */}
              <div className={`flex-1 ${i < steps.length - 1 ? 'pb-4' : ''}`}>
                <div className="bezel" style={{ background: '#FDFBF7' }}>
                  <div className="bezel-core px-4 py-3.5 flex flex-col gap-1.5" style={{ background: '#FDFBF7', borderRadius: 'calc(1.5rem - 0.375rem)' }}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-ink-muted font-medium">{step.phase}</p>
                    <p className="text-sm text-ink/80 leading-relaxed">{step.action}</p>
                    <div className="pt-2 border-t border-hairline flex items-center gap-2">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-ink-muted">Feeling</p>
                      <p className="text-xs font-medium text-ink">{step.emotion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-stretch gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className="flex flex-col items-center flex-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ${EASE_STR} ${i * 0.08}s, transform 0.5s ${EASE_STR} ${i * 0.08}s`,
                minWidth: 0,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-ink text-white text-xs font-semibold flex items-center justify-center mb-3 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="bezel w-full flex-1" style={{ background: '#FDFBF7' }}>
                <div className="bezel-core p-4 flex flex-col gap-2 h-full" style={{ background: '#FDFBF7', borderRadius: 'calc(1.5rem - 0.375rem)' }}>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-ink-muted font-medium">{step.phase}</p>
                  <p className="text-xs text-ink/80 leading-relaxed flex-1">{step.action}</p>
                  <div className="mt-2 pt-2 border-t border-hairline">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-ink-muted">Feeling</p>
                    <p className="text-xs font-medium text-ink mt-0.5">{step.emotion}</p>
                  </div>
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-start pt-11 flex-shrink-0 px-1.5" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ${EASE_STR} ${i * 0.08 + 0.15}s` }}>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="rgba(26,20,16,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGRAM: Data Pipeline
   ═══════════════════════════════════════════════════════════════ */
function PipelineDiagram({ steps }: { steps: { step: string }[] }) {
  const [ref, visible] = useReveal('-4%');
  const icons = ['📄', '⚙️', '🧠', '✅', '📤', '🔗'];
  return (
    <div ref={ref} className="space-y-0">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateX(-12px)',
            transition: `opacity 0.4s ${EASE_STR} ${i * 0.07}s, transform 0.4s ${EASE_STR} ${i * 0.07}s`,
          }}>
            <div className="bezel" style={{ background: '#FDFBF7' }}>
              <div className="bezel-core px-5 py-4 flex items-start gap-4" style={{ background: '#FDFBF7', borderRadius: 'calc(1.25rem - 0.375rem)' }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-white text-[10px] font-semibold flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-ink/85 leading-relaxed">{s.step}</p>
                </div>
                <span className="flex-shrink-0 text-lg" aria-hidden>{icons[i % icons.length]}</span>
              </div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex flex-col items-center py-0.5" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.25s ${EASE_STR} ${i * 0.07 + 0.18}s` }} aria-hidden>
              <div className="w-px h-3 bg-ink/15" />
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M5 7L0.67 0.875H9.33L5 7Z" fill="rgba(26,20,16,0.25)" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
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
      <div className="w-full overflow-x-auto -mx-0 pb-2">
      <table className="w-full min-w-[520px] border-collapse" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR} 0.1s` }}>
        <thead>
          <tr>
            <th className="text-left text-[10px] uppercase tracking-[0.2em] text-ink-muted font-medium pb-4 pr-6 w-[38%]">Feature</th>
            {columns.map((col, ci) => (
              <th key={ci} className={`text-center text-xs font-semibold pb-4 px-3 ${col === ours ? 'text-ink' : 'text-ink-muted'}`}>
                {col === ours ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink" />
                    {col}
                  </span>
                ) : col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-hairline" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(8px)',
              transition: `opacity 0.4s ${EASE_STR} ${0.15 + ri * 0.05}s, transform 0.4s ${EASE_STR} ${0.15 + ri * 0.05}s`,
            }}>
              <td className="text-sm text-ink/75 py-3.5 pr-6 leading-snug">{row.feature}</td>
              {row.values.map((val, vi) => {
                const isOurs = vi === 0;
                const isTrue = val === true;
                const isFalse = val === false;
                return (
                  <td key={vi} className={`text-center px-3 py-3.5 ${isOurs ? 'bg-ink/[0.03] rounded' : ''}`}>
                    {isTrue  && <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${isOurs ? 'bg-ink' : 'bg-ink/10'}`}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke={isOurs ? 'white' : 'rgba(26,20,16,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>}
                    {isFalse && <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ink/5">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="rgba(26,20,16,0.2)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </span>}
                    {!isTrue && !isFalse && (
                      <span className={`text-xs font-medium ${isOurs ? 'text-ink font-semibold' : 'text-ink-muted'}`}>{val}</span>
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
   DIAGRAM: Outcome Metrics Row
   ═══════════════════════════════════════════════════════════════ */
function MetricsRow({ metrics }: { metrics: MetricCard[] }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="bezel" style={{
          background: '#FDFBF7',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(16px)',
          transition: `opacity 0.5s ${EASE_STR} ${i * 0.07}s, transform 0.5s ${EASE_STR} ${i * 0.07}s`,
        }}>
          <div className="bezel-core p-5 flex flex-col gap-1" style={{ background: '#FDFBF7', borderRadius: 'calc(1.5rem - 0.375rem)' }}>
            <p className="font-display font-light text-3xl md:text-4xl text-ink leading-none tracking-tight">{m.value}</p>
            <p className="text-xs font-semibold text-ink mt-1">{m.label}</p>
            <p className="text-[11px] text-ink-muted leading-relaxed mt-0.5">{m.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();
  const project   = PROJECTS.find(p => p.slug === slug);
  const extras    = slug ? PROJECT_EXTRAS[slug] : undefined;

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

  const currentIdx = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">

      {/* ── Back nav bar ─────────────────────────────────────── */}
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative py-10 md:py-24 overflow-hidden">
        {/* Background image */}
        {project.image && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                filter: 'blur(0px) brightness(0.06) saturate(0.4)',
              }}
            />
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
                <span
                  className="font-display italic text-sm font-semibold px-3 py-1 rounded-full border border-hairline text-ink"
                  style={{ background: 'rgba(253,251,247,0.9)' }}
                >
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
            <p className="mt-4 md:mt-6 max-w-2xl text-sm md:text-lg text-ink/60 leading-relaxed font-normal">
              {project.description}
            </p>
            {/* Tech stack pills */}
            <div className="mt-5 md:mt-8 flex flex-wrap gap-1.5 md:gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hero screenshot ───────────────────────────────────── */}
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

      {/* ── Problem ──────────────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5 md:mb-8">The Problem</p>
            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-1 rounded-full bg-ink/20 self-stretch" />
              <p
                className="font-display font-light text-ink leading-[1.45] tracking-tight"
                style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}
              >
                &ldquo;{extras.problemStatement}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── User Journey ─────────────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2">User Journey Map</p>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">
              How a user moves from <em className="italic font-normal text-ink-muted">first touch to retention.</em>
            </h2>
          </Reveal>
          <JourneyMap steps={extras.journey} />
        </div>
      </section>

      {/* ── PM Approach + Key Decisions (2-col) ──────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-16">
              PM Approach &amp; <em className="italic font-normal text-ink-muted">Key Decisions</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            {/* Left: numbered approach */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5 md:mb-8">Discovery → Ship → Iterate</p>
              <ul className="space-y-6">
                {project.approach?.map((item, i) => (
                  <React.Fragment key={i}>
                    <Reveal delay={0.04 + i * 0.05}>
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-ink text-white text-[10px] font-semibold flex items-center justify-center mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-ink/80 leading-relaxed text-justify hyphens-auto">{item}</p>
                      </li>
                    </Reveal>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            {/* Right: key PM decisions */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5 md:mb-8">Critical Product Decisions</p>
              <div className="space-y-3">
                {project.keyInsights?.map((item, i) => (
                  <React.Fragment key={i}>
                    <Reveal delay={0.06 + i * 0.06}>
                      <div className="bezel" style={{ background: '#FDFBF7' }}>
                        <div className="bezel-core px-5 py-4 flex gap-3" style={{ background: '#FDFBF7', borderRadius: 'calc(1.5rem - 0.375rem)' }}>
                          <CheckCircle size={16} weight="light" className="flex-shrink-0 text-ink mt-0.5" />
                          <p className="text-sm text-ink/85 leading-relaxed">{item}</p>
                        </div>
                      </div>
                    </Reveal>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Architecture / Data Pipeline ─────────────────────── */}
      {project.technicalDetails && (
        <section className="py-12 md:py-28 bg-paper border-t border-hairline">
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Reveal delay={0.06}>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2">System Architecture</p>
              <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">
                How it works — <em className="italic font-normal text-ink-muted">step by step.</em>
              </h2>
              <p className="text-sm text-ink/60 leading-relaxed max-w-2xl mb-8 md:mb-14">
                {project.technicalDetails.architecture}
              </p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
              <PipelineDiagram steps={project.technicalDetails.dataFlow} />
              {/* Architecture annotation */}
              <Reveal delay={0.12}>
                <div className="space-y-6">
                  <div className="bezel" style={{ background: '#FDFBF7' }}>
                    <div className="bezel-core p-6" style={{ background: '#FDFBF7', borderRadius: 'calc(1.5rem - 0.375rem)' }}>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-3">PM Insight</p>
                      <p className="text-sm text-ink/80 leading-relaxed">
                        Separating deterministic extraction from LLM synthesis was the single most important architectural decision — it eliminated hallucinations on structured data while keeping the LLM focused solely on narrative reasoning.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-3">Full Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Outcomes / Metrics ───────────────────────────────── */}
      <section className="py-12 md:py-28 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2">Measured Impact</p>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">
              Outcomes that <em className="italic font-normal text-ink-muted">actually moved the needle.</em>
            </h2>
          </Reveal>
          <MetricsRow metrics={extras.metrics} />
          {/* Detailed outcomes list */}
          {project.outcomes && (
            <Reveal delay={0.1}>
              <ul className="mt-12 space-y-4 max-w-2xl">
                {project.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-base text-ink/75 leading-relaxed">
                    <span className="flex-shrink-0 mt-1 block w-4 h-px bg-ink-muted/50 mt-2.5" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Competitive Analysis ─────────────────────────────── */}
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

      {/* ── Reflection ───────────────────────────────────────── */}
      {project.reflection && (
        <section className="py-12 md:py-28 bg-paper border-t border-hairline">
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Reveal delay={0.06}>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-5">Reflection</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-4">What I&rsquo;d do differently</p>
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0 w-1 rounded-full bg-ink/15 self-stretch" />
                <p
                  className="font-display font-light text-ink/80 leading-relaxed tracking-tight"
                  style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)' }}
                >
                  {project.reflection}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Next Project ─────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal delay={0.06}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6">Next Project</p>
            <Link
              to={`/project/${nextProject.slug}`}
              className="group flex items-center justify-between gap-4"
            >
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

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  GraduationCap,
  SealCheck,
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  FileText,
} from '@phosphor-icons/react';
import { EXPERIENCES, PROJECTS, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';
import XMark from '../components/XMark';

/* ── Eyebrow pill ───────────────────────────────────────────────── */
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span className={`eyebrow ${light ? '!border-white/20 !bg-white/10 !text-white/60' : ''}`}>
    <span className={`rule ${light ? '!bg-white/30' : ''}`} />
    {children}
  </span>
);

/* ── Single shared IntersectionObserver hook ─────────────────────
   Fires once when element enters viewport, then disconnects.
   Pure CSS transitions handle the visual state — no RAF, no JS per frame. */
function useOnceVisible(margin = '-6%') {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return [ref, visible] as const;
}

/* ── CSS-driven Reveal — opacity + translateY, GPU-composited ──── */
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

const Reveal = ({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const [ref, visible] = useOnceVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.5s ${EASE} ${delay}s, transform 0.5s ${EASE} ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

/* ── Stagger list — each child gets an incremental CSS delay ─────  */
function StaggerList({
  children, base = 0, step = 0.05, className = '', style,
}: {
  children: React.ReactNode[]; base?: number; step?: number; className?: string; style?: React.CSSProperties;
}) {
  const [ref, visible] = useOnceVisible('-5%');
  return (
    <div ref={ref} className={className} style={style}>
      {React.Children.map(children, (child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
              style: {
                ...(child.props as { style?: React.CSSProperties }).style,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(14px)',
                transition: `opacity 0.45s ${EASE} ${base + i * step}s, transform 0.45s ${EASE} ${base + i * step}s`,
                willChange: visible ? 'auto' : 'opacity, transform',
              },
            })
          : child
      )}
    </div>
  );
}

/* ── FlowDiagram: numbered boxes with CSS-stagger arrows ─────────  */
function FlowDiagram({ steps }: { steps: { step: string }[] }) {
  const [ref, visible] = useOnceVisible();
  return (
    <div ref={ref} className="w-full">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-12px)',
              transition: `opacity 0.4s ${EASE} ${i * 0.06}s, transform 0.4s ${EASE} ${i * 0.06}s`,
            }}
            className="flex items-start gap-3 px-4 py-3.5 rounded-2xl border border-hairline bg-paper"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink text-white text-[9px] font-semibold flex items-center justify-center tabular mt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm text-ink/80 leading-relaxed text-justify hyphens-auto">{s.step}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.25s ${EASE} ${i * 0.06 + 0.2}s`,
              }}
              className="flex flex-col items-center py-0.5"
              aria-hidden
            >
              <div className="w-px h-3 bg-hairline" />
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M5 7L0.67 0.875H9.33L5 7Z" fill="#D6D3D1" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO — Framer Motion only for entrance (runs once)
   ═══════════════════════════════════════════════════════════════ */
const springEase = [0.32, 0.72, 0, 1] as const;

function Hero() {
  const words = ['Gaurav', 'Mahale'];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-paper"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 65% 50%, rgba(200,170,120,0.06) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Portrait card — static, no scroll link */}
      <div
        className="hidden lg:flex absolute right-8 md:right-16 lg:right-24 inset-y-0 items-center pointer-events-none"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 60 }}
          transition={{ duration: 1.0, delay: 0.2, ease: springEase }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: 'clamp(240px, 30vw, 440px)',
              aspectRatio: '3 / 4',
              borderRadius: '1.75rem',
              boxShadow: '0 0 0 1.5px rgba(26,20,16,0.08), 0 32px 80px rgba(26,20,16,0.12)',
            }}
          >
            <img
              src="/profile.jpeg"
              alt="Gaurav Mahale"
              className="h-full w-full object-cover object-top scale-[1.12] origin-top"
              style={{ filter: 'brightness(1.02) contrast(1.08) saturate(1.06)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Text — Framer Motion entrance only, no scroll link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-24">

        {/* Name — word slide */}
        <h1
          className="mt-8 font-display font-light leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: '#1A1410' }}
        >
          {words.map((word, wi) => (
            <motion.span key={wi} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.3 + wi * 0.1, ease: springEase }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        {/* Role tag */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.48s forwards` }}>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: 'rgba(26,20,16,0.35)' }}>
            AI Product Manager · Builder · Finance Domain Expert
          </p>
        </div>

        {/* Summary */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.55s forwards` }}>
          <p
            className="mt-5 max-w-xl text-base md:text-xl font-normal leading-relaxed"
            style={{ color: 'rgba(26,20,16,0.65)', letterSpacing: '-0.01em' }}
          >
            I find the problems banks haven&rsquo;t solved —
            then build AI products that solve them.
          </p>
          <p
            className="mt-3 max-w-xl text-sm md:text-base font-normal leading-relaxed"
            style={{ color: 'rgba(26,20,16,0.45)' }}
          >
            9 years in credit risk and banking. 3 LLM platforms shipped solo, from blank canvas to live users.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.65s forwards` }}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-all duration-500"
              style={{ background: '#1A1410', color: '#FDFBF7' }}
            >
              View my work
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px">
                <ArrowDown size={14} />
              </span>
            </a>
            <a
              href="mailto:mahalegauravk@gmail.com"
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium border transition-all duration-500"
              style={{ borderColor: 'rgba(26,20,16,0.18)', color: 'rgba(26,20,16,0.7)', background: 'transparent' }}
            >
              Let&rsquo;s talk
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px"
                style={{ background: 'rgba(26,20,16,0.06)' }}>
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        {/* Proof chips */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.82s forwards` }}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              'Yes Bank · HDFC Bank',
              '3 LLM products live',
              '500+ monthly active users',
              'Pareto.AI evaluator',
            ].map((chip, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-full px-3 py-1.5"
                style={{ color: 'rgba(26,20,16,0.5)', border: '1px solid rgba(26,20,16,0.1)', background: 'rgba(26,20,16,0.02)' }}>
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(26,20,16,0.3)' }} />
                {chip}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{
          color: 'rgba(26,20,16,0.25)',
          opacity: 0,
          animation: `fadeIn 1s ease 1.4s forwards`,
        }}
      >
        <div style={{ animation: 'bounce 2s ease-in-out infinite' }}>
          <ArrowDown size={16} weight="light" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROOF STRIP — 4 key numbers between hero and work
   ═══════════════════════════════════════════════════════════════ */
function ProofStrip() {
  const stats = [
    { num: '9+',      label: 'Years in banking & credit',    sub: 'Yes Bank · HDFC Bank · Suraksha ARC' },
    { num: '3',       label: 'LLM products shipped, solo',   sub: 'Idea → strategy → live users' },
    { num: '500+',    label: 'Monthly active users',         sub: 'AI-Spirit — zero paid acquisition' },
    { num: '₹500Cr+', label: 'Portfolios managed',           sub: 'Wholesale credit at Yes Bank' },
  ];
  return (
    <section className="bg-paper" style={{ borderTop: '1px solid rgba(26,20,16,0.08)', borderBottom: '1px solid rgba(26,20,16,0.08)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <StaggerList base={0} step={0.07} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map(s => (
            <div key={s.num}>
              <p className="font-display font-light text-3xl md:text-[2.5rem] text-ink tracking-tight leading-none">{s.num}</p>
              <p className="mt-3 text-sm font-semibold text-ink">{s.label}</p>
              <p className="mt-1 text-xs text-ink-muted leading-snug">{s.sub}</p>
            </div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK — cards navigate to /project/:slug
   ═══════════════════════════════════════════════════════════════ */
function SelectedWork() {
  return (
    <section id="work" className="relative py-14 md:py-36 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal delay={0.06}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">Selected Work</p>
          <h2 className="font-display font-light text-4xl md:text-6xl leading-[0.95] tracking-tight text-ink">
            Three problems.<br />
            <em className="italic font-normal text-ink-muted">Three products shipped.</em>
          </h2>
          <p className="mt-6 max-w-lg text-sm md:text-base text-ink/55 leading-relaxed">
            Each built solo — from problem discovery to live product — at the intersection of AI and financial services.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((project, idx) => (
            <React.Fragment key={idx}>
            <Reveal delay={0.06 + idx * 0.08} className="flex flex-col">
              <Link
                to={`/project/${project.slug}`}
                className="bezel flex flex-col h-full group"
                style={{ textDecoration: 'none', background: '#FDFBF7' }}
              >
                <div
                  className="bezel-core flex flex-col h-full overflow-hidden"
                  style={{ background: '#FDFBF7', borderRadius: 'calc(2rem - 0.375rem)' }}
                >
                  {/* Screenshot image */}
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 'clamp(160px, 30vw, 220px)' }}>
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                        style={{ filter: 'brightness(0.88) saturate(0.95)' }}
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(253,251,247,0.95) 100%)' }}
                      aria-hidden
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="font-display italic text-sm font-medium border border-hairline text-ink px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(253,251,247,0.92)', backdropFilter: 'blur(8px)' }}
                      >
                        {project.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Eyebrow>{project.category === 'build' ? 'Shipped Product' : 'Case Study'}</Eyebrow>
                      <span className="font-display italic text-xs text-ink-muted whitespace-nowrap">{project.date}</span>
                    </div>
                    <h3 className="font-display font-light text-[1.55rem] md:text-[1.65rem] text-ink leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    {/* Impact metric — prominent */}
                    <div className="mt-4 mb-4 py-3 border-y border-hairline flex items-baseline gap-2">
                      <span className="font-display font-light text-2xl text-ink tracking-tight leading-none">{project.metrics}</span>
                      <span className="text-xs text-ink-muted">
                        {project.slug === 'ai-persona-interaction-platform' && 'monthly active users, organic'}
                        {project.slug === 'ai-credit-intelligence-platform' && 'reduction in analyst prep time'}
                        {project.slug === 'automated-job-discovery-agent' && 'top-of-funnel discovery automated'}
                      </span>
                    </div>
                    <p
                      className="text-sm text-ink/60 leading-relaxed font-normal"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      } as React.CSSProperties}
                    >
                      {project.description}
                    </p>
                    <div className="flex-1 min-h-[1rem]" />
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="text-[11px] tracking-wide text-ink-muted border border-hairline rounded-full px-2.5 py-0.5">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[11px] text-ink-muted px-1.5 py-0.5">+{project.tech.length - 4}</span>
                      )}
                    </div>
                    <div className="mt-5 pt-4 border-t border-hairline">
                      <div className="flex items-center justify-between text-sm font-medium text-ink">
                        <span>Read case study</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                          <ArrowRight size={13} weight="light" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRAJECTORY
   ═══════════════════════════════════════════════════════════════ */

const ROLE_HIGHLIGHTS: Record<string, string> = {
  'Pareto.AI': 'Evaluating and fine-tuning LLMs on financial workflows against expert-authored benchmarks',
  'Yes Bank Limited': '₹500Cr+ wholesale credit portfolio · authored 100+ Credit Appraisal Memorandums',
  'HDFC Bank Limited': 'PowerBI dashboards tracking default probability across ₹200Cr+ portfolio in real time',
  'Suraksha Asset Reconstruction Ltd.': 'Assessed a ₹9,000Cr IBC case — one of India\'s largest corporate stress resolutions',
};

function Trajectory() {
  return (
    <section id="trajectory" className="relative py-14 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal delay={0.06}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">Career</p>
          <h2 className="font-display font-light text-4xl md:text-6xl leading-[0.95] tracking-tight text-ink">
            Nine years building<br />
            <em className="italic font-normal text-ink-muted">the rarest combination.</em>
          </h2>
          <p className="mt-6 max-w-lg text-sm md:text-base text-ink/55 leading-relaxed">
            Deep banking domain expertise meets AI product thinking. Neither alone is enough — together, they&rsquo;re rare.
          </p>
        </Reveal>

        <div className="mt-20 relative">
          <span className="hidden md:block absolute left-[24%] top-0 bottom-0 w-px bg-ink/15" aria-hidden />
          <StaggerList base={0} step={0.08} className="space-y-14 md:space-y-20">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-6 md:gap-10 relative">
                <div className="md:col-span-3">
                  <p className="font-display italic text-ink-muted text-base">{exp.period}</p>
                  <span className={`mt-2 eyebrow ${exp.type === 'AI' ? '!border-stone-300 !bg-stone-50 text-stone-600' : ''}`}>
                    {exp.type}
                  </span>
                </div>
                <span className="hidden md:block absolute left-[24%] top-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-ink ring-4 ring-paper" aria-hidden />
                <div className="md:col-span-9 md:pl-8">
                  <h3 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight tracking-tight">{exp.role}</h3>
                  <p className="mt-1 text-sm font-medium text-ink-muted">{exp.company}</p>
                  {/* Peak achievement highlight */}
                  {ROLE_HIGHLIGHTS[exp.company] && (
                    <p className="mt-3 text-sm font-medium text-ink/80 italic border-l-2 border-ink/20 pl-3">
                      {ROLE_HIGHLIGHTS[exp.company]}
                    </p>
                  )}
                  <ul className="mt-5 space-y-3">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex gap-3 text-base text-ink/75 font-normal leading-relaxed">
                        <span className="flex-shrink-0 mt-2.5 block w-4 h-px bg-ink-muted/50" aria-hidden />
                        <span className="text-justify hyphens-auto">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </StaggerList>
        </div>

        <StaggerList base={0} step={0.08} className="mt-24 grid md:grid-cols-2 gap-4">
          {[
            {
              icon: <GraduationCap size={20} weight="light" className="text-ink" />,
              label: 'Education',
              items: EDUCATION_DATA.map(e => ({ title: e.institution, sub: e.degree, meta: e.year })),
            },
            {
              icon: <SealCheck size={20} weight="light" className="text-ink" />,
              label: 'Certifications',
              items: CERTIFICATIONS_DATA.map(c => ({ title: c.name, sub: c.issuer, meta: c.year })),
            },
          ].map((block, bi) => (
            <div key={bi} className="bezel">
              <div className="bezel-core p-8">
                <header className="flex items-center gap-3 mb-6">
                  {block.icon}
                  <Eyebrow>{block.label}</Eyebrow>
                </header>
                <div className="space-y-5">
                  {block.items.map((item, ii) => (
                    <div key={ii} className="flex justify-between gap-4 items-start">
                      <div>
                        <h4 className="font-display font-light text-lg text-ink leading-snug">{item.title}</h4>
                        <p className="text-sm text-ink-muted mt-0.5">{item.sub}</p>
                      </div>
                      <span className="text-xs text-ink-muted tabular flex-shrink-0 pt-1">{item.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOOLKIT
   ═══════════════════════════════════════════════════════════════ */
const TOOLKIT_GROUPS = [
  {
    label: 'Build',
    context: 'The full-stack I use to ship LLM products end-to-end',
    items: ['Next.js', 'Python · FastAPI', 'TypeScript', 'Supabase', 'Vercel', 'Flask'],
  },
  {
    label: 'Reason',
    context: 'AI providers I route, evaluate, and fine-tune',
    items: ['Claude API', 'Gemini 1.5 Flash', 'Groq · Llama 3.3', 'Ollama · Mistral 7B', 'OpenAI'],
  },
  {
    label: 'Ship · Measure',
    context: 'How I validate hypotheses and iterate on data',
    items: ['LLM Evals', 'Prompt Architecture', 'Mixpanel', 'A/B Testing', 'PowerBI'],
  },
];

function Toolkit() {
  return (
    <section id="toolkit" className="relative py-14 md:py-28 bg-paper">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <Reveal delay={0.06}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">Toolkit</p>
          <h2
            className="font-display font-light leading-[0.95] tracking-tight max-w-3xl text-ink"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            How the work<br />
            <em className="italic font-normal text-ink-muted">actually gets done.</em>
          </h2>
        </Reveal>

        <StaggerList base={0} step={0.06} className="mt-20 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {TOOLKIT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] uppercase tracking-[0.22em] font-medium mb-1 text-ink-muted">
                {group.label}
              </p>
              <p className="text-xs text-ink/40 mb-6 leading-snug">{group.context}</p>
              <ul className="space-y-2.5">
                {group.items.map(item => (
                  <li key={item} className="font-display font-light text-xl md:text-2xl tracking-tight text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="relative py-14 md:py-36 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <Reveal delay={0.06}>
          <h2 className="mt-8 font-display font-light leading-[0.95] tracking-tight text-ink"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            Let&rsquo;s build<br />
            <em className="italic font-normal text-ink-muted">something real.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-xl mx-auto text-base md:text-lg text-ink/70 font-normal leading-relaxed">
            Whether it&rsquo;s an AI PM role, scaling an LLM product, or navigating a complex
            regulated system — I&rsquo;m comfortable with all three.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {['AI Product Manager', 'LLM product teams', 'Series A–C startups', 'Fintech / RegTech'].map((tag, i) => (
              <span key={i} className="text-[11px] font-medium rounded-full px-3 py-1.5"
                style={{ color: 'rgba(26,20,16,0.45)', border: '1px solid rgba(26,20,16,0.1)', background: 'rgba(26,20,16,0.02)' }}>
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:mahalegauravk@gmail.com" className="btn-pill">
              mahalegauravk@gmail.com
              <span className="btn-pill-icon"><PaperPlaneTilt size={14} weight="light" /></span>
            </a>
            <div className="flex gap-2">
              {[
                { href: 'https://linkedin.com/in/mahalegauravk', label: 'LinkedIn', icon: <LinkedinLogo size={18} weight="light" /> },
                { href: 'https://github.com/gmpro-cr', label: 'GitHub', icon: <GithubLogo size={18} weight="light" /> },
                { href: 'https://x.com/mahalegauravk', label: 'X', icon: <XMark size={16} /> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE ROOT + CSS keyframes
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
      <div className="font-sans text-ink overflow-x-hidden">
        <Hero />
        <ProofStrip />
        <SelectedWork />
        <Trajectory />
        <Toolkit />
        <Contact />
      </div>
    </>
  );
}

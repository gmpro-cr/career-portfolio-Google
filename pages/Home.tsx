import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  CaretRight,
} from '@phosphor-icons/react';
import { EXPERIENCES, PROJECTS, EDUCATION_DATA, CERTIFICATIONS_DATA, getTheme } from '../constants';
import XMark from '../components/XMark';

/* ── Single shared IntersectionObserver hook ─────────────────────
   Fires once when element enters viewport, then disconnects.
   Pure CSS transitions handle the visual state — no RAF, no JS per frame. */
function useOnceVisible(margin = '-6%') {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Content must never stay hidden when the reveal can't run:
    // no IO support, reduced motion, or a hidden tab (headless renderers,
    // link-preview bots, background tabs where rAF/IO are paused).
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    const fallback = document.visibilityState === 'hidden'
      ? window.setTimeout(() => setVisible(true), 300)
      : undefined;
    return () => { obs.disconnect(); if (fallback) clearTimeout(fallback); };
  }, [margin]);
  return [ref, visible] as const;
}

/* ── CSS-driven Reveal — opacity + translateY, GPU-composited ──── */
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

/* Same reveal motion as <Reveal>, but returns ref+style to spread directly
   onto an existing element (e.g. a <details> row) instead of adding a
   wrapper div — keeps CSS :first-child/sibling selectors intact. */
function useRevealStyle(delay = 0) {
  const [ref, visible] = useOnceVisible('-8%');
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(14px)',
    transition: `opacity 0.55s ${EASE} ${delay}s, transform 0.55s ${EASE} ${delay}s`,
    willChange: visible ? 'auto' : 'opacity, transform',
  };
  return [ref, style] as const;
}

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
        transform: visible ? 'none' : 'translateY(18px)',
        filter: visible ? 'none' : 'blur(8px)',
        transition: `opacity 0.65s ${EASE} ${delay}s, transform 0.65s ${EASE} ${delay}s, filter 0.65s ${EASE} ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   HERO — compact, conversational; entrance fades only, no scroll link
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-paper">
      {/* Faint diagonal streaks + soft accent blobs, hero-only */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden style={{ height: 640 }}>
        {[
          { top: 40, left: '8%', width: 130 },
          { top: 90, left: '16%', width: 90 },
          { top: 20, left: '30%', width: 80 },
          { top: 130, left: '46%', width: 110 },
          { top: 55, left: '70%', width: 100 },
          { top: 160, left: '82%', width: 80 },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute h-px"
            style={{
              top: s.top, left: s.left, width: s.width,
              background: 'linear-gradient(90deg, transparent, rgba(26,20,16,0.09), transparent)',
              transform: 'rotate(-32deg)',
            }}
          />
        ))}
        <span
          className="absolute rounded-full"
          style={{ width: 240, height: 240, top: 20, right: -70, background: 'radial-gradient(circle at 40% 40%, #F5F3FF, transparent 70%)', filter: 'blur(2px)' }}
        />
        <span
          className="absolute rounded-full"
          style={{ width: 170, height: 170, top: 300, left: -50, background: 'radial-gradient(circle at 60% 40%, #FFFBEB, transparent 70%)', filter: 'blur(2px)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-6 md:pb-10">
        <div className="flex items-start justify-between gap-4 sm:gap-6" style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.1s forwards` }}>
          <div className="min-w-0">
            <h1 className="font-display font-light leading-[1.05] tracking-[-0.02em]" style={{ fontSize: 'clamp(2.1rem, 8vw, 3.4rem)', color: '#1A1410' }}>
              hey, I&rsquo;m <b className="font-medium">Gaurav</b>
            </h1>
            <p className="mt-2.5 font-display italic" style={{ fontSize: '1.05rem', color: 'rgba(26,20,16,0.55)' }}>
              nine years in banking, now building AI products full&#8209;time
            </p>
          </div>
          <div
            className="flex-shrink-0"
            style={{ opacity: 0, animation: `popIn 0.6s ${EASE} 0.2s forwards` }}
          >
            <div
              className="rounded-full overflow-hidden w-[68px] h-[68px] sm:w-[104px] sm:h-[104px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-rotate-3 hover:scale-105"
              style={{ boxShadow: '0 0 0 1px rgba(26,20,16,0.1), 0 14px 28px -12px rgba(26,20,16,0.22)' }}
            >
              <img src="/profile-avatar.png" alt="Gaurav Mahale" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-xl flex flex-col gap-3" style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.25s forwards` }}>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
            Currently <b className="font-semibold text-ink">evaluating &amp; fine&#8209;tuning LLMs</b> at Pareto.AI, and{' '}
            <b className="font-semibold text-ink">building AI products independently</b> &mdash; five LLM platforms and two browser&#8209;native learning tools, all live.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
            Spent 9 years writing <b className="font-semibold text-ink">credit appraisal memos</b> at Yes Bank and HDFC &mdash; turns out that&rsquo;s good training for writing prompts.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
            Open to <b className="font-semibold text-ink">AI Product Management</b> roles. Based in Pune, happy to go remote.{' '}
            <a href="/Gaurav_Mahale_Resume.pdf" download className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink transition-colors">
              Download CV
            </a>
          </p>
        </div>

        <div className="mt-7 flex gap-2.5" style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.4s forwards` }}>
          <a href="mailto:mahalegauravk@gmail.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-10px_rgba(26,20,16,0.3)]">
            <EnvelopeSimple size={16} weight="light" />
          </a>
          <a href="https://www.linkedin.com/in/mahalegauravk" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-10px_rgba(26,20,16,0.3)]">
            <LinkedinLogo size={16} weight="light" />
          </a>
          <a href="https://github.com/gmpro-cr" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-10px_rgba(26,20,16,0.3)]">
            <GithubLogo size={16} weight="light" />
          </a>
          <a href="https://x.com/mahalegauravk" target="_blank" rel="noreferrer" aria-label="X" className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-10px_rgba(26,20,16,0.3)]">
            <XMark size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH STACK — deduped tools across all six shipped projects
   ═══════════════════════════════════════════════════════════════ */
const TECH_STACK = [
  'Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL',
  'Supabase', 'Gemini API', 'Claude API', 'WASM (Pyodide / PGlite)', 'WebSocket', 'Tailwind CSS', 'Vercel',
];

function TechStack() {
  return (
    <section className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-display italic text-ink-muted" style={{ fontSize: '0.85rem' }}>tech stack</span>
          <h2 className="mt-1 font-display font-light text-2xl text-ink tracking-tight">What I build with</h2>
        </Reveal>
        <div className="mt-5 flex flex-wrap gap-2">
          {TECH_STACK.map((t, i) => (
            <React.Fragment key={t}>
              <Reveal delay={0.06 + i * 0.035} className="inline-block">
                <span
                  className="text-sm border border-hairline bg-white rounded-full px-4 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_8px_16px_-10px_rgba(26,20,16,0.25)]"
                  style={{ color: 'rgba(26,20,16,0.75)' }}
                >
                  {t}
                </span>
              </Reveal>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK — cards navigate to /project/:slug
   ═══════════════════════════════════════════════════════════════ */
function SelectedWork() {
  return (
    <section id="work" className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-display italic text-ink-muted" style={{ fontSize: '0.85rem' }}>portfolio</span>
          <h2 className="mt-1 font-display font-light text-2xl text-ink tracking-tight">Featured Projects</h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, idx) => {
            const theme = getTheme(project.slug);
            return (
            <React.Fragment key={project.slug}>
            <Reveal delay={0.04 + idx * 0.05} className="flex flex-col">
              <Link
                to={`/project/${project.slug}`}
                className="group flex flex-col h-full rounded-2xl border border-hairline overflow-hidden bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_20px_36px_-24px_rgba(26,20,16,0.28)]"
                style={{ textDecoration: 'none' }}
              >
                {/* Screenshot thumbnail */}
                <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 120 }}>
                  <span
                    className="absolute top-2.5 left-2.5 z-10 h-2 w-2 rounded-full"
                    style={{ background: theme.accent }}
                    aria-hidden
                  />
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                      style={{ filter: 'saturate(0.94)' }}
                    />
                  )}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] text-ink-muted/70 tabular">{project.date} &middot; {project.metrics}</span>
                  <h3 className="mt-1.5 font-display font-medium text-[15px] leading-tight text-ink tracking-tight">
                    {project.title}
                  </h3>
                  <p
                    className="mt-1.5 text-xs text-ink/65 leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden',
                    } as React.CSSProperties}
                  >
                    {project.cardSummary ?? project.description}
                  </p>
                  <div className="flex-1 min-h-[0.5rem]" />
                  <div className="flex items-center justify-between gap-2 mt-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[9px] text-ink-muted/70 border border-hairline rounded-full px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ color: theme.accent }}
                    >
                      <ArrowRight size={12} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
            </React.Fragment>
          );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRAJECTORY — row-list, click to expand (mirrors the project cards'
   own expand-in-place pattern, via the native <details> element)
   ═══════════════════════════════════════════════════════════════ */
const EXPERIENCE_BADGES: Record<string, string> = {
  'Yes Bank Limited': 'YB',
  'Pareto.AI': 'AI',
  'HDFC Bank Limited': 'HD',
  'Suraksha Asset Reconstruction Ltd.': 'SA',
};

function ExperienceRow({ exp, delay, defaultOpen }: { exp: (typeof EXPERIENCES)[number]; delay: number; defaultOpen: boolean }) {
  const [ref, style] = useRevealStyle(delay);
  return (
    <details ref={ref as React.Ref<HTMLDetailsElement>} className="group border-b border-hairline first:border-t" open={defaultOpen} style={style}>
      <summary className="list-none cursor-pointer py-4 flex items-start gap-3.5 transition-colors duration-300 hover:bg-shell/60 rounded-lg px-2 -mx-2 [&::-webkit-details-marker]:hidden">
        <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-full border border-hairline bg-shell grid place-items-center font-display italic text-xs text-ink-muted transition-transform duration-300 group-hover:scale-105">
          {EXPERIENCE_BADGES[exp.company] ?? exp.company.slice(0, 2).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-ink">{exp.role}</span>
          <span className="block text-xs text-ink-muted mt-0.5">{exp.company}</span>
        </span>
        <span className="flex-shrink-0 flex items-start gap-2 pl-1 mt-0.5">
          <span className="text-xs text-ink-muted/70 tabular text-right max-w-[6rem] sm:max-w-none">{exp.period}</span>
          <CaretRight size={11} className="flex-shrink-0 mt-0.5 text-ink-muted/70 transition-transform duration-200 details-caret" />
        </span>
      </summary>
      <ul className="ml-[3.15rem] mb-4 space-y-2 max-w-[56ch]">
        {exp.description.map((desc, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-ink/70 leading-relaxed">
            <span className="flex-shrink-0 mt-2 block w-3 h-px bg-ink-muted/50" aria-hidden />
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

function MiniRow({ title, sub, meta, delay }: { title: string; sub: string; meta: string; delay: number }) {
  const [ref, style] = useRevealStyle(delay);
  return (
    <div ref={ref} className="flex items-baseline justify-between gap-3 py-3 border-b border-hairline first:border-t text-sm" style={style}>
      <span className="font-semibold text-ink">{title}</span>
      <span className="text-ink-muted text-xs flex-1 text-right truncate">{sub}</span>
      <span className="text-ink-muted/70 text-[11px] tabular flex-shrink-0">{meta}</span>
    </div>
  );
}

function Trajectory() {
  return (
    <section id="trajectory" className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-display italic text-ink-muted" style={{ fontSize: '0.85rem' }}>career</span>
          <h2 className="mt-1 font-display font-light text-2xl text-ink tracking-tight">Work Experience</h2>
        </Reveal>

        <div className="mt-6 flex flex-col">
          {EXPERIENCES.map((exp, i) => (
            <React.Fragment key={i}>
              <ExperienceRow exp={exp} delay={i * 0.07} defaultOpen={i === 0} />
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <Reveal>
              <span className="font-display italic text-ink-muted" style={{ fontSize: '0.8rem' }}>academic</span>
              <h2 className="mt-1 font-display font-light text-xl text-ink tracking-tight">Education</h2>
            </Reveal>
            <div className="mt-3">
              {EDUCATION_DATA.map((e, i) => (
                <React.Fragment key={e.id}>
                  <MiniRow title={e.institution} sub={e.degree} meta={e.year} delay={i * 0.07} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <span className="font-display italic text-ink-muted" style={{ fontSize: '0.8rem' }}>credentials</span>
              <h2 className="mt-1 font-display font-light text-xl text-ink tracking-tight">Certifications</h2>
            </Reveal>
            <div className="mt-3">
              {CERTIFICATIONS_DATA.map((c, i) => (
                <React.Fragment key={c.id}>
                  <MiniRow title={c.name} sub={c.issuer} meta={c.year} delay={i * 0.07} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
/* ── Magnetic pill — leans toward the cursor, springs back ──────── */
function MagneticLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.a href={href} className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.a>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <div
            className="rounded-[22px] border border-hairline text-center py-16 md:py-20 px-6"
            style={{
              backgroundImage: 'radial-gradient(#E7E5E4 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          >
            <span className="font-display italic text-ink-muted" style={{ fontSize: '0.85rem' }}>get in touch</span>
            <h2 className="mt-2 font-display font-light text-2xl md:text-3xl text-ink tracking-tight">
              I&rsquo;d love to build something real together.
            </h2>
            <MagneticLink href="mailto:mahalegauravk@gmail.com" className="btn-pill mt-8 inline-flex">
              Say hello
              <span className="btn-pill-icon"><PaperPlaneTilt size={14} weight="light" /></span>
            </MagneticLink>
            <div className="mt-6 flex justify-center gap-2">
              {[
                { href: 'https://linkedin.com/in/mahalegauravk', label: 'LinkedIn', icon: <LinkedinLogo size={16} weight="light" /> },
                { href: 'https://github.com/gmpro-cr', label: 'GitHub', icon: <GithubLogo size={16} weight="light" /> },
                { href: 'https://x.com/mahalegauravk', label: 'X', icon: <XMark size={14} /> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-10px_rgba(26,20,16,0.3)]">
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
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.86); }
          to   { opacity: 1; transform: scale(1); }
        }
        details[open] .details-caret {
          transform: rotate(90deg);
        }
      `}</style>
      <div className="font-sans text-ink overflow-x-hidden">
        <Hero />
        <TechStack />
        <SelectedWork />
        <Trajectory />
        <Contact />
      </div>
    </>
  );
}

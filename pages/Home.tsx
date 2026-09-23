import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  EnvelopeSimple,
  CaretRight,
  ArrowsLeftRight,
  FilePdf,
} from '@phosphor-icons/react';
import {
  NextjsMark, ReactMark, TypeScriptMark, PythonMark, FastApiMark, PostgreSqlMark,
  SupabaseMark, GeminiMark, ClaudeMark, WasmMark, TailwindMark, VercelMark,
} from '../components/BrandIcons';
import { EXPERIENCES, PROJECTS, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

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
    transform: visible ? 'none' : 'translateY(8px)',
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
        transform: visible ? 'none' : 'translateY(8px)',
        transition: `opacity 0.5s ${EASE} ${delay}s, transform 0.5s ${EASE} ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
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
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-6 md:pb-10">
        <div className="flex items-start justify-between gap-4 sm:gap-6" style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.1s forwards` }}>
          <div className="min-w-0">
            <h1 className="font-display font-normal leading-[1.05] tracking-tight text-ink" style={{ fontSize: 'clamp(2.1rem, 8vw, 3.4rem)' }}>
              Gaurav Mahale
            </h1>
            <p className="mt-3 text-base sm:text-lg text-ink-muted">
              Product manager at Yes Bank. Nine years in banking and credit risk, and I design and ship LLM products.
            </p>
          </div>
          <div
            className="flex-shrink-0"
            style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.1s forwards` }}
          >
            <div
              className="rounded-full overflow-hidden w-[68px] h-[68px] sm:w-[104px] sm:h-[104px]"
              style={{ boxShadow: '0 0 0 1px rgba(26,20,16,0.1), 0 14px 28px -12px rgba(26,20,16,0.22)' }}
            >
              <img src="/profile-avatar.png" alt="Gaurav Mahale" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-xl flex flex-col gap-3" style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.25s forwards` }}>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
            Currently evaluating &amp; fine&#8209;tuning LLMs at Pareto.AI, and{' '}
            building AI products independently. Five LLM platforms and two browser&#8209;native learning tools, all live.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
            Writing credit appraisal memos at Yes Bank and HDFC turned out to be good training for writing prompts.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
            Open to AI Product Management roles. Based in Pune, happy to go remote.{' '}
            <a href="/Gaurav_Mahale_Resume.pdf" download className="inline-flex items-center gap-1.5 text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink transition-colors">
              <FilePdf size={15} weight="light" aria-hidden className="shrink-0 text-ink-muted" />
              Download CV
            </a>
          </p>
        </div>

        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm" style={{ opacity: 0, animation: `fadeUp 0.6s ${EASE} 0.4s forwards` }}>
          {[
            { href: 'mailto:mahalegauravk@gmail.com', label: 'Email' },
            { href: 'https://www.linkedin.com/in/mahalegauravk', label: 'LinkedIn', external: true },
            { href: 'https://github.com/gmpro-cr', label: 'GitHub', external: true },
            { href: 'https://x.com/mahalegauravk', label: 'X', external: true },
          ].map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH STACK — deduped tools across all six shipped projects
   ═══════════════════════════════════════════════════════════════ */
/* Official brand marks in official brand colours, geometry pulled from
   simple-icons by scripts/gen-brand-icons.mjs rather than drawn by hand.
   WebSocket is the one exception -- it is a protocol, not a product, and has no
   brand mark, so it keeps a semantic Phosphor glyph in ink. */
const TECH_STACK = [
  { name: 'Next.js', icon: <NextjsMark size={14} /> },
  { name: 'React', icon: <ReactMark size={14} /> },
  { name: 'TypeScript', icon: <TypeScriptMark size={14} /> },
  { name: 'Python', icon: <PythonMark size={14} /> },
  { name: 'FastAPI', icon: <FastApiMark size={14} /> },
  { name: 'PostgreSQL', icon: <PostgreSqlMark size={14} /> },
  { name: 'Supabase', icon: <SupabaseMark size={14} /> },
  { name: 'Gemini API', icon: <GeminiMark size={14} /> },
  { name: 'Claude API', icon: <ClaudeMark size={14} /> },
  { name: 'WASM (Pyodide / PGlite)', icon: <WasmMark size={14} /> },
  { name: 'WebSocket', icon: <ArrowsLeftRight size={14} weight="light" className="text-ink-muted" /> },
  { name: 'Tailwind CSS', icon: <TailwindMark size={14} /> },
  { name: 'Vercel', icon: <VercelMark size={14} /> },
];

function TechStack() {
  return (
    <section className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="font-display font-light text-2xl text-ink tracking-tight">Tools I build with</h2>
        </Reveal>
        <Reveal>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm" style={{ color: 'rgba(26,20,16,0.75)' }}>
            {TECH_STACK.map(({ name, icon }) => (
              <li key={name} className="inline-flex items-center gap-2">
                <span className="shrink-0 grid place-items-center" aria-hidden>{icon}</span>
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK — cards navigate to /project/:slug
   ═══════════════════════════════════════════════════════════════ */
function ProjectRow({ project, delay }: { project: (typeof PROJECTS)[number]; delay: number }) {
  const [ref, style] = useRevealStyle(delay);
  return (
    <li ref={ref as React.Ref<HTMLLIElement>} className="border-b border-hairline first:border-t" style={style}>
      <Link
        to={`/project/${project.slug}`}
        className="group grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-4 sm:gap-6 py-6 rounded-lg px-2 -mx-2 transition-colors duration-300 hover:bg-shell/60"
        style={{ textDecoration: 'none' }}
      >
        {project.image && (
          <span className="hidden sm:block overflow-hidden rounded-md border border-hairline bg-white aspect-[16/10] self-start">
            <img
              src={project.image}
              alt=""
              aria-hidden
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </span>
        )}
        <span className="min-w-0 flex flex-col">
          <span className="flex items-baseline justify-between gap-4">
            <span className="font-display text-lg md:text-xl leading-snug text-ink tracking-tight underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-ink/40">
              {project.title}
            </span>
            <span className="flex-shrink-0 text-xs text-ink-muted tabular">{project.date}</span>
          </span>
          <span className="mt-2 text-sm text-ink/75 leading-relaxed max-w-[62ch]">
            {project.cardSummary ?? project.description}
          </span>
          <span className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
            {project.metrics && <span className="font-medium text-ink tabular">{project.metrics}</span>}
            {project.metrics && <span aria-hidden>&middot;</span>}
            <span>{project.tech.slice(0, 3).join(', ')}</span>
            <ArrowRight size={12} className="ml-auto text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
          </span>
        </span>
      </Link>
    </li>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="font-display font-light text-2xl text-ink tracking-tight">Selected work</h2>
        </Reveal>

        <ul className="mt-6 flex flex-col">
          {PROJECTS.map((project, idx) => (
            <React.Fragment key={project.slug}>
              <ProjectRow project={project} delay={idx * 0.04} />
            </React.Fragment>
          ))}
        </ul>
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

/* Real company marks. Yes Bank and Pareto publish only wide wordmarks (5.9:1
   and 1.8:1), which is why these sit in a wide lockup rather than the circular
   badge -- a wordmark squeezed into a 36px circle is an illegible smudge.
   Provenance and licensing: docs/company-logos.md. Any company without a file
   here falls back to the monogram badge. */
const EXPERIENCE_LOGOS: Record<string, string> = {
  'Yes Bank Limited': '/logos/yes-bank.svg',
  'Pareto.AI': '/logos/pareto-ai.svg',
  'HDFC Bank Limited': '/logos/hdfc-bank.svg',
  'Suraksha Asset Reconstruction Ltd.': '/logos/suraksha-arc-mark.png',
};

function ExperienceRow({ exp, delay, defaultOpen }: { exp: (typeof EXPERIENCES)[number]; delay: number; defaultOpen: boolean }) {
  const [ref, style] = useRevealStyle(delay);
  return (
    <details ref={ref as React.Ref<HTMLDetailsElement>} className="group border-b border-hairline first:border-t" open={defaultOpen} style={style}>
      <summary className="list-none cursor-pointer py-4 flex items-start gap-3.5 transition-colors duration-300 hover:bg-shell/60 rounded-lg px-2 -mx-2 [&::-webkit-details-marker]:hidden">
        {EXPERIENCE_LOGOS[exp.company] ? (
          <span className="flex-shrink-0 mt-0.5 h-9 w-16 sm:w-20 grid place-items-center transition-transform duration-300 group-hover:scale-105">
            <img
              src={EXPERIENCE_LOGOS[exp.company]}
              alt=""
              aria-hidden
              loading="lazy"
              /* Explicit width AND height: these SVGs declare only a viewBox, and a
                 replaced element with no intrinsic size collapses to zero width
                 when left on w-auto. object-contain does the letterboxing, so
                 every logo occupies the same slot whatever its aspect ratio.
                 The slot is 24px rather than 20px so squarer marks (Pareto,
                 Suraksha) are not capped far smaller than the wide wordmarks;
                 the wordmarks are width-limited and unaffected by the change. */
              className="h-6 w-full object-contain object-left"
            />
          </span>
        ) : (
          <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-full border border-hairline bg-shell grid place-items-center font-display italic text-xs text-ink-muted transition-transform duration-300 group-hover:scale-105">
            {EXPERIENCE_BADGES[exp.company] ?? exp.company.slice(0, 2).toUpperCase()}
          </span>
        )}
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
      <span className="text-ink-muted/70 text-xs tabular flex-shrink-0">{meta}</span>
    </div>
  );
}

function Trajectory() {
  return (
    <section id="trajectory" className="relative py-8 md:py-12 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="font-display font-light text-2xl text-ink tracking-tight">Experience</h2>
        </Reveal>

        <div className="mt-6 flex flex-col">
          {EXPERIENCES.map((exp, i) => (
            <React.Fragment key={i}>
              <ExperienceRow exp={exp} delay={i * 0.07} defaultOpen={i === 0} />
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          <div id="education">
            <Reveal>
              <h2 className="font-display font-light text-xl text-ink tracking-tight">Education</h2>
            </Reveal>
            <div className="mt-3">
              {EDUCATION_DATA.map((e, i) => (
                <React.Fragment key={e.id}>
                  <MiniRow title={e.institution} sub={e.degree} meta={e.year} delay={i * 0.07} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div id="certifications">
            <Reveal>
              <h2 className="font-display font-light text-xl text-ink tracking-tight">Certifications</h2>
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
function Contact() {
  return (
    <section id="contact" className="relative py-12 md:py-16 bg-paper">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="border-t border-hairline pt-10 md:pt-12">
            <h2 className="font-display font-light text-2xl md:text-3xl text-ink tracking-tight">Contact</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(26,20,16,0.78)' }}>
              Open to AI Product Management roles. Email is the quickest way to reach me.
            </p>
            <a href="mailto:mahalegauravk@gmail.com" className="btn-pill mt-6 inline-flex">
              mahalegauravk@gmail.com
              <span className="btn-pill-icon"><EnvelopeSimple size={14} weight="light" /></span>
            </a>
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
        details[open] .details-caret {
          transform: rotate(90deg);
        }
      `}</style>
      <div className="font-sans text-ink overflow-x-hidden">
        <Hero />
        <SelectedWork />
        <TechStack />
        <Trajectory />
        <Contact />
      </div>
    </>
  );
}

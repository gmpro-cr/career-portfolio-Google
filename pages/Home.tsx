import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  GraduationCap,
  SealCheck,
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  FileText,
  MapPin,
  X,
} from '@phosphor-icons/react';
import { EXPERIENCES, PROJECTS, SKILL_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';
import { Project } from '../types';

/* ── X / Twitter icon ──────────────────────────────────────────── */
const XMark = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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

/* ── Animated counter (IntersectionObserver, no scroll link) ───── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          obs.disconnect();
          let start = 0;
          const step = 16;
          const increment = to / (1200 / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= to) { setCount(to); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, step);
        }
      },
      { rootMargin: '-10%' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref} className="tabular">{count}{suffix}</span>;
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
            <span className="text-sm text-ink/80 leading-relaxed">{s.step}</span>
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
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: '#0C0B09' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 65% 50%, rgba(255,248,235,0.04) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Portrait card — static, no scroll link */}
      <div
        className="hidden sm:flex absolute right-8 md:right-16 lg:right-24 inset-y-0 items-center pointer-events-none"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: springEase }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: 'clamp(180px, 24vw, 340px)',
              aspectRatio: '3 / 4',
              borderRadius: '1.75rem',
              boxShadow: '0 0 0 1.5px rgba(255,255,255,0.2), 0 40px 100px rgba(0,0,0,0.75)',
            }}
          >
            <img
              src="/profile.jpeg"
              alt="Gaurav Mahale"
              className="h-full w-full object-cover object-top"
              style={{ filter: 'brightness(0.95)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(12,11,9,0.5) 0%, rgba(12,11,9,0.1) 35%, transparent 65%)' }}
              aria-hidden
            />
          </div>
        </motion.div>
      </div>

      {/* Text — Framer Motion entrance only, no scroll link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">

        {/* Eyebrow */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.1s forwards` }}>
          <Eyebrow light>Open to AI PM roles · Pune, India</Eyebrow>
        </div>

        {/* Name — word slide */}
        <h1
          className="mt-8 font-display font-light leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: '#F5F0E8' }}
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

        {/* Summary */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.55s forwards` }}>
          <p
            className="mt-8 max-w-md text-base md:text-lg font-normal leading-relaxed"
            style={{ color: 'rgba(245,240,232,0.65)' }}
          >
            AI Product Builder and Finance Domain Expert with 9+ years in banking. Independently designed,
            built and shipped 3 LLM-based platforms. Experienced across the full product lifecycle: discovery,
            MVP scoping, prompt engineering, and iterative releases.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.65s forwards` }}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-all duration-500"
              style={{ background: '#F5F0E8', color: '#0C0B09' }}
            >
              View my work
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px">
                <ArrowDown size={14} />
              </span>
            </a>
            <a
              href="/Gaurav_Mahale_Resume.pdf"
              download
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium border transition-all duration-500"
              style={{ borderColor: 'rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.75)', background: 'transparent' }}
            >
              Download CV
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px"
                style={{ background: 'rgba(245,240,232,0.1)' }}>
                <FileText size={14} />
              </span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.75s forwards` }}>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
            {[
              { value: 500, suffix: '+', label: 'Monthly Active Users' },
              { value: 9, suffix: '+', label: 'Years in Finance & Credit' },
              { value: 3, suffix: '', label: 'AI Products Shipped' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display font-light tabular" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#F5F0E8', lineHeight: 1 }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.85s forwards` }}>
          <div className="mt-8 flex items-center gap-2 text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
            <MapPin size={12} weight="light" />
            <span>Pune, India · Open to remote &amp; hybrid</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{
          color: 'rgba(245,240,232,0.25)',
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
   CASE STUDY CONTENT
   ═══════════════════════════════════════════════════════════════ */
function CaseStudyOverview({ project }: { project: Project }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Problem</p>
        <p className="text-base text-ink leading-relaxed">{project.problem}</p>
      </div>
      {project.approach && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Approach</p>
          <ul className="space-y-3">
            {project.approach.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/85 leading-relaxed">
                <span className="text-ink-muted tabular flex-shrink-0 pt-px font-medium">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {project.keyInsights && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Key Insights</p>
          <div className="space-y-2">
            {project.keyInsights.map((item, i) => (
              <div key={i} className="bezel bezel-paper">
                <div className="bezel-core px-4 py-3 text-sm text-ink/85 leading-relaxed">{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {project.outcomes && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Outcomes</p>
          <ul className="space-y-2.5">
            {project.outcomes.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/90">
                <SealCheck size={15} weight="light" className="text-ink mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CaseStudyTechnical({ project }: { project: Project }) {
  if (!project.technicalDetails) return null;
  const { architecture, dataFlow } = project.technicalDetails;
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Architecture</p>
        <p className="text-base text-ink leading-relaxed">{architecture}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-4">Data Flow</p>
        <FlowDiagram steps={dataFlow} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Full Tech Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY MODAL — Framer Motion only for open/close
   ═══════════════════════════════════════════════════════════════ */
function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>('overview');

  useEffect(() => { setActiveTab('overview'); }, [project?.title]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.28, ease: springEase }}
            className="fixed inset-4 md:inset-8 lg:inset-x-[12%] lg:inset-y-[6%] z-50 bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-6 px-8 md:px-10 pt-8 pb-6 border-b border-hairline flex-shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>{project.category === 'build' ? 'Shipped' : 'Case Study'}</Eyebrow>
                  <span className="font-display italic text-sm text-ink-muted">{project.date}</span>
                  {project.metrics && <span className="font-display italic text-sm text-ink font-medium">{project.metrics}</span>}
                </div>
                <h2 className="mt-3 font-display font-light text-3xl md:text-4xl text-ink leading-tight tracking-tight">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose} aria-label="Close"
                className="flex-shrink-0 mt-1 h-10 w-10 rounded-full border border-hairline flex items-center justify-center text-ink-muted hover:text-ink hover:border-ink/30 transition-colors duration-200"
              >
                <X size={16} weight="light" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-8 md:px-10 py-4 border-b border-hairline flex-shrink-0">
              {(['overview', 'technical'] as const).map(tab => (
                <button
                  key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-medium capitalize transition-colors duration-200 ${
                    activeTab === tab ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 md:px-10 py-8">
              {activeTab === 'overview'
                ? <CaseStudyOverview project={project} />
                : <CaseStudyTechnical project={project} />
              }
            </div>

            {/* Footer */}
            {(project.link || project.githubUrl) && (
              <div className="flex items-center gap-5 px-8 md:px-10 py-5 border-t border-hairline flex-shrink-0">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink-muted transition-colors">
                    Live site <ArrowUpRight size={13} weight="light" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
                    <GithubLogo size={14} weight="light" /> View code
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK
   ═══════════════════════════════════════════════════════════════ */
function SelectedWork() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const handleOpen = useCallback((p: Project) => setOpenProject(p), []);
  const handleClose = useCallback(() => setOpenProject(null), []);

  return (
    <section id="work" className="relative py-20 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal><Eyebrow>Selected Work</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display font-light text-4xl md:text-6xl leading-[0.95] tracking-tight text-ink">
            Three products,<br />
            <em className="italic font-normal text-ink-muted">three problems solved.</em>
          </h2>
        </Reveal>

        <StaggerList base={0.05} step={0.06} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((project, idx) => (
            <article
              key={idx}
              className="bezel flex flex-col"
              style={{ transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
            >
              <div className="bezel-core p-6 md:p-7 flex flex-col h-full">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <Eyebrow>{project.category === 'build' ? 'Shipped' : 'Case Study'}</Eyebrow>
                  <span className="font-display italic text-sm text-ink-muted whitespace-nowrap">{project.metrics}</span>
                </div>
                <h3 className="font-display font-light text-2xl md:text-[1.6rem] text-ink leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-muted/70">{project.date}</p>
                <p className="mt-4 text-sm text-ink/70 leading-relaxed font-normal flex-1">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((t, i) => (
                    <span key={i} className="text-[11px] tracking-wide text-ink-muted border border-hairline rounded-full px-2.5 py-1">{t}</span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="text-[11px] text-ink-muted px-2.5 py-1">+{project.tech.length - 5} more</span>
                  )}
                </div>
                <div className="mt-6 pt-5 border-t border-hairline">
                  <button
                    onClick={() => handleOpen(project)}
                    className="group w-full flex items-center justify-between text-sm font-medium text-ink hover:opacity-70 transition-opacity duration-200"
                  >
                    <span>View case study</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight size={13} weight="light" />
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </StaggerList>
      </div>

      <CaseStudyModal project={openProject} onClose={handleClose} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THESIS
   ═══════════════════════════════════════════════════════════════ */
function Thesis() {
  return (
    <section id="thesis" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#1A1410' }}>
      <div className="grain" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(255,248,235,0.04) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <Reveal><Eyebrow light>Thesis</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2
            className="mt-10 font-display font-light leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', color: '#F5F0E8' }}
          >
            "Pure domain depth, combined with the ability to actually build and ship
            working AI products, creates the highest-leverage solutions possible."
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-6">
            <p className="leading-relaxed font-normal text-base" style={{ color: 'rgba(245,240,232,0.6)' }}>
              I build platforms on Next.js, Python, Supabase and frontier LLMs (Claude, Gemini, Groq).
              My technical edge is paired with rigorous product validation, prompt architectures, and structured evaluations.
            </p>
            <p className="leading-relaxed font-normal text-base" style={{ color: 'rgba(245,240,232,0.6)' }}>
              Previously, I managed high-stakes portfolios exceeding ₹9,000 Cr and authored credit proposals equivalent
              to enterprise PRDs. I don&rsquo;t just write requirements — I validate ideas, architect prompts, and ship the MVP.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRAJECTORY
   ═══════════════════════════════════════════════════════════════ */
function Trajectory() {
  return (
    <section id="trajectory" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal><Eyebrow>Trajectory</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display font-light text-4xl md:text-6xl leading-[0.95] tracking-tight text-ink">
            Nine years<br />
            <em className="italic font-normal text-ink-muted">across two worlds.</em>
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <span className="hidden md:block absolute left-[26%] top-0 bottom-0 w-px bg-hairline" aria-hidden />
          <StaggerList base={0} step={0.08} className="space-y-14 md:space-y-20">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-6 md:gap-10 relative">
                <div className="md:col-span-3">
                  <p className="font-display italic text-ink-muted text-base">{exp.period}</p>
                  <span className={`mt-2 eyebrow ${exp.type === 'AI' ? '!border-stone-300 !bg-stone-50 text-stone-600' : ''}`}>
                    {exp.type}
                  </span>
                </div>
                <span className="hidden md:block absolute left-[26%] top-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-ink ring-4 ring-white" aria-hidden />
                <div className="md:col-span-9 md:pl-8">
                  <h3 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight tracking-tight">{exp.role}</h3>
                  <p className="mt-1 text-sm font-medium text-ink-muted">{exp.company}</p>
                  <ul className="mt-5 space-y-3">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex gap-3 text-base text-ink/75 font-normal leading-relaxed">
                        <span className="flex-shrink-0 mt-2.5 block w-4 h-px bg-ink-muted/50" aria-hidden />
                        <span>{desc}</span>
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
  { label: 'Build', items: ['Next.js', 'Python · FastAPI', 'TypeScript', 'Supabase', 'Vercel', 'Flask'] },
  { label: 'Reason', items: ['Claude API', 'Gemini 1.5', 'Groq · Llama', 'Ollama · Mistral', 'OpenAI'] },
  { label: 'Ship · Measure', items: ['LLM Evals', 'Prompt Architecture', 'Mixpanel', 'A/B Testing', 'PowerBI'] },
];

function Toolkit() {
  return (
    <section id="toolkit" className="relative py-20 md:py-28" style={{ background: '#0C0B09' }}>
      <div className="grain" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <Reveal><Eyebrow light>Toolkit</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2
            className="mt-6 font-display font-light leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F5F0E8' }}
          >
            How the work<br />
            <em className="italic font-normal" style={{ color: 'rgba(245,240,232,0.5)' }}>actually gets done.</em>
          </h2>
        </Reveal>

        <StaggerList base={0} step={0.05} className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-y-10">
          {SKILL_DATA.map((s) => (
            <div key={s.subject}>
              <p className="font-display font-light tabular" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#F5F0E8', lineHeight: 1 }}>
                <Counter to={s.A} />
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] mt-1" style={{ color: 'rgba(245,240,232,0.35)' }}>out of 100</p>
              <p className="text-sm mt-2 font-normal" style={{ color: 'rgba(245,240,232,0.65)' }}>{s.subject}</p>
            </div>
          ))}
        </StaggerList>

        <StaggerList base={0} step={0.06} className="mt-20 grid md:grid-cols-3 gap-x-10 gap-y-12 border-t pt-16" style={{ borderColor: 'rgba(245,240,232,0.08)' } as React.CSSProperties}>
          {TOOLKIT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] uppercase tracking-[0.22em] font-medium mb-6" style={{ color: 'rgba(245,240,232,0.4)' }}>
                {group.label}
              </p>
              <ul className="space-y-2.5">
                {group.items.map(item => (
                  <li key={item} className="font-display font-light text-xl md:text-2xl tracking-tight" style={{ color: '#F5F0E8' }}>
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
    <section id="contact" className="relative py-20 md:py-36 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
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
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
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
        <SelectedWork />
        <Thesis />
        <Trajectory />
        <Toolkit />
        <Contact />
      </div>
    </>
  );
}

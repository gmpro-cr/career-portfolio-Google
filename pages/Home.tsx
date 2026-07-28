import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
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
  PuzzlePiece,
  PlugsConnected,
  Brain,
  Monitor,
  CaretDown,
} from '@phosphor-icons/react';
import { EXPERIENCES, PROJECTS, EDUCATION_DATA, CERTIFICATIONS_DATA, getTheme } from '../constants';
import type { ProjectTheme } from '../types';
import XMark from '../components/XMark';

/* ── Mini flow diagram for project cards ─────────────────────────── */
const CardFlow = ({ steps, theme }: { steps: string[]; theme: ProjectTheme }) => (
  <div className="flex items-center flex-wrap gap-y-1.5">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <span
          style={{
            background: theme.accentBg,
            border: `1px solid ${theme.accentBorder}40`,
            color: theme.accentDark,
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '3px 9px',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
          }}
        >
          {step}
        </span>
        {i < steps.length - 1 && (
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden className="mx-0.5 flex-shrink-0">
            <path d="M0 4h9M6 1l3 3-3 3" stroke={theme.accent} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </React.Fragment>
    ))}
  </div>
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

/* ── Masked line reveal — each line rises out of an overflow clip ── */
function MaskLines({
  lines, as: Tag = 'h2', className = '', style, base = 0.05, step = 0.09,
}: {
  lines: React.ReactNode[]; as?: 'h1' | 'h2' | 'p'; className?: string; style?: React.CSSProperties; base?: number; step?: number;
}) {
  const [ref, visible] = useOnceVisible();
  return (
    <div ref={ref}>
      <Tag className={className} style={style}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span
              className="block"
              style={{
                transform: visible ? 'none' : 'translateY(112%)',
                transition: `transform 0.9s ${EASE} ${base + i * step}s`,
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

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
                transform: visible ? 'none' : 'translateY(16px)',
                filter: visible ? 'none' : 'blur(6px)',
                transition: `opacity 0.55s ${EASE} ${base + i * step}s, transform 0.55s ${EASE} ${base + i * step}s, filter 0.55s ${EASE} ${base + i * step}s`,
                willChange: visible ? 'auto' : 'opacity, transform, filter',
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
function Hero() {
  const words = ['Gaurav', 'Mahale'];

  /* Pointer-tilt physics for the portrait — springed, desktop only */
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 60, damping: 14 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 60, damping: 14 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-paper"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
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
        <div style={{ opacity: 0, animation: `heroPortrait 1s ${EASE} 0.2s forwards`, perspective: '1200px' }}>
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: 'clamp(240px, 30vw, 440px)',
              aspectRatio: '3 / 4',
              borderRadius: '1.75rem',
              boxShadow: '0 0 0 1.5px rgba(26,20,16,0.08), 0 32px 80px rgba(26,20,16,0.12)',
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/profile.jpeg"
              alt="Gaurav Mahale"
              className="h-full w-full object-cover object-top scale-[1.12] origin-top"
              style={{
                filter: 'brightness(1.02) contrast(1.08) saturate(1.06)',
                animation: 'kenBurns 20s ease-in-out infinite alternate',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Text — Framer Motion entrance only, no scroll link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24">

        {/* Mobile-only circular portrait */}
        <div
          className="lg:hidden mb-6 flex justify-center"
          style={{ opacity: 0, animation: `popIn 0.7s ${EASE} 0.2s forwards` }}
        >
          <div
            className="w-36 h-36 rounded-full overflow-hidden"
            style={{
              boxShadow: '0 0 0 2px rgba(26,20,16,0.08), 0 12px 32px rgba(26,20,16,0.14)',
            }}
          >
            <img
              src="/profile.jpeg"
              alt="Gaurav Mahale"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(1.02) contrast(1.08) saturate(1.06)' }}
            />
          </div>
        </div>

        {/* Role line */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.25s forwards` }}>
          <p
            className="font-display italic text-center lg:text-left"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'rgba(26,20,16,0.55)' }}
          >
            AI Product Builder&ensp;&middot;&ensp;Finance Domain Expert
          </p>
        </div>

        {/* Name — word slide */}
        <h1
          className="mt-5 lg:mt-8 font-display font-light leading-[0.92] tracking-[-0.03em] text-center lg:text-left"
          style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)', color: '#1A1410' }}
        >
          {words.map((word, wi) => (
            <span
              key={wi}
              className="inline-block lg:block overflow-hidden"
              style={wi === 0 ? { marginRight: '0.25em' } : undefined}
            >
              <span
                className="block"
                style={{
                  opacity: 0,
                  transform: 'translateY(110%)',
                  animation: `wordUp 0.85s ${EASE} ${0.3 + wi * 0.1}s forwards`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Summary */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.55s forwards` }}>
          <p
            className="mt-5 lg:mt-8 max-w-2xl text-base md:text-lg font-normal leading-relaxed"
            style={{ color: 'rgba(26,20,16,0.74)' }}
          >
            Nine years in banking and credit risk; now independently designing, building and shipping
            products end to end &mdash; four LLM platforms and two browser-native learning tools, all live.
            Experienced across the full lifecycle: discovery, MVP scoping, prompt engineering, and iterative releases.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ opacity: 0, animation: `fadeUp 0.5s ${EASE} 0.65s forwards` }}>
          <div className="mt-7 lg:mt-10 flex items-center justify-center lg:justify-start gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-all duration-500 whitespace-nowrap"
              style={{ background: '#1A1410', color: '#FDFBF7' }}
            >
              View my work
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px">
                <ArrowDown size={14} />
              </span>
            </a>
            <a
              href="/Gaurav_Mahale_Resume.pdf"
              download
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium border transition-all duration-500 whitespace-nowrap"
              style={{ borderColor: 'rgba(26,20,16,0.18)', color: 'rgba(26,20,16,0.7)', background: 'transparent' }}
            >
              Download CV
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px"
                style={{ background: 'rgba(26,20,16,0.06)' }}>
                <FileText size={14} />
              </span>
            </a>
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
        <div style={{ animation: 'scrollcue 2.4s cubic-bezier(0.33,0,0.2,1) infinite' }}>
          <ArrowDown size={16} weight="light" />
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
    <section id="work" className="relative py-14 md:py-36 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-6">
          <div>
            <Reveal delay={0.02}>
              <span className="font-display italic text-ink-muted" style={{ fontSize: '0.95rem' }}>selected work</span>
            </Reveal>
            <MaskLines
              className="mt-2 font-display font-light text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink"
              lines={['Six products,', <em key="i" className="italic font-normal text-ink-muted">end to end.</em>]}
            />
          </div>
          <Reveal delay={0.25}>
            <span className="hidden md:block font-display italic text-ink-muted oldstyle whitespace-nowrap" style={{ fontSize: '1.15rem' }}>06 / 06</span>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, idx) => {
            const theme = getTheme(project.slug);
            return (
            <React.Fragment key={idx}>
            <Reveal delay={0.06 + idx * 0.08} className="flex flex-col">
              <Link
                to={`/project/${project.slug}`}
                className="bezel work-card flex flex-col h-full group"
                style={{ textDecoration: 'none', background: '#FDFBF7', ['--wc' as string]: theme.accent } as React.CSSProperties}
              >
                <div
                  className="bezel-core flex flex-col h-full overflow-hidden"
                  style={{ background: '#FDFBF7', borderRadius: 'calc(2rem - 0.375rem)' }}
                >
                  {/* Screenshot image */}
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 'clamp(160px, 30vw, 220px)' }}>
                    {/* Themed backdrop (also the fallback when no screenshot) */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${theme.accentBg} 0%, #FDFBF7 70%)` }}
                      aria-hidden
                    />
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
                    <div className="sheen" aria-hidden />
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="font-display italic oldstyle text-sm px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(253,251,247,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(26,20,16,0.12)', color: 'rgba(26,20,16,0.55)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="font-display italic text-sm font-medium px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(253,251,247,0.92)', backdropFilter: 'blur(8px)', border: `1px solid ${theme.accentBorder}55`, color: theme.accentDark }}
                      >
                        {project.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Eyebrow>{project.category === 'build' ? 'Shipped' : 'Case Study'}</Eyebrow>
                      <span className="font-display italic text-xs text-ink-muted whitespace-nowrap">{project.date}</span>
                    </div>
                    <h3 className="font-display font-light text-[1.55rem] md:text-[1.65rem] text-ink leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    <p
                      className="mt-3 text-sm text-ink/75 leading-relaxed font-normal"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      } as React.CSSProperties}
                    >
                      {project.cardSummary ?? project.description}
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
                    {project.cardFlow && (
                      <div className="mt-5">
                        <p className="font-display italic text-ink-muted mb-2" style={{ fontSize: '12px' }}>how it works</p>
                        <CardFlow steps={project.cardFlow} theme={theme} />
                      </div>
                    )}
                    <div className="mt-5 pt-4 border-t border-hairline">
                      <div className="flex items-center justify-between text-sm font-medium text-ink">
                        <span>View case study</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px" style={{ background: theme.accent }}>
                          <ArrowRight size={13} weight="light" />
                        </span>
                      </div>
                    </div>
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
   TRAJECTORY
   ═══════════════════════════════════════════════════════════════ */
/* The timeline spine draws itself as the section enters view */
function TimelineRule() {
  const [ref, visible] = useOnceVisible('-8%');
  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className="hidden md:block absolute left-[24%] top-0 bottom-0 w-px bg-ink/15"
      style={{
        transform: visible ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: `transform 1.8s ${EASE} 0.15s`,
      }}
      aria-hidden
    />
  );
}

function Trajectory() {
  return (
    <section id="trajectory" className="relative py-14 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <MaskLines
          className="mt-6 font-display font-light text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink"
          lines={['Nine years', <em key="i" className="italic font-normal text-ink-muted">across two worlds.</em>]}
        />

        <div className="mt-20 relative">
          <TimelineRule />
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
  { label: 'Build', items: ['Next.js · React', 'Python · FastAPI', 'TypeScript', 'Postgres · PGlite', 'Pyodide · WASM', 'Supabase · Vercel'] },
  { label: 'Reason', items: ['Claude API', 'Gemini 1.5 / 2.0', 'Groq · Llama', 'Ollama · Mistral'] },
  { label: 'Ship · Measure', items: ['LLM Evals', 'Prompt Architecture', 'Mixpanel', 'A/B Testing', 'PowerBI'] },
];

function Toolkit() {
  return (
    <section id="toolkit" className="relative py-14 md:py-28 bg-paper">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <MaskLines
          className="mt-6 font-display font-light leading-[1.02] tracking-tight max-w-3xl text-ink"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          lines={['How the work', <em key="i" className="italic font-normal text-ink-muted">actually gets done.</em>]}
        />

        <StaggerList base={0} step={0.06} className="mt-20 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {TOOLKIT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-display italic mb-6 text-ink-muted" style={{ fontSize: '1rem' }}>
                {group.label}
              </p>
              <ul className="space-y-2.5">
                {group.items.map(item => (
                  <li key={item} className="tk-item font-display font-light text-xl md:text-2xl tracking-tight text-ink">
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
    <section id="contact" className="relative py-14 md:py-36 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <MaskLines
          className="mt-8 font-display font-light leading-[1.02] tracking-tight text-ink"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)' }}
          lines={['Let’s build', <em key="i" className="italic font-normal text-ink-muted">something real.</em>]}
        />
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-xl mx-auto text-base md:text-lg text-ink/70 font-normal leading-relaxed">
            Whether it&rsquo;s an AI PM role, scaling an LLM product, or navigating a complex
            regulated system — I&rsquo;m comfortable with all three.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticLink href="mailto:mahalegauravk@gmail.com" className="btn-pill">
              mahalegauravk@gmail.com
              <span className="btn-pill-icon"><PaperPlaneTilt size={14} weight="light" /></span>
            </MagneticLink>
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
   CLAUDE CODE WORKFLOW
   ═══════════════════════════════════════════════════════════════ */
const CLAUDE_CAPABILITIES = [
  {
    icon: <PuzzlePiece size={20} weight="light" />,
    title: 'Skills',
    description: 'Modular instruction sets that direct how Claude approaches design, debugging, and shipping — loaded per task, not per project.',
    tags: ['taste-skill', 'frontend-design', 'webapp-testing', 'brainstorming', 'code-review'],
    accent: {
      bg: 'rgba(180,140,60,0.07)',
      iconBg: 'rgba(180,140,60,0.14)',
      tagBg: 'rgba(180,140,60,0.10)',
      tagBorder: 'rgba(180,140,60,0.25)',
      text: 'rgba(120,88,20,0.9)',
      divider: 'rgba(180,140,60,0.18)',
    },
  },
  {
    icon: <PlugsConnected size={20} weight="light" />,
    title: 'MCP Servers',
    description: 'Live connections to external systems so Claude acts directly — no copy-paste, no context switching.',
    tags: ['Playwright', 'GitHub', 'Vercel', 'Gmail', 'Canva', 'Render'],
    accent: {
      bg: 'rgba(60,100,190,0.07)',
      iconBg: 'rgba(60,100,190,0.14)',
      tagBg: 'rgba(60,100,190,0.10)',
      tagBorder: 'rgba(60,100,190,0.25)',
      text: 'rgba(30,60,150,0.9)',
      divider: 'rgba(60,100,190,0.18)',
    },
  },
  {
    icon: <Brain size={20} weight="light" />,
    title: 'Memory',
    description: 'Project decisions, preferences, and architecture choices persist across every session — Claude picks up where we left off.',
    tags: ['Project context', 'Decisions', 'Preferences', 'Cross-session'],
    accent: {
      bg: 'rgba(50,155,100,0.07)',
      iconBg: 'rgba(50,155,100,0.14)',
      tagBg: 'rgba(50,155,100,0.10)',
      tagBorder: 'rgba(50,155,100,0.25)',
      text: 'rgba(25,100,60,0.9)',
      divider: 'rgba(50,155,100,0.18)',
    },
  },
  {
    icon: <Monitor size={20} weight="light" />,
    title: 'Browser Testing',
    description: 'Claude launches the app, takes screenshots at every breakpoint, and audits the UI before anything is pushed.',
    tags: ['Playwright scripts', 'Screenshot audits', 'Mobile & desktop', 'Visual QA'],
    accent: {
      bg: 'rgba(150,75,175,0.07)',
      iconBg: 'rgba(150,75,175,0.14)',
      tagBg: 'rgba(150,75,175,0.10)',
      tagBorder: 'rgba(150,75,175,0.25)',
      text: 'rgba(100,40,130,0.9)',
      divider: 'rgba(150,75,175,0.18)',
    },
  },
];

function ClaudeCodeWorkflow() {
  const [open, setOpen] = useState(false);

  return (
    <section id="claude-code" className="relative py-14 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Reveal delay={0.06}>
          <Eyebrow>Built With</Eyebrow>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="mt-8 bezel cursor-pointer select-none"
            onClick={() => setOpen(o => !o)}
          >
            <div className="bezel-core">

              {/* Card header — always visible */}
              <div className="flex items-center justify-between px-7 py-6 md:px-8 md:py-7">
                <div>
                  <h2 className="font-display font-light text-2xl md:text-3xl text-ink tracking-tight">
                    How I use Claude Code
                  </h2>
                  <p className="mt-1.5 text-sm text-ink/60">
                    Skills · MCP Servers · Memory · Browser Testing
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="flex-shrink-0 ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-paper text-ink-muted"
                >
                  <CaretDown size={14} weight="light" />
                </motion.span>
              </div>

              {/* Expandable grid */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="expand"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="border-t border-hairline grid grid-cols-1 sm:grid-cols-2">
                      {CLAUDE_CAPABILITIES.map((cap, i) => {
                        const isRightCol = i % 2 === 1;
                        const isLastRow = i >= CLAUDE_CAPABILITIES.length - 2;
                        return (
                          <div
                            key={cap.title}
                            className="flex flex-col gap-4 p-6 md:p-7"
                            style={{
                              background: cap.accent.bg,
                              borderRight: !isRightCol ? '1px solid rgba(26,20,16,0.08)' : undefined,
                              borderBottom: !isLastRow ? '1px solid rgba(26,20,16,0.08)' : undefined,
                            }}
                          >
                            {/* Icon + title */}
                            <div className="flex items-center gap-3">
                              <span
                                className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0"
                                style={{ background: cap.accent.iconBg, color: cap.accent.text }}
                              >
                                {cap.icon}
                              </span>
                              <h3 className="font-display font-light text-lg text-ink tracking-tight">
                                {cap.title}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-ink/75 leading-relaxed">
                              {cap.description}
                            </p>

                            {/* Tags */}
                            <div
                              className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t"
                              style={{ borderColor: cap.accent.divider }}
                            >
                              {cap.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] tracking-wide rounded-full px-2.5 py-0.5"
                                  style={{
                                    background: cap.accent.tagBg,
                                    border: `1px solid ${cap.accent.tagBorder}`,
                                    color: cap.accent.text,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
        @keyframes wordUp {
          from { opacity: 0; transform: translateY(110%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPortrait {
          from { opacity: 0; transform: translateY(80px) scale(0.96); }
          to   { opacity: 1; transform: translateY(60px) scale(1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes scrollcue {
          0%       { transform: translateY(0); opacity: 0.35; }
          50%      { transform: translateY(7px); opacity: 1; }
          100%     { transform: translateY(0); opacity: 0.35; }
        }
      `}</style>
      <div className="font-sans text-ink overflow-x-hidden">
        <Hero />
        <SelectedWork />
        <Trajectory />
        <Toolkit />
        <ClaudeCodeWorkflow />
        <Contact />
      </div>
    </>
  );
}

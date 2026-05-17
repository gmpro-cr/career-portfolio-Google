import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
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
  ArrowUp,
} from '@phosphor-icons/react';
import { EXPERIENCES, PROJECTS, SKILL_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

/* ── X / Twitter icon ────────────────────────────────────────── */
const XMark = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ── Eyebrow pill ─────────────────────────────────────────────── */
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span className={`eyebrow ${light ? '!border-white/20 !bg-white/10 !text-white/60' : ''}`}>
    <span className={`rule ${light ? '!bg-white/30' : ''}`} />
    {children}
  </span>
);

/* ── Animated counter ─────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref} className="tabular">{count}{suffix}</span>;
}

/* ── Reveal: blur+fade+translate on scroll entry ─────────────── */
const springEase = [0.32, 0.72, 0, 1] as const;

const Reveal = ({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: React.ReactNode; delay?: number; className?: string; as?: keyof JSX.IntrinsicElements;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-8%' }}
    transition={{ duration: 0.85, delay, ease: springEase }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Stagger container ────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: springEase } },
};

/* ── Architecture flow diagram (SVG) ─────────────────────────── */
function ArchDiagram({ steps }: { steps: { step: string }[] }) {
  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex flex-col gap-0 min-w-[280px]">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: springEase }}
              className="w-full flex items-center gap-3 rounded-xl border border-hairline bg-white px-4 py-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink text-white text-[10px] font-medium flex items-center justify-center tabular">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-ink leading-snug">{s.step}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="w-px h-4 bg-hairline flex-shrink-0" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO — Dark + photo blend + name + summary
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = ['Gaurav', 'Mahale'];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: '#0C0B09' }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 65% 50%, rgba(255,248,235,0.04) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Photo — right side, gradient mask */}
      <motion.div
        style={{ y: photoY }}
        className="absolute inset-y-0 right-0 w-[55%] md:w-[48%] pointer-events-none"
        aria-hidden
      >
        <img
          src="/profile.jpeg"
          alt=""
          className="h-full w-full object-cover object-top"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, black 50%, black 80%, transparent 100%), ' +
              'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, black 50%, black 80%, transparent 100%), ' +
              'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            filter: 'grayscale(20%) brightness(0.88)',
          }}
        />
        {/* Inner gradient over photo towards left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0C0B09 0%, rgba(12,11,9,0.7) 30%, rgba(12,11,9,0.1) 60%, transparent 100%)',
          }}
          aria-hidden
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24"
      >
        <Reveal>
          <Eyebrow light>Open to AI PM roles · Pune, India</Eyebrow>
        </Reveal>

        {/* Animated name */}
        <motion.h1
          className="mt-8 font-display font-light leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: '#F5F0E8' }}
        >
          {words.map((word, wi) => (
            <motion.span
              key={wi}
              className="block overflow-hidden"
            >
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 + wi * 0.15, ease: springEase }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Summary */}
        <Reveal delay={0.6}>
          <p
            className="mt-8 max-w-md text-base md:text-lg font-normal leading-relaxed"
            style={{ color: 'rgba(245,240,232,0.65)' }}
          >
            AI Product Builder and Finance Domain Expert with 9+ years in banking. Independently designed,
            built and shipped 3 LLM-based platforms. Experienced across the full product lifecycle: discovery,
            MVP scoping, prompt engineering, and iterative releases.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.75}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-all duration-700"
              style={{ background: '#F5F0E8', color: '#0C0B09' }}
            >
              View my work
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-all duration-700 group-hover:translate-x-1 group-hover:-translate-y-px">
                <ArrowDown size={14} />
              </span>
            </a>
            <a
              href="/Gaurav_Mahale_Resume.pdf"
              download
              className="group inline-flex items-center gap-1.5 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium border transition-all duration-700"
              style={{ borderColor: 'rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.75)', background: 'transparent' }}
            >
              Download CV
              <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-700 group-hover:translate-x-1 group-hover:-translate-y-px"
                style={{ background: 'rgba(245,240,232,0.1)' }}>
                <FileText size={14} />
              </span>
            </a>
          </div>
        </Reveal>

        {/* Animated stats row */}
        <Reveal delay={0.9}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6"
          >
            {[
              { value: 500, suffix: '+', label: 'Monthly Active Users' },
              { value: 9, suffix: '+', label: 'Years in Finance & Credit' },
              { value: 3, suffix: '', label: 'AI Products Shipped' },
            ].map((s, i) => (
              <motion.div key={i} variants={staggerItem}>
                <p className="font-display font-light tabular" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#F5F0E8', lineHeight: 1 }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* Location */}
        <Reveal delay={1.0}>
          <div className="mt-8 flex items-center gap-2 text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
            <MapPin size={12} weight="light" />
            <span>Pune, India · Open to remote &amp; hybrid</span>
          </div>
        </Reveal>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(245,240,232,0.25)' }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} weight="light" />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK — Equal 3-col cards + full case study
   ═══════════════════════════════════════════════════════════════ */
function SelectedWork() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>('overview');

  return (
    <section id="work" className="relative py-24 md:py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow>Selected Work</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display font-light text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink">
            Three products,<br />
            <em className="italic font-normal text-ink-muted">three problems solved.</em>
          </h2>
        </Reveal>

        {/* Equal-size 3-col grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-5%' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project, idx) => {
            const isOpen = openId === idx;
            return (
              <motion.article
                key={idx}
                variants={staggerItem}
                className="bezel flex flex-col"
                whileHover={!isOpen ? { y: -4, transition: { duration: 0.4, ease: springEase } } : {}}
              >
                <div className="bezel-core p-6 md:p-8 flex flex-col h-full">
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <Eyebrow>{project.category === 'build' ? 'Shipped' : 'Case Study'}</Eyebrow>
                    <span className="font-display italic text-sm text-ink-muted whitespace-nowrap">{project.metrics}</span>
                  </div>

                  <h3 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-ink-muted/70">{project.date}</p>

                  <p className="mt-4 text-sm md:text-base text-ink/75 leading-relaxed font-normal flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t, i) => (
                      <span key={i} className="text-[11px] tracking-wide text-ink-muted border border-hairline rounded-full px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="text-[11px] text-ink-muted px-2.5 py-1">+{project.tech.length - 5} more</span>
                    )}
                  </div>

                  {/* CTA row */}
                  <div className="mt-6 flex items-center gap-4 flex-wrap">
                    <button
                      onClick={() => { setOpenId(isOpen ? null : idx); setActiveTab('overview'); }}
                      aria-expanded={isOpen}
                      className="group inline-flex items-center gap-2 text-sm text-ink hover:opacity-60 transition-opacity duration-500"
                    >
                      <span className="border-b border-ink/40 group-hover:border-ink transition-colors">
                        {isOpen ? 'Close' : 'Full case study'}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.4, ease: springEase }}
                      >
                        <ArrowRight size={13} weight="light" />
                      </motion.span>
                    </button>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors">
                        Live <ArrowUpRight size={11} weight="light" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors">
                        Code <ArrowUpRight size={11} weight="light" />
                      </a>
                    )}
                  </div>

                  {/* Inline case study */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="case"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: springEase }}
                        className="overflow-hidden"
                      >
                        {/* Tab switcher */}
                        <div className="mt-8 pt-8 border-t border-hairline">
                          <div className="flex gap-1 mb-6 bg-paper rounded-full p-1 w-fit">
                            {(['overview', 'technical'] as const).map(tab => (
                              <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-400 ${
                                  activeTab === tab
                                    ? 'bg-ink text-white'
                                    : 'text-ink-muted hover:text-ink'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>

                          {activeTab === 'overview' && (
                            <CaseStudyOverview project={project} />
                          )}
                          {activeTab === 'technical' && (
                            <CaseStudyTechnical project={project} />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudyOverview({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Problem</p>
        <p className="text-base text-ink leading-relaxed">{project.problem}</p>
      </div>

      {project.approach && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Approach</p>
          <ul className="space-y-2">
            {project.approach.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/85 leading-relaxed">
                <span className="text-ink-muted tabular flex-shrink-0 pt-px">{String(i + 1).padStart(2, '0')}</span>
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
          <ul className="space-y-2">
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

function CaseStudyTechnical({ project }: { project: typeof PROJECTS[0] }) {
  if (!project.technicalDetails) return null;
  const { architecture, dataFlow } = project.technicalDetails;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Architecture</p>
        <p className="text-base text-ink leading-relaxed">{architecture}</p>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">Data Flow</p>
        <ArchDiagram steps={dataFlow} />
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
   THESIS — Dark section for contrast rhythm
   ═══════════════════════════════════════════════════════════════ */
function Thesis() {
  return (
    <section id="thesis" className="relative py-24 md:py-36 overflow-hidden" style={{ background: '#1A1410' }}>
      {/* Subtle texture */}
      <div className="grain" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(255,248,235,0.04) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow light>Thesis</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="mt-10 font-display font-light leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', color: '#F5F0E8' }}
          >
            "Pure domain depth, combined with the ability to actually build and ship
            working AI products, creates the highest-leverage solutions possible."
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-6">
            <p className="leading-relaxed font-normal" style={{ color: 'rgba(245,240,232,0.6)' }}>
              I build platforms on Next.js, Python, Supabase and frontier LLMs (Claude, Gemini, Groq).
              My technical edge is paired with rigorous product validation, prompt architectures, and
              structured evaluations.
            </p>
            <p className="leading-relaxed font-normal" style={{ color: 'rgba(245,240,232,0.6)' }}>
              Previously, I managed high-stakes portfolios exceeding ₹9,000 Cr and authored credit
              proposals equivalent to enterprise PRDs. I don&rsquo;t just write requirements —
              I validate ideas, architect prompts, and ship the MVP.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRAJECTORY — Vertical timeline
   ═══════════════════════════════════════════════════════════════ */
function Trajectory() {
  return (
    <section id="trajectory" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow>Trajectory</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display font-light text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink">
            Nine years<br />
            <em className="italic font-normal text-ink-muted">across two worlds.</em>
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <span className="hidden md:block absolute left-[26%] top-0 bottom-0 w-px bg-hairline" aria-hidden />
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-5%' }}
            className="space-y-14 md:space-y-20"
          >
            {EXPERIENCES.map((exp, i) => (
              <motion.li key={i} variants={staggerItem} className="grid md:grid-cols-12 gap-6 md:gap-10 relative">
                <div className="md:col-span-3">
                  <p className="font-display italic text-ink-muted text-base">{exp.period}</p>
                  <span className={`mt-2 eyebrow ${exp.type === 'AI' ? '!border-stone-300 !bg-stone-50 text-stone-600' : ''}`}>
                    {exp.type}
                  </span>
                </div>
                <span className="hidden md:block absolute left-[26%] top-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-ink ring-4 ring-white" aria-hidden />
                <div className="md:col-span-9 md:pl-8">
                  <h3 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink-muted">{exp.company}</p>
                  <ul className="mt-5 space-y-3">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex gap-3 text-base text-ink/80 font-normal leading-relaxed">
                        <span className="flex-shrink-0 mt-2.5 block w-4 h-px bg-ink-muted/50" aria-hidden />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Credentials */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-5%' }}
          className="mt-24 grid md:grid-cols-2 gap-4"
        >
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
            <motion.div key={bi} variants={staggerItem} className="bezel">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOOLKIT — Dark section, typographic groups
   ═══════════════════════════════════════════════════════════════ */
const TOOLKIT_GROUPS = [
  { label: 'Build', items: ['Next.js', 'Python · FastAPI', 'TypeScript', 'Supabase', 'Vercel', 'Flask'] },
  { label: 'Reason', items: ['Claude API', 'Gemini 1.5', 'Groq · Llama', 'Ollama · Mistral', 'OpenAI'] },
  { label: 'Ship · Measure', items: ['LLM Evals', 'Prompt Architecture', 'Mixpanel', 'A/B Testing', 'PowerBI'] },
];

function Toolkit() {
  return (
    <section id="toolkit" className="relative py-24 md:py-32" style={{ background: '#0C0B09' }}>
      <div className="grain" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow light>Toolkit</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className="mt-6 font-display font-light leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#F5F0E8' }}
          >
            How the work<br />
            <em className="italic font-normal" style={{ color: 'rgba(245,240,232,0.5)' }}>actually gets done.</em>
          </h2>
        </Reveal>

        {/* Skill score row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-y-10"
        >
          {SKILL_DATA.map((s, i) => (
            <motion.div key={s.subject} variants={staggerItem}>
              <p className="font-display font-light tabular" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#F5F0E8', lineHeight: 1 }}>
                <Counter to={s.A} suffix="" />
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] mt-1" style={{ color: 'rgba(245,240,232,0.35)' }}>out of 100</p>
              <p className="text-sm mt-2 font-normal" style={{ color: 'rgba(245,240,232,0.65)' }}>{s.subject}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tool groups */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-x-10 gap-y-12 border-t pt-16"
          style={{ borderColor: 'rgba(245,240,232,0.08)' }}
        >
          {TOOLKIT_GROUPS.map((group, gi) => (
            <motion.div key={group.label} variants={staggerItem}>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-40 bg-paper">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <Reveal><Eyebrow>Contact</Eyebrow></Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-8 font-display font-light leading-[0.95] tracking-tight text-ink"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            Let&rsquo;s build<br />
            <em className="italic font-normal text-ink-muted">something real.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-10 max-w-xl mx-auto text-base md:text-lg text-ink/70 font-normal leading-relaxed">
            Whether it&rsquo;s an AI PM role, scaling an LLM product, or navigating a complex
            regulated system — I&rsquo;m comfortable with all three.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
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
                  className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring">
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
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="font-sans text-ink">
      <Hero />
      <SelectedWork />
      <Thesis />
      <Trajectory />
      <Toolkit />
      <Contact />
    </div>
  );
}

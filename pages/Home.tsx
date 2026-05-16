import React, { useState } from 'react';
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
} from '@phosphor-icons/react';
import { EXPERIENCES, PROJECTS, SKILL_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

/* ---------- Tiny brand mark for X / Twitter (Phosphor lacks a clean one) ---------- */
const XMark = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ---------- Reusable eyebrow ---------- */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="eyebrow">
    <span className="rule" />
    {children}
  </span>
);

/* ---------- Reveal helper: blurred fade-up on enter ---------- */
const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.9, delay, ease: [0.32, 0.72, 0, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* =========================================================================
   HERO — Editorial Split archetype
   ========================================================================= */
function Hero() {
  return (
    <section id="hero" className="relative pt-12 md:pt-20 pb-24 md:pb-32">
      <div className="grain" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-12 items-end">
          {/* LEFT — Editorial type block */}
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Available · AI Product Manager</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-8 font-display font-light text-[12vw] md:text-[7.5vw] leading-[0.94] tracking-[-0.035em] text-ink">
                AI products,
                <br />
                <em className="italic font-normal text-ink-muted/90">shipped</em>
                <span className="text-ink"> by hand.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-10 max-w-md text-base md:text-lg font-light leading-relaxed text-ink-muted">
                I&rsquo;m Gaurav — an AI Product Manager who designs, builds and
                ships LLM-based platforms end-to-end. Eight years in banking
                taught me to handle real money; the last three taught me to
                handle real models.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn-pill">
                  See selected work
                  <span className="btn-pill-icon">
                    <ArrowDown size={14} weight="light" />
                  </span>
                </a>
                <a href="/Gaurav_Mahale_Resume.pdf" download className="btn-pill-outline">
                  Download CV
                  <span className="btn-pill-icon">
                    <FileText size={14} weight="light" />
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-10 flex items-center gap-2 text-xs text-ink-muted">
                <MapPin size={12} weight="light" />
                <span>Pune, India · Open to remote &amp; hybrid</span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Asymmetric stat tiles (Z-axis cascade) */}
          <div className="md:col-span-5 md:pl-6 lg:pl-12">
            <Reveal delay={0.12}>
              <div className="relative h-[420px] md:h-[480px]">
                <StatTile
                  label="MAU"
                  value="500+"
                  caption="AI Persona Platform"
                  className="absolute top-0 left-0 w-[78%] -rotate-1"
                />
                <StatTile
                  label="Time saved"
                  value="80%"
                  caption="Credit analysis automation"
                  className="absolute top-[38%] right-0 w-[72%] rotate-1"
                  variant="paper"
                />
                <StatTile
                  label="Experience"
                  value="8+ yrs"
                  caption="Cross-functional execution"
                  className="absolute bottom-0 left-[8%] w-[70%] -rotate-[0.5deg]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  label,
  value,
  caption,
  className = '',
  variant = 'default',
}: {
  label: string;
  value: string;
  caption: string;
  className?: string;
  variant?: 'default' | 'paper';
}) {
  return (
    <div className={`bezel ${variant === 'paper' ? 'bezel-paper' : ''} ${className}`}>
      <div className="bezel-core px-6 py-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">{label}</p>
        <p className="mt-2 font-display font-light text-5xl text-ink tabular leading-none">
          {value}
        </p>
        <p className="mt-3 text-sm text-ink-muted leading-snug">{caption}</p>
      </div>
    </div>
  );
}

/* =========================================================================
   SELECTED WORK — Asymmetric Bento with inline expand
   ========================================================================= */
function SelectedWork() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="mt-6 font-display font-light text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink max-w-2xl">
              Three products,<br />three real bottlenecks removed.
            </h2>
          </div>
          <p className="md:max-w-xs text-sm md:text-base text-ink-muted leading-relaxed">
            Each shipped end-to-end — discovery, prompt architecture, evals,
            UI, deploy. No PRDs without code.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {PROJECTS.map((project, idx) => {
            const featured = idx === 0;
            const span = featured
              ? 'md:col-span-8 md:row-span-2'
              : 'md:col-span-4';
            const isOpen = openId === idx;
            return (
              <Reveal key={idx} delay={idx * 0.06} className={span}>
                <article className="bezel h-full">
                  <div className="bezel-core p-6 md:p-8 h-full flex flex-col">
                    <header className="flex items-start justify-between gap-4 mb-6">
                      <Eyebrow>
                        {featured ? 'Featured · Shipped' : project.category === 'build' ? 'Shipped' : 'Case Study'}
                      </Eyebrow>
                      <span className="font-display italic text-sm text-ink-muted">
                        {project.metrics}
                      </span>
                    </header>

                    <h3
                      className={`font-display font-light text-ink leading-[1.05] tracking-tight ${
                        featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-muted/80">
                      {project.date}
                    </p>

                    <p
                      className={`mt-5 text-ink-muted leading-relaxed font-light flex-1 ${
                        featured ? 'text-base md:text-lg max-w-2xl' : 'text-sm'
                      }`}
                    >
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, featured ? 6 : 4).map((t, i) => (
                        <span
                          key={i}
                          className="text-[11px] tracking-wide text-ink-muted border border-hairline rounded-full px-2.5 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => setOpenId(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="group inline-flex items-center gap-2 text-sm text-ink hover:opacity-70 transition-opacity duration-500 ease-spring"
                      >
                        <span className="border-b border-ink/40 group-hover:border-ink transition-colors">
                          {isOpen ? 'Hide case study' : 'Read case study'}
                        </span>
                        <ArrowRight
                          size={14}
                          weight="light"
                          className={`transition-transform duration-500 ease-spring ${
                            isOpen ? 'rotate-90' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </button>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
                        >
                          Live
                          <ArrowUpRight size={12} weight="light" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
                        >
                          Code
                          <ArrowUpRight size={12} weight="light" />
                        </a>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="case"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <CaseStudyBody project={project} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudyBody({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="mt-10 pt-10 border-t border-hairline space-y-10">
      <section>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Problem</p>
        <p className="mt-3 text-base md:text-lg text-ink/90 leading-relaxed font-light">
          {project.problem}
        </p>
      </section>

      {project.approach && project.approach.length > 0 && (
        <section>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Approach</p>
          <ul className="mt-3 space-y-2">
            {project.approach.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm md:text-base text-ink/85 leading-relaxed font-light"
              >
                <span className="select-none text-ink-muted tabular pt-[2px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.keyInsights && project.keyInsights.length > 0 && (
        <section>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Key insights</p>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {project.keyInsights.map((insight, i) => (
              <div
                key={i}
                className="bezel bezel-paper"
              >
                <div className="bezel-core px-5 py-4 text-sm leading-relaxed text-ink/85 font-light">
                  {insight}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.outcomes && project.outcomes.length > 0 && (
        <section>
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Outcomes</p>
          <ul className="mt-3 space-y-2">
            {project.outcomes.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm md:text-base text-ink/90 font-light">
                <SealCheck size={16} weight="light" className="text-ink mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/* =========================================================================
   THESIS — Single Double-Bezel paper card with pull quote
   ========================================================================= */
function Thesis() {
  return (
    <section id="thesis" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow>Thesis</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 bezel bezel-paper">
            <div className="bezel-core p-10 md:p-16">
              <h2 className="font-display font-light text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink max-w-3xl">
                Pure domain depth combined with the ability to actually build
                working AI products creates the highest-leverage solutions.
              </h2>

              <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-6 text-ink-muted">
                <p className="font-light leading-relaxed">
                  I build platforms on Next.js, Python, Supabase and frontier
                  LLMs (Claude, Gemini, Groq). My technical edge is paired
                  with rigorous product validation, prompt architectures and
                  structured evaluations.
                </p>
                <p className="font-light leading-relaxed">
                  Previously, I managed high-stakes portfolios exceeding
                  ₹5,000M across HDFC Bank and Yes Bank. I don&rsquo;t just
                  write PRDs — I validate ideas, architect prompts, scrutinise
                  pipelines and ship the MVP.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   TRAJECTORY — Vertical timeline + Credentials sub-grid
   ========================================================================= */
function Trajectory() {
  return (
    <section id="trajectory" className="relative py-24 md:py-32 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow>Trajectory</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display font-light text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink">
            Eight years
            <br />
            <em className="italic font-normal text-ink-muted/90">across two worlds.</em>
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="mt-20 relative">
          <span
            className="hidden md:block absolute left-[26%] top-0 bottom-0 w-px bg-hairline"
            aria-hidden
          />
          <ul className="space-y-14 md:space-y-20">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="grid md:grid-cols-12 gap-6 md:gap-10 relative">
                  {/* Left rail: period + type */}
                  <div className="md:col-span-3">
                    <p className="font-display italic text-ink-muted text-base">
                      {exp.period}
                    </p>
                    <p className="mt-2 eyebrow !border-ink/15 !bg-paper">
                      {exp.type}
                    </p>
                  </div>

                  {/* Dot */}
                  <span
                    className="hidden md:block absolute left-[26%] top-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-ink ring-4 ring-paper"
                    aria-hidden
                  />

                  {/* Right column: role + description */}
                  <div className="md:col-span-9 md:pl-8">
                    <h3 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{exp.company}</p>
                    <ul className="mt-6 space-y-3">
                      {exp.description.map((desc, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-base text-ink/85 font-light leading-relaxed"
                        >
                          <span className="select-none text-ink-muted/60 tabular pt-1.5">
                            <span className="block h-px w-3 bg-ink-muted/50" />
                          </span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Credentials sub-grid */}
        <div className="mt-24 grid md:grid-cols-2 gap-4">
          <Reveal>
            <div className="bezel">
              <div className="bezel-core p-8">
                <header className="flex items-center gap-3 mb-6">
                  <GraduationCap size={20} weight="light" className="text-ink" />
                  <span className="eyebrow">Education</span>
                </header>
                <div className="space-y-6">
                  {EDUCATION_DATA.map(edu => (
                    <div key={edu.id}>
                      <h4 className="font-display font-light text-lg text-ink leading-snug">
                        {edu.institution}
                      </h4>
                      <p className="text-sm text-ink-muted mt-1">{edu.degree}</p>
                      <p className="text-xs text-ink-muted/70 mt-1 tabular">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="bezel">
              <div className="bezel-core p-8">
                <header className="flex items-center gap-3 mb-6">
                  <SealCheck size={20} weight="light" className="text-ink" />
                  <span className="eyebrow">Certifications</span>
                </header>
                <div className="space-y-5">
                  {CERTIFICATIONS_DATA.map(cert => (
                    <div key={cert.id} className="flex justify-between gap-4 items-baseline">
                      <div>
                        <h4 className="font-light text-ink leading-snug">{cert.name}</h4>
                        <p className="text-xs text-ink-muted mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-xs text-ink-muted tabular flex-shrink-0">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   TOOLKIT — Typographic list, no skill bars, no emoji tools
   ========================================================================= */
const TOOLKIT_GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Build',
    items: ['Next.js', 'Python · FastAPI', 'TypeScript', 'Supabase', 'Vercel'],
  },
  {
    label: 'Reason',
    items: ['Claude API', 'Gemini', 'Groq · Llama', 'Ollama · Mistral', 'OpenAI'],
  },
  {
    label: 'Ship · Measure',
    items: ['LLM Evals', 'Prompt Architecture', 'A/B Testing', 'PostHog', 'PowerBI'],
  },
];

function Toolkit() {
  return (
    <section id="toolkit" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <Eyebrow>Toolkit</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display font-light text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink max-w-3xl">
            How the work
            <br />
            <em className="italic font-normal text-ink-muted/90">actually gets done.</em>
          </h2>
        </Reveal>

        {/* Skill emphasis row */}
        <div className="mt-20 grid md:grid-cols-5 gap-y-10 gap-x-6">
          {SKILL_DATA.map((s, i) => (
            <Reveal key={s.subject} delay={i * 0.04}>
              <div>
                <p className="font-display font-light text-3xl text-ink leading-none tabular">
                  {String(s.A).padStart(2, '0')}
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mt-2">
                  out of 100
                </p>
                <p className="mt-3 text-sm text-ink leading-snug">{s.subject}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Typographic groups */}
        <div className="mt-24 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {TOOLKIT_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.05}>
              <div>
                <p className="eyebrow">{group.label}</p>
                <ul className="mt-6 space-y-3">
                  {group.items.map(item => (
                    <li
                      key={item}
                      className="font-display font-light text-2xl text-ink tracking-tight leading-tight"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   CONTACT — Bezel CTA with button-in-button + social row
   ========================================================================= */
function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-40 bg-paper">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-8 font-display font-light text-6xl md:text-8xl leading-[0.95] tracking-tight text-ink">
            Let&rsquo;s build
            <br />
            <em className="italic font-normal text-ink-muted/90">something real.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-10 max-w-xl mx-auto text-base md:text-lg text-ink-muted font-light leading-relaxed">
            Whether it&rsquo;s an AI PM role, scaling an LLM product, or
            navigating a complex regulated system — I&rsquo;m good with all
            three.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:mahalegauravk@gmail.com" className="btn-pill">
              mahalegauravk@gmail.com
              <span className="btn-pill-icon">
                <PaperPlaneTilt size={14} weight="light" />
              </span>
            </a>
            <div className="flex gap-2">
              <a
                href="https://linkedin.com/in/mahalegauravk"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
              >
                <LinkedinLogo size={18} weight="light" />
              </a>
              <a
                href="https://github.com/gmpro-cr"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
              >
                <GithubLogo size={18} weight="light" />
              </a>
              <a
                href="https://x.com/mahalegauravk"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
              >
                <XMark size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   COMPOSED PAGE
   ========================================================================= */
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

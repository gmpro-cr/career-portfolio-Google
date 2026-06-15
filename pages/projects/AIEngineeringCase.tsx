import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, User, Wrench } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, Pill, LifecycleSpine } from './kit';
import { RadialMap, Sequence } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'Re-reading a 535-page PDF to find one paragraph on RAG chunking — make the book itself queryable.' },
  { stage: 'Discovery', detail: 'What was missing was retrieval and deep links, not a summary: a reference tool, not a read-once.' },
  { stage: 'Validation', detail: 'Content-as-data proved a one-line chapter edit; grounding plus citations is what built reader trust.' },
  { stage: 'MVP scope', detail: 'Ten chapters as structured data, one reusable diagram component, Cmd+K search, and an Ask-the-book chat.' },
  { stage: 'Build', detail: 'React 19 + Vite; 1,325 server-side chunks; TF-IDF retrieval feeding grounded Gemini generation.' },
  { stage: 'Ship / deploy', detail: 'Live on Vercel with GitHub auto-deploy; chapter-cited answers and a graceful no-API-key fallback.' },
  { stage: 'Measure', detail: 'Answers cited 100% of the time, retrieval relevance, and read-progress resumption across sessions.' },
  { stage: 'Iterate', detail: 'Hybrid embedding retrieval, upload-your-own-PDF, and a multi-book library are planned next.' },
];

const CHAPTERS = ['Intro', 'Foundation Models', 'Eval Methodology', 'Eval AI Systems', 'Prompt Eng.', 'RAG & Agents', 'Finetuning', 'Dataset Eng.', 'Inference Opt.', 'Architecture'];
// cross-chapter connections (index pairs)
const LINKS: [number, number][] = [[2, 3], [4, 5], [5, 7], [6, 7], [8, 9], [1, 6]];

const RAG_ACTORS = ['Reader', 'Client', 'Vercel Fn', 'Chunks', 'Gemini'];
const RAG_MESSAGES = [
  { from: 0, to: 1, label: 'asks a question', note: '"Ask the book"' },
  { from: 1, to: 2, label: 'POST /api/chat' },
  { from: 2, to: 3, label: 'TF-IDF retrieve top-k', note: 'over 1,325 chunks' },
  { from: 3, to: 2, label: 'returns ranked chunks' },
  { from: 2, to: 4, label: 'grounded prompt + chunks' },
  { from: 4, to: 2, label: 'answer + chapter citations' },
  { from: 2, to: 1, label: 'streamed response' },
  { from: 1, to: 0, label: 'answer with sources', note: 'verifiable' },
];

export default function AIEngineeringCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero: book / chapter index ───────────────────────────── */}
      <section className="py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="eyebrow">Shipped Product</span>
                  <span className="font-display italic text-sm text-ink-muted">{project.date}</span>
                  {project.metrics && <Pill theme={theme}>{project.metrics}</Pill>}
                </div>
                <h1 className="font-display font-light leading-[0.95] tracking-tight text-ink" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>{project.title}</h1>
                <p className="mt-4 md:mt-6 text-sm md:text-base text-ink/75 leading-relaxed">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">{t}</span>)}
                </div>
              </div>
              {/* chapter spine */}
              <div className="rounded-[1.25rem] p-4 md:p-5" style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40` }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 12 }}>Contents · 10 chapters</p>
                <div className="flex flex-col gap-1">
                  {CHAPTERS.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 py-1" style={{ borderBottom: i < CHAPTERS.length - 1 ? `1px solid ${theme.accentBorder}22` : 'none' }}>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: theme.accentDark, opacity: 0.7, width: 18 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '12px', color: '#3A332E' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>The Problem</SectionLabel>
            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ background: theme.accent }} />
              <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>&ldquo;{extras.problemStatement}&rdquo;</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Lifecycle: idea to deployment ────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>from idea to deployment</SectionLabel>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">From 535 pages <em className="italic font-normal text-ink-muted">to an askable book.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── Chapter knowledge map (signature) ────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel theme={theme}>Knowledge Map</SectionLabel>
              <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">Ten chapters, <em className="italic font-normal text-ink-muted">cross-linked.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed">The book is stored as pure data — each chapter a structured file of sections, concepts, terms, and connections. Dashed links mark the cross-chapter references that turn a linear read into a navigable graph: eval methodology feeds eval-of-systems, RAG borrows from finetuning and dataset engineering.</p>
            </div>
            <RadialMap theme={theme} center="AI Engineering" nodes={CHAPTERS.map((c, i) => `${i + 1} ${c}`)} links={LINKS} />
          </div>
        </div>
      </section>

      {/* ── RAG sequence diagram (signature) ─────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<Wrench size={13} weight="light" />}>Ask the Book · RAG</SectionLabel>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-3">Every answer, <em className="italic font-normal text-ink-muted">traced to a chapter.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">Retrieval happens server-side over 1,325 chunks that never enter the client bundle. Generation is grounded strictly in what was retrieved, and forced to cite — verifiability is what makes a reader trust the answer over re-reading the source.</p>
          </Reveal>
          <Sequence actors={RAG_ACTORS} messages={RAG_MESSAGES} theme={theme} />
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-3xl" style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '18px 20px' }}>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 8 }}>PM Insight</p>
              <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Discovery + archetype ────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12 grid md:grid-cols-2 gap-10 md:gap-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-4"><Lightbulb size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">How I Found This Problem</p></div>
            <p className="text-sm text-ink/75 leading-relaxed dropcap">{extras.discovery}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4"><User size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Who It&rsquo;s For</p></div>
            <div style={{ background: 'white', border: `1px solid ${theme.accentBorder}50`, borderRadius: '1.25rem', padding: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#1A1410', marginBottom: 4 }}>{extras.userPersona.name}</p>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: theme.accentDark, fontWeight: 600, marginBottom: 12, opacity: 0.85 }}>{extras.userPersona.role}</p>
              <div style={{ paddingTop: 12, borderTop: `1px solid ${theme.accentBorder}30` }}><p style={{ fontSize: '12px', color: theme.accentDark, lineHeight: 1.6, fontStyle: 'italic' }}>{extras.userPersona.painPoint}</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <CaseFooterSections project={project} extras={extras} theme={theme} />
    </div>
  );
}

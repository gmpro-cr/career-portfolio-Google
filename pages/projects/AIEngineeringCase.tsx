import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, CaseHero } from './kit';
import { RadialMap, Sequence } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

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
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel>The problem</SectionLabel>
            <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>{extras.problemStatement}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Chapter knowledge map (signature) ────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">How the ten chapters link to each other</h2>
              <p className="text-sm text-ink/75 leading-relaxed">The book is stored as pure data, each chapter a structured file of sections, concepts, terms, and connections. Dashed links mark the cross-chapter references that turn a linear read into a navigable graph: eval methodology feeds eval-of-systems, RAG borrows from finetuning and dataset engineering.</p>
            </div>
            <RadialMap theme={theme} center="AI Engineering" nodes={CHAPTERS.map((c, i) => `${i + 1} ${c}`)} links={LINKS} />
          </div>
        </div>
      </section>

      {/* ── RAG sequence diagram (signature) ─────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Every answer cites its chapter</h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">Retrieval happens server-side over 1,325 chunks that never enter the client bundle. Generation is grounded strictly in what was retrieved, and forced to cite. Being able to verify is what makes a reader trust the answer over re-reading the source.</p>
          </Reveal>
          <Sequence actors={RAG_ACTORS} messages={RAG_MESSAGES} theme={theme} />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
          </Reveal>
        </div>
      </section>

      {/* ── How I found the problem ─────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-4xl text-ink tracking-tight mb-5">How I found the problem</h2>
            <p className="text-base text-ink/80 leading-relaxed max-w-3xl">{extras.discovery}</p>
            <p className="mt-5 text-base text-ink/80 leading-relaxed max-w-3xl"><span className="font-medium text-ink">Who it&rsquo;s for: </span>{extras.audience}</p>
          </Reveal>
        </div>
      </section>

      <CaseFooterSections project={project} extras={extras} theme={theme} />
    </div>
  );
}

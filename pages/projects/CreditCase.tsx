import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, CaseHero } from './kit';
import { Swimlane, Flowchart, type FlowNode } from './diagrams';
import { CaseFooterSections } from './PersonaCase';
import { ProductBrief } from './explainers';
import CreditScene from './scenes/CreditScene';
import { BRIEFS } from './briefs';

const RESEARCH_LOOP: FlowNode[] = [
  { id: 'seed', label: 'Seed: borrower name + sector', type: 'start', forwardLabel: 'begin' },
  { id: 'search', label: 'Search Screener.in · Yahoo Finance · BSE · open web' },
  { id: 'gather', label: 'Gather: pledging, downgrades, court cases, headwinds' },
  { id: 'score', label: 'Self-score knowledge completeness ≥ 85% ?', type: 'decision', forwardLabel: 'yes · enough', loopBackTo: 'search', loopLabel: 'no · keep digging' },
  { id: 'handoff', label: 'Pass verified structured JSON to LLM narrative', type: 'output' },
];

export default function CreditCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      <CreditScene theme={theme} />
      <ProductBrief brief={BRIEFS[project.slug]} />

      {/* ── Two-stage swimlane (signature) ───────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Python computes the ratios; the LLM writes the memo</h2>
            <p className="text-sm text-ink/75 leading-relaxed mb-8 md:mb-10 max-w-2xl">The strict separation is the whole design: the Python engine owns every number so the LLM never touches arithmetic; it only writes the story from pre-verified JSON. That one decision solved ~90% of accuracy issues.</p>
          </Reveal>
          <Swimlane
            theme={theme}
            handoff="hand-off: verified JSON only"
            lanes={[
              { label: 'Python Engine', sub: 'deterministic, no hallucinations', rampIndex: 1, steps: ['PDF upload', 'PDFMiner extract', 'Parse P&L · BS · CF', '12 ratios (DSCR, D/E, ICR)', '10 risk flags'] },
              { label: 'AI Layer', sub: 'narrative synthesis only', rampIndex: 3, steps: ['Gemini drafts 8-section CAM', 'Claude cross-validates', 'Per-section confidence', 'HITL editor', 'Excel + PDF export'] },
            ]}
          />
        </div>
      </section>

      {/* ── Self-scoring research loop (signature flowchart) ─────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-start">
            <div>
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">A research loop with a stopping rule</h2>
              <p className="text-sm text-ink/75 leading-relaxed mb-6 max-w-2xl">A Karpathy-style agent self-scores its own knowledge completeness and keeps searching until it crosses 85%. Setting that threshold was a product decision: low enough to terminate, high enough that the AI never ships a shallow summary when more was findable.</p>
              <p className="text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
            </div>
            <Flowchart nodes={RESEARCH_LOOP} theme={theme} />
          </div>
        </div>
      </section>

      {/* ── How I found the problem ─────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-4xl text-ink tracking-tight mb-5">How I found the problem</h2>
            <p className="text-base text-ink/80 leading-relaxed max-w-2xl">{extras.discovery}</p>
          </Reveal>
        </div>
      </section>

      <CaseFooterSections project={project} extras={extras} theme={theme} />
    </div>
  );
}

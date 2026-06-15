import React from 'react';
import { Lightbulb, User, Wrench } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, LifecycleSpine, CaseHero } from './kit';
import { Swimlane, Flowchart, type FlowNode } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'Nine years writing Credit Appraisal Memos made the waste obvious: the 4-6 hours went to extraction, not judgment.' },
  { stage: 'Discovery', detail: 'Mapped the analyst journey end to end; the bottleneck was mechanical parsing plus scattered web research.' },
  { stage: 'Validation', detail: 'Format familiarity, not accuracy, turned out to be the adoption blocker once output mirrored the committee template.' },
  { stage: 'MVP scope', detail: 'PDF to ratios to an 8-section CAM, with a hard split between deterministic math and LLM narrative.' },
  { stage: 'Build', detail: 'FastAPI + PDFMiner engine, a Karpathy research loop (>=85%), Gemini drafting and Claude cross-validation.' },
  { stage: 'Ship / deploy', detail: 'Next.js 16 HITL editor with bank-format Excel / PDF export; Supabase-backed cases, deploy prepped.' },
  { stage: 'Measure', detail: 'CAM prep time, 10 auto-detected risk flags, per-section confidence, and research-completeness scoring.' },
  { stage: 'Iterate', detail: 'Confidence scoring shifted review to the uncertain sections; version history and team accounts are next.' },
];

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

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>The Bottleneck</SectionLabel>
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
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">From a nine-year pain point <em className="italic font-normal text-ink-muted">to a shipped tool.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── Two-stage swimlane (signature) ───────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<Wrench size={13} weight="light" />}>Two-Stage Pipeline</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Math is deterministic. <em className="italic font-normal text-ink-muted">Narrative is generative.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-10">The strict separation is the whole design: the Python engine owns every number so the LLM never touches arithmetic — it only writes the story from pre-verified JSON. That one decision solved ~90% of accuracy issues.</p>
          </Reveal>
          <Swimlane
            theme={theme}
            handoff="hand-off: verified JSON only"
            lanes={[
              { label: 'Python Engine', sub: 'deterministic — no hallucinations', rampIndex: 1, steps: ['PDF upload', 'PDFMiner extract', 'Parse P&L · BS · CF', '12 ratios (DSCR, D/E, ICR)', '10 risk flags'] },
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
              <SectionLabel theme={theme}>Autonomous Research</SectionLabel>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">A research loop that <em className="italic font-normal text-ink-muted">knows when it&rsquo;s done.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed mb-6">A Karpathy-style agent self-scores its own knowledge completeness and keeps searching until it crosses 85%. Setting that threshold was a product decision: low enough to terminate, high enough that the AI never ships a shallow summary when more was findable.</p>
              <div style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '18px 20px' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 8 }}>PM Insight</p>
                <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
              </div>
            </div>
            <Flowchart nodes={RESEARCH_LOOP} theme={theme} />
          </div>
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
            <div className="flex items-center gap-2 mb-4"><User size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Archetypal User</p></div>
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

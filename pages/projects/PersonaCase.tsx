import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, MetricsRow, CaseHero } from './kit';
import { HowItWorks, ProductBrief } from './explainers';
import { BRIEFS, HOW_IT_WORKS } from './briefs';
import { RadialMap, Flowchart, Funnel, type FlowNode } from './diagrams';

const MEMORY_LOOP: FlowNode[] = [
  { id: 'msg', label: 'User sends a message', type: 'start', forwardLabel: 'inbound' },
  { id: 'recall', label: 'Recall persona + last N memory chunks (Supabase)' },
  { id: 'assemble', label: 'Assemble prompt: system persona + memory + input' },
  { id: 'route', label: 'LLM router → Gemini Flash (speed) or Groq Llama (depth)' },
  { id: 'eval', label: 'Persona eval scores character consistency', type: 'decision', forwardLabel: 'in-character', loopBackTo: 'route', loopLabel: 'drift → re-route' },
  { id: 'reply', label: 'Stream reply + persist new memory chunk', type: 'output' },
];

const RETENTION = [
  { label: 'Discover: browse 350+ personas', value: '100%', sub: 'Guest mode, zero signup friction' },
  { label: 'Engage: first in-character moment', value: '~60%', sub: 'The "aha": unexpected-but-consistent reply' },
  { label: 'Habit: 2+ personas in week 1', value: '3× D30', sub: 'Multi-persona users retain 3× single-persona' },
  { label: 'Convert: premium (Razorpay ₹249/mo)', value: '₹10K MRR', sub: 'OKR target, not yet an outcome; assumes 3% free → paid' },
];

export default function PersonaCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      <HowItWorks steps={HOW_IT_WORKS[project.slug]} theme={theme} />
      <ProductBrief brief={BRIEFS[project.slug]} />

      {/* ── Persona constellation ────────────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">One hub for forty persona worlds</h2>
              <p className="text-sm text-ink/75 leading-relaxed">350+ curated personas fan out from a single product surface across 40 categories. India-first by design: Chanakya, Sadhguru, Shah Rukh Khan, Osho, characters Western platforms don&rsquo;t serve. The breadth is the moat: discovery across categories is what drives the multi-persona habit that retains.</p>
            </div>
            <div>
              <RadialMap theme={theme} center="AI Spirit" nodes={['Business', 'Spiritual', 'Entertainment', 'Companion', 'Fitness', 'Anime']} />
              <p className="mt-3 text-center text-xs text-ink-muted">Six flagship categories shown, of 40 in the catalogue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conversation memory loop (signature flowchart) ───────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
            <div>
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">How conversation memory works</h2>
              <p className="text-sm text-ink/75 leading-relaxed mb-6">Every message runs the same closed loop. The persona eval is the gate: if a draft reply drifts out of character, it is re-routed before it ever reaches the user. Memory is written back on every turn, so context compounds across sessions.</p>
              <p className="text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
            </div>
            <Flowchart nodes={MEMORY_LOOP} theme={theme} />
          </div>
        </div>
      </section>

      {/* ── Retention funnel ─────────────────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-3xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12">The retention funnel</h2>
          </Reveal>
          <Funnel stages={RETENTION} theme={theme} />
        </div>
      </section>

      {/* ── How I found the problem ─────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-4xl text-ink tracking-tight mb-5">How I found the problem</h2>
            <p className="text-base text-ink/80 leading-relaxed max-w-3xl">{extras.discovery}</p>
          </Reveal>
        </div>
      </section>

      <CaseFooterSections project={project} extras={extras} theme={theme} />
    </div>
  );
}

/* Shared tail: outcomes, then reflection */
export function CaseFooterSections({ project, extras, theme }: CaseProps) {
  return (
    <>
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12">Outcomes</h2>
          </Reveal>
          <MetricsRow metrics={extras.metrics} theme={theme} />
        </div>
      </section>


      {project.reflection && (
        <section className="py-12 md:py-24 border-t border-hairline">
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Reveal>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-6 md:mb-8">Reflection</h2>
              <p className="font-display font-light text-ink/80 leading-relaxed tracking-tight max-w-4xl" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)' }}>{project.reflection}</p>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

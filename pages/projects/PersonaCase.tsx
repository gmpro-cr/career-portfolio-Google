import React from 'react';
import { ChartLine, Lightbulb, User, Clock } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, MetricsRow, RoadmapTimeline, LifecycleSpine, CaseHero } from './kit';
import { RadialMap, Flowchart, Funnel, type FlowNode } from './diagrams';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'People were "talking to" Elon or Naval via ChatGPT and YouTube — real admiration with no product to close the loop into dialogue.' },
  { stage: 'Discovery', detail: 'Early-user conversations surfaced a genuine parasocial need; a 10-item JTBD map resolved into five distinct segments.' },
  { stage: 'Validation', detail: 'A guest-mode prototype showed multi-persona users retained 3x — a clear PMF signal in Mixpanel cohorts.' },
  { stage: 'MVP scope', detail: '350+ personas, guest mode, an LLM router and a freemium paywall; voice and custom personas deferred to v2.' },
  { stage: 'Build', detail: 'Next.js with Supabase memory, a persona-eval drift scorer, and a Gemini / Groq routing layer.' },
  { stage: 'Ship / deploy', detail: 'Launched on Vercel at ai-spirit.in after a production-readiness audit that closed six critical issues.' },
  { stage: 'Measure', detail: 'North Star: messages per day. Tracked D7 / D30 cohorts, conversion, and personas per user.' },
  { stage: 'Iterate', detail: 'Proactive session-2 messages lifted D7 retention 3x; onboarding redesigned to expose 3+ personas in session one.' },
];

const MEMORY_LOOP: FlowNode[] = [
  { id: 'msg', label: 'User sends a message', type: 'start', forwardLabel: 'inbound' },
  { id: 'recall', label: 'Recall persona + last N memory chunks (Supabase)' },
  { id: 'assemble', label: 'Assemble prompt: system persona + memory + input' },
  { id: 'route', label: 'LLM router → Gemini Flash (speed) or Groq Llama (depth)' },
  { id: 'eval', label: 'Persona eval scores character consistency', type: 'decision', forwardLabel: 'in-character', loopBackTo: 'route', loopLabel: 'drift → re-route' },
  { id: 'reply', label: 'Stream reply + persist new memory chunk', type: 'output' },
];

const RETENTION = [
  { label: 'Discover — browse 350+ personas', value: '100%', sub: 'Guest mode, zero signup friction' },
  { label: 'Engage — first in-character moment', value: '~60%', sub: 'The "aha": unexpected-but-consistent reply' },
  { label: 'Habit — 2+ personas in week 1', value: '3× D30', sub: 'Multi-persona users retain 3× single-persona' },
  { label: 'Convert — premium (Razorpay ₹249/mo)', value: '₹10K MRR', sub: 'OKR target, not yet an outcome — at 3% free → paid' },
];

export default function PersonaCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>The Problem</SectionLabel>
            <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>&ldquo;{extras.problemStatement}&rdquo;</p>
          </Reveal>
        </div>
      </section>

      {/* ── Lifecycle: idea to deployment ────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>from idea to deployment</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">How a parasocial hunch <em className="italic font-normal text-ink-muted">became a shipped product.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── Persona constellation ────────────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel theme={theme}>Persona Catalogue</SectionLabel>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">One hub, <em className="italic font-normal text-ink-muted">forty worlds.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed">350+ curated personas fan out from a single product surface across 40 categories. India-first by design — Chanakya, Sadhguru, Shah Rukh Khan, Osho — characters Western platforms don&rsquo;t serve. The breadth is the moat: discovery across categories is what drives the multi-persona habit that retains.</p>
            </div>
            <div>
              <RadialMap theme={theme} center="AI Spirit" nodes={['Business', 'Spiritual', 'Entertainment', 'Companion', 'Fitness', 'Anime']} />
              <p className="mt-3 text-center text-[11px] text-ink-muted">Six flagship categories shown, of 40 in the catalogue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conversation memory loop (signature flowchart) ───────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
            <div>
              <SectionLabel theme={theme}>How a reply is built</SectionLabel>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">The conversation <em className="italic font-normal text-ink-muted">memory loop.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed mb-6">Every message runs the same closed loop. The persona eval is the gate: if a draft reply drifts out of character, it is re-routed before it ever reaches the user. Memory is written back on every turn, so context compounds across sessions.</p>
              <div style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '18px 20px' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 8 }}>PM Insight</p>
                <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
              </div>
            </div>
            <Flowchart nodes={MEMORY_LOOP} theme={theme} />
          </div>
        </div>
      </section>

      {/* ── Retention funnel ─────────────────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-3xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}><span className="inline-flex items-center gap-1.5"><ChartLine size={13} weight="light" /> Retention Funnel</span></SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12">From first touch to <em className="italic font-normal text-ink-muted">loyal retention.</em></h2>
          </Reveal>
          <Funnel stages={RETENTION} theme={theme} />
        </div>
      </section>

      {/* ── Discovery + archetype ────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12 grid md:grid-cols-2 gap-10 md:gap-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-4"><Lightbulb size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">How I Found This Problem</p></div>
            <p className="text-sm text-ink/75 leading-relaxed dropcap">{extras.discovery}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4"><User size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Archetypal User</p></div>
            <div style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}50`, borderRadius: '1.25rem', padding: '20px' }}>
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

/* Shared tail: metrics → roadmap → competitive → reflection */
export function CaseFooterSections({ project, extras, theme }: CaseProps) {
  return (
    <>
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12">{extras.outcomesTitle.lead} <em className="italic font-normal text-ink-muted">{extras.outcomesTitle.italic}</em></h2>
          </Reveal>
          <MetricsRow metrics={extras.metrics} theme={theme} />
        </div>
      </section>

      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12">{extras.roadmapTitle.lead} <em className="italic font-normal text-ink-muted">{extras.roadmapTitle.italic}</em></h2>
          </Reveal>
          <RoadmapTimeline phases={extras.roadmap} />
        </div>
      </section>

      {project.reflection && (
        <section className="py-12 md:py-24 border-t border-hairline">
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Reveal>
              <div className="flex items-center gap-2 mb-5"><Clock size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Reflection</p></div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-4">What I&rsquo;d do differently</p>
              <p className="font-display font-light text-ink/80 leading-relaxed tracking-tight max-w-4xl" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)' }}>{project.reflection}</p>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

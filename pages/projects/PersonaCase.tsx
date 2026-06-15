import React from 'react';
import { motion } from 'framer-motion';
import { ChartLine, Lightbulb, User, Clock } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, Pill, MetricsRow, CompetitiveGrid, RoadmapTimeline, LifecycleSpine } from './kit';
import { RadialMap, Flowchart, Funnel, type FlowNode } from './diagrams';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'People were "talking to" Elon or Naval via ChatGPT and YouTube — real admiration with no product to close the loop into dialogue.' },
  { stage: 'Discovery', detail: 'User interviews surfaced a genuine parasocial need; a 10-item JTBD map resolved into five distinct segments.' },
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
  { label: 'Discover — browse 370+ personas', value: '100%', sub: 'Guest mode, zero signup friction' },
  { label: 'Engage — first in-character moment', value: '~60%', sub: 'The "aha": unexpected-but-consistent reply' },
  { label: 'Habit — 2+ personas in week 1', value: '3× D30', sub: 'Multi-persona users retain 3× single-persona' },
  { label: 'Convert — premium (Razorpay)', value: '₹10K MRR', sub: 'OKR target at 3% free → paid' },
];

export default function PersonaCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero: conversational ─────────────────────────────────── */}
      <section className="py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
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
              {/* mock chat */}
              <div className="rounded-[1.5rem] p-5 md:p-6" style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40` }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 14 }}>Conversation</p>
                <div className="flex flex-col gap-2.5">
                  <div className="self-end max-w-[80%] rounded-2xl rounded-br-md px-3.5 py-2" style={{ background: theme.accent, color: 'white', fontSize: '12.5px', lineHeight: 1.4 }}>Should I leave my job for the startup?</div>
                  <div className="self-start max-w-[88%] rounded-2xl rounded-bl-md px-3.5 py-2" style={{ background: 'white', border: `1px solid ${theme.accentBorder}40`, color: '#3A332E', fontSize: '12.5px', lineHeight: 1.45 }}>Last time you mentioned the equity worried you. Has that changed, or is it the salary cut?</div>
                  <div className="self-start text-[10px] mt-0.5" style={{ color: theme.accentDark, opacity: 0.7 }}>↳ recalled from an earlier session</div>
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
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">How a parasocial hunch <em className="italic font-normal text-ink-muted">became a shipped product.</em></h2>
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
              <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">One hub, <em className="italic font-normal text-ink-muted">forty worlds.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed">370+ curated personas fan out from a single product surface across 40 categories. India-first by design — Chanakya, Sadhguru, Shah Rukh Khan, Osho — characters Western platforms don&rsquo;t serve. The breadth is the moat: discovery across categories is what drives the multi-persona habit that retains.</p>
            </div>
            <RadialMap theme={theme} center="AI Spirit" nodes={['Business', 'Spiritual', 'Entertainment', 'Companion', 'Fitness', 'Anime']} />
          </div>
        </div>
      </section>

      {/* ── Conversation memory loop (signature flowchart) ───────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
            <div>
              <SectionLabel theme={theme}>How a reply is built</SectionLabel>
              <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">The conversation <em className="italic font-normal text-ink-muted">memory loop.</em></h2>
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
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">From first touch to <em className="italic font-normal text-ink-muted">loyal retention.</em></h2>
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
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">Outcomes that <em className="italic font-normal text-ink-muted">moved the needle.</em></h2>
          </Reveal>
          <MetricsRow metrics={extras.metrics} theme={theme} />
        </div>
      </section>

      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">The roadmap, <em className="italic font-normal text-ink-muted">from MVP to platform-scale.</em></h2>
          </Reveal>
          <RoadmapTimeline phases={extras.roadmap} />
        </div>
      </section>

      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-8 md:mb-12">Where it <em className="italic font-normal text-ink-muted">wins.</em></h2>
          </Reveal>
          <CompetitiveGrid columns={extras.competitors.columns} rows={extras.competitors.rows} theme={theme} />
        </div>
      </section>

      {project.reflection && (
        <section className="py-12 md:py-24 border-t border-hairline">
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Reveal>
              <div className="flex items-center gap-2 mb-5"><Clock size={14} weight="light" className="text-ink-muted" /><p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">Reflection</p></div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-4">What I&rsquo;d do differently</p>
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ background: `${theme.accent}66` }} />
                <p className="font-display font-light text-ink/80 leading-relaxed tracking-tight" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)' }}>{project.reflection}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

import React from 'react';
import { Lightbulb, User, Phone, ShieldCheck } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, LifecycleSpine, CaseHero } from './kit';
import { Sequence, Swimlane } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'Nine years watching bank contact centres route every real request to a queue while the IVR handled only the trivial ones.' },
  { stage: 'Discovery', detail: 'Gemini Live made speech-to-speech agents good enough to hold a conversation — the open question was whether one could be trusted with money.' },
  { stage: 'Ledger first', detail: 'Double-entry Postgres ledger built and tested before a single line of agent code — BIGINT paise, zero-sum postings, append-only.' },
  { stage: 'Gateway', detail: 'Every tool call routes through one dispatch() — session, trust level, confirmation token, step-up OTP, in order.' },
  { stage: 'Agent + voice', detail: 'Provider-agnostic text agent first, then Gemini Live over a WebSocket relay, wired into a dummy ABC Bank dashboard.' },
  { stage: 'Evals', detail: '28 core regression + 103 persona-batch scenarios run live, plus 189 unit and contract tests on the ledger and policy engine.' },
  { stage: 'Harden', detail: 'A public /dev page documents real, dated failures and fixes — including an already-authenticated-session bug in identify_caller.' },
  { stage: 'Next', detail: 'Call-resume past the platform’s five-minute function timeout, and SMS-based step-up in place of the demo-mode on-screen code.' },
];

const GATE_ACTORS = ['Caller', 'Agent', 'Gateway', 'Ledger'];
const GATE_MESSAGES = [
  { from: 0, to: 1, label: '“move ₹12,000 to Rohan”' },
  { from: 1, to: 2, label: 'transfer_funds() called', note: 'the model holds no database credential' },
  { from: 2, to: 1, label: 'confirmation token', note: 'bound to a hash of these exact args' },
  { from: 1, to: 0, label: 'reads the amount back, asks for the one-time code' },
  { from: 1, to: 2, label: 'transfer_funds() again — token + step-up OTP', note: 'barge-in here invalidates the token' },
  { from: 2, to: 3, label: 'zero-sum posting', note: 'SERIALIZABLE solvency check' },
  { from: 3, to: 0, label: 'balance updates — dashboard refreshes on its own' },
];

const TRUST_LANES = [
  { label: 'Agent', sub: 'inside the model', steps: ['Ask, listen, propose', 'Read the transfer back', 'Ask for the step-up code', 'Speak the result'], rampIndex: 0 },
  { label: 'Gateway', sub: 'server-side — the model never sees it', steps: ['Verify identity + trust level', 'Check policy caps + cooling-off', 'Bind and spend the confirmation token', 'Post to the ledger, zero-sum'], rampIndex: 3 },
];

export default function VaaniCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>The Trust Problem</SectionLabel>
            <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>&ldquo;{extras.problemStatement}&rdquo;</p>
          </Reveal>
        </div>
      </section>

      {/* ── Lifecycle: idea to deployment ────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>from idea to deployment</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">A ledger first, <em className="italic font-normal text-ink-muted">a voice second.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── Four-gate confirmation sequence (signature) ──────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<Phone size={13} weight="light" />}>The Core Loop</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Four gates, <em className="italic font-normal text-ink-muted">every single transfer.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">Session, trust level, a confirmation token bound to a hash of the exact arguments, and a one-time step-up code — in that order, enforced by the gateway, not the prompt. A caller who barges in mid-readback invalidates the token; nothing gets spent twice, and nothing moves on the model’s word alone.</p>
          </Reveal>
          <Sequence actors={GATE_ACTORS} messages={GATE_MESSAGES} theme={theme} />
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-3xl" style={{ background: 'white', border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '18px 20px' }}>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 8 }}>PM Insight</p>
              <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trust boundary (signature) ───────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<ShieldCheck size={13} weight="light" />}>The Trust Boundary</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">One conversation, <em className="italic font-normal text-ink-muted">two levels of trust.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">The agent can ask, listen, and propose — it cannot enforce anything. Every rule that actually matters is checked again, in code, on the other side of a boundary the model can’t see or talk its way past.</p>
          </Reveal>
          <Swimlane lanes={TRUST_LANES} theme={theme} handoff="same conversation, different levels of trust" />
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

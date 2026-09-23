import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, CaseHero } from './kit';
import { Sequence, Swimlane } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const GATE_ACTORS = ['Caller', 'Agent', 'Gateway', 'Ledger'];
const GATE_MESSAGES = [
  { from: 0, to: 1, label: '“move ₹12,000 to Rohan”' },
  { from: 1, to: 2, label: 'transfer_funds() called', note: 'the model holds no database credential' },
  { from: 2, to: 1, label: 'confirmation token', note: 'bound to a hash of these exact args' },
  { from: 1, to: 0, label: 'reads the amount back, asks for the one-time code' },
  { from: 1, to: 2, label: 'transfer_funds() again, with token + step-up OTP', note: 'barge-in here invalidates the token' },
  { from: 2, to: 3, label: 'zero-sum posting', note: 'SERIALIZABLE solvency check' },
  { from: 3, to: 0, label: 'balance updates; dashboard refreshes on its own' },
];

const TRUST_LANES = [
  { label: 'Agent', sub: 'inside the model', steps: ['Ask, listen, propose', 'Read the transfer back', 'Ask for the step-up code', 'Speak the result'], rampIndex: 0 },
  { label: 'Gateway', sub: 'server-side; the model never sees it', steps: ['Verify identity + trust level', 'Check policy caps + cooling-off', 'Bind and spend the confirmation token', 'Post to the ledger, zero-sum'], rampIndex: 3 },
];

export default function VaaniCase({ project, extras, theme }: CaseProps) {
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

      {/* ── Four-gate confirmation sequence (signature) ──────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Four checks before any money moves</h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">Session, trust level, a confirmation token bound to a hash of the exact arguments, and a one-time step-up code, in that order, enforced by the gateway rather than the prompt. A caller who barges in mid-readback invalidates the token; nothing gets spent twice, and nothing moves on the model’s word alone.</p>
          </Reveal>
          <Sequence actors={GATE_ACTORS} messages={GATE_MESSAGES} theme={theme} />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Trust boundary (signature) ───────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">What the agent can do, and what only the gateway can</h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">The agent can ask, listen, and propose. It cannot enforce anything. Every rule that actually matters is checked again, in code, on the other side of a boundary the model can’t see or talk its way past.</p>
          </Reveal>
          <Swimlane lanes={TRUST_LANES} theme={theme} handoff="same conversation, different levels of trust" />
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

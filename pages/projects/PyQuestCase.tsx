import React from 'react';
import { Lightbulb, User, GameController } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, LifecycleSpine, CaseHero } from './kit';
import { Flowchart, Funnel, type FlowNode } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'Friends kept abandoning Python at the installer — collapse time-to-first-run to one click and keep them typing.' },
  { stage: 'Discovery', detail: 'The first ten minutes decide everything: setup friction, not lesson quality, is where beginners are lost.' },
  { stage: 'Validation', detail: 'Pyodide proved genuine CPython could run in a tab — real errors, real f-strings, nothing simulated.' },
  { stage: 'MVP scope', detail: 'Three tracks, XP and Firewall checkpoints, localStorage progress — and a hard rule: no backend, ever.' },
  { stage: 'Build', detail: '20 stages / 56 exercises with per-exercise assertion checkers; the WASM runtime lazy-loads behind stage one.' },
  { stage: 'Ship / deploy', detail: 'Fully static on Vercel CDN with GitHub auto-deploy — zero servers, zero marginal cost per learner.' },
  { stage: 'Measure', detail: 'Time-to-first-run as the north star; the gap today is aggregate drop-off telemetry per exercise.' },
  { stage: 'Iterate', detail: 'Hint system for difficulty cliffs, then a multi-file projects tier — exercises teach syntax, projects create programmers.' },
];

const RUN_LOOP: FlowNode[] = [
  { id: 'land', label: 'Learner lands — editor with runnable starter code is the hero', type: 'start', forwardLabel: 'meanwhile' },
  { id: 'load', label: 'Pyodide (CPython → WASM) lazy-loads in the background' },
  { id: 'type', label: 'Learner edits code and hits Run' },
  { id: 'exec', label: 'Real CPython executes in the tab; stdout + exceptions captured' },
  { id: 'check', label: 'Checker compares output against exercise assertions', type: 'decision', forwardLabel: 'pass', loopBackTo: 'type', loopLabel: 'fail → real error shown, edit again' },
  { id: 'xp', label: 'XP awarded, progress saved to localStorage, next node unlocks', type: 'output' },
];

const FRICTION = [
  { label: 'Land on PyQuest', value: '0s', sub: 'One URL — no signup wall, no course paywall' },
  { label: 'Runtime ready', value: '~1s felt', sub: 'WASM loads in the background while stage one is read' },
  { label: 'First code run', value: '1 click', sub: 'Type, hit Run, see real CPython output' },
  { label: 'Traditional path', value: 'hours', sub: 'Installer → PATH errors → editor choice → most never start' },
];

export default function PyQuestCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>The Setup Wall</SectionLabel>
            <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>&ldquo;{extras.problemStatement}&rdquo;</p>
          </Reveal>
        </div>
      </section>

      {/* ── Lifecycle: idea to deployment ────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>from idea to deployment</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">From installer despair <em className="italic font-normal text-ink-muted">to a one-click first run.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── Time-to-first-run funnel (signature) ─────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel theme={theme}>Time to First Run</SectionLabel>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">Seconds, <em className="italic font-normal text-ink-muted">not evenings.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed">Every second between landing and successfully running code is funnel leakage. PyQuest treats time-to-first-run as the product&rsquo;s north-star metric: the heavyweight WASM runtime loads quietly behind the first lesson, so the learner&rsquo;s very first interaction is typing real Python — not installing it.</p>
            </div>
            <Funnel stages={FRICTION} theme={theme} />
          </div>
        </div>
      </section>

      {/* ── Run-check-reward loop (signature) ────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<GameController size={13} weight="light" />}>The Core Loop</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Type, run, <em className="italic font-normal text-ink-muted">level up.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">Real CPython — not a lookalike interpreter — executes inside the tab, so a failed attempt returns the same error a terminal would. The game layer (XP, level titles, Firewall boss checkpoints) is spaced retrieval disguised as play: it&rsquo;s what turns a first run into a second session.</p>
          </Reveal>
          <Flowchart nodes={RUN_LOOP} theme={theme} />
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

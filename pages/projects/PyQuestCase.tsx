import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, CaseHero } from './kit';
import { Flowchart, Funnel, type FlowNode } from './diagrams';
import { CaseFooterSections } from './PersonaCase';
import { ProductBrief } from './explainers';
import PyQuestScene from './scenes/PyQuestScene';
import { BRIEFS } from './briefs';

const RUN_LOOP: FlowNode[] = [
  { id: 'land', label: 'Learner lands on an editor with runnable starter code', type: 'start', forwardLabel: 'meanwhile' },
  { id: 'load', label: 'Pyodide (CPython → WASM) lazy-loads in the background' },
  { id: 'type', label: 'Learner edits code and hits Run' },
  { id: 'exec', label: 'Real CPython executes in the tab; stdout + exceptions captured' },
  { id: 'check', label: 'Checker compares output against exercise assertions', type: 'decision', forwardLabel: 'pass', loopBackTo: 'type', loopLabel: 'fail → real error shown, edit again' },
  { id: 'xp', label: 'XP awarded, progress saved to localStorage, next node unlocks', type: 'output' },
];

const FRICTION = [
  { label: 'Land on PyQuest', value: '0s', sub: 'One URL, no signup wall, no course paywall' },
  { label: 'Runtime ready', value: '~1s felt', sub: 'WASM loads in the background while stage one is read' },
  { label: 'First code run', value: '1 click', sub: 'Type, hit Run, see real CPython output' },
  { label: 'Traditional path', value: 'hours', sub: 'Installer → PATH errors → editor choice → most never start' },
];

export default function PyQuestCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      <PyQuestScene theme={theme} />
      <ProductBrief brief={BRIEFS[project.slug]} />

      {/* ── Time-to-first-run funnel (signature) ─────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">Time to first working code</h2>
              <p className="text-sm text-ink/75 leading-relaxed max-w-2xl">Every second between landing and successfully running code is funnel leakage. PyQuest treats time-to-first-run as the product&rsquo;s north-star metric: the heavyweight WASM runtime loads quietly behind the first lesson, so the learner&rsquo;s very first interaction is typing real Python instead of installing it.</p>
            </div>
            <Funnel stages={FRICTION} theme={theme} />
          </div>
        </div>
      </section>

      {/* ── Run-check-reward loop (signature) ────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">The exercise loop: type, run, earn XP</h2>
            <p className="text-sm text-ink/75 leading-relaxed mb-8 md:mb-12 max-w-2xl">Real CPython, not a lookalike interpreter, executes inside the tab, so a failed attempt returns the same error a terminal would. The game layer (XP, level titles, Firewall boss checkpoints) is spaced retrieval disguised as play: it&rsquo;s what turns a first run into a second session.</p>
          </Reveal>
          <Flowchart nodes={RUN_LOOP} theme={theme} />
          <Reveal delay={0.1}>
            <p className="mt-10 text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
          </Reveal>
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

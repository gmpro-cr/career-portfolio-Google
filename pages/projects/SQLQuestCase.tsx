import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, CaseHero } from './kit';
import { Sequence, Swimlane } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const QUERY_ACTORS = ['Learner', 'Editor', 'Postgres 18', 'Checker'];
const QUERY_MESSAGES = [
  { from: 0, to: 1, label: 'writes a query', note: 'any correct SQL is fine' },
  { from: 1, to: 2, label: 'executes in-tab', note: 'PGlite: real engine, no server' },
  { from: 2, to: 1, label: 'real rows (or the real error)' },
  { from: 1, to: 3, label: 'result relation', note: 'rows, not query text' },
  { from: 3, to: 0, label: 'compared to expected rows; pass → XP', note: 'any correct query unlocks the next stage' },
];

const QUALITY_LANES = [
  { label: 'Learner path', sub: 'in the browser tab', steps: ['Stage seed SQL', 'Learner query', 'PGlite executes', 'Rows compared', 'Progress saved'], rampIndex: 0 },
  { label: 'CI quality gate', sub: 'before every deploy', steps: ['Every exercise replayed', 'Seed + solution + checker', '204 tests', 'All green → deploy'], rampIndex: 3 },
];

export default function SQLQuestCase({ project, extras, theme }: CaseProps) {
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

      {/* ── Query loop sequence (signature) ──────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">The query loop</h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">A full PostgreSQL 18 boots inside the tab via PGlite, so a NULL surprise, a genuine error message, or an EXPLAIN plan behaves exactly as it will on the job. The checker compares result rows, not query text: any semantically correct SQL passes, and learners are free to find their own path to the answer.</p>
          </Reveal>
          <Sequence actors={QUERY_ACTORS} messages={QUERY_MESSAGES} theme={theme} />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Curriculum-as-code (signature) ───────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">The same engine in the browser and in CI</h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">The same PostgreSQL engine that serves learners also gates releases: a 204-test suite replays every exercise&rsquo;s seed, solution, and checker in CI, so a curriculum edit can&rsquo;t silently break a lesson. Content quality stops being an editorial hope and becomes a build gate.</p>
          </Reveal>
          <Swimlane lanes={QUALITY_LANES} theme={theme} handoff="same engine, same exercises" />
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

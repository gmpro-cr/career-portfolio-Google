import React from 'react';
import { Lightbulb, User, Database, ShieldCheck } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, LifecycleSpine, CaseHero } from './kit';
import { Sequence, Swimlane } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'Nine years watching analysts learn SQL from canned-table tutorials, then flounder on production — teach on the real engine.' },
  { stage: 'Discovery', detail: 'The skill gap is authenticity: real errors, real NULLs, real query plans are exactly what the fakes skip.' },
  { stage: 'Validation', detail: 'PGlite proved full PostgreSQL 18 boots inside a browser tab — the cost structure of teaching it collapsed.' },
  { stage: 'MVP scope', detail: 'Three tiers to genuine depth — window frames, recursion, EXPLAIN, row-level security — with a row-comparison checker.' },
  { stage: 'Build', detail: '34 stages / 148 exercises as declarative data; seed SQL per stage; the "Green Bar" phosphor-terminal identity.' },
  { stage: 'Ship / deploy', detail: 'Static bundle on Vercel, GitHub auto-deploy, cache-busted assets, Web Analytics measuring real usage.' },
  { stage: 'Measure', detail: '204-test suite green as the quality bar; analytics tracking which stages learners actually reach.' },
  { stage: 'Iterate', detail: 'A shared-dataset capstone tier — open analytical questions instead of guided drills — is planned next.' },
];

const QUERY_ACTORS = ['Learner', 'Editor', 'Postgres 18', 'Checker'];
const QUERY_MESSAGES = [
  { from: 0, to: 1, label: 'writes a query', note: 'any correct SQL is fine' },
  { from: 1, to: 2, label: 'executes in-tab', note: 'PGlite — real engine, no server' },
  { from: 2, to: 1, label: 'real rows (or the real error)' },
  { from: 1, to: 3, label: 'result relation', note: 'rows, not query text' },
  { from: 3, to: 0, label: 'compared to expected rows — pass → XP', note: 'any correct query unlocks the next stage' },
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
          <Reveal><SectionLabel theme={theme}>The Simulation Problem</SectionLabel>
            <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>&ldquo;{extras.problemStatement}&rdquo;</p>
          </Reveal>
        </div>
      </section>

      {/* ── Lifecycle: idea to deployment ────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>from idea to deployment</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">From canned tables <em className="italic font-normal text-ink-muted">to a real database.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── Query loop sequence (signature) ──────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<Database size={13} weight="light" />}>The Core Loop</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">Type, run, <em className="italic font-normal text-ink-muted">rows come back.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">A full PostgreSQL 18 boots inside the tab via PGlite — so a NULL surprise, a genuine error message, or an EXPLAIN plan behaves exactly as it will on the job. The checker compares result rows, not query text: any semantically correct SQL passes, and learners are free to find their own path to the answer.</p>
          </Reveal>
          <Sequence actors={QUERY_ACTORS} messages={QUERY_MESSAGES} theme={theme} />
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-3xl" style={{ background: 'white', border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '18px 20px' }}>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 8 }}>PM Insight</p>
              <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Curriculum-as-code (signature) ───────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme} icon={<ShieldCheck size={13} weight="light" />}>Curriculum as Code</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-3">One engine, <em className="italic font-normal text-ink-muted">both sides of the deploy.</em></h2>
            <p className="text-sm text-ink/75 leading-relaxed max-w-2xl mb-8 md:mb-12">The same PostgreSQL engine that serves learners also gates releases: a 204-test suite replays every exercise&rsquo;s seed, solution, and checker in CI, so a curriculum edit can&rsquo;t silently break a lesson. Content quality stops being an editorial hope and becomes a build gate.</p>
          </Reveal>
          <Swimlane lanes={QUALITY_LANES} theme={theme} handoff="same engine, same exercises" />
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

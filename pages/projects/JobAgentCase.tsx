import React from 'react';
import { Lightbulb, User, ChartLine } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, LifecycleSpine, CaseHero, ProblemStatement, ResultBand } from './kit';
import { RadialMap, Funnel } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

const LIFECYCLE = [
  { stage: 'Idea', detail: 'Two hours every morning filtering Naukri and LinkedIn — automate the top of the funnel and reclaim the time.' },
  { stage: 'Discovery', detail: 'A high-noise, low-signal data problem: relevance, not volume, was what actually needed solving.' },
  { stage: 'Validation', detail: 'Three months of self-use with 7,413 jobs as ground truth; five peers asking for it triggered the multi-user pivot.' },
  { stage: 'MVP scope', detail: 'A 6-portal scraper, local Ollama scoring and a Telegram digest, gated by a 65-point relevance threshold.' },
  { stage: 'Build', detail: 'Selenium + BeautifulSoup, fingerprint dedup, Mistral 7B scoring, and a Flask settings dashboard.' },
  { stage: 'Ship / deploy', detail: 'Multi-user rewrite on Vercel + Neon + Blob, scheduled by GitHub Actions cron — no 24/7 server.' },
  { stage: 'Measure', detail: 'Daily time saved, matched roles per day, and threshold calibration against the catalogued ground truth.' },
  { stage: 'Iterate', detail: 'Conversational onboarding and an apply / dismiss feedback loop (the model learns) are in build.' },
];

const SIGNAL = [
  { label: 'Raw listings scraped per run', value: '200–500', sub: '6 portals scraped in parallel' },
  { label: 'After fingerprint dedup', value: '~7.4K', sub: 'portal + company + role + location hash' },
  { label: 'Semantic score ≥ 65 threshold', value: 'cut', sub: 'below 65 stored but excluded from digest' },
  { label: 'Delivered to Telegram digest', value: '~10/day', sub: '5-minute review vs 2-hour browse' },
];

export default function JobAgentCase({ project, extras, theme }: CaseProps) {
  return (
    <div>
      {/* ── Hero + deployed-site screenshot ──────────────────────── */}
      <CaseHero project={project} theme={theme} />

      {/* ── Result band (dark, signature differentiator) ─────────── */}
      <ResultBand
        theme={theme}
        eyebrow="The result"
        before="2 hours every morning"
        after="A 5-minute digest"
        caption="Top-of-funnel filtering — the daily scroll through hundreds of irrelevant listings — became a single relevance-ranked digest delivered to Telegram."
        stats={[
          { value: '7,413', label: 'Jobs catalogued as ground truth' },
          { value: '65', label: 'Relevance threshold — the key product lever' },
          { value: '~10/day', label: 'Matched roles delivered' },
        ]}
      />

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <ProblemStatement label="The Noise Problem" theme={theme}>{extras.problemStatement}</ProblemStatement>
        </div>
      </section>

      {/* ── Lifecycle: idea to deployment ────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>from idea to deployment</SectionLabel>
            <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-12 max-w-2xl">From a morning chore <em className="italic font-normal text-ink-muted">to an automated agent.</em></h2>
          </Reveal>
          <LifecycleSpine stages={LIFECYCLE} theme={theme} />
        </div>
      </section>

      {/* ── 6-portal fan-in (signature) ──────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel theme={theme}>Coverage</SectionLabel>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">Six portals, <em className="italic font-normal text-ink-muted">one pipe.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed">Selenium + BeautifulSoup scrape six fragmented job boards in parallel — each with its own anti-scrape handling, session management, and pagination quirks — and funnel everything into a single deduplicated stream. No portal is hit twice within 12 hours.</p>
            </div>
            <RadialMap theme={theme} center="Scraper" nodes={['LinkedIn', 'Naukri', 'Indeed', 'HiringCafe', 'Wellfound', 'IIMJobs']} />
          </div>
        </div>
      </section>

      {/* ── Noise → signal funnel (signature) ────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
            <div>
              <SectionLabel theme={theme} icon={<ChartLine size={13} weight="light" />}>Signal Filtering</SectionLabel>
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">Hundreds in. <em className="italic font-normal text-ink-muted">Ten out.</em></h2>
              <p className="text-sm text-ink/75 leading-relaxed mb-6">The 65-point relevance threshold is the product&rsquo;s most important parameter — and a product decision, not a config setting. Calibrated empirically over three months of self-use against 7,413 catalogued jobs as ground truth.</p>
              <div style={{ background: theme.accentBg, border: `1px solid ${theme.accentBorder}40`, borderRadius: '1.25rem', padding: '18px 20px' }}>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: theme.accentDark, fontWeight: 700, marginBottom: 8 }}>PM Insight</p>
                <p className="text-sm text-ink/80 leading-relaxed">{extras.pmInsight}</p>
              </div>
            </div>
            <Funnel stages={SIGNAL} theme={theme} />
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

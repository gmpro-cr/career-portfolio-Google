import React from 'react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, CaseHero } from './kit';
import { RadialMap, Funnel } from './diagrams';
import { CaseFooterSections } from './PersonaCase';

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

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel>The problem</SectionLabel>
            <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>{extras.problemStatement}</p>
          </Reveal>
        </div>
      </section>

      {/* ── 6-portal fan-in (signature) ──────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">Six job portals, one pipeline</h2>
              <p className="text-sm text-ink/75 leading-relaxed">Selenium + BeautifulSoup scrape six fragmented job boards in parallel, each with its own anti-scrape handling, session management, and pagination quirks, and funnel everything into a single deduplicated stream. No portal is hit twice within 12 hours.</p>
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
              
              <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-4">Hundreds of listings in, ten out</h2>
              <p className="text-sm text-ink/75 leading-relaxed mb-6">The 65-point relevance threshold is the product&rsquo;s most important parameter, and setting it is a product decision. Calibrated empirically over three months of self-use against 7,413 catalogued jobs as ground truth.</p>
              <p className="text-sm text-ink/80 leading-relaxed max-w-2xl">{extras.pmInsight}</p>
            </div>
            <Funnel stages={SIGNAL} theme={theme} />
          </div>
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

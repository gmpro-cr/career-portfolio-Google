import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, User, ChartLine } from '@phosphor-icons/react';
import type { CaseProps } from './caseData';
import { Reveal, SectionLabel, Pill } from './kit';
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
      {/* ── Hero: terminal / cron ────────────────────────────────── */}
      <section className="py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="eyebrow">Shipped Product</span>
              <span className="font-display italic text-sm text-ink-muted">{project.date}</span>
              {project.metrics && <Pill theme={theme}>{project.metrics}</Pill>}
            </div>
            <h1 className="font-display font-light leading-[0.95] tracking-tight text-ink" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.75rem)' }}>{project.title}</h1>
            <p className="mt-4 md:mt-6 text-sm md:text-lg text-ink/60 leading-relaxed max-w-3xl">{project.description}</p>
            {/* terminal strip */}
            <div className="mt-7 rounded-xl overflow-hidden" style={{ border: `1px solid ${theme.accentBorder}40`, fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)' }}>
              <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: theme.accentBg, borderBottom: `1px solid ${theme.accentBorder}30` }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent, opacity: 0.5 }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent, opacity: 0.3 }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent, opacity: 0.2 }} />
                <span className="ml-2 text-[10px]" style={{ color: theme.accentDark }}>job-agent · github actions cron</span>
              </div>
              <div className="px-4 py-3 text-[11.5px] leading-relaxed" style={{ background: '#1A1410', color: '#E7E5E4' }}>
                <div><span style={{ color: theme.accent }}>$</span> run scrape --portals 6 --schedule "0 7,19 * * *"</div>
                <div style={{ color: '#A8A29E' }}>→ scraped 412 listings · deduped → 9 new</div>
                <div style={{ color: '#A8A29E' }}>→ scored 0–100 (Ollama / Mistral 7B, local)</div>
                <div><span style={{ color: theme.accent }}>OK</span> 10 roles ≥ 65 → Telegram digest sent</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">{t}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <Reveal><SectionLabel theme={theme}>The Noise Problem</SectionLabel>
            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-1 rounded-full self-stretch" style={{ background: theme.accent }} />
              <p className="font-display font-light text-ink leading-[1.45] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}>&ldquo;{extras.problemStatement}&rdquo;</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6-portal fan-in (signature) ──────────────────────────── */}
      <section className="py-12 md:py-24 border-t border-hairline" style={{ background: `${theme.accentBg}55` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel theme={theme}>Coverage</SectionLabel>
              <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">Six portals, <em className="italic font-normal text-ink-muted">one pipe.</em></h2>
              <p className="text-sm text-ink/65 leading-relaxed">Selenium + BeautifulSoup scrape six fragmented job boards in parallel — each with its own anti-scrape handling, session management, and pagination quirks — and funnel everything into a single deduplicated stream. No portal is hit twice within 12 hours.</p>
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
              <h2 className="font-display font-light text-2xl md:text-4xl text-ink tracking-tight mb-4">Hundreds in. <em className="italic font-normal text-ink-muted">Ten out.</em></h2>
              <p className="text-sm text-ink/65 leading-relaxed mb-6">The 65-point relevance threshold is the product&rsquo;s most important parameter — and a product decision, not a config setting. Calibrated empirically over three months of self-use against 7,413 catalogued jobs as ground truth.</p>
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
            <p className="text-sm text-ink/75 leading-relaxed">{extras.discovery}</p>
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

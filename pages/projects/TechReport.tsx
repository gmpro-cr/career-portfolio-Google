import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CaretRight,
  BookOpenText, Brain, TreeStructure, Path, GearSix, Warning, SealCheck, Stack, Flag, Notebook,
} from '@phosphor-icons/react';
import { PROJECTS, getTheme } from '../../constants';
import { usePageMeta } from '../../components/usePageMeta';
import type { ProjectTheme } from '../../types';
import { Reveal, useReveal, EASE_STR } from './kit';
import { Flowchart, Sequence, Swimlane } from './diagrams';
import { SystemMap, ChainScene } from './tech/SystemMap';
import { REPORTS } from './tech/reports';
import type { Diagram, ModelUse, TechReportData } from './tech/types';

/* ═══════════════════════════════════════════════════════════════
   TECHNICAL REPORT — /project/:slug/how-it-works
   One template for all seven products, so the same question always
   sits in the same place. Each section has its own visual form (model
   cards, a filling timeline, a layered hosting stack, a glossary grid)
   so a long read never settles into one repeated shape, and everything
   is tinted from the project's own theme so the seven reports differ.
   ═══════════════════════════════════════════════════════════════ */

type IconType = React.ComponentType<{ size?: number; weight?: 'light' | 'regular' | 'duotone' | 'fill'; color?: string; 'aria-hidden'?: boolean }>;

const SECTIONS: { id: string; label: string; icon: IconType }[] = [
  { id: 'summary', label: 'In one minute', icon: BookOpenText },
  { id: 'models', label: 'The AI models', icon: Brain },
  { id: 'system', label: 'The system', icon: TreeStructure },
  { id: 'request', label: 'Step by step', icon: Path },
  { id: 'mechanisms', label: 'Key parts', icon: GearSix },
  { id: 'failures', label: 'When things go wrong', icon: Warning },
  { id: 'testing', label: 'Testing', icon: SealCheck },
  { id: 'hosting', label: 'Hosting and cost', icon: Stack },
  { id: 'limits', label: 'Known limits', icon: Flag },
  { id: 'glossary', label: 'Glossary', icon: Notebook },
];

const WHEN_LABEL: Record<ModelUse['when'], string> = {
  'every request': 'Every request',
  fallback: 'Fallback',
  background: 'In the background',
  'development only': 'Development only',
  'on demand': 'On demand',
};

/* Faint dot grid in the project accent, for tinted sections. */
const dots = (theme: ProjectTheme) => ({
  backgroundColor: `${theme.accentBg}`,
  backgroundImage: `radial-gradient(${theme.accent}22 1px, transparent 1.2px)`,
  backgroundSize: '22px 22px',
});

function Section({ id, children, theme, tint }: { id: string; children: React.ReactNode; theme: ProjectTheme; tint?: boolean }) {
  return (
    <section id={id} data-report-section className="scroll-mt-32 py-16 md:py-24 border-t border-hairline" style={tint ? dots(theme) : undefined}>
      <div className="max-w-6xl mx-auto px-4 md:px-12">{children}</div>
    </section>
  );
}

/* Big outlined numeral + icon tile + title. */
function SectionHead({ n, theme, title, intro }: { n: number; theme: ProjectTheme; title: React.ReactNode; intro?: string }) {
  const Icon = SECTIONS[n - 1].icon;
  return (
    <Reveal>
      <div className="flex items-end gap-4 md:gap-6">
        <span
          aria-hidden
          className="font-display font-light leading-none tabular select-none"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', color: 'transparent', WebkitTextStroke: `1.25px ${theme.accent}`, letterSpacing: '-0.04em' }}
        >
          {String(n).padStart(2, '0')}
        </span>
        <div className="pb-1.5 md:pb-3 min-w-0">
          <span className="inline-grid h-9 w-9 place-items-center rounded-xl mb-3" style={{ background: theme.accentBg, color: theme.accentDark, boxShadow: `inset 0 0 0 1px ${theme.accent}33` }}>
            <Icon size={18} weight="duotone" aria-hidden />
          </span>
          <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight leading-[1.02]" style={{ textWrap: 'balance' }}>{title}</h2>
        </div>
      </div>
      {intro && <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ink/75">{intro}</p>}
    </Reveal>
  );
}

/* Card with a cursor-following accent glow on its border. */
function GlowCard({ theme, className = '', style, children }: { theme: ProjectTheme; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--gx', `${e.clientX - r.left}px`);
    el.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative rounded-2xl bg-white transition-all duration-500 ease-spring hover:-translate-y-0.5 ${className}`}
      style={{
        boxShadow: `0 1px 0 rgba(26,20,16,0.04), 0 18px 36px -28px ${theme.accentDark}66`,
        border: '1px solid #E7E5E4',
        ...style,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), ${theme.accent}33, transparent 70%)`, WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: 1 }}
      />
      {children}
    </div>
  );
}

function DiagramView({ d, theme }: { d: Diagram; theme: ProjectTheme }) {
  if (d.kind === 'flow') return <Flowchart nodes={d.nodes} theme={theme} />;
  if (d.kind === 'sequence') return <Sequence actors={d.actors} messages={d.messages} theme={theme} />;
  return <Swimlane lanes={d.lanes} handoff={d.handoff} theme={theme} />;
}

/* ─── Sticky chapter bar: where am I, how far through ─────────── */
function ChapterBar({ theme }: { theme: ProjectTheme }) {
  const [active, setActive] = useState('summary');
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const first = els[0]; const last = els[els.length - 1];
      if (!first || !last) return;
      const start = first.offsetTop - 200;
      const end = last.offsetTop + last.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start))));
      let cur = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top < 180) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  // Keep the active chapter visible inside the horizontally scrolling bar.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !item) return;
    const left = item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="sticky top-16 z-40 border-y border-hairline" style={{ background: 'rgba(253,251,247,0.9)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <ol ref={listRef} className="flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Sections">
          {SECTIONS.map((s, i) => {
            const on = s.id === active;
            const Icon = s.icon;
            return (
              <li key={s.id} data-id={s.id} className="flex-shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  aria-current={on ? 'location' : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 active:scale-[0.97]"
                  style={on ? { background: theme.accentDark, color: '#FFFFFF' } : { color: '#57534E' }}
                >
                  <Icon size={13} weight={on ? 'fill' : 'regular'} aria-hidden />
                  <span className="tabular opacity-70">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="h-[2px] origin-left" style={{ background: theme.accent, transform: `scaleX(${progress})`, transition: 'transform 0.15s linear' }} />
    </div>
  );
}

/* ─── Models ─────────────────────────────────────────────────── */
function ModelCards({ uses, theme }: { uses: ModelUse[]; theme: ProjectTheme }) {
  if (!uses.length) return null;
  const [lead, ...rest] = uses;
  return (
    <div className="mt-10 grid gap-4 md:gap-5">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] p-6 md:p-10" style={{ background: `linear-gradient(135deg, ${theme.accentDark} 0%, ${theme.accent} 120%)`, color: '#FFFFFF', boxShadow: `0 30px 60px -40px ${theme.accentDark}` }}>
          <span aria-hidden className="absolute -right-10 -top-10 h-56 w-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)' }} />
          <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-inset ring-white/25">
                <Brain size={13} weight="fill" aria-hidden /> {WHEN_LABEL[lead.when]}
              </span>
              <p className="mt-5 font-display font-light leading-[1.02] tracking-tight" style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.2rem)', textWrap: 'balance' }}>{lead.name}</p>
              <p className="mt-2 text-sm text-white/70">{lead.provider}</p>
            </div>
            <div className="grid gap-5 content-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">What it does</p>
                <p className="mt-1.5 text-base leading-relaxed text-white/95">{lead.job}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">Why this one</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">{lead.why}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      {rest.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {rest.map((m, i) => (
            <React.Fragment key={i}>
              <Reveal delay={(i % 2) * 0.06} className={rest.length % 2 === 1 && i === rest.length - 1 ? 'md:col-span-2' : ''}>
                <GlowCard theme={theme} className="h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-xl md:text-2xl text-ink leading-snug tracking-tight">{m.name}</p>
                      <p className="mt-1 text-xs text-ink-muted">{m.provider}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: theme.accentBg, color: theme.accentDark }}>{WHEN_LABEL[m.when]}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/85">{m.job}</p>
                  <p className="mt-3 pt-3 border-t border-hairline text-sm leading-relaxed text-ink/65">{m.why}</p>
                </GlowCard>
              </Reveal>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function NoModel({ text, theme }: { text: string; theme: ProjectTheme }) {
  return (
    <Reveal>
      <div className="mt-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-center rounded-[2rem] bg-white p-6 md:p-10" style={{ border: `1px solid ${theme.accent}33`, boxShadow: `0 30px 60px -44px ${theme.accentDark}` }}>
        <div className="flex items-baseline gap-3">
          <span className="font-display font-light leading-none tabular" style={{ fontSize: 'clamp(4.5rem, 10vw, 7.5rem)', color: theme.accentDark }}>0</span>
          <span className="text-sm font-medium text-ink-muted leading-tight">AI model calls<br />while you learn</span>
        </div>
        <p className="text-base md:text-lg leading-relaxed text-ink/80">{text}</p>
      </div>
    </Reveal>
  );
}

/* ─── Step by step: the rail fills as you read ───────────────── */
function Timeline({ steps, theme }: { steps: TechReportData['request']['steps']; theme: ProjectTheme }) {
  const ref = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.55 - r.top) / Math.max(1, r.height);
      setFill(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <ol ref={ref} className="relative mt-12 max-w-3xl">
      <span aria-hidden className="absolute left-[1.4rem] top-2 bottom-2 w-px bg-hairline" />
      <span aria-hidden className="absolute left-[1.4rem] top-2 w-px origin-top" style={{ bottom: '0.5rem', background: theme.accent, transform: `scaleY(${fill})`, transition: 'transform 0.2s linear' }} />
      {steps.map((s, i) => {
        const reached = fill >= (i + 0.35) / steps.length;
        return (
          <li key={i} className="relative grid grid-cols-[2.8rem_1fr] gap-4 md:gap-6 pb-6 last:pb-0">
            <span
              className="relative z-10 h-11 w-11 rounded-full grid place-items-center font-display text-lg tabular transition-all duration-500"
              style={reached
                ? { background: theme.accentDark, color: '#FFFFFF', boxShadow: `0 0 0 6px ${theme.accentBg}` }
                : { background: '#FFFFFF', color: theme.accentDark, boxShadow: `inset 0 0 0 1px ${theme.accent}55, 0 0 0 6px #FDFBF7` }}
            >
              {i + 1}
            </span>
            <Reveal delay={0.04}>
              <GlowCard theme={theme} className="p-5 md:p-6">
                <p className="font-display text-xl md:text-2xl text-ink tracking-tight leading-snug">{s.title}</p>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-ink/80">{s.plain}</p>
                {s.detail && (
                  <details className="group/d mt-4">
                    <summary className="list-none cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors [&::-webkit-details-marker]:hidden" style={{ background: theme.accentBg, color: theme.accentDark }}>
                      <CaretRight size={11} weight="bold" className="transition-transform duration-200 group-open/d:rotate-90" aria-hidden />
                      For engineers
                    </summary>
                    <p className="mt-3 rounded-xl px-4 py-3.5 font-mono text-xs leading-relaxed text-ink/85" style={{ background: '#F5F5F4', borderLeft: `2px solid ${theme.accent}` }}>{s.detail}</p>
                  </details>
                )}
              </GlowCard>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

/* ─── Hosting as a layered stack ─────────────────────────────── */
function HostingStack({ rows, theme }: { rows: TechReportData['hosting']; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-8%');
  return (
    <div ref={ref} className="mt-12 grid gap-2.5 max-w-4xl">
      {rows.map((h, i) => {
        const r = theme.ramp[i % theme.ramp.length];
        const isCost = /cost/i.test(h.label);
        return (
          <div
            key={i}
            className="grid sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6 items-center rounded-2xl px-5 py-4"
            style={{
              marginLeft: `min(${i * 1.4}rem, 8vw)`,
              background: isCost ? theme.accentDark : r.bg,
              border: `1px solid ${isCost ? theme.accentDark : `${r.border}55`}`,
              color: isCost ? '#FFFFFF' : undefined,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-18px)',
              transition: `opacity 0.6s ${EASE_STR} ${i * 0.08}s, transform 0.6s ${EASE_STR} ${i * 0.08}s`,
            }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: isCost ? 'rgba(255,255,255,0.7)' : r.text }}>{h.label}</span>
            <span className={`text-sm md:text-base leading-relaxed ${isCost ? 'text-white' : 'text-ink'}`}>{h.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function ReportBody({ r, theme }: { r: TechReportData; theme: ProjectTheme }) {
  const [lead, ...restSummary] = r.summary;
  return (
    <>
      {/* 01 Summary: the lead paragraph carries the page */}
      <Section id="summary" theme={theme}>
        <SectionHead n={1} theme={theme} title="In one minute" />
        <div className="mt-10 grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-16 items-start">
          <Reveal>
            <p className="font-display font-light text-ink leading-[1.3] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2rem)', textWrap: 'pretty' }}>{lead}</p>
          </Reveal>
          <div className="grid gap-5 lg:pt-2">
            {restSummary.map((p, i) => (
              <React.Fragment key={i}>
                <Reveal delay={0.08 + i * 0.06}>
                  <p className="text-base leading-relaxed text-ink/80 pl-5" style={{ borderLeft: `2px solid ${theme.accent}55` }}>{p}</p>
                </Reveal>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      {/* 02 Models */}
      <Section id="models" theme={theme} tint>
        <SectionHead n={2} theme={theme} title="The AI models" intro={r.models.intro} />
        {r.models.none ? <NoModel text={r.models.none} theme={theme} /> : <ModelCards uses={r.models.uses} theme={theme} />}
      </Section>
      {r.models.chains?.map((c, i) => <React.Fragment key={i}><ChainScene chain={c} theme={theme} /></React.Fragment>)}

      {/* 03 System map */}
      <div id="system" data-report-section className="scroll-mt-32">
        <SystemMap number={3} intro={r.map.intro} nodes={r.map.nodes} hops={r.map.hops} theme={theme} />
      </div>

      {/* 04 Step by step */}
      <Section id="request" theme={theme} tint>
        <SectionHead n={4} theme={theme} title={r.request.title} intro={r.request.intro} />
        <Timeline steps={r.request.steps} theme={theme} />
      </Section>

      {/* 05 Mechanisms: zig-zag, diagram alternates sides */}
      <Section id="mechanisms" theme={theme}>
        <SectionHead n={5} theme={theme} title="How the key parts work" />
        <div className="mt-14 space-y-16 md:space-y-24">
          {r.mechanisms.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={i} className={m.diagram ? 'grid md:grid-cols-2 gap-8 md:gap-14 items-center' : 'max-w-3xl'}>
                <Reveal className={flip && m.diagram ? 'md:order-2' : ''}>
                  <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: theme.accentDark }}>Part {i + 1} of {r.mechanisms.length}</p>
                  <h3 className="mt-3 font-display font-light text-3xl md:text-4xl text-ink tracking-tight leading-[1.05]" style={{ textWrap: 'balance' }}>{m.title}</h3>
                  <div className="mt-5 space-y-3">
                    {m.body.map((p, j) => <p key={j} className="text-base leading-relaxed text-ink/80">{p}</p>)}
                  </div>
                </Reveal>
                {m.diagram && (
                  <div className={`min-w-0 rounded-[2rem] p-4 md:p-6 ${flip ? 'md:order-1' : ''}`} style={dots(theme)}>
                    <DiagramView d={m.diagram} theme={theme} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* 06 Failures: masonry of problem cards */}
      <Section id="failures" theme={theme} tint>
        <SectionHead n={6} theme={theme} title="When things go wrong" />
        <div className="mt-12 columns-1 md:columns-2 gap-5 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {r.failures.map((f, i) => (
            <React.Fragment key={i}>
              <Reveal delay={(i % 2) * 0.06}>
                <GlowCard theme={theme} className="p-6">
                  <div className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 grid h-9 w-9 place-items-center rounded-xl" style={{ background: theme.accentBg, color: theme.accentDark }}>
                      <Warning size={17} weight="duotone" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xl text-ink tracking-tight leading-snug">{f.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/75">{f.body}</p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* 07 Testing: checklist bento */}
      <Section id="testing" theme={theme}>
        <SectionHead n={7} theme={theme} title="How it is tested" />
        <div className="mt-12 grid md:grid-cols-2 gap-4 md:gap-5">
          {r.testing.map((t, i) => (
            <React.Fragment key={i}>
              <Reveal delay={(i % 2) * 0.06} className={r.testing.length % 2 === 1 && i === 0 ? 'md:col-span-2' : ''}>
                <div className="h-full rounded-2xl p-6 md:p-7" style={{ background: i === 0 ? theme.accentBg : '#FFFFFF', border: `1px solid ${i === 0 ? `${theme.accent}44` : '#E7E5E4'}` }}>
                  <div className="flex items-center gap-2.5">
                    <SealCheck size={20} weight="fill" color={theme.accent} aria-hidden />
                    <span className="text-xs font-medium tabular text-ink-muted">Check {i + 1}</span>
                  </div>
                  <p className="mt-3 font-display text-2xl text-ink tracking-tight leading-snug">{t.title}</p>
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-ink/75 max-w-2xl">{t.body}</p>
                </div>
              </Reveal>
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* 08 Hosting: a layered stack */}
      <Section id="hosting" theme={theme} tint>
        <SectionHead n={8} theme={theme} title="Hosting and cost" />
        <HostingStack rows={r.hosting} theme={theme} />
      </Section>

      {/* 09 Limits */}
      <Section id="limits" theme={theme}>
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-40">
            <SectionHead n={9} theme={theme} title="Known limits" intro="What this does not do yet, stated plainly." />
          </div>
          <ol className="grid gap-3">
            {r.limits.map((l, i) => (
              <React.Fragment key={i}>
                <Reveal delay={i * 0.05}>
                  <li className="grid grid-cols-[2.25rem_1fr] gap-3 rounded-2xl px-5 py-4" style={{ border: `1px dashed ${theme.accent}77`, background: '#FFFFFF' }}>
                    <span className="font-display text-2xl leading-none tabular" style={{ color: theme.accent }}>{i + 1}</span>
                    <span className="text-sm md:text-base leading-relaxed text-ink/80">{l}</span>
                  </li>
                </Reveal>
              </React.Fragment>
            ))}
          </ol>
        </div>
      </Section>

      {/* 10 Glossary */}
      <Section id="glossary" theme={theme} tint>
        <SectionHead n={10} theme={theme} title="Glossary" />
        <dl className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {r.glossary.map((g, i) => (
            <React.Fragment key={i}>
              <GlowCard theme={theme} className="p-5">
                <dt className="font-display text-lg text-ink tracking-tight" style={{ color: theme.accentDark }}>{g.term}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">{g.def}</dd>
              </GlowCard>
            </React.Fragment>
          ))}
        </dl>
        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-ink-muted">Sources: {r.sources}</p>
      </Section>
    </>
  );
}

export default function TechReport() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);
  const report = slug ? REPORTS[slug] : undefined;
  const theme = getTheme(slug ?? '');
  const name = project?.title.split(' — ')[0];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  usePageMeta(name ? `How ${name} works` : undefined, `/project/${slug ?? ''}/how-it-works`);

  if (!project || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-ink mb-4">Report not found</p>
          <Link to="/" className="text-ink-muted hover:text-ink text-sm transition-colors">&larr; Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const idx = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">
      <div className="pt-24 md:pt-28 pb-2 px-4 md:px-12 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors duration-200 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white group-hover:border-ink/20 group-active:scale-95 transition-all duration-200">
            <ArrowLeft size={13} weight="light" />
          </span>
          Case study
        </Link>
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink-muted transition-colors">
            Live site <ArrowUpRight size={13} weight="light" />
          </a>
        )}
      </div>

      {/* Hero: title and promise left, the real product right, key facts overlapping it */}
      <section className="relative overflow-hidden pt-6 pb-14 md:pb-20">
        <span aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full" style={{ background: `radial-gradient(circle, ${theme.accent}26, transparent 65%)` }} />
        <div className="relative max-w-6xl mx-auto px-4 md:px-12 grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
          <div style={{ opacity: 0, animation: `fadeUp 0.7s ${EASE_STR} 0.05s forwards` }}>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium" style={{ background: theme.accentBg, color: theme.accentDark, boxShadow: `inset 0 0 0 1px ${theme.accent}33` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent }} /> Technical report
            </span>
            <h1 className="mt-5 font-display font-light leading-[0.95] tracking-tight text-ink" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', textWrap: 'balance' }}>
              How <span style={{ color: theme.accentDark }}>{name}</span> works
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-ink/75">
              Written so you can follow it without an engineering background. Wherever you see <span className="font-medium text-ink">For engineers</span>, the exact detail is one click away.
            </p>
          </div>

          <div className="relative" style={{ opacity: 0, animation: `fadeUp 0.8s ${EASE_STR} 0.15s forwards` }}>
            {project.image && (
              <div className="bezel" style={{ background: theme.accentBg }}>
                <div className="bezel-core overflow-hidden" style={{ borderRadius: 'calc(2rem - 0.375rem)' }}>
                  <img src={project.image} alt={`${name}, the deployed product`} className="w-full object-cover object-top" style={{ aspectRatio: '16 / 10' }} />
                </div>
              </div>
            )}
            <dl className="relative z-10 -mt-10 lg:-mt-16 mx-3 lg:-ml-10 lg:mr-6 grid grid-cols-2 gap-2.5">
              {report.glance.map((g, i) => (
                <div key={i} className="rounded-2xl bg-white/95 px-4 py-3.5" style={{ border: '1px solid #E7E5E4', boxShadow: `0 20px 40px -28px ${theme.accentDark}`, backdropFilter: 'blur(8px)' }}>
                  <dt className="text-xs font-medium" style={{ color: theme.accentDark }}>{g.label}</dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-ink">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ChapterBar theme={theme} />
      <ReportBody r={report} theme={theme} />

      <section className="py-16 md:py-24 border-t border-hairline" style={dots(theme)}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <p className="text-sm text-ink-muted mb-6">Next technical report</p>
          <Link to={`/project/${nextProject.slug}/how-it-works`} className="group flex items-center justify-between gap-4">
            <h3 className="font-display font-light text-2xl md:text-5xl text-ink leading-tight tracking-tight group-hover:translate-x-2 transition-transform duration-700 ease-spring">How {nextProject.title.split(' — ')[0]} works</h3>
            <span className="flex-shrink-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-spring group-hover:translate-x-1 group-active:scale-95">
              <ArrowRight size={16} weight="light" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

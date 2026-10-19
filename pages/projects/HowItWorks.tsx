import React, { useEffect, useRef, useState } from 'react';
import { CaretRight, Brain, Warning, SealCheck } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../types';
import { Reveal, useReveal, EASE_STR } from './kit';
import { CHAPTERS, Chapter, ChapterHead, SceneChapter, dots } from './chapters';
import { Flowchart, Sequence, Swimlane } from './diagrams';
import { SystemMap, ChainScene } from './tech/SystemMap';
import { REPORTS } from './tech/reports';
import type { Diagram, ModelUse, TechReportData } from './tech/types';

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS — chapters 03 to 11 and 13 of every project page.
   One template for all seven products, so the same question always
   sits in the same place. Each chapter has its own visual form (model
   cards, a filling timeline, a layered hosting stack, a glossary grid)
   so a long read never settles into one repeated shape, and everything
   is tinted from the project's own theme so the seven reports differ.
   ═══════════════════════════════════════════════════════════════ */

const WHEN_LABEL: Record<ModelUse['when'], string> = {
  'every request': 'Every request',
  fallback: 'Fallback',
  background: 'In the background',
  'development only': 'Development only',
  'on demand': 'On demand',
};

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
export function ChapterBar({ theme }: { theme: ProjectTheme }) {
  const [active, setActive] = useState<string>(CHAPTERS[0].id);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const els = CHAPTERS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
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
        <ol ref={listRef} className="flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Chapters">
          {CHAPTERS.map((s, i) => {
            const on = s.id === active;
            const Icon = s.icon;
            const newPart = i > 0 && CHAPTERS[i - 1].part !== s.part;
            return (
              <li key={s.id} data-id={s.id} className="flex-shrink-0 flex items-center gap-1.5">
                {newPart && <span aria-hidden className="mx-1.5 h-4 w-px bg-ink/15" />}
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
              <p className="mt-5 font-display font-normal leading-[1.02] tracking-tight" style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.2rem)', textWrap: 'balance' }}>{lead.name}</p>
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
          <span className="font-display font-normal leading-none tabular" style={{ fontSize: 'clamp(4.5rem, 10vw, 7.5rem)', color: theme.accentDark }}>0</span>
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

/* Chapters 03 to 11. */
export function HowItWorks({ r, theme }: { r: TechReportData; theme: ProjectTheme }) {
  const [lead, ...restSummary] = r.summary;
  return (
    <>
      {/* 03 Summary: the lead paragraph carries the page */}
      <Chapter id="summary" theme={theme}>
        <ChapterHead id="summary" theme={theme} title="How it works, in one minute" />
        <div className="mt-10 grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-16 items-start">
          <Reveal>
            <p className="font-display font-normal text-ink leading-[1.3] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2rem)', textWrap: 'pretty' }}>{lead}</p>
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
      </Chapter>

      {/* 04 Models */}
      <Chapter id="models" theme={theme} tint>
        <ChapterHead id="models" theme={theme} title="The AI models" intro={r.models.intro} />
        {r.models.none ? <NoModel text={r.models.none} theme={theme} /> : <ModelCards uses={r.models.uses} theme={theme} />}
      </Chapter>
      {r.models.chains?.map((c, i) => <React.Fragment key={i}><ChainScene chain={c} theme={theme} /></React.Fragment>)}

      {/* 05 System map */}
      <SceneChapter id="system" theme={theme}>
        <SystemMap intro={r.map.intro} nodes={r.map.nodes} hops={r.map.hops} theme={theme} />
      </SceneChapter>

      {/* 06 Step by step */}
      <Chapter id="request" theme={theme} tint>
        <ChapterHead id="request" theme={theme} title={r.request.title} intro={r.request.intro} />
        <Timeline steps={r.request.steps} theme={theme} />
      </Chapter>

      {/* 07 Mechanisms: zig-zag, diagram alternates sides */}
      <Chapter id="mechanisms" theme={theme}>
        <ChapterHead id="mechanisms" theme={theme} title="How the key parts work" />
        <div className="mt-14 space-y-16 md:space-y-24">
          {r.mechanisms.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={i} className={m.diagram ? 'grid md:grid-cols-2 gap-8 md:gap-14 items-center' : 'max-w-3xl'}>
                <Reveal className={flip && m.diagram ? 'md:order-2' : ''}>
                  <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: theme.accentDark }}>Part {i + 1} of {r.mechanisms.length}</p>
                  <h3 className="mt-3 font-display font-normal text-3xl md:text-4xl text-ink tracking-tight leading-[1.05]" style={{ textWrap: 'balance' }}>{m.title}</h3>
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
      </Chapter>

      {/* 08 Failures: masonry of problem cards */}
      <Chapter id="failures" theme={theme} tint>
        <ChapterHead id="failures" theme={theme} title="When things go wrong" />
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
      </Chapter>

      {/* 09 Testing: checklist bento */}
      <Chapter id="testing" theme={theme}>
        <ChapterHead id="testing" theme={theme} title="How it is tested" />
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
      </Chapter>

      {/* 10 Hosting: a layered stack */}
      <Chapter id="hosting" theme={theme} tint>
        <ChapterHead id="hosting" theme={theme} title="Hosting and cost" />
        <HostingStack rows={r.hosting} theme={theme} />
      </Chapter>

      {/* 11 Limits */}
      <Chapter id="limits" theme={theme}>
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-40">
            <ChapterHead id="limits" theme={theme} title="Known limits" intro="What this does not do yet, stated plainly." />
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
      </Chapter>
    </>
  );
}

export function Glossary({ r, theme }: { r: TechReportData; theme: ProjectTheme }) {
  return (
    <Chapter id="glossary" theme={theme} tint>
      <ChapterHead id="glossary" theme={theme} />
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
    </Chapter>
  );
}

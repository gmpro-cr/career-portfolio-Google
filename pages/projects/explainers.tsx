import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../types';
import type { Brief, ExplainerStep } from './briefs';

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS — a plain-English walkthrough for readers who are not
   engineers. A marker travels along the steps in order and each step
   lights up as it is reached. It only plays while on screen, can be
   paused, and any step can be clicked. With reduced motion it does not
   auto-play and every step is shown at full strength.
   ═══════════════════════════════════════════════════════════════ */
const STEP_MS = 2600;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HowItWorks({ steps, theme }: { steps: ExplainerStep[]; theme: ProjectTheme }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced] = useState(prefersReducedMotion);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const running = playing && inView && !reduced;
  useEffect(() => {
    if (!running) return;
    // One extra beat on the last step before starting over, so the end reads as an end.
    const id = window.setInterval(() => setActive(a => (a + 1) % (steps.length + 1)), STEP_MS);
    return () => window.clearInterval(id);
  }, [running, steps.length]);

  const shown = Math.min(active, steps.length - 1);
  const progress = steps.length > 1 ? shown / (steps.length - 1) : 1;
  const lit = (i: number) => reduced || i <= shown;

  return (
    <section ref={ref} className="py-12 md:py-20 border-t border-hairline" aria-labelledby="how-it-works">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <h2 id="how-it-works" className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight">How it works</h2>
            <p className="mt-3 text-base text-ink/70">In plain English, one step at a time.</p>
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying(p => !p)}
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-sm text-ink hover:border-ink/30 transition-colors"
            >
              {playing ? <Pause size={14} weight="fill" aria-hidden /> : <Play size={14} weight="fill" aria-hidden />}
              {playing ? 'Pause' : 'Play'}
            </button>
          )}
        </div>

        <div className="relative">
          {/* Horizontal track, desktop: from the centre of the first marker to the
              centre of the last. Markers are 3.5rem wide and sit at the left of
              equal columns with a 1.5rem gap, so the last centre is one column
              width minus 1.75rem in from the right edge. */}
          <style>{`@media (min-width: 768px) { .hiw-grid { grid-template-columns: repeat(${steps.length}, minmax(0, 1fr)); } }`}</style>
          <div
            aria-hidden
            className="hidden md:block absolute top-7"
            style={{
              left: '1.75rem',
              right: `calc((100% - ${steps.length - 1} * 1.5rem) / ${steps.length} - 1.75rem)`,
            }}
          >
            <div className="relative h-[2px] rounded-full" style={{ background: '#E7E5E4' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${progress * 100}%`, background: theme.accent, transition: reduced ? 'none' : 'width 0.7s cubic-bezier(0.32,0.72,0,1)' }}
              />
              {!reduced && (
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-paper"
                  style={{ left: `${progress * 100}%`, background: theme.accent, transition: 'left 0.7s cubic-bezier(0.32,0.72,0,1)' }}
                />
              )}
            </div>
          </div>

          <ol className="hiw-grid relative grid grid-cols-1 gap-8 md:gap-6">
            {steps.map((s, i) => {
              const on = lit(i);
              const current = !reduced && i === shown;
              const Icon = s.icon;
              return (
                <li key={s.title} aria-current={current ? 'step' : undefined} className="relative flex md:flex-col gap-4 md:gap-5">
                  {/* Vertical track, mobile: joins this marker to the next. */}
                  {i < steps.length - 1 && (
                    <span aria-hidden className="md:hidden absolute left-7 top-14 -bottom-8 w-[2px] -translate-x-1/2" style={{ background: '#E7E5E4' }}>
                      <span className="block w-full" style={{ height: lit(i + 1) ? '100%' : '0%', background: theme.accent, transition: reduced ? 'none' : 'height 0.7s cubic-bezier(0.32,0.72,0,1)' }} />
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => { setActive(i); setPlaying(false); }}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    className="relative z-10 flex-shrink-0 grid h-14 w-14 place-items-center rounded-full border-2 bg-paper transition-all duration-500"
                    style={{
                      borderColor: on ? theme.accent : '#E7E5E4',
                      background: current ? theme.accent : on ? theme.accentBg : undefined,
                      color: current ? '#fff' : on ? theme.accentDark : '#78716C',
                      transform: current ? 'scale(1.08)' : 'none',
                    }}
                  >
                    <Icon size={24} weight={current ? 'fill' : 'regular'} aria-hidden />
                  </button>
                  <div className="min-w-0 pt-1 md:pt-0">
                    <p className="text-xs tabular text-ink-muted">Step {i + 1}</p>
                    <h3 className={`mt-1 font-sans text-base font-semibold transition-colors duration-500 ${on ? 'text-ink' : 'text-ink/60'}`} style={{ letterSpacing: 0 }}>
                      {s.title}
                    </h3>
                    <p className={`mt-1.5 text-sm leading-relaxed transition-colors duration-500 ${on ? 'text-ink/80' : 'text-ink/60'}`}>
                      {s.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT BRIEF — the one-screen summary a hiring manager skims:
   problem, users, job to be done, options weighed, the metric that
   mattered and what happened. Every result says whether it was
   measured, is a target, or still needs the owner's input.
   ═══════════════════════════════════════════════════════════════ */
const STATUS_STYLE: Record<Brief['results'][number]['status'], { label: string; className: string }> = {
  measured: { label: 'Measured', className: 'bg-ink text-white' },
  shipped: { label: 'Shipped', className: 'border border-ink/30 text-ink' },
  target: { label: 'Target', className: 'border border-dashed border-ink/40 text-ink-muted' },
  input: { label: 'Needs your input', className: 'bg-amber-100 text-amber-900 border border-amber-300' },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[11rem_1fr] gap-2 md:gap-8 py-6 border-t border-hairline">
      <dt className="text-sm font-semibold text-ink">{label}</dt>
      <dd className="text-base leading-relaxed text-ink/80 min-w-0">{children}</dd>
    </div>
  );
}

function NeedsInput({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-amber-50 border border-amber-300 px-2 py-1 text-sm text-amber-900">
      <span className="font-semibold">Needs your input:</span> {children}
    </span>
  );
}

export function ProductBrief({ brief }: { brief: Brief }) {
  return (
    <section className="py-12 md:py-20 border-t border-hairline" aria-labelledby="product-brief">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <h2 id="product-brief" className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight mb-8 md:mb-10">Product brief</h2>
        <dl className="border-b border-hairline">
          <Row label="Problem">{brief.problem}</Row>
          <Row label="Users">{brief.users}</Row>
          <Row label="Job to be done">
            <span className="block"><span className="font-medium text-ink">When</span> {brief.job.when}</span>
            <span className="block"><span className="font-medium text-ink">I want to</span> {brief.job.want}</span>
            <span className="block"><span className="font-medium text-ink">so I can</span> {brief.job.so}</span>
          </Row>
          <Row label="Options considered">
            {/* Phones: one block per option, so the reasoning is never scrolled off-screen. */}
            <ul className="sm:hidden space-y-4">
              {brief.options.map((o, i) => (
                <li key={i} className="border-t border-hairline pt-3 first:border-t-0 first:pt-0">
                  <p className="text-ink">
                    <span className={o.chosen ? 'font-semibold' : 'text-ink-muted line-through decoration-ink/30'}>{o.chosen ? 'Chosen' : 'Rejected'}:</span>{' '}
                    {o.option}
                  </p>
                  <p className="mt-1 text-sm text-ink/80">{o.why ?? <NeedsInput>{o.ask}</NeedsInput>}</p>
                </li>
              ))}
            </ul>
            <div className="hidden sm:block overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[34rem] text-sm border-collapse">
                <thead>
                  <tr className="text-left text-ink-muted">
                    <th className="font-medium pb-2 pr-4 w-[38%]">Option</th>
                    <th className="font-medium pb-2 pr-4 w-[14%]">Decision</th>
                    <th className="font-medium pb-2">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {brief.options.map((o, i) => (
                    <tr key={i} className="border-t border-hairline align-top">
                      <td className="py-3 pr-4 text-ink">{o.option}</td>
                      <td className="py-3 pr-4">
                        <span className={o.chosen ? 'font-semibold text-ink' : 'text-ink-muted line-through decoration-ink/30'}>
                          {o.chosen ? 'Chosen' : 'Rejected'}
                        </span>
                      </td>
                      <td className="py-3 text-ink/80">{o.why ?? <NeedsInput>{o.ask}</NeedsInput>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Row>
          <Row label="North Star metric">
            {brief.northStar.metric ? (
              <>
                <span className="font-medium text-ink">{brief.northStar.metric}</span>
                {brief.northStar.why && <span className="block mt-1">{brief.northStar.why}</span>}
              </>
            ) : <NeedsInput>{brief.northStar.ask}</NeedsInput>}
            {brief.guardrails && <span className="block mt-2 text-sm text-ink-muted">Guardrails: {brief.guardrails}</span>}
            {brief.alsoTracked && <span className="block mt-2 text-sm text-ink-muted">Also tracked: {brief.alsoTracked}</span>}
          </Row>
          <Row label="Results">
            <ul className="space-y-3">
              {brief.results.map((r, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                  <span className={`flex-shrink-0 inline-block w-fit rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[r.status].className}`}>
                    {STATUS_STYLE[r.status].label}
                  </span>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </Row>
        </dl>
      </div>
    </section>
  );
}

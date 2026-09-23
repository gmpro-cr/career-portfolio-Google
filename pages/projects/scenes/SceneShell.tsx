import React, { useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, Pause, Play } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';

/* ═══════════════════════════════════════════════════════════════
   Shared frame for the per-project scenes. Each scene is a short
   script of beats; the frame advances through them once when the scene
   scrolls into view, then stops and offers Replay. Every beat has a
   plain-English caption, and the full script is also available as text.
   With reduced motion the scene opens on its final beat and nothing
   plays by itself; the step buttons still move between beats.
   ═══════════════════════════════════════════════════════════════ */

export interface Beat { caption: string; ms?: number }

const DEFAULT_MS = 2800;

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function SceneShell({
  title, intro, beats, theme, note = 'Example', children,
}: {
  title: string;
  intro: string;
  beats: Beat[];
  theme: ProjectTheme;
  /** Shown top-left of the stage, e.g. "Example" or "Illustrative numbers". */
  note?: string;
  children: (beat: number) => React.ReactNode;
}) {
  const [reduced] = useState(reducedMotion);
  const last = beats.length - 1;
  const [beat, setBeat] = useState(reduced ? last : 0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(reduced);
  const ref = useRef<HTMLDivElement>(null);

  // Start once, the first time the stage is mostly on screen.
  useEffect(() => {
    if (started) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setStarted(true); setPlaying(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); setPlaying(true); obs.disconnect(); }
    }, { threshold: 0.45 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!playing) return;
    if (beat >= last) { setPlaying(false); return; }
    const id = window.setTimeout(() => setBeat(b => b + 1), beats[beat].ms ?? DEFAULT_MS);
    return () => window.clearTimeout(id);
  }, [playing, beat, last, beats]);

  const ended = !playing && beat === last;
  const onControl = () => {
    if (ended) { setBeat(0); setPlaying(true); return; }
    setPlaying(p => !p);
  };

  return (
    <section className="py-12 md:py-20 border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">{intro}</p>

        <div ref={ref} className="mt-8 md:mt-10 rounded-[1.25rem] border border-hairline bg-white overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-b border-hairline bg-shell/60">
            <span className="text-xs font-medium text-ink-muted">{note}</span>
            <button
              type="button"
              onClick={onControl}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-xs font-medium text-ink hover:border-ink/30 transition-colors"
            >
              {ended ? <ArrowCounterClockwise size={13} aria-hidden /> : playing ? <Pause size={13} weight="fill" aria-hidden /> : <Play size={13} weight="fill" aria-hidden />}
              {ended ? 'Replay' : playing ? 'Pause' : 'Play'}
            </button>
          </div>

          <div className="relative px-4 md:px-8 py-6 md:py-8 min-h-[22rem]">
            {children(beat)}
          </div>

          <div className="border-t border-hairline px-4 md:px-6 py-4 bg-shell/40">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <div className="flex gap-1.5 flex-shrink-0" role="group" aria-label="Steps">
                {beats.map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setBeat(i); setPlaying(false); setStarted(true); }}
                    aria-label={`Step ${i + 1}`}
                    aria-current={i === beat ? 'step' : undefined}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{ width: i === beat ? 28 : 10, background: i <= beat ? theme.accent : '#E7E5E4' }}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink min-h-[2.75rem] md:min-h-0">
                <span className="tabular text-ink-muted mr-2">{beat + 1}/{beats.length}</span>
                {beats[beat].caption}
              </p>
            </div>
          </div>
        </div>

        <details className="mt-4 max-w-2xl text-sm text-ink/80">
          <summary className="cursor-pointer text-ink-muted hover:text-ink transition-colors">Read the steps as text</summary>
          <ol className="mt-3 space-y-2 list-decimal pl-5">
            {beats.map((b, i) => <li key={i}>{b.caption}</li>)}
          </ol>
        </details>
      </div>
    </section>
  );
}

/* Fades and lifts children in once `show` turns true. */
export function Appear({ show, children, className = '', delay = 0 }: { show: boolean; children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={className}
      aria-hidden={!show}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'none' : 'translateY(6px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.32,0.72,0,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Counts up to `to` once `run` is true; shows the final value when `done`
   (the scene is already past this beat) or with reduced motion. */
export function CountUp({ to, run, done = false, ms = 1200, format = (n: number) => String(n) }: { to: number; run: boolean; done?: boolean; ms?: number; format?: (n: number) => string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) { setN(0); return; }
    if (done || reducedMotion()) { setN(to); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, done, ms]);
  return <span className="tabular">{format(n)}</span>;
}

/* Types `text` out once `run` is true; shows it whole when `done` or with reduced motion. */
export function Typed({ text, run, done = false, cps = 28 }: { text: string; run: boolean; done?: boolean; cps?: number }) {
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (!run) { setLen(0); return; }
    if (done || reducedMotion()) { setLen(text.length); return; }
    setLen(0);
    const id = window.setInterval(() => setLen(l => {
      if (l >= text.length) { window.clearInterval(id); return l; }
      return l + 1;
    }), 1000 / cps);
    return () => window.clearInterval(id);
  }, [text, run, done, cps]);
  return (
    <>
      {text.slice(0, len)}
      {run && len < text.length && <span className="inline-block w-[0.55ch] h-[1.1em] align-text-bottom bg-current opacity-60 animate-pulse" aria-hidden />}
    </>
  );
}

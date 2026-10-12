import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Browser, Brain, Database, Globe, HardDrives, User, CheckCircle, XCircle, ArrowRight } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, type Beat } from '../scenes/SceneShell';
import type { ModelChain, SysHop, SysNode } from './types';

/* ═══════════════════════════════════════════════════════════════
   SYSTEM MAP — the product's moving parts as boxes, and one request
   travelling between them. Each hop is a beat in the shared SceneShell
   (Play / Pause / Replay, step dots, captions, text version). Boxes are
   HTML so their labels stay readable on a phone; only the connecting
   lines are SVG. Phones get their own coordinates (a tall stage).
   ═══════════════════════════════════════════════════════════════ */

const KIND_ICON: Record<SysNode['kind'], React.ComponentType<{ size?: number; weight?: 'light' | 'regular' | 'fill'; 'aria-hidden'?: boolean }>> = {
  person: User,
  browser: Browser,
  server: HardDrives,
  data: Database,
  ai: Brain,
  external: Globe,
};

const KIND_NAME: Record<SysNode['kind'], string> = {
  person: 'Person',
  browser: 'In the browser',
  server: 'Server',
  data: 'Data',
  ai: 'AI model',
  external: 'Outside service',
};

function useNarrow() {
  const q = '(max-width: 639px)';
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return narrow;
}

function reduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function MapStage({ nodes, hops, beat, theme }: { nodes: SysNode[]; hops: SysHop[]; beat: number; theme: ProjectTheme }) {
  const narrow = useNarrow();
  const pos = (id: string): [number, number] => {
    const n = nodes.find(x => x.id === id);
    return n ? (narrow ? n.m : n.at) : [50, 50];
  };
  const hop = hops[beat];
  const packet = useRef<HTMLDivElement>(null);

  // Unique edges, in first-use order, so a line is drawn once even if the
  // request travels it in both directions.
  const edges: { a: string; b: string; key: string }[] = [];
  hops.forEach(h => {
    const key = [h.from, h.to].sort().join('|');
    if (!edges.some(e => e.key === key)) edges.push({ a: h.from, b: h.to, key });
  });
  const usedUpTo = new Set(hops.slice(0, beat + 1).map(h => [h.from, h.to].sort().join('|')));
  const activeKey = [hop.from, hop.to].sort().join('|');

  // Move the packet from the hop's source to its target.
  useLayoutEffect(() => {
    const el = packet.current;
    if (!el) return;
    const [fx, fy] = pos(hop.from);
    const [tx, ty] = pos(hop.to);
    if (reduced() || typeof el.animate !== 'function') {
      el.style.opacity = '0';
      return;
    }
    const anim = el.animate(
      // Travel, then fade on arrival so the dot never sits on a box's label;
      // the highlighted box shows where the request is.
      [
        { left: `${fx}%`, top: `${fy}%`, opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.1 },
        { left: `${tx}%`, top: `${ty}%`, opacity: 1, offset: 0.8 },
        { left: `${tx}%`, top: `${ty}%`, opacity: 0, offset: 1 },
      ],
      { duration: 1600, easing: 'cubic-bezier(0.32, 0.72, 0, 1)', fill: 'forwards' },
    );
    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, narrow]);

  return (
    <div className="relative w-full" style={{ height: narrow ? '36rem' : '27rem' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {edges.map(e => {
          const [ax, ay] = pos(e.a);
          const [bx, by] = pos(e.b);
          const active = e.key === activeKey;
          const used = usedUpTo.has(e.key);
          return (
            <line
              key={e.key}
              x1={ax} y1={ay} x2={bx} y2={by}
              stroke={active ? theme.accent : used ? theme.accentBorder : '#E7E5E4'}
              strokeOpacity={active ? 1 : used ? 0.45 : 1}
              strokeWidth={active ? 2 : 1.25}
              strokeDasharray={active ? undefined : '4 4'}
              vectorEffect="non-scaling-stroke"
              style={{ transition: 'stroke 0.4s ease, stroke-opacity 0.4s ease' }}
            />
          );
        })}
      </svg>

      {nodes.map(n => {
        const [x, y] = narrow ? n.m : n.at;
        const Icon = KIND_ICON[n.kind];
        const isTo = n.id === hop.to;
        const isFrom = n.id === hop.from;
        const r = theme.ramp[1 % theme.ramp.length];
        return (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white px-3 py-2.5 text-left"
            style={{
              left: `${x}%`, top: `${y}%`,
              width: narrow ? '9.25rem' : '10.5rem',
              borderColor: isTo ? theme.accent : isFrom ? `${theme.accent}88` : '#E7E5E4',
              background: isTo ? r.bg : '#FFFFFF',
              boxShadow: isTo ? `0 10px 24px -14px ${theme.accent}` : '0 1px 2px rgba(26,20,16,0.04)',
              transition: 'border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
              zIndex: 2,
            }}
          >
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-muted">
              <Icon size={12} weight="regular" aria-hidden />
              {KIND_NAME[n.kind]}
            </span>
            <span className="mt-1 block text-sm font-semibold leading-snug text-ink">{n.label}</span>
            {n.sub && <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{n.sub}</span>}
          </div>
        );
      })}

      <div
        ref={packet}
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 14, height: 14, background: theme.accent, boxShadow: `0 0 0 5px ${theme.accent}33`, zIndex: 3, opacity: 0, left: `${pos(hop.to)[0]}%`, top: `${pos(hop.to)[1]}%` }}
      />
    </div>
  );
}

export function SystemMap({ intro, nodes, hops, theme }: { intro: string; nodes: SysNode[]; hops: SysHop[]; theme: ProjectTheme }) {
  const beats: Beat[] = hops.map(h => ({ caption: h.caption, ms: h.ms ?? 3600 }));
  return (
    <SceneShell title="The system, part by part" intro={intro} beats={beats} theme={theme} note="One request, travelling through the real architecture">
      {beat => <MapStage nodes={nodes} hops={hops} beat={beat} theme={theme} />}
    </SceneShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FALLBACK CHAIN — a request tries each model in order until one
   answers. Which model answers changes minute to minute in real use;
   the animation shows one representative run.
   ═══════════════════════════════════════════════════════════════ */
export function ChainScene({ chain, theme }: { chain: ModelChain; theme: ProjectTheme }) {
  const beats: Beat[] = [
    { caption: 'A request arrives and goes to the first model in the list.', ms: 2600 },
    ...chain.links.slice(0, chain.answeredBy).map(l => ({ caption: `${l} cannot take it right now (${chain.failReason}), so the request moves on without waiting.`, ms: 2800 })),
    { caption: `${chain.links[chain.answeredBy]} answers. The person never sees the models that were skipped.`, ms: 3600 },
  ];
  return (
    <SceneShell title={chain.title} intro={chain.intro} beats={beats} theme={theme} note="Example run: which model answers changes from minute to minute" stageClass="min-h-0">
      {beat => {
        // beat 0 = arrival at link 0; beat k (1..answeredBy) = link k-1 failed, now at link k.
        const at = Math.min(beat, chain.answeredBy);
        const done = beat === beats.length - 1;
        return (
          <ol className="flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch gap-2 sm:gap-1.5">
            {chain.links.map((l, i) => {
              const failed = i < at;
              const current = i === at;
              const answered = done && i === chain.answeredBy;
              const r = theme.ramp[1 % theme.ramp.length];
              return (
                <li key={l} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-1.5">
                  <div
                    className="rounded-xl border px-3.5 py-3 sm:min-w-[9.5rem]"
                    style={{
                      borderColor: answered || current ? theme.accent : '#E7E5E4',
                      background: answered ? r.bg : '#FFFFFF',
                      opacity: failed ? 0.55 : 1,
                      transition: 'all 0.45s ease',
                    }}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-muted tabular">{i === 0 ? 'First choice' : `Fallback ${i}`}</span>
                    <span className={`mt-1 block text-sm font-semibold leading-snug ${failed ? 'line-through text-ink-muted' : 'text-ink'}`}>{l}</span>
                    <span className="mt-1.5 flex items-center gap-1 text-xs text-ink-muted min-h-[1rem]">
                      {failed && <><XCircle size={12} aria-hidden /> skipped</>}
                      {answered && <><CheckCircle size={12} weight="fill" color={theme.accentDark} aria-hidden /> <span style={{ color: theme.accentDark }}>answered</span></>}
                      {current && !answered && <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />}
                      {current && !answered && 'trying'}
                    </span>
                  </div>
                  {i < chain.links.length - 1 && (
                    <ArrowRight size={13} className="hidden sm:block flex-shrink-0 text-ink-muted/60" aria-hidden />
                  )}
                </li>
              );
            })}
          </ol>
        );
      }}
    </SceneShell>
  );
}

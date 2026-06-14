import React, { useLayoutEffect, useRef, useState } from 'react';
import type { ProjectTheme } from '../../types';
import { useReveal, EASE_STR } from './kit';

/* ═══════════════════════════════════════════════════════════════
   FUNNEL — narrowing stages (noise → signal)
   ═══════════════════════════════════════════════════════════════ */
export function Funnel({ stages, theme }: { stages: { label: string; value: string; sub?: string }[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-6%');
  const n = stages.length;
  return (
    <div ref={ref} className="flex flex-col items-center">
      {stages.map((s, i) => {
        const r = theme.ramp[i % theme.ramp.length];
        const width = 100 - (i * (42 / Math.max(1, n - 1)));
        return (
          <React.Fragment key={i}>
            <div
              style={{
                width: `${width}%`,
                minWidth: 220,
                background: r.bg,
                border: `1.5px solid ${r.border}66`,
                borderRadius: '0.9rem',
                padding: '13px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 14,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(14px)',
                transition: `opacity 0.5s ${EASE_STR} ${i * 0.08}s, transform 0.5s ${EASE_STR} ${i * 0.08}s`,
              }}
            >
              <div className="min-w-0">
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: '#1A1410', lineHeight: 1.3 }}>{s.label}</p>
                {s.sub && <p style={{ fontSize: '10.5px', color: '#78716C', marginTop: 2, lineHeight: 1.4 }}>{s.sub}</p>}
              </div>
              <span style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.1rem, 2.6vw, 1.7rem)', fontWeight: 300, color: r.text, lineHeight: 1, whiteSpace: 'nowrap' }}>{s.value}</span>
            </div>
            {i < n - 1 && (
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden style={{ margin: '5px 0', opacity: visible ? 1 : 0, transition: `opacity 0.3s ${EASE_STR} ${i * 0.08 + 0.2}s` }}>
                <path d="M7 12L0.937 2.25h12.124L7 12Z" fill={r.border} fillOpacity="0.5" />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOWCHART — process / decision nodes with a measured loop-back arrow
   ═══════════════════════════════════════════════════════════════ */
export interface FlowNode {
  id: string;
  label: string;
  type?: 'start' | 'process' | 'decision' | 'output';
  forwardLabel?: string;            // label on the connector leaving this node
  loopBackTo?: string;             // id of an earlier node to loop back to
  loopLabel?: string;              // label for the loop branch
}

export function Flowchart({ nodes, theme }: { nodes: FlowNode[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-4%');
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loop, setLoop] = useState<{ topY: number; botY: number; label: string } | null>(null);

  useLayoutEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const loopNodeIdx = nodes.findIndex(n => n.loopBackTo);
      if (loopNodeIdx === -1) { setLoop(null); return; }
      const targetIdx = nodes.findIndex(n => n.id === nodes[loopNodeIdx].loopBackTo);
      if (targetIdx === -1) { setLoop(null); return; }
      const decisionEl = nodeRefs.current[loopNodeIdx];
      const targetEl = nodeRefs.current[targetIdx];
      if (!decisionEl || !targetEl) return;
      const wrapBox = wrap.getBoundingClientRect();
      const dBox = decisionEl.getBoundingClientRect();
      const tBox = targetEl.getBoundingClientRect();
      setLoop({
        topY: tBox.top - wrapBox.top + tBox.height / 2,
        botY: dBox.top - wrapBox.top + dBox.height / 2,
        label: nodes[loopNodeIdx].loopLabel || 'No',
      });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', compute);
    return () => { ro.disconnect(); window.removeEventListener('resize', compute); };
  }, [nodes]);

  const GUTTER = 38;

  return (
    <div ref={ref}>
      <div ref={wrapRef} style={{ position: 'relative', paddingLeft: GUTTER }}>
        {/* loop-back rail */}
        {loop && (
          <svg
            aria-hidden
            style={{ position: 'absolute', left: 0, top: 0, width: GUTTER, height: '100%', overflow: 'visible', opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR} 0.3s` }}
          >
            <path
              d={`M ${GUTTER - 2} ${loop.botY} L 11 ${loop.botY} L 11 ${loop.topY} L ${GUTTER - 6} ${loop.topY}`}
              fill="none" stroke={theme.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3"
            />
            <path d={`M ${GUTTER - 6} ${loop.topY - 4} L ${GUTTER + 1} ${loop.topY} L ${GUTTER - 6} ${loop.topY + 4} Z`} fill={theme.accent} />
            <text x="6" y={(loop.topY + loop.botY) / 2} fill={theme.accentDark} fontSize="9" fontWeight="700" transform={`rotate(-90 6 ${(loop.topY + loop.botY) / 2})`} textAnchor="middle">{loop.label}</text>
          </svg>
        )}

        {nodes.map((node, i) => {
          const isDecision = node.type === 'decision';
          const isStart = node.type === 'start';
          const isOutput = node.type === 'output';
          const r = theme.ramp[i % theme.ramp.length];
          const accentBg = isDecision ? '#FFFFFF' : r.bg;
          const border = isDecision ? theme.accent : `${r.border}66`;
          return (
            <React.Fragment key={node.id}>
              <div
                ref={el => { nodeRefs.current[i] = el; }}
                style={{
                  background: accentBg,
                  border: `${isDecision ? 1.6 : 1.2}px solid ${border}`,
                  borderRadius: isDecision ? '0.5rem' : (isStart || isOutput ? '9999px' : '0.85rem'),
                  padding: isDecision ? '14px 18px' : '12px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  boxShadow: isDecision ? `0 2px 10px ${theme.accent}22` : 'none',
                  opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-10px)',
                  transition: `opacity 0.45s ${EASE_STR} ${i * 0.07}s, transform 0.45s ${EASE_STR} ${i * 0.07}s`,
                }}
              >
                {isDecision ? (
                  <span style={{ width: 18, height: 18, flexShrink: 0, transform: 'rotate(45deg)', border: `2px solid ${theme.accent}`, borderRadius: 2, display: 'inline-block' }} />
                ) : (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot, flexShrink: 0 }} />
                )}
                <span style={{ fontSize: '12.5px', color: '#3A332E', fontWeight: isDecision ? 600 : 500, lineHeight: 1.4 }}>{node.label}</span>
                {isDecision && <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: theme.accentDark, opacity: 0.7 }}>decision</span>}
              </div>
              {i < nodes.length - 1 && (
                <div className="flex items-center gap-2" style={{ padding: '5px 0 5px 14px', opacity: visible ? 1 : 0, transition: `opacity 0.3s ${EASE_STR} ${i * 0.07 + 0.15}s` }} aria-hidden>
                  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <path d="M5 0v9M1.5 6.5L5 10l3.5-3.5" stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
                  </svg>
                  {node.forwardLabel && <span style={{ fontSize: '10px', fontWeight: 600, color: theme.accentDark, opacity: 0.85 }}>{node.forwardLabel}</span>}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SEQUENCE — lifelines + directional messages (RAG request flow)
   ═══════════════════════════════════════════════════════════════ */
export function Sequence({ actors, messages, theme }: {
  actors: string[];
  messages: { from: number; to: number; label: string; note?: string }[];
  theme: ProjectTheme;
}) {
  const [ref, visible] = useReveal('-4%');
  const n = actors.length;
  const colX = (i: number) => ((i + 0.5) / n) * 100;
  const ROW = 60;
  return (
    <div ref={ref}>
      {/* actor headers */}
      <div className="grid mb-2" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 4 }}>
        {actors.map((a, i) => {
          const r = theme.ramp[i % theme.ramp.length];
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <span style={{ display: 'inline-block', background: r.bg, border: `1px solid ${r.border}66`, color: r.text, fontSize: '10.5px', fontWeight: 600, padding: '6px 8px', borderRadius: '0.6rem', lineHeight: 1.2, maxWidth: '100%' }}>{a}</span>
            </div>
          );
        })}
      </div>
      {/* lifelines + messages */}
      <div style={{ position: 'relative', height: messages.length * ROW + 12 }}>
        {actors.map((_, i) => (
          <div key={i} aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: `${colX(i)}%`, width: 1, borderLeft: `1px dashed ${theme.accent}40` }} />
        ))}
        {messages.map((m, mi) => {
          const fromX = colX(m.from);
          const toX = colX(m.to);
          const left = Math.min(fromX, toX);
          const width = Math.abs(toX - fromX);
          const rightward = toX >= fromX;
          const y = mi * ROW + 26;
          return (
            <div key={mi} style={{
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)',
              transition: `opacity 0.45s ${EASE_STR} ${mi * 0.08}s, transform 0.45s ${EASE_STR} ${mi * 0.08}s`,
            }}>
              {/* label */}
              <div style={{ position: 'absolute', top: y - 22, left: `${left}%`, width: `${width}%`, textAlign: 'center', padding: '0 6px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#44403C' }}>{m.label}</span>
                {m.note && <span style={{ display: 'block', fontSize: '9px', color: '#A8A29E', marginTop: 1 }}>{m.note}</span>}
              </div>
              {/* line */}
              <div style={{ position: 'absolute', top: y, left: `${left}%`, width: `${width}%`, height: 2, background: theme.accent, opacity: 0.55, borderRadius: 2 }} />
              {/* arrowhead */}
              <div style={{
                position: 'absolute', top: y - 3, left: `calc(${toX}% - ${rightward ? 6 : 0}px)`,
                width: 0, height: 0,
                borderTop: '4px solid transparent', borderBottom: '4px solid transparent',
                ...(rightward ? { borderLeft: `7px solid ${theme.accent}` } : { borderRight: `7px solid ${theme.accent}` }),
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SWIMLANE — parallel lanes with an explicit hand-off
   ═══════════════════════════════════════════════════════════════ */
export function Swimlane({ lanes, theme, handoff }: {
  lanes: { label: string; sub?: string; steps: string[]; rampIndex?: number }[];
  theme: ProjectTheme;
  handoff?: string;
}) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="space-y-3">
      {lanes.map((lane, li) => {
        const r = theme.ramp[(lane.rampIndex ?? li) % theme.ramp.length];
        return (
          <React.Fragment key={li}>
            <div style={{
              background: r.bg, border: `1px solid ${r.border}55`, borderRadius: '1rem', padding: '14px 16px',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-10px)',
              transition: `opacity 0.5s ${EASE_STR} ${li * 0.12}s, transform 0.5s ${EASE_STR} ${li * 0.12}s`,
            }}>
              <div className="flex items-baseline gap-2 mb-3">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot }} />
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700, color: r.text }}>{lane.label}</span>
                {lane.sub && <span style={{ fontSize: '10.5px', color: '#78716C' }}>· {lane.sub}</span>}
              </div>
              <div className="flex items-stretch flex-wrap gap-y-2">
                {lane.steps.map((step, si) => (
                  <React.Fragment key={si}>
                    <span style={{ background: '#FFFFFF', border: `1px solid ${r.border}55`, color: r.text, fontSize: '11px', fontWeight: 500, padding: '7px 12px', borderRadius: '0.55rem', boxShadow: `0 1px 2px ${r.border}1A` }}>{step}</span>
                    {si < lane.steps.length - 1 && (
                      <span className="flex items-center px-1.5" aria-hidden>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M0 4h10M8 1l3 3-3 3" stroke={r.border} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {handoff && li === 0 && lanes.length > 1 && (
              <div className="flex items-center gap-2 pl-2" aria-hidden style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ${EASE_STR} 0.3s` }}>
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M6 0v11M2 8l4 4 4-4" stroke={theme.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: theme.accentDark }}>{handoff}</span>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RADIAL MAP — hub + spokes (constellation) with optional cross-links
   ═══════════════════════════════════════════════════════════════ */
export function RadialMap({ center, nodes, links, theme }: {
  center: string;
  nodes: string[];
  links?: [number, number][];
  theme: ProjectTheme;
}) {
  const [ref, visible] = useReveal('-4%');
  const size = 460;
  const cx = size / 2, cy = size / 2;
  const R = size * 0.37;
  const pts = nodes.map((_, i) => {
    const ang = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
    return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) };
  });
  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" style={{ maxWidth: 480, margin: '0 auto', display: 'block' }}>
        {/* spokes */}
        {pts.map((p, i) => (
          <line key={`s${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={theme.accent} strokeOpacity={visible ? 0.28 : 0} strokeWidth="1.2"
            style={{ transition: `stroke-opacity 0.6s ${EASE_STR} ${i * 0.04}s` }} />
        ))}
        {/* cross-links */}
        {(links || []).map(([a, b], i) => (
          <line key={`l${i}`} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke={theme.accentDark} strokeOpacity={visible ? 0.22 : 0} strokeWidth="1" strokeDasharray="3 3"
            style={{ transition: `stroke-opacity 0.6s ${EASE_STR} ${0.3 + i * 0.05}s` }} />
        ))}
        {/* outer nodes */}
        {pts.map((p, i) => {
          const r = theme.ramp[i % theme.ramp.length];
          const label = nodes[i];
          return (
            <g key={`n${i}`} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR} ${0.15 + i * 0.05}s` }}>
              <circle cx={p.x} cy={p.y} r="30" fill={r.bg} stroke={r.border} strokeWidth="1.4" />
              <text x={p.x} y={p.y} fill={r.text} fontSize="10" fontWeight="600" textAnchor="middle" dominantBaseline="middle">
                {label.split(' ').map((w, wi, arr) => (
                  <tspan key={wi} x={p.x} dy={wi === 0 ? `${-(arr.length - 1) * 0.55}em` : '1.1em'}>{w}</tspan>
                ))}
              </text>
            </g>
          );
        })}
        {/* hub */}
        <g style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR} 0.1s` }}>
          <circle cx={cx} cy={cy} r="44" fill={theme.accent} />
          <text x={cx} y={cy} fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle" dominantBaseline="middle">
            {center.split(' ').map((w, wi, arr) => (
              <tspan key={wi} x={cx} dy={wi === 0 ? `${-(arr.length - 1) * 0.55}em` : '1.15em'}>{w}</tspan>
            ))}
          </text>
        </g>
      </svg>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import type { ProjectTheme } from '../../types';
import type { MetricCard, CompetitorRow, RoadmapPhase } from './caseData';

/* ─── Shared easing + scroll-reveal ──────────────────────────── */
export const EASE_STR = 'cubic-bezier(0.32, 0.72, 0, 1)';

export function useReveal(margin = '-5%') {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return [ref, visible] as const;
}

export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 0.6s ${EASE_STR} ${delay}s, transform 0.6s ${EASE_STR} ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── Section eyebrow / label ────────────────────────────────── */
export function SectionLabel({ children, theme, icon }: { children: React.ReactNode; theme?: ProjectTheme; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span aria-hidden style={{ width: '1.75rem', height: 1, background: theme ? theme.accent : 'rgba(26,20,16,0.3)', display: 'inline-block', flexShrink: 0 }} />
      {icon && <span style={{ color: theme?.accent, display: 'inline-flex' }}>{icon}</span>}
      <span className="font-display italic text-ink-muted" style={{ fontSize: '0.95rem', lineHeight: 1.2 }}>{children}</span>
    </div>
  );
}

export const Pill = ({ children, theme }: { children: React.ReactNode; theme: ProjectTheme }) => (
  <span style={{
    background: theme.accentBg, border: `1px solid ${theme.accentBorder}55`, color: theme.accentDark,
    fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', whiteSpace: 'nowrap',
  }}>{children}</span>
);

/* ─── Lifecycle spine: idea -> deployment, one line per stage ──── */
export function LifecycleSpine({ stages, theme }: { stages: { stage: string; detail: string }[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-9">
      {stages.map((s, i) => (
        <div key={i} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(14px)',
          transition: `opacity 0.5s ${EASE_STR} ${i * 0.06}s, transform 0.5s ${EASE_STR} ${i * 0.06}s`,
        }}>
          <div className="flex items-baseline gap-2.5" style={{ borderTop: '1px solid rgba(26,20,16,0.16)', paddingTop: 12 }}>
            <span className="font-display italic oldstyle" style={{ fontSize: '1.05rem', color: theme.accent, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1A1410', letterSpacing: '0.01em' }}>{s.stage}</span>
          </div>
          <p className="mt-2.5 text-[13px] text-ink/75 leading-relaxed">{s.detail}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Status colors (roadmap — semantic) ─────────────────────── */
export const STATUS_COLORS = {
  shipped:  { label: 'Shipped',     bg: '#ECFDF5', border: '#10B981', text: '#065F46', dot: '#10B981' },
  building: { label: 'In Progress', bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', dot: '#3B82F6' },
  planned:  { label: 'Planned',     bg: '#F9FAFB', border: '#D1D5DB', text: '#6B7280', dot: '#9CA3AF' },
};

/* ─── Outcome metrics (themed) ───────────────────────────────── */
export function MetricsRow({ metrics, theme }: { metrics: MetricCard[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {metrics.map((m, i) => {
        const r = theme.ramp[i % theme.ramp.length];
        return (
          <div key={i} style={{
            background: r.bg, border: `1px solid ${r.border}50`, borderRadius: '1.25rem', padding: '20px',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
            transition: `opacity 0.5s ${EASE_STR} ${i * 0.07}s, transform 0.5s ${EASE_STR} ${i * 0.07}s`,
          }}>
            <p style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: r.text, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 300 }}>{m.value}</p>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#1A1410', marginTop: 6, marginBottom: 4 }}>{m.label}</p>
            <p style={{ fontSize: '11px', color: '#78716C', lineHeight: 1.5 }}>{m.sub}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Competitive grid (themed "ours" column) ────────────────── */
export function CompetitiveGrid({ columns, rows, theme }: { columns: string[]; rows: CompetitorRow[]; theme: ProjectTheme }) {
  const [ref, visible] = useReveal('-4%');
  const ours = columns[0];
  return (
    <div ref={ref}>
      <p className="text-[10px] text-ink-muted mb-3 md:hidden">← Scroll to compare →</p>
      <div className="w-full overflow-x-auto pb-2">
        <table className="w-full min-w-[560px] border-collapse" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR} 0.1s` }}>
          <thead>
            <tr>
              <th className="text-left pb-4 pr-6 w-[40%]">
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#78716C', fontWeight: 600 }}>Feature</span>
              </th>
              {columns.map((col, ci) => (
                <th key={ci} className="text-center pb-4 px-3">
                  {col === ours ? (
                    <span style={{ background: theme.accent, color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', display: 'inline-block' }}>{col}</span>
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#78716C' }}>{col}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{
                borderTop: '1px solid #E8E3DC', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)',
                transition: `opacity 0.4s ${EASE_STR} ${0.15 + ri * 0.05}s, transform 0.4s ${EASE_STR} ${0.15 + ri * 0.05}s`,
              }}>
                <td style={{ fontSize: '13px', color: '#57534E', padding: '13px 24px 13px 0', lineHeight: 1.4 }}>{row.feature}</td>
                {row.values.map((val, vi) => {
                  const isOurs = vi === 0;
                  return (
                    <td key={vi} className="text-center px-3 py-3" style={{ background: isOurs ? `${theme.accent}0D` : undefined }}>
                      {val === true && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: isOurs ? theme.accent : `${theme.accent}26` }}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke={isOurs ? 'white' : theme.accentDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                      {val === false && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: '#F5F5F4' }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="rgba(26,20,16,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      )}
                      {val !== true && val !== false && (
                        <span style={{ fontSize: '12px', fontWeight: isOurs ? 700 : 500, color: isOurs ? '#1A1410' : '#78716C' }}>{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Roadmap timeline (semantic status colors) ──────────────── */
export function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  const [ref, visible] = useReveal('-4%');
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
      {phases.map((phase, i) => {
        const s = STATUS_COLORS[phase.status];
        return (
          <div key={i} style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
            transition: `opacity 0.5s ${EASE_STR} ${i * 0.08}s, transform 0.5s ${EASE_STR} ${i * 0.08}s`,
          }}>
            <div style={{ background: s.bg, border: `1px solid ${s.border}50`, borderRadius: '1.25rem', padding: '18px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="flex items-center justify-between mb-3">
                <span style={{ background: 'white', border: `1px solid ${s.border}`, color: s.text, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>{s.label}</span>
                {phase.quarter && <span style={{ fontSize: '10px', color: s.text, opacity: 0.7, fontWeight: 500 }}>{phase.quarter}</span>}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A1410', marginBottom: 10 }}>{phase.phase}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                {phase.items.map((item, ii) => (
                  <li key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: '11.5px', color: '#57534E', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

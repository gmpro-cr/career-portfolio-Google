import React, { useEffect, useRef, useState } from 'react';
import type { Project, ProjectTheme } from '../../types';
import type { MetricCard } from './caseData';

/* ─── Shared easing + scroll-reveal ──────────────────────────── */
export const EASE_STR = 'cubic-bezier(0.32, 0.72, 0, 1)';

export function useReveal(margin = '-5%') {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // Never leave content hidden when the reveal can't run (no IO,
    // reduced motion, or a hidden tab / headless renderer).
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    const fallback = document.visibilityState === 'hidden'
      ? window.setTimeout(() => setVisible(true), 300)
      : undefined;
    return () => { obs.disconnect(); if (fallback) clearTimeout(fallback); };
  }, [margin]);
  return [ref, visible] as const;
}

export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(8px)',
      transition: `opacity 0.5s ${EASE_STR} ${delay}s, transform 0.5s ${EASE_STR} ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── Section label: plain text, used only where no heading follows ── */
export function SectionLabel({ children }: { children: React.ReactNode; theme?: ProjectTheme; icon?: React.ReactNode }) {
  return <p className="text-sm font-medium text-ink-muted mb-4">{children}</p>;
}

/* ─── Case hero: themed wash + deployed-site screenshot ───────── */
export function CaseHero({ project, theme }: { project: Project; theme: ProjectTheme }) {
  // "Vaani — Voice Banking Agent": the product name is the headline, the
  // descriptor sits under it rather than wrapping the h1 onto three lines.
  const [name, descriptor] = project.title.split(' — ');
  return (
    <section className="pt-4 pb-10 md:pb-16" style={{ background: `linear-gradient(180deg, ${theme.accentBg} 0%, transparent 58%)` }}>
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <div
          className="grid lg:grid-cols-[1.02fr_1fr] gap-8 lg:gap-14 items-center"
          style={{ opacity: 0, animation: `fadeUp 0.7s ${EASE_STR} 0.05s forwards` }}
        >
          <div>
            <p className="mb-5 text-sm text-ink-muted tabular">
              {project.date}
              {project.metrics && <> &middot; <span className="text-ink">{project.metrics}</span></>}
            </p>
            <h1 className="font-display font-light leading-[0.95] tracking-tight text-ink" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}>{name}</h1>
            {descriptor && <p className="mt-3 font-display text-xl md:text-2xl text-ink-muted">{descriptor}</p>}
            <p className="mt-5 md:mt-6 text-base md:text-lg text-ink/75 leading-relaxed">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs font-medium bg-ink/5 border border-hairline text-ink px-3 py-1.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          {project.image && (
            <div className="bezel" style={{ background: theme.accentBg }}>
              <div
                className="bezel-core overflow-hidden"
                style={{ borderRadius: 'calc(2rem - 0.375rem)' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title}, the deployed product`}
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '16 / 10', maxHeight: 460 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Outcome figures: plain numbers on a hairline, no cards ───── */
export function MetricsRow({ metrics }: { metrics: MetricCard[]; theme?: ProjectTheme }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10" style={{
      opacity: visible ? 1 : 0, transition: `opacity 0.5s ${EASE_STR}`,
    }}>
      {metrics.map((m, i) => (
        <div key={i} className="border-t border-ink/20 pt-4">
          <p className="font-display font-light text-ink leading-none tabular" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>{m.value}</p>
          <p className="mt-3 text-sm font-medium text-ink">{m.label}</p>
          <p className="mt-1 text-xs text-ink-muted leading-relaxed">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}

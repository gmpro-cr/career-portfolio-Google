import React from 'react';
import type { Brief } from './briefs';

/* ═══════════════════════════════════════════════════════════════
   PRODUCT BRIEF — the one-screen summary a hiring manager skims:
   problem, users, job to be done, options weighed, the metric that
   mattered and what happened. Every result says whether it was
   measured, shipped, a target, a hypothesis, or not measured yet.
   ═══════════════════════════════════════════════════════════════ */
const STATUS_STYLE: Record<Brief['results'][number]['status'], { label: string; className: string }> = {
  measured: { label: 'Measured', className: 'bg-ink text-white' },
  shipped: { label: 'Shipped', className: 'border border-ink/30 text-ink' },
  target: { label: 'Target', className: 'border border-dashed border-ink/40 text-ink-muted' },
  hypothesis: { label: 'Hypothesis', className: 'border border-dashed border-ink/40 text-ink-muted' },
  notyet: { label: 'Not measured yet', className: 'bg-shell text-ink-muted border border-hairline' },
};

function Row({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="grid md:grid-cols-[11rem_1fr] gap-2 md:gap-8 py-6 border-t border-hairline">
      <dt className="text-sm font-semibold text-ink">{label}</dt>
      <dd className={`text-base leading-relaxed text-ink/80 min-w-0 ${wide ? '' : 'max-w-2xl'}`}>{children}</dd>
    </div>
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
          <Row label="Options considered" wide>
            {/* Phones: one block per option, so the reasoning is never scrolled off-screen. */}
            <ul className="sm:hidden space-y-4">
              {brief.options.map((o, i) => (
                <li key={i} className="border-t border-hairline pt-3 first:border-t-0 first:pt-0">
                  <p className="text-ink">
                    <span className={o.chosen ? 'font-semibold' : 'text-ink-muted line-through decoration-ink/30'}>{o.chosen ? 'Chosen' : 'Rejected'}:</span>{' '}
                    {o.option}
                  </p>
                  <p className="mt-1 text-sm text-ink/80">{o.why}</p>
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
                      <td className="py-3 text-ink/80">{o.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Row>
          {brief.northStar && (
            <Row label="North Star metric">
              <span className="font-medium text-ink">{brief.northStar.metric}</span>
              {brief.northStar.why && <span className="block mt-1">{brief.northStar.why}</span>}
              {brief.guardrails && <span className="block mt-2 text-sm text-ink-muted">Guardrails: {brief.guardrails}</span>}
              {brief.alsoTracked && <span className="block mt-2 text-sm text-ink-muted">Also tracked: {brief.alsoTracked}</span>}
            </Row>
          )}
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

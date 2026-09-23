import React from 'react';
import { FileText, Warning, MagnifyingGlass, CheckCircle, UserCheck, FileXls, FilePdf } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Appear, CountUp, type Beat } from './SceneShell';

/* One proposal through the pipeline. The figures are an invented example
   (₹ crore) but internally consistent, so every ratio shown is the real
   calculation on them. The eight memo sections are the exact headings the
   memo generator is instructed to write (python-service/memo.py). */
const BEATS: Beat[] = [
  { caption: 'An analyst uploads the borrower\'s annual report, usually more than 100 pages.' },
  { caption: 'A regular program, not AI, finds the key figures in the statements and pulls them out.', ms: 3200 },
  { caption: 'It calculates the ratios a lender cares about and flags warning signs. Here, the company\'s profit is higher than the cash it actually generated.', ms: 3600 },
  { caption: 'An AI agent researches the company online and scores how complete its research is. It keeps searching until the score reaches 85%.', ms: 3800 },
  { caption: 'The AI writes the eight-section memo from the checked numbers and research only. Each section carries a confidence level.', ms: 3600 },
  { caption: 'The analyst reviews the low-confidence sections, signs off, and exports in the bank\'s own Excel format or as a PDF.', ms: 3400 },
];

const FIGURES = [
  { label: 'Revenue', v: '1,240' },
  { label: 'EBITDA', v: '186' },
  { label: 'Net profit', v: '110' },
  { label: 'Cash from operations', v: '95' },
  { label: 'Total debt', v: '540' },
  { label: 'Equity', v: '300' },
  { label: 'Interest', v: '42' },
  { label: 'Principal due this year', v: '90' },
];

const RATIOS = [
  { label: 'Debt service coverage', value: '1.4×', note: 'EBITDA ÷ (interest + principal)' },
  { label: 'Debt to equity', value: '1.8', note: 'debt ÷ equity' },
  { label: 'Interest coverage', value: '4.4×', note: 'EBITDA ÷ interest' },
];

const SECTIONS: [string, 'High' | 'Medium' | 'Low'][] = [
  ['Borrower Overview', 'High'],
  ['Financial Analysis', 'High'],
  ['Liquidity & Cash Flow Assessment', 'Medium'],
  ['Key Risk Drivers', 'Medium'],
  ['Mitigating Factors', 'Low'],
  ['Red Flags', 'High'],
  ['Overall Risk Assessment', 'Medium'],
  ['Confidence Level', 'High'],
];

const SEARCHES = ['credit rating actions', 'court cases', 'promoter share pledging', 'industry outlook'];

export default function CreditScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Follow one loan proposal"
      intro="From a 100-page annual report to a memo the credit committee can read. Watch where the software does the arithmetic, where the AI writes, and where the analyst stays in charge."
      beats={BEATS}
      theme={theme}
      note="Example company, figures in ₹ crore"
    >
      {beat => (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* 1. The report */}
          <div className="rounded-2xl border border-hairline p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink"><FileText size={17} aria-hidden /> Annual report, p. 84</p>
            <p className="mt-1 text-xs text-ink-muted">Standalone financial statements</p>
            <ul className="mt-3 space-y-1.5 text-sm tabular">
              {FIGURES.map((f, i) => (
                <li
                  key={f.label}
                  className="flex justify-between rounded px-2 py-0.5 transition-colors duration-500"
                  style={{ background: beat >= 1 ? `${a}${i % 2 ? '14' : '1F'}` : 'transparent', transitionDelay: `${i * 0.08}s` }}
                >
                  <span className="text-ink/75">{f.label}</span>
                  <span className="text-ink">{f.v}</span>
                </li>
              ))}
            </ul>
            <Appear show={beat >= 1}>
              <p className="mt-3 text-xs text-ink-muted">8 figures extracted by code</p>
            </Appear>
          </div>

          {/* 2. Ratios, flags, research */}
          <div className="space-y-4">
            <Appear show={beat >= 2}>
              <div className="rounded-2xl border border-hairline p-4">
                <p className="text-sm font-semibold text-ink">Ratios</p>
                <ul className="mt-2 space-y-2">
                  {RATIOS.map(r => (
                    <li key={r.label} className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-ink/80">{r.label}<span className="block text-[11px] text-ink-muted">{r.note}</span></span>
                      <span className="font-display text-xl text-ink tabular">{r.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900">
                  <Warning size={15} weight="fill" className="flex-shrink-0 mt-px" aria-hidden />
                  Flag: profit (110) is higher than cash from operations (95).
                </div>
              </div>
            </Appear>
            <Appear show={beat >= 3}>
              <div className="rounded-2xl border border-hairline p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink"><MagnifyingGlass size={16} aria-hidden /> Web research</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {SEARCHES.map((q, i) => (
                    <li key={q} className="rounded-full border border-hairline px-2 py-0.5 text-[11px] text-ink/75" style={{ opacity: beat >= 3 ? 1 : 0, transition: `opacity .4s ease ${0.3 + i * 0.4}s` }}>{q}</li>
                  ))}
                </ul>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-ink-muted"><span>Research complete</span><span className="text-ink font-medium"><CountUp to={88} run={beat >= 3} done={beat > 3} ms={2600} format={n => `${n}%`} /></span></div>
                  <div className="relative mt-1.5 h-2 rounded-full bg-hairline overflow-hidden">
                    <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: beat >= 3 ? '88%' : '0%', background: a, transition: beat > 3 ? 'none' : 'width 2.6s cubic-bezier(0.45,0,0.2,1)' }} />
                    <div className="absolute inset-y-[-3px] w-px bg-ink/60" style={{ left: '85%' }} aria-hidden />
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">Stops at 85%</p>
                </div>
              </div>
            </Appear>
          </div>

          {/* 3. The memo */}
          <Appear show={beat >= 4}>
            <div className="rounded-2xl border border-hairline p-4 h-full">
              <p className="text-sm font-semibold text-ink">Credit appraisal memo</p>
              <ol className="mt-2 space-y-1.5">
                {SECTIONS.map(([name, conf], i) => (
                  <li
                    key={name}
                    className="flex items-center justify-between gap-2 text-sm"
                    style={{ opacity: beat >= 4 ? 1 : 0, transition: `opacity .35s ease ${i * 0.22}s` }}
                  >
                    <span className="text-ink/85"><span className="tabular text-ink-muted mr-1.5">{i + 1}.</span>{name}</span>
                    <span
                      className="flex-shrink-0 rounded px-1.5 py-px text-[10px] font-medium"
                      style={conf === 'Low'
                        ? { background: '#FEF3C7', color: '#92400E', outline: beat >= 5 ? `2px solid ${a}` : 'none' }
                        : { background: '#F5F5F4', color: '#57534E' }}
                    >
                      {conf}
                    </span>
                  </li>
                ))}
              </ol>
              <Appear show={beat >= 5}>
                <div className="mt-4 pt-3 border-t border-hairline flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink"><UserCheck size={15} aria-hidden /> Reviewed by analyst</span>
                  <CheckCircle size={14} weight="fill" style={{ color: a }} aria-hidden />
                  <span className="ml-auto inline-flex gap-2 text-ink-muted"><span className="inline-flex items-center gap-1"><FileXls size={14} aria-hidden /> Excel</span><span className="inline-flex items-center gap-1"><FilePdf size={14} aria-hidden /> PDF</span></span>
                </div>
              </Appear>
            </div>
          </Appear>
        </div>
      )}
    </SceneShell>
  );
}

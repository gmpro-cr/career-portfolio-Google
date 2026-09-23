import React from 'react';
import { Database, CheckCircle, Play } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Typed, type Beat } from './SceneShell';

/* One exercise on the example shop database. The typo produces the error
   in exactly the format PostgreSQL prints it; the second query is a
   genuinely different, correct query that returns the same rows, which is
   why the checker compares rows rather than query text. */
const BEATS: Beat[] = [
  { caption: 'A full PostgreSQL 18 database has started inside the browser tab. The learner writes a query against it.', ms: 4200 },
  { caption: 'There is a typo. Postgres answers with its real error message, shown exactly as it would appear at work.', ms: 3600 },
  { caption: 'Fixed, the query runs and real rows come back from the real engine.', ms: 3000 },
  { caption: 'The checker compares the rows returned with the expected rows, not the words of the query.', ms: 3200 },
  { caption: 'So a completely different query that returns the same rows also passes. There is no single "right" way to write it.', ms: 4600 },
];

const Q1 = `SELECT c.name, SUM(o.amount) AS total
FROM orders o JOIN customers c USING (customer_id)
GRUP BY c.name
ORDER BY total DESC LIMIT 3;`;
const Q1_FIXED = Q1.replace('GRUP BY', 'GROUP BY');
const Q2 = `SELECT name, total FROM (
  SELECT customer_id, SUM(amount) AS total
  FROM orders GROUP BY customer_id
) t JOIN customers USING (customer_id)
ORDER BY total DESC LIMIT 3;`;

const ROWS: [string, string][] = [['Kavya', '48,200'], ['Imran', '41,750'], ['Neha', '39,900']];

export default function SQLQuestScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Run one query"
      intro="Question: which three customers spent the most? The learner answers it on a real database, makes a mistake, fixes it, and finds out that their own way of writing it counts."
      beats={BEATS}
      theme={theme}
      note="Example exercise"
    >
      {beat => {
        const second = beat >= 4;
        return (
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10">
            <div className="rounded-2xl overflow-hidden border border-hairline">
              <div className="flex items-center justify-between px-3 py-2 bg-shell/70 border-b border-hairline">
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted"><Database size={14} aria-hidden /> PostgreSQL 18 · in this tab</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: beat === 1 || beat === 2 || beat === 4 ? a : '#fff', color: beat === 1 || beat === 2 || beat === 4 ? '#fff' : '#1A1410', border: '1px solid #E7E5E4' }}>
                  <Play size={11} weight="fill" aria-hidden /> Run
                </span>
              </div>
              <pre className="px-4 py-3 text-[12.5px] leading-6 font-mono text-ink bg-white overflow-x-auto min-h-[8.5rem]">
                {second
                  ? <Typed text={Q2} run done={beat > 4} cps={60} />
                  : beat >= 2
                    ? Q1_FIXED.split('GROUP BY').map((part, i) => i === 0 ? part : <React.Fragment key={i}><span style={{ background: `${a}33` }}>GROUP BY</span>{part}</React.Fragment>)
                    : <Typed text={Q1} run done={beat > 0} cps={34} />}
              </pre>
              {beat === 1 && (
                <pre className="border-t border-hairline px-4 py-3 text-[12.5px] leading-6 font-mono bg-[#FAFAF9] overflow-x-auto" style={{ animation: 'sceneFade .4s ease both' }}>
                  <span className="text-[#9A3412]">ERROR</span>:  syntax error at or near "GRUP"{'\n'}LINE 3: GRUP BY c.name{'\n'}        ^
                </pre>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-ink-muted mb-2">{second ? 'Result of the second query' : 'Result'}</p>
              <table className="w-full text-sm tabular border-collapse">
                <thead>
                  <tr className="text-left text-xs text-ink-muted border-b border-hairline">
                    <th className="font-medium py-2">name</th>
                    <th className="font-medium py-2 text-right">total (₹)</th>
                    <th className="w-24" />
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([n, t], i) => (
                    <tr key={n} className="border-b border-hairline" style={{ opacity: beat >= 2 ? 1 : 0, transition: `opacity .35s ease ${i * 0.15}s` }}>
                      <td className="py-2 text-ink">{n}</td>
                      <td className="py-2 text-right text-ink">{t}</td>
                      <td className="py-2 text-right">
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: a, opacity: beat >= 3 ? 1 : 0, transition: `opacity .3s ease ${0.2 + i * 0.25}s` }}>
                          <CheckCircle size={14} weight="fill" aria-hidden /> matches
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 min-h-[3rem]">
                {beat === 3 && (
                  <p className="text-sm text-ink/85" style={{ animation: 'sceneFade .4s ease both' }}>All 3 rows match the expected result. Exercise passed.</p>
                )}
                {beat >= 4 && (
                  <p className="flex gap-2 rounded-lg px-3 py-2.5 text-sm text-ink/85" style={{ background: `${a}12`, animation: `sceneFade .4s ease ${beat > 4 ? 0 : 3.3}s both` }}>
                    <CheckCircle size={16} weight="fill" style={{ color: a }} className="flex-shrink-0 mt-0.5" aria-hidden />
                    A different query, the same rows: also passed.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </SceneShell>
  );
}

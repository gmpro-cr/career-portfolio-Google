import React from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Appear, CountUp, type Beat } from './SceneShell';

/* One morning's run. The numbers are illustrative but add up: portal
   counts sum to 318 collected, the score histogram sums to the 244 left
   after de-duplication, and exactly 11 of them score 65 or more. */
const BEATS: Beat[] = [
  { caption: 'Twice a day, on a schedule, the agent opens six job sites. Nobody has to press anything.' },
  { caption: 'It collects every new listing from each site.', ms: 3000 },
  { caption: 'The same job is often posted on several sites. Each listing gets a fingerprint (site, company, role, location), and repeats are dropped.', ms: 3400 },
  { caption: 'An AI model running on the computer scores every remaining listing from 0 to 100 against the CV and preferences.', ms: 3600 },
  { caption: 'Only listings scoring 65 or more make the cut. Everything else is stored but kept out of the way.', ms: 3200 },
  { caption: 'The short list arrives as one message: a five-minute read instead of two hours of searching.', ms: 4000 },
];

const PORTALS: [string, number][] = [['LinkedIn', 96], ['Naukri', 88], ['Indeed', 54], ['HiringCafe', 31], ['Wellfound', 27], ['IIMJobs', 22]];
// Scores in bands of 10 (0-9 ... 90-100). Band 6 (60-69) has 4 listings at 65+.
const BANDS = [8, 20, 38, 54, 58, 47, 12, 4, 2, 1];
const BAND6_ABOVE = 4;
const MAX = Math.max(...BANDS);

const DIGEST: [string, string, number][] = [
  ['Senior Product Manager, AI', 'Fintech lender · Mumbai', 84],
  ['Product Manager, Credit', 'Digital bank · Pune', 79],
  ['AI Product Lead', 'SaaS company · Remote', 76],
  ['Product Manager, Risk', 'NBFC · Bengaluru', 71],
  ['Product Manager, Payments', 'Payments startup · Pune', 68],
];

export default function JobScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Watch one morning's search"
      intro="Hundreds of listings go in at the top. A handful come out at the bottom. Each step removes a different kind of noise."
      beats={BEATS}
      theme={theme}
      note="Illustrative numbers"
    >
      {beat => (
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
          <div className="space-y-6">
            {/* Portals */}
            <div>
              <p className="text-xs font-medium text-ink-muted mb-2">Job sites checked</p>
              <div className="grid grid-cols-3 gap-2">
                {PORTALS.map(([name, n], i) => (
                  <div key={name} className="rounded-lg border px-2.5 py-2 transition-colors duration-500" style={{ borderColor: beat >= 0 ? `${a}66` : '#E7E5E4', transitionDelay: `${i * 0.1}s` }}>
                    <p className="text-xs text-ink/80 truncate">{name}</p>
                    <p className="font-display text-lg text-ink"><CountUp to={n} run={beat >= 1} done={beat > 1} ms={1400} /></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Running totals */}
            <dl className="grid grid-cols-3 gap-3 border-t border-hairline pt-4">
              <div>
                <dt className="text-xs text-ink-muted">Collected</dt>
                <dd className="font-display text-3xl text-ink"><CountUp to={318} run={beat >= 1} done={beat > 1} ms={1400} /></dd>
              </div>
              <div style={{ opacity: beat >= 2 ? 1 : 0.3, transition: 'opacity .5s' }}>
                <dt className="text-xs text-ink-muted">After removing repeats</dt>
                <dd className="font-display text-3xl text-ink"><CountUp to={244} run={beat >= 2} done={beat > 2} ms={1000} /></dd>
              </div>
              <div style={{ opacity: beat >= 4 ? 1 : 0.3, transition: 'opacity .5s' }}>
                <dt className="text-xs text-ink-muted">Scored 65 or more</dt>
                <dd className="font-display text-3xl" style={{ color: a }}><CountUp to={11} run={beat >= 4} done={beat > 4} ms={900} /></dd>
              </div>
            </dl>
          </div>

          <div>
            {/* Score histogram */}
            <Appear show={beat >= 3}>
              <p className="text-xs font-medium text-ink-muted mb-2">How the 244 listings scored</p>
              <div className="relative h-40 flex items-end gap-1.5 border-b border-hairline">
                {BANDS.map((n, i) => {
                  const h = (n / MAX) * 100;
                  const upper = i === 6 ? BAND6_ABOVE : i > 6 ? n : 0;
                  const highlight = beat >= 4;
                  return (
                    <div key={i} className="relative flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
                      <div
                        className="w-full rounded-t overflow-hidden flex flex-col justify-end"
                        style={{ height: beat >= 3 ? `${h}%` : '0%', transition: `height .8s cubic-bezier(0.32,0.72,0,1) ${i * 0.06}s`, minHeight: beat >= 3 ? 3 : 0 }}
                      >
                        {upper > 0 && <div style={{ flex: upper, background: highlight ? a : '#E8E3DC', transition: 'background .5s' }} />}
                        {n - upper > 0 && <div style={{ flex: n - upper, background: highlight ? '#E7E5E4' : '#E8E3DC', transition: 'background .5s' }} />}
                      </div>
                    </div>
                  );
                })}
                {/* 65-point threshold: band 6 spans 60-69, so 65 is the middle of the 7th column */}
                <div
                  className="absolute top-0 bottom-0 w-[2px]"
                  style={{ left: 'calc(65% - 1px)', background: '#1A1410', opacity: beat >= 4 ? 0.8 : 0, transition: 'opacity .5s' }}
                  aria-hidden
                >
                  <span className="absolute -top-5 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-ink">65</span>
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-ink-muted tabular mt-1"><span>0</span><span>50</span><span>100</span></div>
            </Appear>

            {/* The digest */}
            <Appear show={beat >= 5} className="mt-5">
              <div className="rounded-2xl border border-hairline p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink"><PaperPlaneTilt size={16} aria-hidden /> Morning digest, 11 matches</p>
                <ul className="mt-2 divide-y divide-hairline">
                  {DIGEST.map(([role, where, score], i) => (
                    <li key={role} className="flex items-center justify-between gap-3 py-2" style={{ opacity: beat >= 5 ? 1 : 0, transition: `opacity .35s ease ${i * 0.15}s` }}>
                      <span className="min-w-0">
                        <span className="block text-sm text-ink truncate">{role}</span>
                        <span className="block text-xs text-ink-muted truncate">{where}</span>
                      </span>
                      <span className="flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular" style={{ background: `${a}1A`, color: a }}>{score}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-xs text-ink-muted">and 6 more</p>
              </div>
            </Appear>
          </div>
        </div>
      )}
    </SceneShell>
  );
}

import React from 'react';
import { Play, Lightbulb, CheckCircle, Star } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Appear, Typed, type Beat } from './SceneShell';

/* A first exercise, including the mistake almost every beginner makes.
   The error text is exactly what CPython 3.10+ prints for an unclosed
   bracket, because the page runs real Python (Pyodide), not a lookalike. */
const BEATS: Beat[] = [
  { caption: 'The lesson is one short idea. The learner types code straight into the page. Nothing to install.', ms: 3800 },
  { caption: 'They press Run. Real Python runs inside the browser tab, so the error is the genuine one they will see later on their own computer.', ms: 3800 },
  { caption: 'Instead of a red telling-off, a hint lights up.', ms: 3000 },
  { caption: 'They add the missing bracket and run it again. It works.', ms: 3200 },
  { caption: 'The page checks the output against what was expected, awards XP and saves progress in the browser.', ms: 3800 },
];

const LINE1 = 'city = "Pune"';
const LINE2 = 'print("Hello from " + city';

export default function PyQuestScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Take the first lesson"
      intro="A complete beginner writes their first line of Python, gets it wrong, and gets it right, all within a minute and without installing anything."
      beats={BEATS}
      theme={theme}
      note="Example exercise"
    >
      {beat => {
        const errored = beat >= 1 && beat < 3;
        const passed = beat >= 3;
        return (
          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-6 md:gap-10">
            <div>
              <p className="text-xs font-medium text-ink-muted">Stage 1 · print()</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                <code className="font-mono text-[0.85em] px-1 rounded bg-shell">print()</code> shows text on the screen. Store your city in a variable, then print a greeting that uses it.
              </p>
              <div className="mt-5">
                <p className="text-xs text-ink-muted">Stage progress</p>
                <div className="mt-1.5 h-2 rounded-full bg-hairline overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: beat >= 4 ? '33%' : '0%', background: a, transition: 'width .9s cubic-bezier(0.32,0.72,0,1)' }} />
                </div>
                <Appear show={beat >= 4} className="mt-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: `${a}1F`, color: a }}>
                    <Star size={13} weight="fill" aria-hidden /> XP earned
                  </span>
                </Appear>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-hairline">
              <div className="flex items-center justify-between px-3 py-2 bg-shell/70 border-b border-hairline">
                <span className="text-xs text-ink-muted font-mono">main.py</span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
                  style={{ background: beat === 1 || beat === 3 ? a : '#fff', color: beat === 1 || beat === 3 ? '#fff' : '#1A1410', border: '1px solid #E7E5E4' }}
                >
                  <Play size={11} weight="fill" aria-hidden /> Run
                </span>
              </div>
              <div className="flex px-4 py-3 text-[13px] leading-6 font-mono bg-white overflow-x-auto">
                <pre className="text-ink-muted select-none pr-3" aria-hidden>{'1\n2'}</pre>
                <pre className="text-ink">
                  <Typed text={`${LINE1}\n${LINE2}`} run done={beat > 0} cps={22} />
                  {passed && <span style={{ background: `${a}33` }}>)</span>}
                </pre>
              </div>
              <div className="border-t border-hairline px-4 py-3 bg-[#FAFAF9] min-h-[5.5rem] font-mono text-[13px] leading-6">
                <p className="text-[11px] font-sans font-medium text-ink-muted mb-1">Output</p>
                {errored && (
                  <p className="text-ink/80">
                    <span className="text-amber-800">SyntaxError</span>: '(' was never closed
                  </p>
                )}
                {passed && <p className="text-ink">Hello from Pune</p>}
              </div>
              <div className="border-t border-hairline min-h-[2.75rem]">
                {beat === 2 && (
                  <div className="flex gap-2 px-4 py-2.5 text-sm" style={{ background: `${a}12`, animation: 'sceneFade .4s ease both' }}>
                    <Lightbulb size={16} weight="fill" style={{ color: a }} className="flex-shrink-0 mt-0.5" aria-hidden />
                    <span className="text-ink/85">Hint: every opening bracket needs a closing one. Look at the end of line 2.</span>
                  </div>
                )}
                {beat >= 4 && (
                  <div className="flex gap-2 px-4 py-2.5 text-sm" style={{ background: `${a}12`, animation: 'sceneFade .4s ease both' }}>
                    <CheckCircle size={16} weight="fill" style={{ color: a }} className="flex-shrink-0 mt-0.5" aria-hidden />
                    <span className="text-ink/85">Output matches. Next exercise unlocked.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </SceneShell>
  );
}

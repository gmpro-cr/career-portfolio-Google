import React from 'react';
import { MagnifyingGlass, BookOpen } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Appear, Typed, type Beat } from './SceneShell';

/* One question to "Ask the book". Chapter titles and the three matched
   sections are the real ones from the guide's chapter data; the answer is
   written in our own words, not quoted from the book. */
const BEATS: Beat[] = [
  { caption: 'A reader who is building a RAG system types a question in their own words.', ms: 3400 },
  { caption: 'The guide searches the ten chapters for passages that share the question\'s key terms.', ms: 3200 },
  { caption: 'The best-matching passages come from chapter 6, "RAG and Agents".', ms: 3000 },
  { caption: 'The AI answers using only those passages and names the chapter, so the reader can open it and check.', ms: 4200 },
];

const CHAPTERS = [
  'Introduction to Building AI Applications with Foundation Models',
  'Understanding Foundation Models',
  'Evaluation Methodology',
  'Evaluate AI Systems',
  'Prompt Engineering',
  'RAG and Agents',
  'Finetuning',
  'Dataset Engineering',
  'Inference Optimization',
  'AI Engineering Architecture and User Feedback',
];
const HIT = 5;
const PASSAGES = ['Retrieval optimization: four tactics', 'Anatomy of a RAG system', 'Evaluating and combining retrievers'];

export default function BookScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Ask the book one question"
      intro="Instead of re-skimming 535 pages, a reader asks. The answer comes back with the chapter it came from, which is what makes it trustworthy."
      beats={BEATS}
      theme={theme}
      note="Example question"
    >
      {beat => (
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 md:gap-10">
          <div>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: beat >= 0 ? a : '#E7E5E4' }}>
              <MagnifyingGlass size={16} className="text-ink-muted flex-shrink-0" aria-hidden />
              <span className="text-ink"><Typed text="How big should my chunks be for RAG?" run={beat >= 0} done={beat > 0} /></span>
            </div>
            <ol className="mt-4 space-y-1">
              {CHAPTERS.map((t, i) => {
                const scanning = beat === 1;
                const hit = beat >= 2 && i === HIT;
                return (
                  <li
                    key={t}
                    className="flex gap-2.5 rounded-md px-2 py-1 text-sm transition-colors duration-300"
                    style={{
                      background: hit ? `${a}1F` : scanning ? undefined : 'transparent',
                      animation: scanning ? `bookScan 1.6s ease ${i * 0.12}s 1 both` : undefined,
                      opacity: beat >= 2 && !hit ? 0.5 : 1,
                    }}
                  >
                    <span className="tabular text-ink-muted w-5 text-right flex-shrink-0">{i + 1}</span>
                    <span className={`truncate ${hit ? 'font-semibold text-ink' : 'text-ink/80'}`}>{t}</span>
                  </li>
                );
              })}
            </ol>
            <style>{`@keyframes bookScan { 0%,100% { background: transparent } 40% { background: ${a}14 } }`}</style>
          </div>

          <div className="space-y-3">
            <Appear show={beat >= 2}>
              <p className="text-xs font-medium text-ink-muted mb-2">Passages found in chapter 6</p>
              <ul className="space-y-2">
                {PASSAGES.map((p, i) => (
                  <li key={p} className="flex items-center gap-2 rounded-lg border border-hairline px-3 py-2 text-sm text-ink/85" style={{ opacity: beat >= 2 ? 1 : 0, transition: `opacity .35s ease ${i * 0.2}s` }}>
                    <BookOpen size={15} style={{ color: a }} aria-hidden /> {p}
                  </li>
                ))}
              </ul>
            </Appear>
            <Appear show={beat >= 3}>
              <div className="rounded-2xl p-4 text-sm leading-relaxed text-ink" style={{ background: '#F5F5F4' }}>
                <Typed
                  text="There is no single right size. Chunks need to be small enough that each one is about one thing, and large enough to keep the context around it. Overlapping them slightly stops an idea being cut in half. Try a few sizes and measure how well retrieval finds the right passage."
                  run={beat >= 3}
                  done={beat > 3}
                  cps={55}
                />
                <span className="mt-3 flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: `${a}1F`, color: a }}>
                  <BookOpen size={13} aria-hidden /> Chapter 6 · RAG and Agents
                </span>
              </div>
            </Appear>
          </div>
        </div>
      )}
    </SceneShell>
  );
}

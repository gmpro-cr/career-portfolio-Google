import React from 'react';
import { Brain, CheckCircle, MagnifyingGlass } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Appear, Typed, type Beat } from './SceneShell';

/* One returning user, one question. Shows the three things that make
   it different from a plain chatbot: choosing who you talk to, the
   memory recalled from last time, and the in-character check. */
const BEATS: Beat[] = [
  { caption: 'You browse personas by category and pick one. Guests can start without signing up.' },
  { caption: 'You ask something personal, the kind of question you would bring to a mentor.', ms: 3400 },
  { caption: 'Before replying, the app recalls what you discussed last time and adds it to the conversation.' },
  { caption: 'The model drafts a reply in that person\'s style. A check scores it for staying in character; a reply that drifts is regenerated before you see it.' },
  { caption: 'The answer arrives in the persona\'s voice and builds on what it remembers about you.', ms: 4000 },
];

const CATEGORIES = ['Business', 'Spirituality', 'History', 'Entertainment', 'Fitness', 'Companion'];
const PERSONAS = [
  { name: 'Chanakya', role: 'Strategist, ancient India', initial: 'C', pick: true },
  { name: 'A modern investor', role: 'Business', initial: 'B', pick: false },
  { name: 'A meditation teacher', role: 'Spirituality', initial: 'S', pick: false },
];

export default function SpiritScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Have one conversation"
      intro="A returning user asks a historical strategist for career advice. Watch what happens between the question and the answer: that middle part is where the product is built."
      beats={BEATS}
      theme={theme}
      note="Example conversation"
    >
      {beat => (
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-10">
          {/* Picker */}
          <div>
            <div className="flex items-center gap-2 rounded-full border border-hairline px-3 py-2 text-sm text-ink-muted">
              <MagnifyingGlass size={15} aria-hidden /> Search 350+ personas
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CATEGORIES.map((c, i) => (
                <span key={c} className="rounded-full px-2.5 py-1 text-xs" style={i === 2 && beat >= 0 ? { background: a, color: '#fff' } : { background: '#F5F5F4', color: '#57534E' }}>{c}</span>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {PERSONAS.map(p => (
                <li
                  key={p.name}
                  className="flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500"
                  style={p.pick ? { borderColor: a, background: `${a}10` } : { borderColor: '#E7E5E4', opacity: beat >= 1 ? 0.45 : 1 }}
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-sm font-semibold" style={{ background: p.pick ? a : '#E7E5E4', color: p.pick ? '#fff' : '#57534E' }}>
                    {p.initial}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink truncate">{p.name}</span>
                    <span className="block text-xs text-ink-muted truncate">{p.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conversation */}
          <div className="rounded-2xl border border-hairline p-4 md:p-5 flex flex-col gap-3 min-h-[20rem]">
            <p className="text-xs text-ink-muted pb-2 border-b border-hairline">Chatting with <span className="font-semibold text-ink">Chanakya</span></p>
            <Appear show={beat >= 1} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed" style={{ background: a, color: '#fff' }}>
                <Typed text="Should I leave my bank job to start my own company?" run={beat >= 1} done={beat > 1} />
              </div>
            </Appear>
            <Appear show={beat >= 2}>
              <div className="flex gap-2.5 rounded-xl border border-dashed px-3 py-2.5" style={{ borderColor: `${a}80` }}>
                <Brain size={17} style={{ color: a }} className="flex-shrink-0 mt-0.5" aria-hidden />
                <p className="text-xs leading-relaxed text-ink/80">
                  <span className="font-semibold text-ink">Remembered from last week:</span> you have been in banking for eight years and worried about how long your savings would last.
                </p>
              </div>
            </Appear>
            <Appear show={beat >= 3}>
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <CheckCircle size={15} weight="fill" style={{ color: a }} aria-hidden />
                Character check passed: tone and worldview match the persona
              </div>
            </Appear>
            <Appear show={beat >= 4}>
              <div className="max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed" style={{ background: '#F5F5F4', color: '#1A1410' }}>
                <span className="block text-[11px] font-medium opacity-60 mb-0.5">Chanakya (AI persona)</span>
                <Typed text="A wise man does not leave one shelter before the next has a roof. You told me your savings worry you. Count the months they can carry you, then build the new venture in the evenings until it can pay for itself." run={beat >= 4} done={beat > 4} cps={45} />
              </div>
            </Appear>
          </div>
        </div>
      )}
    </SceneShell>
  );
}

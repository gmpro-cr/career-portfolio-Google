import React, { createContext, useContext } from 'react';
import {
  PlayCircle, Compass, BookOpenText, Brain, TreeStructure, Path, GearSix, Warning, SealCheck, Stack, Flag, ChartLineUp, Notebook,
} from '@phosphor-icons/react';
import type { ProjectTheme } from '../../types';
import { Reveal } from './kit';

/* ═══════════════════════════════════════════════════════════════
   One chapter list for every project page: the product story first,
   then how it is built, then what came of it. The same question always
   sits at the same number, whichever project you are reading.
   ═══════════════════════════════════════════════════════════════ */

type IconType = React.ComponentType<{ size?: number; weight?: 'light' | 'regular' | 'duotone' | 'fill'; color?: string; 'aria-hidden'?: boolean }>;

export type ChapterId =
  | 'demo' | 'product' | 'summary' | 'models' | 'system' | 'request' | 'mechanisms'
  | 'failures' | 'testing' | 'hosting' | 'limits' | 'outcomes' | 'glossary';

export const CHAPTERS: { id: ChapterId; label: string; icon: IconType; part: 'The product' | 'How it works' | 'The result' }[] = [
  { id: 'demo', label: 'See it work', icon: PlayCircle, part: 'The product' },
  { id: 'product', label: 'The product', icon: Compass, part: 'The product' },
  { id: 'summary', label: 'In one minute', icon: BookOpenText, part: 'How it works' },
  { id: 'models', label: 'The AI models', icon: Brain, part: 'How it works' },
  { id: 'system', label: 'The system', icon: TreeStructure, part: 'How it works' },
  { id: 'request', label: 'Step by step', icon: Path, part: 'How it works' },
  { id: 'mechanisms', label: 'Key parts', icon: GearSix, part: 'How it works' },
  { id: 'failures', label: 'When things go wrong', icon: Warning, part: 'How it works' },
  { id: 'testing', label: 'Testing', icon: SealCheck, part: 'How it works' },
  { id: 'hosting', label: 'Hosting and cost', icon: Stack, part: 'How it works' },
  { id: 'limits', label: 'Known limits', icon: Flag, part: 'How it works' },
  { id: 'outcomes', label: 'Outcomes', icon: ChartLineUp, part: 'The result' },
  { id: 'glossary', label: 'Glossary', icon: Notebook, part: 'The result' },
];

export const chapterNumber = (id: ChapterId) => CHAPTERS.findIndex(c => c.id === id) + 1;

/* Faint dot grid in the project accent, for tinted chapters. */
export const dots = (theme: ProjectTheme) => ({
  backgroundColor: `${theme.accentBg}`,
  backgroundImage: `radial-gradient(${theme.accent}22 1px, transparent 1.2px)`,
  backgroundSize: '22px 22px',
});

/* Big outlined numeral + icon tile + title. */
export function ChapterHead({ id, theme, title, intro }: { id: ChapterId; theme: ProjectTheme; title?: React.ReactNode; intro?: string }) {
  const n = chapterNumber(id);
  const { icon: Icon, label } = CHAPTERS[n - 1];
  return (
    <Reveal>
      <div className="flex items-end gap-4 md:gap-6">
        <span
          aria-hidden
          className="font-display font-light leading-none tabular select-none"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', color: 'transparent', WebkitTextStroke: `1.25px ${theme.accent}`, letterSpacing: '-0.04em' }}
        >
          {String(n).padStart(2, '0')}
        </span>
        <div className="pb-1.5 md:pb-3 min-w-0">
          <span className="inline-grid h-9 w-9 place-items-center rounded-xl mb-3" style={{ background: theme.accentBg, color: theme.accentDark, boxShadow: `inset 0 0 0 1px ${theme.accent}33` }}>
            <Icon size={18} weight="duotone" aria-hidden />
          </span>
          <h2 className="font-display font-light text-3xl md:text-5xl text-ink tracking-tight leading-[1.02]" style={{ textWrap: 'balance' }}>{title ?? label}</h2>
        </div>
      </div>
      {intro && <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ink/75">{intro}</p>}
    </Reveal>
  );
}

export function Chapter({ id, children, theme, tint }: { id: ChapterId; children: React.ReactNode; theme: ProjectTheme; tint?: boolean }) {
  return (
    <section id={id} data-chapter className="scroll-mt-32 py-16 md:py-24 border-t border-hairline" style={tint ? dots(theme) : undefined}>
      <div className="max-w-6xl mx-auto px-4 md:px-12">{children}</div>
    </section>
  );
}

/* Scenes (SceneShell) draw their own section. Wrapped in this, they take
   the chapter's id and render their title through ChapterHead. */
const SceneChapterContext = createContext<{ id: ChapterId; theme: ProjectTheme } | null>(null);
export const useSceneChapter = () => useContext(SceneChapterContext);

export function SceneChapter({ id, theme, children }: { id: ChapterId; theme: ProjectTheme; children: React.ReactNode }) {
  return (
    <div id={id} data-chapter className="scroll-mt-32">
      <SceneChapterContext.Provider value={{ id, theme }}>{children}</SceneChapterContext.Provider>
    </div>
  );
}

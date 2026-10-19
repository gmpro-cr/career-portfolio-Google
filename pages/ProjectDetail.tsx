import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { PROJECTS, getTheme } from '../constants';
import type { ProjectTheme } from '../types';
import { usePageMeta } from '../components/usePageMeta';
import { PROJECT_EXTRAS, type CaseProps } from './projects/caseData';
import { CaseHero, MetricsRow, Reveal } from './projects/kit';
import { Chapter, ChapterHead, SceneChapter, dots } from './projects/chapters';
import { ProductBrief } from './projects/explainers';
import { BRIEFS } from './projects/briefs';
import { ChapterBar, HowItWorks, Glossary } from './projects/HowItWorks';
import { REPORTS } from './projects/tech/reports';
import PersonaCase from './projects/PersonaCase';
import JobAgentCase from './projects/JobAgentCase';
import AIEngineeringCase from './projects/AIEngineeringCase';
import PyQuestCase from './projects/PyQuestCase';
import VaaniScene from './projects/scenes/VaaniScene';
import SpiritScene from './projects/scenes/SpiritScene';
import CreditScene from './projects/scenes/CreditScene';
import JobScene from './projects/scenes/JobScene';
import BookScene from './projects/scenes/BookScene';
import PyQuestScene from './projects/scenes/PyQuestScene';
import SQLQuestScene from './projects/scenes/SQLQuestScene';

/* ═══════════════════════════════════════════════════════════════
   One page per project: the product story (01–02), how it is built
   (03–11), and what came of it (12–13), under one chapter bar.
   ═══════════════════════════════════════════════════════════════ */

/* 01: the animated walk-through of the product in use. */
const SCENES: Record<string, React.ComponentType<{ theme: ProjectTheme }>> = {
  'vaani-voice-banking-agent': VaaniScene,
  'ai-persona-interaction-platform': SpiritScene,
  'ai-credit-intelligence-platform': CreditScene,
  'automated-job-discovery-agent': JobScene,
  'ai-engineering-field-guide': BookScene,
  'pyquest-learn-python-by-writing-it': PyQuestScene,
  'sqlquest-learn-sql-on-real-postgres': SQLQuestScene,
};

/* 02: product-shape visuals under the brief, where a project has them.
   Anything about how it is built lives in chapters 03–11 instead. */
const PRODUCT_VISUALS: Record<string, React.ComponentType<CaseProps>> = {
  'ai-persona-interaction-platform': PersonaCase,
  'automated-job-discovery-agent': JobAgentCase,
  'ai-engineering-field-guide': AIEngineeringCase,
  'pyquest-learn-python-by-writing-it': PyQuestCase,
};

export default function ProjectDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.slug === slug);
  const extras = PROJECT_EXTRAS[slug];
  const report = REPORTS[slug];
  const Scene = SCENES[slug];
  const Visuals = PRODUCT_VISUALS[slug];
  const theme = getTheme(slug);

  // Old /how-it-works links land on #summary; follow the hash once the page is drawn.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
    else window.scrollTo(0, 0);
  }, [slug]);
  usePageMeta(project?.title.split(' — ')[0], `/project/${slug}`);

  if (!project || !extras || !report || !Scene) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-ink mb-4">Project not found</p>
          <Link to="/" className="text-ink-muted hover:text-ink text-sm transition-colors">&larr; Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const currentIdx = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">
      {/* Back nav */}
      <div className="pt-24 md:pt-32 pb-4 px-4 md:px-12 max-w-6xl mx-auto flex items-center justify-between gap-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors duration-200 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white group-hover:border-ink/20 transition-colors duration-200">
            <ArrowLeft size={13} weight="light" />
          </span>
          Back
        </button>
        <div className="flex items-center gap-4">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink-muted transition-colors">
              Live site <ArrowUpRight size={13} weight="light" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
              <GithubLogo size={14} weight="light" /> GitHub
            </a>
          )}
        </div>
      </div>

      <CaseHero project={project} theme={theme} glance={report.glance} />
      <ChapterBar theme={theme} />

      {/* 01 See it work */}
      <SceneChapter id="demo" theme={theme}>
        <Scene theme={theme} />
      </SceneChapter>

      {/* 02 The product */}
      <Chapter id="product" theme={theme} tint>
        <ChapterHead id="product" theme={theme} title="The product" />
        <ProductBrief brief={BRIEFS[slug]} discovery={extras.discovery} insight={extras.pmInsight} />
        {Visuals && <Visuals project={project} extras={extras} theme={theme} />}
      </Chapter>

      {/* 03–11 How it works */}
      <HowItWorks r={report} theme={theme} />

      {/* 12 Outcomes, then the reflection on them */}
      <Chapter id="outcomes" theme={theme}>
        <ChapterHead id="outcomes" theme={theme} />
        <div className="mt-10 md:mt-12">
          <MetricsRow metrics={extras.metrics} theme={theme} />
        </div>
        {project.reflection && (
          <Reveal className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-hairline">
            <h3 className="font-display font-normal text-2xl md:text-4xl text-ink tracking-tight mb-6">Reflection</h3>
            <p className="font-display font-normal text-ink/80 leading-relaxed tracking-tight max-w-2xl" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)' }}>{project.reflection}</p>
          </Reveal>
        )}
      </Chapter>

      {/* 13 Glossary + sources */}
      <Glossary r={report} theme={theme} />

      {/* Next project */}
      <section className="py-12 md:py-24 border-t border-hairline" style={dots(theme)}>
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6">Next Project</p>
          <Link to={`/project/${nextProject.slug}`} className="group flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display font-normal text-2xl md:text-5xl text-ink leading-tight tracking-tight group-hover:text-ink-muted group-hover:translate-x-2 transition-all duration-700 ease-spring">{nextProject.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{nextProject.date} &middot; {nextProject.metrics}</p>
            </div>
            <span className="flex-shrink-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-spring group-hover:translate-x-1 group-hover:-translate-y-px">
              <ArrowRight size={16} weight="light" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

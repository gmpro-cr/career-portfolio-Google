import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { PROJECTS, getTheme } from '../constants';
import { PROJECT_EXTRAS, type CaseProps } from './projects/caseData';
import PersonaCase from './projects/PersonaCase';
import CreditCase from './projects/CreditCase';
import JobAgentCase from './projects/JobAgentCase';
import AIEngineeringCase from './projects/AIEngineeringCase';

/* Each project gets its own bespoke case-study layout. */
const CASE_COMPONENTS: Record<string, React.ComponentType<CaseProps>> = {
  'ai-persona-interaction-platform': PersonaCase,
  'ai-credit-intelligence-platform': CreditCase,
  'automated-job-discovery-agent': JobAgentCase,
  'ai-engineering-field-guide': AIEngineeringCase,
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.slug === slug);
  const extras = slug ? PROJECT_EXTRAS[slug] : undefined;
  const CaseBody = slug ? CASE_COMPONENTS[slug] : undefined;
  const theme = getTheme(slug ?? '');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project || !extras || !CaseBody) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-ink mb-4">Project not found</p>
          <Link to="/" className="text-ink-muted hover:text-ink text-sm transition-colors">← Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const currentIdx = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">
      {/* ── Back nav ───────────────────────────────────────────── */}
      <div className="pt-20 md:pt-28 pb-4 px-4 md:px-12 max-w-6xl mx-auto flex items-center justify-between gap-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors duration-200 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white group-hover:border-ink/20 transition-colors duration-200">
            <ArrowLeft size={13} weight="light" />
          </span>
          Back
        </button>
        <div className="flex items-center gap-3">
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

      {/* ── Bespoke case study ─────────────────────────────────── */}
      <CaseBody project={project} extras={extras} theme={theme} />

      {/* ── Next project ───────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6">Next Project</p>
          <Link to={`/project/${nextProject.slug}`} className="group flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display font-light text-2xl md:text-5xl text-ink leading-tight tracking-tight group-hover:text-ink-muted transition-colors duration-500">{nextProject.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{nextProject.date} · {nextProject.metrics}</p>
            </div>
            <span className="flex-shrink-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px">
              <ArrowRight size={16} weight="light" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

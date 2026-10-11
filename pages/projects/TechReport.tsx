import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CaretRight } from '@phosphor-icons/react';
import { PROJECTS, getTheme } from '../../constants';
import { usePageMeta } from '../../components/usePageMeta';
import type { ProjectTheme } from '../../types';
import { Reveal } from './kit';
import { Flowchart, Sequence, Swimlane } from './diagrams';
import { SystemMap, ChainScene } from './tech/SystemMap';
import { REPORTS } from './tech/reports';
import type { Diagram, TechReportData } from './tech/types';

/* ═══════════════════════════════════════════════════════════════
   TECHNICAL REPORT — /project/:slug/how-it-works
   One template for all seven products, so the same question always
   sits in the same place: which models, what talks to what, what
   happens on one request, what goes wrong, how it is tested, what it
   costs. Plain English first; engineering detail one click away.
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  ['summary', 'In one minute'],
  ['models', 'The AI models'],
  ['system', 'The system'],
  ['request', 'Step by step'],
  ['mechanisms', 'How the key parts work'],
  ['failures', 'When things go wrong'],
  ['testing', 'How it is tested'],
  ['hosting', 'Hosting and cost'],
  ['limits', 'Known limits'],
  ['glossary', 'Glossary'],
] as const;

const WHEN_LABEL: Record<string, string> = {
  'every request': 'Every request',
  fallback: 'Fallback',
  background: 'In the background',
  'development only': 'Development only',
  'on demand': 'On demand',
};

function H2({ id, n, children }: { id: string; n: number; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 id={id} className="scroll-mt-28 font-display font-light text-3xl md:text-4xl text-ink tracking-tight">
        <span className="mr-3 text-base md:text-lg text-ink-muted tabular align-middle">{String(n).padStart(2, '0')}</span>
        {children}
      </h2>
    </Reveal>
  );
}

function Section({ children, tint, theme }: { children: React.ReactNode; tint?: boolean; theme: ProjectTheme }) {
  return (
    <section className="py-12 md:py-20 border-t border-hairline" style={tint ? { background: `${theme.accentBg}55` } : undefined}>
      <div className="max-w-6xl mx-auto px-4 md:px-12">{children}</div>
    </section>
  );
}

function DiagramView({ d, theme }: { d: Diagram; theme: ProjectTheme }) {
  if (d.kind === 'flow') return <Flowchart nodes={d.nodes} theme={theme} />;
  if (d.kind === 'sequence') return <Sequence actors={d.actors} messages={d.messages} theme={theme} />;
  return <Swimlane lanes={d.lanes} handoff={d.handoff} theme={theme} />;
}

function ReportBody({ r, theme }: { r: TechReportData; theme: ProjectTheme }) {
  return (
    <>
      {/* 01 Summary */}
      <Section theme={theme}>
        <H2 id="summary" n={1}>In one minute</H2>
        <div className="mt-6 max-w-2xl space-y-4">
          {r.summary.map((p, i) => <React.Fragment key={i}><Reveal delay={i * 0.05}><p className="text-base md:text-lg leading-relaxed text-ink/85">{p}</p></Reveal></React.Fragment>)}
        </div>
      </Section>

      {/* 02 Models */}
      <Section theme={theme} tint>
        <H2 id="models" n={2}>The AI models</H2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">{r.models.intro}</p>
        {r.models.none && (
          <div className="mt-8 max-w-2xl rounded-2xl border border-hairline bg-white p-5 md:p-6">
            <p className="text-sm font-semibold text-ink">No AI model runs when you use it</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{r.models.none}</p>
          </div>
        )}
        {r.models.uses.length > 0 && (
          <div className="mt-8 rounded-2xl border border-hairline bg-white overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.1fr_1.5fr_1.5fr] gap-6 px-6 py-3 border-b border-hairline bg-shell/60 text-xs font-medium text-ink-muted">
              <span>Model</span><span>What it does here</span><span>Why this one</span>
            </div>
            <ul>
              {r.models.uses.map((m, i) => (
                <li key={i} className="grid md:grid-cols-[1.1fr_1.5fr_1.5fr] gap-2 md:gap-6 px-5 md:px-6 py-5 border-b border-hairline last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-ink">{m.name}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{m.provider}</p>
                    <span className="mt-2 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium" style={{ borderColor: `${theme.accent}55`, color: theme.accentDark, background: theme.accentBg }}>{WHEN_LABEL[m.when]}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/85"><span className="md:hidden text-xs text-ink-muted block mb-0.5">What it does here</span>{m.job}</p>
                  <p className="text-sm leading-relaxed text-ink/70"><span className="md:hidden text-xs text-ink-muted block mb-0.5">Why this one</span>{m.why}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
      {r.models.chains?.map((c, i) => <React.Fragment key={i}><ChainScene chain={c} theme={theme} /></React.Fragment>)}

      {/* 03 System map */}
      <div id="system" className="scroll-mt-28" />
      <SystemMap number={3} intro={r.map.intro} nodes={r.map.nodes} hops={r.map.hops} theme={theme} />

      {/* 04 Request, step by step */}
      <Section theme={theme}>
        <H2 id="request" n={4}>{r.request.title}</H2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">{r.request.intro}</p>
        <ol className="mt-10 max-w-3xl">
          {r.request.steps.map((s, i) => (
            <React.Fragment key={i}><Reveal delay={Math.min(i, 6) * 0.04}>
              <li className="relative grid grid-cols-[2.25rem_1fr] gap-4 pb-8 last:pb-0">
                {i < r.request.steps.length - 1 && <span className="absolute left-[1.06rem] top-9 bottom-0 w-px bg-hairline" aria-hidden />}
                <span className="h-9 w-9 rounded-full border grid place-items-center text-sm font-medium tabular" style={{ borderColor: `${theme.accent}66`, color: theme.accentDark, background: theme.accentBg }}>{i + 1}</span>
                <div className="pt-1.5">
                  <p className="text-base font-semibold text-ink">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{s.plain}</p>
                  {s.detail && (
                    <details className="group mt-2.5">
                      <summary className="list-none cursor-pointer inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink transition-colors [&::-webkit-details-marker]:hidden">
                        <CaretRight size={11} className="details-caret transition-transform duration-200" aria-hidden />
                        For engineers
                      </summary>
                      <p className="mt-2 rounded-lg border border-hairline bg-shell px-3.5 py-3 text-sm leading-relaxed text-ink/80">{s.detail}</p>
                    </details>
                  )}
                </div>
              </li>
            </Reveal></React.Fragment>
          ))}
        </ol>
      </Section>

      {/* 05 Mechanisms */}
      <Section theme={theme} tint>
        <H2 id="mechanisms" n={5}>How the key parts work</H2>
        <div className="mt-10 space-y-14 md:space-y-20">
          {r.mechanisms.map((m, i) => (
            <div key={i} className={m.diagram ? 'grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-14 items-start' : 'max-w-2xl'}>
              <Reveal>
                <h3 className="font-display text-2xl text-ink tracking-tight">{m.title}</h3>
                <div className="mt-4 space-y-3">
                  {m.body.map((p, j) => <p key={j} className="text-sm md:text-base leading-relaxed text-ink/80">{p}</p>)}
                </div>
              </Reveal>
              {m.diagram && <div className="min-w-0"><DiagramView d={m.diagram} theme={theme} /></div>}
            </div>
          ))}
        </div>
      </Section>

      {/* 06 Failures */}
      <Section theme={theme}>
        <H2 id="failures" n={6}>When things go wrong</H2>
        <dl className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-7">
          {r.failures.map((f, i) => (
            <React.Fragment key={i}><Reveal delay={(i % 2) * 0.05}>
              <div className="border-t border-ink/15 pt-4">
                <dt className="text-sm font-semibold text-ink">{f.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">{f.body}</dd>
              </div>
            </Reveal></React.Fragment>
          ))}
        </dl>
      </Section>

      {/* 07 Testing */}
      <Section theme={theme} tint>
        <H2 id="testing" n={7}>How it is tested</H2>
        <dl className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-7">
          {r.testing.map((f, i) => (
            <React.Fragment key={i}><Reveal delay={(i % 2) * 0.05}>
              <div className="border-t border-ink/15 pt-4">
                <dt className="text-sm font-semibold text-ink">{f.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">{f.body}</dd>
              </div>
            </Reveal></React.Fragment>
          ))}
        </dl>
      </Section>

      {/* 08 Hosting */}
      <Section theme={theme}>
        <H2 id="hosting" n={8}>Hosting and cost</H2>
        <dl className="mt-8 max-w-3xl">
          {r.hosting.map((h, i) => (
            <div key={i} className="grid sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6 py-3.5 border-b border-hairline first:border-t">
              <dt className="text-sm font-medium text-ink-muted">{h.label}</dt>
              <dd className="text-sm leading-relaxed text-ink">{h.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 09 Limits */}
      <Section theme={theme} tint>
        <H2 id="limits" n={9}>Known limits</H2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">What this does not do yet, stated plainly.</p>
        <ul className="mt-6 max-w-2xl space-y-3">
          {r.limits.map((l, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/80">
              <span className="flex-shrink-0 mt-2.5 block w-3 h-px bg-ink-muted/60" aria-hidden />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 10 Glossary */}
      <Section theme={theme}>
        <H2 id="glossary" n={10}>Glossary</H2>
        <dl className="mt-8 grid md:grid-cols-2 gap-x-12">
          {r.glossary.map((g, i) => (
            <div key={i} className="py-3.5 border-b border-hairline">
              <dt className="text-sm font-semibold text-ink">{g.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink/75">{g.def}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-muted">Sources: {r.sources}</p>
      </Section>
    </>
  );
}

export default function TechReport() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);
  const report = slug ? REPORTS[slug] : undefined;
  const theme = getTheme(slug ?? '');
  const name = project?.title.split(' — ')[0];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  usePageMeta(name ? `How ${name} works` : undefined, `/project/${slug ?? ''}/how-it-works`);

  if (!project || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-ink mb-4">Report not found</p>
          <Link to="/" className="text-ink-muted hover:text-ink text-sm transition-colors">&larr; Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const idx = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">
      <div className="pt-24 md:pt-32 pb-4 px-4 md:px-12 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors duration-200 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white group-hover:border-ink/20 transition-colors duration-200">
            <ArrowLeft size={13} weight="light" />
          </span>
          Case study
        </Link>
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink-muted transition-colors">
            Live site <ArrowUpRight size={13} weight="light" />
          </a>
        )}
      </div>

      {/* Header */}
      <section className="pt-4 pb-12 md:pb-16" style={{ background: `linear-gradient(180deg, ${theme.accentBg} 0%, transparent 70%)` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-12" style={{ opacity: 0, animation: 'fadeUp 0.7s cubic-bezier(0.32, 0.72, 0, 1) 0.05s forwards' }}>
          <p className="text-sm text-ink-muted">Technical report</p>
          <h1 className="mt-3 font-display font-light leading-[0.98] tracking-tight text-ink" style={{ fontSize: 'clamp(2.3rem, 5.2vw, 4.4rem)' }}>How {name} works</h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ink/75">
            Written so you can follow it without an engineering background. Wherever you see <span className="font-medium text-ink">For engineers</span>, the exact detail is one click away.
          </p>

          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            {report.glance.map((g, i) => (
              <div key={i} className="border-t border-ink/20 pt-3">
                <dt className="text-xs text-ink-muted">{g.label}</dt>
                <dd className="mt-1.5 text-sm font-medium leading-snug text-ink">{g.value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="On this page" className="mt-10">
            <p className="text-xs text-ink-muted mb-2">On this page</p>
            <ol className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {SECTIONS.map(([id, label], i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    className="text-ink/80 underline decoration-hairline underline-offset-4 hover:decoration-ink hover:text-ink transition-colors"
                  >
                    <span className="text-ink-muted tabular mr-1">{String(i + 1).padStart(2, '0')}</span>{label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <ReportBody r={report} theme={theme} />

      <section className="py-12 md:py-24 bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <p className="text-sm text-ink-muted mb-6">Next technical report</p>
          <Link to={`/project/${nextProject.slug}/how-it-works`} className="group flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display font-light text-2xl md:text-5xl text-ink leading-tight tracking-tight group-hover:text-ink-muted group-hover:translate-x-2 transition-all duration-700 ease-spring">How {nextProject.title.split(' — ')[0]} works</h3>
            </div>
            <span className="flex-shrink-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-spring group-hover:translate-x-1">
              <ArrowRight size={16} weight="light" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

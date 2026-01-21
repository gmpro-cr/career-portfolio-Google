import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Lightbulb, FileText } from 'lucide-react';

type Tab = 'builds' | 'case-studies';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>('builds');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const builds = PROJECTS.filter(p => p.category === 'build');
  const caseStudies = PROJECTS.filter(p => p.category === 'case-study');
  const displayedProjects = activeTab === 'builds' ? builds : caseStudies;

  return (
    <div>
      <section className="bg-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-charcoal">Projects & Case Studies</h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Products I've built and problems I've analyzed.
          </p>
        </div>
      </section>

      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('builds')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'builds'
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-muted hover:text-charcoal'
              }`}
            >
              <span className="flex items-center gap-2">
                <Lightbulb size={18} />
                Builds ({builds.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('case-studies')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'case-studies'
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-muted hover:text-charcoal'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText size={18} />
                Case Studies ({caseStudies.length})
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {displayedProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="bg-warm-cream rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer group"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  {activeTab === 'builds' ? (
                    <Lightbulb size={48} className="text-gray-300" />
                  ) : (
                    <FileText size={48} className="text-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-charcoal font-medium transition-opacity">
                      View Details →
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-serif text-charcoal">{project.title}</h3>
                      <p className="text-sm text-muted">{project.date}</p>
                    </div>
                    <span className="flex-shrink-0 bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                      {project.metrics}
                    </span>
                  </div>
                  <p className="mt-3 text-muted line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs bg-warm-white text-gray-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs text-muted">+{project.tech.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-warm-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif text-charcoal">{selectedProject.title}</h2>
                  <p className="text-muted mt-1">{selectedProject.date}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted hover:text-charcoal text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mt-4">
                <span className="bg-terracotta/10 text-terracotta px-4 py-2 rounded-full font-medium">
                  {selectedProject.metrics}
                </span>
              </div>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark"
                >
                  <ExternalLink size={16} />
                  View Live Project
                </a>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-charcoal">The Problem</h3>
                <p className="mt-2 text-muted">{selectedProject.problem}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Approach</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.approach.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-olive">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Key Insights</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.keyInsights.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-terracotta">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal">Outcomes</h3>
                <ul className="mt-2 space-y-2">
                  {selectedProject.outcomes.map((item, i) => (
                    <li key={i} className="text-muted flex gap-2">
                      <span className="text-olive">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Tech Stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.frameworks && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Frameworks Used</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.frameworks.map((fw, i) => (
                      <span key={i} className="bg-olive/10 text-olive px-3 py-1 rounded-full text-sm">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

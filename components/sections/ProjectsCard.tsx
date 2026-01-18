import React, { useState } from 'react';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import ProjectDetailModal from '../ProjectDetailModal';
import { ArrowUpRight, BarChart3, Layers } from 'lucide-react';

const ProjectsCard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="w-full h-full p-3 md:p-6 flex flex-col">
        <div className="flex justify-between items-end mb-4 md:mb-6 px-2">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-canvas-text tracking-tight">Project Gallery</h1>
            <p className="text-canvas-muted">Selected deployments and case studies.</p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-3xl font-bold text-canvas-accent">{PROJECTS.length}</div>
            <div className="text-[10px] font-mono text-gray-400">CASE STUDIES</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {PROJECTS.map((proj, idx) => {
            const isCaseStudy = proj.category === 'case-study';

            return (
              <div
                key={idx}
                onClick={() => setSelectedProject(proj)}
                className={`
                  glass-panel p-6 rounded-3xl shadow-glass flex flex-col group 
                  hover:shadow-elevated transition-all duration-300 hover:-translate-y-1
                  cursor-pointer relative overflow-hidden
                  ${isCaseStudy
                    ? 'bg-gradient-to-br from-white to-purple-50 hover:to-purple-100'
                    : 'bg-gradient-to-br from-white to-blue-50 hover:to-blue-100'
                  }
                `}
              >
                {/* Category Icon */}
                <div className={`absolute top-4 right-4 p-2 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity ${isCaseStudy ? 'bg-purple-200' : 'bg-blue-200'
                  }`}>
                  {isCaseStudy ? <BarChart3 className="w-8 h-8" /> : <Layers className="w-8 h-8" />}
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm ${isCaseStudy
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                      {isCaseStudy ? 'Case Study' : 'Build'}
                    </span>
                    <span className={`px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500 shadow-sm`}>
                      {proj.metrics || "BUILD"}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{proj.date}</span>
                </div>

                <h2 className="font-bold text-xl text-canvas-text mb-3 pr-8">
                  {proj.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {proj.description}
                </p>

                {/* Key Insight Preview */}
                {proj.keyInsights && proj.keyInsights.length > 0 && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <p className="text-xs text-yellow-800 font-medium line-clamp-2">
                      💡 {proj.keyInsights[0]}
                    </p>
                  </div>
                )}

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className="px-2 py-1 text-[10px] text-gray-400">+{proj.tech.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      {proj.approach && <span>• {proj.approach.length} steps</span>}
                      {proj.frameworks && <span>• {proj.frameworks.length} frameworks</span>}
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform ${isCaseStudy ? 'text-purple-600' : 'text-blue-600'
                      }`}>
                      View Details <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectsCard;
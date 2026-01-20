import React, { useState } from 'react';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import ProjectDetailModal from '../ProjectDetailModal';
import { ArrowUpRight } from 'lucide-react';
import { ProjectTab } from '../../App';

interface ProjectsCardProps {
  activeTab: ProjectTab;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ activeTab }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = PROJECTS.filter(p => p.category !== 'case-study');
  const caseStudies = PROJECTS.filter(p => p.category === 'case-study');
  const displayedItems = activeTab === 'projects' ? projects : caseStudies;

  return (
    <>
      <div className="w-full h-full p-3 md:p-6 flex flex-col">
        {/* Header */}
        <div className="mb-4 md:mb-6 px-2">
          <h1 className="text-2xl md:text-3xl font-bold text-canvas-text">
            {activeTab === 'projects' ? 'Projects' : 'Case Studies'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === 'projects'
              ? 'Technical builds and implementations'
              : 'Product analysis and strategic thinking'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 pb-28 md:pb-12">
          {displayedItems.map((proj, idx) => {
            const isCaseStudy = proj.category === 'case-study';

            return (
              <div
                key={idx}
                onClick={() => setSelectedProject(proj)}
                className={`
                  glass-panel p-5 rounded-2xl shadow-sm flex flex-col group
                  hover:shadow-md transition-all duration-200 cursor-pointer
                  ${isCaseStudy ? 'bg-white border border-purple-100' : 'bg-white border border-gray-100'}
                `}
              >
                {/* Title and Date Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-semibold text-lg text-canvas-text leading-tight">
                    {proj.title}
                  </h2>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{proj.date}</span>
                </div>

                {/* Summary */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {proj.description}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.slice(0, 2).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-500">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 2 && (
                      <span className="text-[10px] text-gray-400">+{proj.tech.length - 2}</span>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium group-hover:translate-x-0.5 transition-transform ${
                    isCaseStudy ? 'text-purple-600' : 'text-blue-600'
                  }`}>
                    View <ArrowUpRight className="w-3 h-3" />
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
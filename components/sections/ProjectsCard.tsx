import React from 'react';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';

const ProjectsCard: React.FC = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="flex justify-between items-end mb-6 px-2">
        <div>
          <h1 className="text-4xl font-black text-canvas-text tracking-tight">Project Gallery</h1>
          <p className="text-canvas-muted">Selected deployments and experiments.</p>
        </div>
        <div className="text-right hidden md:block">
           <div className="text-3xl font-bold text-canvas-accent">{PROJECTS.length}</div>
           <div className="text-[10px] font-mono text-gray-400">TOTAL SHIPPED</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {PROJECTS.map((proj, idx) => (
          <div 
            key={idx} 
            className={`
              glass-panel p-6 rounded-3xl shadow-glass flex flex-col group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1
              ${idx === 0 ? 'md:col-span-2 bg-gradient-to-br from-white to-blue-50' : 'bg-white'}
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wider shadow-sm">
                {proj.metrics || "BUILD"}
              </span>
              <span className="text-xs font-mono text-gray-400">{proj.date}</span>
            </div>

            <h2 className={`font-bold text-canvas-text mb-3 ${idx === 0 ? 'text-3xl' : 'text-xl'}`}>
              {proj.title}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
              {proj.description}
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.slice(0, 4).map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                    {t}
                  </span>
                ))}
                {proj.tech.length > 4 && <span className="px-2 py-1 text-[10px] text-gray-400">+{proj.tech.length - 4}</span>}
              </div>

              {proj.link && (
                <a href={proj.link} className="w-full block text-center py-2 rounded-xl bg-canvas-text text-white font-bold text-xs hover:bg-canvas-accent transition-colors">
                  View Deployment
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Fake "Coming Soon" Project to fill grid */}
        <div className="glass-panel p-6 rounded-3xl shadow-glass border-dashed border-2 border-gray-300 flex flex-col items-center justify-center opacity-70 min-h-[300px]">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-4 animate-pulse">
             🚧
           </div>
           <h3 className="font-bold text-gray-500">Work in Progress</h3>
           <p className="text-xs text-gray-400 text-center mt-2 max-w-[150px]">
             Currently experimenting with Agentic workflows on localized LLMs.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
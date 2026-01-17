import React from 'react';
import { PROJECTS } from '../../constants';

const ProjectsSection: React.FC = () => {
  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {PROJECTS.map((proj, idx) => (
          <div key={idx} className="hud-border bg-hud-glass p-6 group hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-4 border-b border-hud-primary/20 pb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-hud-primary transition-colors">
                {proj.title}
              </h3>
              <span className="text-[10px] font-mono text-hud-primary border border-hud-primary px-1">
                {proj.metrics || "CLASSIFIED"}
              </span>
            </div>
            
            <p className="text-sm text-white/70 mb-6 flex-grow font-mono leading-relaxed">
              {proj.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-1 bg-hud-primary/10 text-hud-primary border border-hud-primary/20">
                    {t}
                  </span>
                ))}
              </div>
              
              {proj.link && (
                <a href={proj.link} className="block w-full text-center py-2 bg-hud-primary text-hud-black font-bold font-mono text-xs hover:bg-white transition-colors">
                  INITIATE_PROTOCOL ↗
                </a>
              )}
            </div>
          </div>
        ))}
        
        {/* Placeholder Card */}
        <div className="border border-dashed border-hud-primary/30 p-6 flex items-center justify-center opacity-50">
          <div className="text-center font-mono text-xs text-hud-primary">
            [ AWAITING NEW DIRECTIVES ]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
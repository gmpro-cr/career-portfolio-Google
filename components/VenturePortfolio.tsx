import React from 'react';
import { PROJECTS } from '../constants';

const VenturePortfolio: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-terminal-bg">
       <div className="p-4 border-b border-terminal-border bg-terminal-surface flex justify-between items-center">
        <h3 className="font-mono font-bold text-terminal-text uppercase tracking-widest text-sm">
          Venture Bets (Projects)
        </h3>
         <span className="text-xs font-mono text-terminal-muted">HIGH GROWTH</span>
      </div>
      
      <div className="p-6 grid gap-6 grid-cols-1 overflow-y-auto">
        {PROJECTS.map((proj, idx) => (
          <div key={idx} className="relative group p-6 border border-terminal-border bg-terminal-bg hover:border-terminal-secondary transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
             <div className="absolute top-0 right-0 p-3 opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono border border-terminal-secondary text-terminal-secondary px-2 py-1 rounded bg-terminal-secondary/10">
                   {proj.metrics}
                </span>
             </div>
             
             <div className="flex flex-col gap-1 mb-4">
                <h4 className="text-xl font-bold text-white group-hover:text-terminal-secondary transition-colors">
                  {proj.title}
                </h4>
                <span className="text-xs font-mono text-terminal-muted">{proj.date}</span>
             </div>
             
             <p className="text-sm text-terminal-text mb-6 leading-relaxed border-l-2 border-terminal-border pl-4">
               {proj.description}
             </p>
             
             <div className="flex flex-wrap gap-2 mb-4">
               {proj.tech.map((t, i) => (
                 <span key={i} className="text-xs font-mono px-2 py-1 bg-terminal-surface text-terminal-muted rounded border border-terminal-border group-hover:border-terminal-secondary/50 group-hover:text-terminal-text transition-colors">
                   {t}
                 </span>
               ))}
             </div>

             {proj.link && (
               <a href={proj.link} className="inline-flex items-center gap-2 mt-2 text-xs font-mono text-terminal-accent hover:text-emerald-400 uppercase tracking-wider font-bold">
                 <span>VIEW_SOURCE_CODE</span>
                 <span>↗</span>
               </a>
             )}
          </div>
        ))}
        
        {/* Placeholder for "Upcoming" to fill space if needed */}
        <div className="p-6 border border-terminal-border border-dashed flex items-center justify-center text-terminal-muted/50 font-mono text-xs">
          [ WAITING FOR NEXT VENTURE... ]
        </div>
      </div>
    </div>
  );
};

export default VenturePortfolio;
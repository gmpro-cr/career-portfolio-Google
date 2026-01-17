import React from 'react';
import { EXPERIENCES } from '../../constants';

const ExperienceSection: React.FC = () => {
  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="hud-border bg-hud-glass min-h-full p-6 relative">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hud-primary to-transparent opacity-50"></div>
         <h2 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-3">
           <span className="text-hud-primary">>></span> MISSION LOG
         </h2>

         <div className="relative border-l border-hud-primary/20 ml-3 space-y-8 pl-8 py-2">
           {EXPERIENCES.map((exp, idx) => (
             <div key={idx} className="relative group">
               {/* Timeline Node */}
               <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-hud-black border-2 border-hud-primary group-hover:bg-hud-primary transition-colors shadow-[0_0_10px_#00f3ff]"></div>
               
               <div className="bg-hud-dark/50 border border-hud-primary/10 p-4 hover:border-hud-primary/50 transition-all hover:bg-hud-primary/5">
                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                   <div>
                     <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                     <div className="text-hud-secondary font-mono text-sm tracking-wider">{exp.company}</div>
                   </div>
                   <div className="font-mono text-xs text-hud-primary/60 bg-hud-primary/10 px-2 py-1 rounded mt-2 md:mt-0 inline-block">
                     {exp.period}
                   </div>
                 </div>
                 
                 <div className="space-y-2 mt-4">
                   {exp.description.map((desc, i) => (
                     <div key={i} className="flex gap-2 text-sm text-white/80 font-sans">
                       <span className="text-hud-primary opacity-50">></span>
                       {desc}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
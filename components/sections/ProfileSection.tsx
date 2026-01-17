import React from 'react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../../constants';

const ProfileSection: React.FC = () => {
  return (
    <div className="h-full flex flex-col md:flex-row gap-6 p-4 overflow-y-auto">
      {/* Main Identity Card */}
      <div className="flex-1 hud-border bg-hud-glass p-6 cut-corner relative">
        <div className="absolute top-2 right-2 text-[10px] font-mono text-hud-primary/50">ID: GMHL-001</div>
        
        <div className="flex flex-col items-center md:items-start border-b border-hud-primary/20 pb-6 mb-6">
          <div className="w-24 h-24 border-2 border-hud-primary rounded-full flex items-center justify-center bg-hud-primary/10 mb-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-hud-primary/20 animate-pulse"></div>
            <span className="text-3xl font-mono z-10">GM</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-1">
            Gaurav Mahale
          </h1>
          <div className="text-hud-primary font-mono text-sm tracking-widest mb-4">
            AI PRODUCT MANAGER // CREDIT RISK SPECIALIST
          </div>
          <p className="text-white/70 max-w-xl leading-relaxed">
            Merging deep financial domain expertise with cutting-edge LLM operations. 
            Currently deployed at <span className="text-hud-primary">Pareto.AI</span> training next-gen financial models.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
           <div>
             <div className="text-hud-primary/50 mb-1">LOCATION</div>
             <div className="text-white">PUNE, INDIA</div>
           </div>
           <div>
             <div className="text-hud-primary/50 mb-1">EXP LEVEL</div>
             <div className="text-white">LVL 8 (8+ YEARS)</div>
           </div>
           <div>
             <div className="text-hud-primary/50 mb-1">STATUS</div>
             <div className="text-hud-primary animate-pulse">ONLINE / AVAILABLE</div>
           </div>
           <div>
             <div className="text-hud-primary/50 mb-1">CONTACT</div>
             <a href="mailto:mahalegauravk@gmail.com" className="text-white hover:bg-hud-primary hover:text-black transition-colors px-1">
               SEND_TRANSMISSION
             </a>
           </div>
        </div>
      </div>

      {/* Sidebar: Education & Certs */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="hud-border bg-hud-dark/80 p-4">
          <h3 className="font-mono text-hud-primary text-sm border-b border-hud-primary/30 pb-2 mb-3">
            [ DATA_BANK: EDUCATION ]
          </h3>
          <div className="space-y-4">
            {EDUCATION_DATA.map(edu => (
              <div key={edu.id}>
                <div className="text-white font-bold text-sm">{edu.institution}</div>
                <div className="text-xs text-hud-primary/70">{edu.degree}</div>
                <div className="text-[10px] text-white/40 font-mono">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hud-border bg-hud-dark/80 p-4 flex-grow">
          <h3 className="font-mono text-hud-primary text-sm border-b border-hud-primary/30 pb-2 mb-3">
            [ DATA_BANK: CERTS ]
          </h3>
          <div className="space-y-4">
            {CERTIFICATIONS_DATA.map(cert => (
              <div key={cert.id} className="flex items-center gap-3">
                <div className="w-1 h-full bg-hud-primary/50"></div>
                <div>
                  <div className="text-white text-sm leading-tight">{cert.name}</div>
                  <div className="text-[10px] text-hud-primary/70 font-mono">{cert.issuer} // {cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
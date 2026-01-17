import React from 'react';

const AcquisitionFooter: React.FC = () => {
  return (
    <div className="border-t border-terminal-border bg-terminal-surface p-8 md:p-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-3 py-1 bg-terminal-accent/10 text-terminal-accent font-mono text-xs rounded border border-terminal-accent/20 mb-6">
          STATUS: OPEN FOR ACQUISITION
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Ready to Execute Trade?
        </h2>
        
        <p className="text-terminal-muted text-lg max-w-2xl mx-auto mb-10">
          Looking to integrate high-performance AI Product Management into your portfolio? 
          Initiate a connection to discuss acquisition terms.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a 
            href="mailto:mahalegauravk@gmail.com"
            className="px-8 py-4 bg-terminal-accent text-terminal-bg font-bold font-mono text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
          >
            <span>[ EMAIL_BROKER ]</span>
          </a>
           <a 
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-terminal-border text-white font-bold font-mono text-sm hover:bg-terminal-border transition-all flex items-center justify-center gap-2"
          >
            <span>[ LINKEDIN_PROFILE ]</span>
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-terminal-border/50 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-terminal-muted">
           <div>
             TERMINAL ID: GMHL-8821
           </div>
           <div className="mt-2 md:mt-0">
             ENCRYPTED CONNECTION // PUNE, INDIA
           </div>
        </div>
      </div>
    </div>
  );
};

export default AcquisitionFooter;
import React from 'react';
import { Section } from '../types';

interface MarketSummaryProps {
  onNavigate: (section: Section) => void;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 md:p-10 border-b border-terminal-border bg-gradient-to-br from-terminal-bg to-terminal-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-terminal-accent/20 text-terminal-accent text-xs font-mono font-bold tracking-wider">
              TICKER: GMHL
            </span>
            <span className="px-2 py-0.5 rounded bg-terminal-secondary/20 text-terminal-secondary text-xs font-mono font-bold tracking-wider">
              AI + FINANCE
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2">
            GAURAV MAHALE
          </h1>
          <p className="text-terminal-muted max-w-xl text-lg">
            AI Product Manager specializing in <span className="text-white font-semibold">Credit Risk & Lending</span>. 
            Merging domain expertise with LLM development to generate high-alpha returns.
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate(Section.ANALYST)}
            className="group relative px-6 py-3 bg-terminal-accent text-terminal-bg font-bold font-mono text-sm hover:bg-emerald-400 transition-all active:scale-95"
          >
            <span className="absolute inset-0 border-2 border-white/20 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
            ASK ANALYST AI
          </button>
          <a 
            href="mailto:mahalegauravk@gmail.com"
            className="px-6 py-3 border border-terminal-border text-terminal-text font-mono text-sm hover:bg-terminal-border transition-colors flex items-center"
          >
            ACQUIRE ASSET
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <div className="p-4 bg-terminal-bg border border-terminal-border">
          <div className="text-terminal-muted text-xs font-mono mb-1">CURRENT ROLE</div>
          <div className="text-white font-bold">AI Trainer @ Pareto.AI</div>
        </div>
        <div className="p-4 bg-terminal-bg border border-terminal-border">
          <div className="text-terminal-muted text-xs font-mono mb-1">TOTAL EXP</div>
          <div className="text-terminal-accent font-bold font-mono">8+ YEARS</div>
        </div>
        <div className="p-4 bg-terminal-bg border border-terminal-border">
          <div className="text-terminal-muted text-xs font-mono mb-1">EDUCATION</div>
          <div className="text-white font-bold">PGPM (IIM Sirmaur)</div>
        </div>
        <div className="p-4 bg-terminal-bg border border-terminal-border">
          <div className="text-terminal-muted text-xs font-mono mb-1">DOMAIN</div>
          <div className="text-white font-bold">Fintech / Banking</div>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
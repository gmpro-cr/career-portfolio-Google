import React from 'react';
import { TECH_STACK } from '../constants';

const MarketWatch: React.FC = () => {
  return (
    <div className="border-b border-terminal-border bg-terminal-surface/30">
      <div className="p-4 border-b border-terminal-border bg-terminal-surface">
        <h3 className="font-mono font-bold text-terminal-text uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-terminal-secondary rounded-full animate-pulse"></span>
          Market Watch (Technical Indicators)
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 divide-x divide-y md:divide-y-0 divide-terminal-border">
        {TECH_STACK.map((item) => (
          <div key={item.id} className="p-4 hover:bg-terminal-surface transition-colors group cursor-default">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-terminal-muted">{item.id}</span>
              <span className="font-mono text-[10px] text-terminal-accent bg-terminal-accent/10 px-1 rounded">{item.change}</span>
            </div>
            <div className="font-bold text-white text-sm truncate group-hover:text-terminal-secondary transition-colors">
              {item.name}
            </div>
            <div className="text-xs text-terminal-muted font-mono mt-1">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketWatch;
import React from 'react';
import { EXPERIENCES } from '../constants';

const HistoricalPerformance: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-terminal-bg">
      <div className="p-4 border-b border-terminal-border bg-terminal-surface flex justify-between items-center">
        <h3 className="font-mono font-bold text-terminal-text uppercase tracking-widest text-sm">
          Historical Ledger (Experience)
        </h3>
        <span className="text-xs font-mono text-terminal-muted">FY 2017-2025</span>
      </div>
      
      <div className="flex-grow overflow-y-auto p-0 scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead className="bg-terminal-surface sticky top-0 font-mono text-xs text-terminal-muted z-10 shadow-md">
            <tr>
              <th className="p-4 border-b border-terminal-border font-normal">PERIOD</th>
              <th className="p-4 border-b border-terminal-border font-normal">ENTITY / ROLE</th>
              <th className="p-4 border-b border-terminal-border font-normal hidden md:table-cell">IMPACT & DIVIDENDS</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {EXPERIENCES.map((exp, idx) => (
              <tr key={idx} className="hover:bg-terminal-surface/50 group transition-colors align-top border-b border-terminal-border/50 last:border-0">
                <td className="p-4 text-terminal-muted w-32 whitespace-nowrap align-top">
                  <div className="inline-block py-1 px-2 bg-terminal-surface rounded text-xs border border-terminal-border">
                    {exp.period}
                  </div>
                </td>
                <td className="p-4 align-top">
                  <div className="font-bold text-white text-base group-hover:text-terminal-accent transition-colors mb-1">
                    {exp.role}
                  </div>
                  <div className="text-xs text-terminal-secondary mb-3 uppercase tracking-wider">{exp.company}</div>
                  
                  {/* Mobile only description */}
                  <div className="mt-2 flex md:hidden flex-col gap-2">
                     {exp.description.map((desc, i) => (
                      <div key={i} className="text-xs text-terminal-text/80 pl-2 border-l-2 border-terminal-border">
                        {desc}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-terminal-text/80 text-sm align-top">
                  <ul className="list-none space-y-3">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 text-terminal-accent mt-1">▹</span>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalPerformance;
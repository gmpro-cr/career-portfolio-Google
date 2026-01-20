import React, { useState } from 'react';
import { EXPERIENCES } from '../../constants';
import { Experience } from '../../types';

const TimelineCard: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experience>(EXPERIENCES[0]);

  return (
    <div className="w-full h-full p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6 overflow-y-auto md:overflow-hidden bg-transparent pb-28 md:pb-6">

      {/* Left Pane: The List */}
      <div className="w-full md:w-1/3 glass-panel rounded-3xl shadow-glass p-2 flex flex-col h-[280px] md:h-full shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-canvas-text">
            Work Experience
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {EXPERIENCES.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExp(exp)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${selectedExp === exp
                ? 'bg-white border-canvas-accent shadow-md'
                : 'bg-transparent border-transparent hover:bg-white/50 text-gray-500'
                }`}
            >
              <div className="text-[10px] font-mono mb-1 uppercase tracking-wider opacity-60">{exp.period}</div>
              <div className="font-bold text-sm text-canvas-text">{exp.role}</div>
              <div className="text-xs text-canvas-accent font-medium">{exp.company}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Pane: Detailed View */}
      <div className="flex-1 glass-panel rounded-3xl shadow-glass p-8 flex flex-col bg-white/80 relative overflow-hidden">
        {/* Decorative background number */}
        <div className="absolute -bottom-10 -right-10 text-[200px] font-black text-gray-50 opacity-50 select-none">
          {EXPERIENCES.indexOf(selectedExp) + 1}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-xs text-gray-400 mb-2">{selectedExp.period}</div>
              <h1 className="text-4xl font-black text-canvas-text mb-2">{selectedExp.company}</h1>
              <div className="text-xl text-gray-500 font-medium">{selectedExp.role}</div>
            </div>
          </div>

          <div className="mb-8">
            <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
              {selectedExp.type}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              Key Responsibilities & Achievements
            </h3>
            <ul className="space-y-4">
              {selectedExp.description.map((desc, i) => (
                <li key={i} className="flex gap-4 items-start text-sm text-gray-700 leading-relaxed">
                  <div className="min-w-[6px] h-[6px] rounded-full bg-canvas-accent mt-2"></div>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
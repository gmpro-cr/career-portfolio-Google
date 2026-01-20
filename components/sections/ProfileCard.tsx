import React from 'react';
import { TECH_STACK } from '../../constants';

const ProfileCard: React.FC = () => {
  return (
    <div className="w-full h-full p-3 md:p-6 grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-3 md:gap-6 overflow-y-auto md:overflow-hidden pb-28 md:pb-6">

      {/* 1. Identity Module (Large, 2x2) */}
      <div className="md:col-span-2 md:row-span-2 glass-panel p-5 md:p-8 rounded-3xl shadow-glass flex flex-col justify-between relative overflow-hidden bg-white/60 min-h-[300px]">
        <div className="absolute top-0 right-0 p-4 md:p-6 opacity-5">
          <div className="text-7xl md:text-9xl font-black">GM</div>
        </div>

        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold tracking-wider mb-4 md:mb-6 border border-blue-200">
            Open to Opportunities
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-canvas-text mb-2 md:mb-4 tracking-tighter leading-[0.9]">
            GAURAV<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-canvas-accent to-purple-600">MAHALE</span>
          </h1>

          <p className="text-xl text-canvas-muted leading-relaxed max-w-lg font-medium">
            Architecting the convergence of <strong className="text-canvas-text">Fintech</strong> and <strong className="text-canvas-text">Agentic AI</strong>.
          </p>
        </div>

        <div className="z-10 mt-6 pt-6 border-t border-gray-200/50 flex gap-12">
          <div>
            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">CURRENTLY AT</div>
            <div className="font-bold text-lg text-canvas-text">Pareto.AI</div>
          </div>
          <div>
            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">FOCUS</div>
            <div className="font-bold text-lg text-canvas-text">LLM Training</div>
          </div>
        </div>
      </div>

      {/* 2. About Module (1x2) */}
      <div className="md:col-span-2 glass-panel p-6 rounded-3xl shadow-glass bg-gradient-to-br from-white to-gray-50 flex flex-col">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">About</div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          AI Product Manager with 8+ years in banking and finance. Currently training LLMs at Pareto.AI
          while managing corporate lending at Yes Bank. Passionate about building AI-powered tools
          that solve real business problems.
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Education</div>
            <div className="text-sm font-medium text-gray-700">PGPM, IIM Sirmaur</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Certifications</div>
            <div className="text-sm font-medium text-gray-700">IBM AI Product Mgmt</div>
          </div>
        </div>
      </div>

      {/* 3. Stats Module (1x1) */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 hover:scale-[1.02] transition-transform">
        <div className="flex justify-between items-start">
          <span className="text-4xl">🚀</span>
          <span className="text-[10px] font-mono text-gray-400">YOE</span>
        </div>
        <div>
          <div className="text-4xl font-bold text-canvas-text">08.5<span className="text-lg text-gray-400">+</span></div>
          <div className="text-xs font-medium text-gray-500 mt-1">Years in Operations</div>
        </div>
      </div>

      {/* 4. Location Module (1x1) */}
      <div className="glass-panel p-0 rounded-3xl shadow-glass relative overflow-hidden bg-blue-50 group">
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center"></div>
        <div className="absolute top-[38%] left-[69%] -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping absolute"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative"></div>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
          📍 Pune, India
        </div>
      </div>

      {/* 5. Tech Ticker (Span 4) */}
      <div className="md:col-span-4 glass-panel p-4 rounded-3xl shadow-glass flex items-center overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-4 whitespace-nowrap">CORE STACK:</div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar flex-1 mask-linear-fade">
          {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-xs font-bold text-gray-700">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
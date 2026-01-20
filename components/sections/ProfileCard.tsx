import React, { useState } from 'react';

const ProfileCard: React.FC = () => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="w-full h-full p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-2 gap-3 md:gap-6 overflow-y-auto md:overflow-hidden pb-28 md:pb-6">

      {/* 1. Identity Module (2x2) */}
      <div className="md:col-span-2 md:row-span-2 glass-panel p-5 md:p-8 rounded-3xl shadow-glass flex flex-col justify-between relative overflow-hidden bg-white/60 min-h-[300px]">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold tracking-wider mb-4 md:mb-6 border border-blue-200">
            Open to Opportunities
          </div>

          {/* Photo + Name Row */}
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            {/* Circular Photo */}
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 border-4 border-white shadow-lg">
              {!photoError ? (
                <img
                  src="/photo.jpg"
                  alt="Gaurav Mahale"
                  className="w-full h-full object-cover"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-3xl">👤</span>
                </div>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-6xl font-black text-canvas-text tracking-tighter leading-[0.9]">
              GAURAV<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-canvas-accent to-purple-600">MAHALE</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-canvas-muted leading-relaxed max-w-lg font-medium">
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

      {/* 2. About Module */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass bg-gradient-to-br from-white to-gray-50 flex flex-col">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">About</div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          AI Product Manager with 8+ years in banking and finance. Currently training LLMs at Pareto.AI
          while managing corporate lending at Yes Bank.
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

      {/* 4. Stats Module */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass flex flex-col justify-between bg-gradient-to-br from-white to-gray-50">
        <div className="flex justify-between items-start">
          <span className="text-3xl">🚀</span>
          <span className="text-[10px] font-mono text-gray-400">YOE</span>
        </div>
        <div>
          <div className="text-3xl font-bold text-canvas-text">8.5<span className="text-lg text-gray-400">+</span></div>
          <div className="text-xs font-medium text-gray-500 mt-1">Years Experience</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { SKILL_DATA, TECH_STACK, CERTIFICATIONS_DATA } from '../../constants';

const SkillsCard: React.FC = () => {
  return (
    <div className="w-full h-full p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-2 gap-3 md:gap-6 overflow-y-auto md:overflow-hidden pb-12 md:pb-6">

      {/* 1. Primary Chart (Radar) - 1x2 */}
      <div className="glass-panel p-4 rounded-3xl shadow-glass flex flex-col relative bg-white md:row-span-2 min-h-[300px]">
        <div className="absolute top-6 left-6 z-10">
          <h3 className="text-lg font-bold text-canvas-text">Skill Topology</h3>
          <p className="text-xs text-gray-500">Holistic Assessment</p>
        </div>
        <div className="flex-1 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717A', fontSize: 10, fontWeight: 700 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Skill" dataKey="A" stroke="#2563EB" strokeWidth={3} fill="#2563EB" fillOpacity={0.1} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Certifications - 2x1 */}
      <div className="md:col-span-2 glass-panel p-8 rounded-3xl shadow-glass bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="p-2 bg-white/10 rounded-lg">📜</span>
          <h3 className="font-bold text-lg">Certifications & Licenses</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div key={cert.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="text-xs text-gray-400 mb-1">{cert.year}</div>
              <div className="font-bold text-sm mb-1 line-clamp-1">{cert.name}</div>
              <div className="text-[10px] text-gray-500 bg-black/30 inline-block px-2 py-1 rounded">{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tech Stack Grid - 2x1 */}
      <div className="md:col-span-2 glass-panel p-6 rounded-3xl shadow-glass overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-canvas-text">Technical Arsenal</h3>
          <span className="text-xs font-mono text-gray-400">LIVE MARKET VALUES</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TECH_STACK.map((tech) => (
            <div key={tech.id} className="bg-white border border-gray-100 p-3 rounded-xl flex flex-col gap-1 hover:border-blue-200 transition-colors group shadow-sm">
              <div className="flex justify-between">
                <span className="font-bold text-sm text-gray-800">{tech.name}</span>
                <span className={`text-[10px] font-mono ${tech.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {tech.change}
                </span>
              </div>
              <div className="text-[10px] text-gray-400">{tech.category}</div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-canvas-accent h-full rounded-full group-hover:bg-blue-600 transition-all"
                  style={{ width: `${(parseFloat(tech.price) / 200) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SkillsCard;
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { SKILL_DATA, TECH_STACK } from '../../constants';

const SkillsSection: React.FC = () => {
  return (
    <div className="h-full p-4 overflow-y-auto flex flex-col gap-6">
      
      {/* Radar Chart Container */}
      <div className="h-[400px] hud-border bg-hud-glass p-4 relative flex flex-col items-center justify-center">
        <h3 className="absolute top-4 left-4 font-mono text-hud-primary text-sm">[ TACTICAL ANALYSIS ]</h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
            <PolarGrid stroke="#00f3ff" strokeOpacity={0.2} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#00f3ff', fontSize: 10, fontFamily: 'Share Tech Mono' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke="#00f3ff"
              strokeWidth={2}
              fill="#00f3ff"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Tech Stack Grid */}
      <div className="hud-border bg-hud-glass p-6">
        <h3 className="font-mono text-hud-primary text-sm mb-4 border-b border-hud-primary/20 pb-2">
          [ WEAPONRY LOADOUT ]
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TECH_STACK.map((tech) => (
            <div key={tech.id} className="bg-hud-dark border border-hud-primary/20 p-3 hover:border-hud-primary transition-colors group">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-white font-bold text-sm">{tech.name}</span>
                <span className="text-[10px] font-mono text-hud-secondary">{tech.category}</span>
              </div>
              <div className="w-full h-1 bg-hud-black rounded-full overflow-hidden">
                <div 
                  className="h-full bg-hud-primary group-hover:bg-white transition-colors"
                  style={{ width: `${parseFloat(tech.price) > 100 ? 100 : parseFloat(tech.price)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
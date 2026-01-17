import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { SKILL_DATA } from '../constants';

const AssetBreakdown: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-terminal-border flex justify-between items-center bg-terminal-surface">
        <h3 className="font-mono font-bold text-terminal-text uppercase tracking-widest text-sm">
          Asset Allocation (Skills)
        </h3>
        <div className="w-2 h-2 rounded-full bg-terminal-accent animate-pulse-slow"></div>
      </div>
      
      <div className="flex-grow min-h-[300px] p-4 bg-terminal-bg flex items-center justify-center relative">
        {/* Chart Background Grid Decoration */}
        <div className="absolute inset-0 opacity-5" 
             style={{ backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
            <PolarGrid stroke="#27272a" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke="#10b981"
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.3}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
              itemStyle={{ color: '#10b981', fontFamily: 'monospace' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetBreakdown;
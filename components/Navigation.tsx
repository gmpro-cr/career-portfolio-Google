import React from 'react';
import { NavSection } from '../types';

interface NavigationProps {
  current: NavSection;
  onSelect: (section: NavSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({ current, onSelect }) => {
  const items: { id: NavSection; label: string; icon: string }[] = [
    { id: 'PROFILE', label: 'IDENTITY', icon: 'ID' },
    { id: 'MISSIONS', label: 'MISSION LOG', icon: 'LOG' },
    { id: 'ARMORY', label: 'TECH ARMORY', icon: 'CPU' },
    { id: 'COMMS', label: 'SYS LINK', icon: 'AI' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 flex justify-center">
      <div className="flex gap-2 md:gap-6 bg-hud-dark/90 border border-hud-primary/30 p-2 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.2)]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              relative px-4 md:px-8 py-2 md:py-3 rounded-full font-mono text-xs md:text-sm font-bold tracking-widest transition-all duration-300
              ${current === item.id 
                ? 'bg-hud-primary text-hud-black shadow-[0_0_15px_#00f3ff]' 
                : 'text-hud-primary hover:bg-hud-primary/10'}
            `}
          >
            <span className="hidden md:inline mr-2 opacity-50">[{item.icon}]</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
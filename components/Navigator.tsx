import React from 'react';
import { ViewState } from '../types';

interface NavigatorProps {
  current: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navigator: React.FC<NavigatorProps> = ({ current, onNavigate }) => {
  const links: { id: ViewState; label: string }[] = [
    { id: 'PROJECTS', label: 'Projects' },
    { id: 'WORK', label: 'Experience' },
    { id: 'HOME', label: 'Profile' },
    { id: 'SKILLS', label: 'Skills' },
    { id: 'CONNECT', label: 'AI Chat' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-canvas-border p-2 rounded-2xl shadow-elevated">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`
              px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
              ${current === link.id 
                ? 'bg-canvas-text text-white shadow-md scale-105' 
                : 'text-canvas-muted hover:bg-black/5 hover:text-canvas-text'}
            `}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navigator;
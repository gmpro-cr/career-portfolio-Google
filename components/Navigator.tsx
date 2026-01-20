import React from 'react';
import { ViewState } from '../types';
import { ProjectTab } from '../App';

interface NavigatorProps {
  current: ViewState;
  onNavigate: (view: ViewState) => void;
  projectTab: ProjectTab;
  onProjectTabChange: (tab: ProjectTab) => void;
}

const Navigator: React.FC<NavigatorProps> = ({ current, onNavigate, projectTab, onProjectTabChange }) => {
  const links: { id: ViewState; label: string }[] = [
    { id: 'PROJECTS', label: 'Projects' },
    { id: 'WORK', label: 'Experience' },
    { id: 'HOME', label: 'Profile' },
    { id: 'SKILLS', label: 'Skills' },
    { id: 'CONNECT', label: 'AI Chat' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-fit">
      <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-canvas-border p-1.5 rounded-2xl shadow-elevated overflow-x-auto px-2 no-scrollbar">
        {links.map((link) => (
          <React.Fragment key={link.id}>
            {/* Show sub-tabs after Projects when on PROJECTS view */}
            {link.id === 'PROJECTS' && current === 'PROJECTS' ? (
              <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-0.5">
                <button
                  onClick={() => onProjectTabChange('projects')}
                  className={`
                    whitespace-nowrap px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300
                    ${projectTab === 'projects'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-canvas-muted hover:bg-white hover:text-canvas-text'}
                  `}
                >
                  Projects
                </button>
                <button
                  onClick={() => onProjectTabChange('case-studies')}
                  className={`
                    whitespace-nowrap px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300
                    ${projectTab === 'case-studies'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-canvas-muted hover:bg-white hover:text-canvas-text'}
                  `}
                >
                  Case Studies
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate(link.id)}
                className={`
                  whitespace-nowrap px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
                  ${current === link.id
                    ? 'bg-canvas-text text-white shadow-md scale-105'
                    : 'text-canvas-muted hover:bg-black/5 hover:text-canvas-text'}
                `}
              >
                {link.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Navigator;
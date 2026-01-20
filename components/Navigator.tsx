import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { ProjectTab } from '../App';

interface NavigatorProps {
  current: ViewState;
  onNavigate: (view: ViewState) => void;
  projectTab: ProjectTab;
  onProjectTabChange: (tab: ProjectTab) => void;
}

const Navigator: React.FC<NavigatorProps> = ({ current, onNavigate, projectTab, onProjectTabChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = window.innerHeight - 80;
      setIsVisible(e.clientY > threshold);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProjectsClick = () => {
    onNavigate('PROJECTS');
    onProjectTabChange('projects');
  };

  const handleCaseStudiesClick = () => {
    onNavigate('PROJECTS');
    onProjectTabChange('case-studies');
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-fit transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-canvas-border p-1.5 rounded-2xl shadow-elevated overflow-x-auto px-2 no-scrollbar">
        <button
          onClick={() => onNavigate('HOME')}
          className={`
            whitespace-nowrap px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
            ${current === 'HOME'
              ? 'bg-canvas-text text-white shadow-md scale-105'
              : 'text-canvas-muted hover:bg-black/5 hover:text-canvas-text'}
          `}
        >
          Profile
        </button>
        <button
          onClick={() => onNavigate('WORK')}
          className={`
            whitespace-nowrap px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
            ${current === 'WORK'
              ? 'bg-canvas-text text-white shadow-md scale-105'
              : 'text-canvas-muted hover:bg-black/5 hover:text-canvas-text'}
          `}
        >
          Experience
        </button>
        <button
          onClick={handleProjectsClick}
          className={`
            whitespace-nowrap px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
            ${current === 'PROJECTS' && projectTab === 'projects'
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'text-canvas-muted hover:bg-black/5 hover:text-canvas-text'}
          `}
        >
          Projects
        </button>
        <button
          onClick={handleCaseStudiesClick}
          className={`
            whitespace-nowrap px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
            ${current === 'PROJECTS' && projectTab === 'case-studies'
              ? 'bg-purple-600 text-white shadow-md scale-105'
              : 'text-canvas-muted hover:bg-black/5 hover:text-canvas-text'}
          `}
        >
          Case Studies
        </button>
      </nav>
    </div>
  );
};

export default Navigator;
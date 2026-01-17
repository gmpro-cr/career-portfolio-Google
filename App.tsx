import React, { useState } from 'react';
import Navigator from './components/Navigator';
import TopBar from './components/TopBar';
import Background from './components/Background';
import ProfileCard from './components/sections/ProfileCard';
import TimelineCard from './components/sections/TimelineCard';
import SkillsCard from './components/sections/SkillsCard';
import ProjectsCard from './components/sections/ProjectsCard';
import ConnectCard from './components/sections/ConnectCard';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>('HOME');

  const getTransform = () => {
    switch (view) {
      case 'HOME': return 'translate(0, 0)';
      case 'WORK': return 'translate(0, 100vh)'; 
      case 'SKILLS': return 'translate(-100vw, 0)'; 
      case 'PROJECTS': return 'translate(100vw, 0)'; 
      case 'CONNECT': return 'translate(0, -100vh)'; 
      default: return 'translate(0, 0)';
    }
  };

  // Base style for all full-screen panels
  const panelStyle = "absolute w-[95vw] md:w-[90vw] h-[80vh] md:h-[85vh] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center";

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans text-canvas-text selection:bg-canvas-accent selection:text-white bg-canvas-bg">
      
      <TopBar />
      <Background view={view} />

      {/* The Infinite Canvas Container */}
      <div 
        className="camera-plane absolute inset-0 w-full h-full flex items-center justify-center z-10"
        style={{ transform: getTransform() }}
      >
        
        {/* CENTER: Profile */}
        <div className={panelStyle} style={{ 
          opacity: view === 'HOME' ? 1 : 0.3,
          transform: view === 'HOME' ? 'scale(1)' : 'scale(0.9)',
          pointerEvents: view === 'HOME' ? 'auto' : 'none'
        }}>
          <ProfileCard />
        </div>

        {/* NORTH: Work */}
        <div className={`${panelStyle} -top-[100vh]`}>
          <div className="w-full h-full transition-all duration-700 delay-75" style={{ 
            opacity: view === 'WORK' ? 1 : 0.3,
            transform: view === 'WORK' ? 'translateY(0)' : 'translateY(50px)'
          }}>
            <TimelineCard />
          </div>
        </div>

        {/* EAST: Skills */}
        <div className={`${panelStyle} left-[100vw]`}>
           <div className="w-full h-full transition-all duration-700 delay-75" style={{ 
             opacity: view === 'SKILLS' ? 1 : 0.3,
             transform: view === 'SKILLS' ? 'translateX(0)' : 'translateX(-50px)'
           }}>
             <SkillsCard />
           </div>
        </div>

        {/* WEST: Projects */}
        <div className={`${panelStyle} -left-[100vw]`}>
           <div className="w-full h-full transition-all duration-700 delay-75" style={{ 
             opacity: view === 'PROJECTS' ? 1 : 0.3,
             transform: view === 'PROJECTS' ? 'translateX(0)' : 'translateX(50px)'
           }}>
             <ProjectsCard />
           </div>
        </div>

        {/* SOUTH: Connect */}
        <div className={`${panelStyle} top-[100vh]`}>
           <div className="w-full h-full transition-all duration-700 delay-75" style={{ 
             opacity: view === 'CONNECT' ? 1 : 0.3,
             transform: view === 'CONNECT' ? 'translateY(0)' : 'translateY(-50px)'
           }}>
             <ConnectCard />
           </div>
        </div>

      </div>

      <Navigator current={view} onNavigate={setView} />
      
    </div>
  );
}

export default App;
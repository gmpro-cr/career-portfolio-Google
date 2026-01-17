import React from 'react';
import { ViewState } from '../types';

interface BackgroundProps {
  view: ViewState;
}

const Background: React.FC<BackgroundProps> = ({ view }) => {
  // Parallax logic: Background moves opposite to camera
  const getTransform = () => {
    const intensity = 15; // % movement
    switch (view) {
      case 'HOME': return 'translate(0, 0)';
      case 'WORK': return `translate(0, ${intensity}vh)`; 
      case 'SKILLS': return `translate(-${intensity}vw, 0)`; 
      case 'PROJECTS': return `translate(${intensity}vw, 0)`; 
      case 'CONNECT': return `translate(0, -${intensity}vh)`; 
      default: return 'translate(0, 0)';
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-canvas-bg pointer-events-none">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
      
      {/* Moving Grid Layer */}
      <div 
        className="absolute -inset-[50%] w-[200%] h-[200%] transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)"
        style={{ 
          transform: getTransform(),
          backgroundImage: 'radial-gradient(#E4E4E7 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.8
        }}
      ></div>

      {/* Schematic Map Layer - Connecting the nodes */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-[1.5s]"
        style={{ transform: getTransform() }}
      >
        <svg width="200%" height="200%" viewBox="-1000 -1000 2000 2000" className="opacity-20">
           {/* Center Hub Circle */}
           <circle cx="0" cy="0" r="400" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="10 10" />
           <circle cx="0" cy="0" r="380" fill="none" stroke="#2563EB" strokeWidth="1" />
           
           {/* Connection Lines to Nodes */}
           {/* Top (Work) */}
           <line x1="0" y1="-400" x2="0" y2="-800" stroke="#94A3B8" strokeWidth="2" />
           <circle cx="0" cy="-900" r="100" fill="none" stroke="#94A3B8" strokeWidth="2" />
           <text x="20" y="-850" className="font-mono text-xs fill-gray-500">ARCHIVES (WORK)</text>

           {/* Bottom (Connect) */}
           <line x1="0" y1="400" x2="0" y2="800" stroke="#94A3B8" strokeWidth="2" />
           <circle cx="0" cy="900" r="100" fill="none" stroke="#94A3B8" strokeWidth="2" />
           <text x="20" y="850" className="font-mono text-xs fill-gray-500">COMMS ARRAY</text>

           {/* Left (Projects) */}
           <line x1="-400" y1="0" x2="-800" y2="0" stroke="#94A3B8" strokeWidth="2" />
           <rect x="-1000" y="-100" width="200" height="200" fill="none" stroke="#94A3B8" strokeWidth="2" />
           <text x="-900" y="-120" className="font-mono text-xs fill-gray-500 text-center">GALLERY</text>

           {/* Right (Skills) */}
           <line x1="400" y1="0" x2="800" y2="0" stroke="#94A3B8" strokeWidth="2" />
           <polygon points="900,-100 1000,0 900,100 800,0" fill="none" stroke="#94A3B8" strokeWidth="2" />
           <text x="850" y="-120" className="font-mono text-xs fill-gray-500">LABORATORY</text>
        </svg>
      </div>
    </div>
  );
};

export default Background;
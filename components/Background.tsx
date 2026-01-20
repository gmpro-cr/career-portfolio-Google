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

      {/* Subtle accent circle */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-[1.5s]"
        style={{ transform: getTransform() }}
      >
        <div className="w-[600px] h-[600px] rounded-full border border-gray-200 opacity-30"></div>
      </div>
    </div>
  );
};

export default Background;
import React, { useState, useEffect } from 'react';

const TopBar: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-12 z-50 px-4 md:px-6 flex justify-between items-center pointer-events-none">
      {/* Left: Brand */}
      <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full pointer-events-auto shadow-sm">
        <span className="text-xs font-semibold text-canvas-text">Gaurav Mahale</span>
      </div>

      {/* Right: Status */}
      <div className="flex items-center gap-3 glass-panel px-3 py-1.5 rounded-full pointer-events-auto shadow-sm">
        <div className="hidden md:flex items-center gap-2 border-r border-gray-300 pr-3 mr-1">
          <span className="text-[10px] uppercase font-bold text-canvas-muted">Loc</span>
          <span className="text-xs font-medium">Pune, IN</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-canvas-muted">Time</span>
          <span className="text-xs font-mono font-medium w-16 text-center">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
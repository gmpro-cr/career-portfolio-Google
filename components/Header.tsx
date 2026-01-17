import React from 'react';
import { STOCK_TICKER_ITEMS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-surface border-b border-terminal-border h-10 flex items-center overflow-hidden font-mono text-xs">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate items for infinite scroll illusion */}
        {[...STOCK_TICKER_ITEMS, ...STOCK_TICKER_ITEMS, ...STOCK_TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center px-4 text-terminal-accent">
            <span className="mr-2">▲</span>
            {item}
          </div>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </header>
  );
};

export default Header;
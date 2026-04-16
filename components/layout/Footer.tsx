import React from 'react';
import { Linkedin, Github, ArrowUp } from 'lucide-react';

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-light-surface border-t border-black/5 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-light-text text-sm">Gaurav Mahale</p>
            <p className="text-xs text-light-muted mt-0.5">Finance Pro → Product Builder</p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/mahalegauravk" target="_blank" rel="noopener noreferrer" className="text-light-muted hover:text-accent transition-colors p-2 hover:bg-black/5 rounded-lg" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/gmpro-cr" target="_blank" rel="noopener noreferrer" className="text-light-muted hover:text-accent transition-colors p-2 hover:bg-black/5 rounded-lg" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://x.com/mahalegauravk" target="_blank" rel="noopener noreferrer" className="text-light-muted hover:text-accent transition-colors p-2 hover:bg-black/5 rounded-lg" aria-label="X (Twitter)">
              <XIcon size={18} />
            </a>
          </div>

          {/* Right: Copyright + Back to Top */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-light-muted">
              © {new Date().getFullYear()}
            </p>
            <button
              onClick={scrollToTop}
              className="text-light-muted hover:text-accent transition-colors p-2 hover:bg-black/5 rounded-lg"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

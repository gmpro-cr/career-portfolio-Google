import React from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import VisitorCount from '../VisitorCount';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-paper border-t border-hairline">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] gap-8">
          <div>
            <p className="font-display text-base font-medium text-ink">Gaurav Mahale</p>
            <p className="text-xs text-ink-muted mt-1.5 leading-relaxed max-w-[32ch]">
              AI Product Builder from India. Nine years in banking, now building AI products end to end.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-ink-muted/70 font-semibold mb-2.5">Links</p>
            <div className="flex flex-col gap-2 text-sm text-ink-muted">
              <a href="#work" className="hover:text-ink transition-colors">Work</a>
              <a href="#trajectory" className="hover:text-ink transition-colors">Trajectory</a>
              <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-ink-muted/70 font-semibold mb-2.5">Elsewhere</p>
            <div className="flex flex-col gap-2 text-sm text-ink-muted">
              <a href="https://www.linkedin.com/in/mahalegauravk" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">LinkedIn</a>
              <a href="https://github.com/gmpro-cr" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">GitHub</a>
              <a href="/Gaurav_Mahale_Resume.pdf" download className="hover:text-ink transition-colors">Resume (PDF)</a>
            </div>
          </div>
        </div>

        <div className="mt-9 pt-5 border-t border-hairline flex items-center justify-between gap-4 text-xs text-ink-muted">
          <span className="tabular">&copy; {new Date().getFullYear()} Gaurav Mahale</span>
          <div className="flex items-center gap-3">
            <VisitorCount />
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-all duration-500 ease-spring hover:-translate-y-0.5"
            >
              <ArrowUp size={13} weight="light" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

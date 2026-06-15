import React from 'react';
import { LinkedinLogo, GithubLogo, ArrowUp } from '@phosphor-icons/react';
import XMark from '../XMark';
import { Monogram } from '../Wordmark';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-paper border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <Monogram size={40} />
            <div>
              <p className="font-display font-light text-xl text-ink leading-tight">
                Gaurav Mahale
              </p>
              <p className="text-xs text-ink-muted mt-1 tracking-wide">
                AI Product Builder · Pune, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/mahalegauravk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
            >
              <LinkedinLogo size={16} weight="light" />
            </a>
            <a
              href="https://github.com/gmpro-cr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
            >
              <GithubLogo size={16} weight="light" />
            </a>
            <a
              href="https://x.com/mahalegauravk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
            >
              <XMark size={14} />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span className="tabular">© {new Date().getFullYear()}</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink-muted hover:text-ink transition-colors duration-500 ease-spring"
            >
              <ArrowUp size={14} weight="light" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

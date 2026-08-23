import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { href: '#work',       label: 'Work'       },
  { href: '#trajectory', label: 'Trajectory' },
  { href: '#contact',    label: 'Contact'    },
];

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const ALL_SECTIONS = ['hero', 'work', 'trajectory', 'contact'];

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [activeSection, setActive]  = useState('');
  const [scrolled, setScrolled]     = useState(false);
  const navigate = useNavigate();

  /* ── scroll tracking: active section + scrolled-past-top state ─── */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      let current = '';
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = `#${id}`;
      }
      setActive(current);
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── navigation handler ───────────────────────────────────── */
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Reading-progress hairline */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
        style={{ scaleX: progress, background: 'rgba(26,20,16,0.55)' }}
      />

      {/* Plain top bar — no floating pill, gains a hairline + blur once scrolled */}
      <nav
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: scrolled ? 'rgba(253,251,247,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid #E7E5E4' : '1px solid transparent',
          transition: `background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="/"
            onClick={e => { e.preventDefault(); navigate('/'); setIsOpen(false); }}
            aria-label="Gaurav Mahale — home"
            className="font-display text-sm font-medium tracking-tight text-ink hover:opacity-70 transition-opacity duration-300"
          >
            Gaurav Mahale
          </a>

          {/* Desktop links — plain text, underline on hover, no pill */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const active = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => go(e, link.href)}
                  className="relative text-sm py-1 transition-colors duration-300"
                  style={{ color: active ? '#1A1410' : '#78716C' }}
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-px bg-ink transition-all duration-300"
                    style={{ width: active ? '100%' : '0%' }}
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="relative md:hidden grid h-9 w-9 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors duration-300"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 block h-px w-full bg-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-1.5 block h-px w-full bg-ink transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 bottom-0 block h-px w-full bg-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden bg-white/90 backdrop-blur-2xl transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex h-full flex-col items-start justify-center px-8 gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => go(e, link.href)}
              style={{ transitionDelay: isOpen ? `${120 + i * 60}ms` : '0ms' }}
              className={`font-display text-5xl font-light text-ink transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-md'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { href: '#work',       label: 'Work'       },
  { href: '#trajectory', label: 'Trajectory' },
  { href: '#toolkit',    label: 'Toolkit'    },
  { href: '#contact',    label: 'Contact'    },
];

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const ALL_SECTIONS = ['hero', 'work', 'trajectory', 'toolkit', 'contact'];

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [activeSection, setActive]  = useState('');
  const [navVisible, setNavVisible] = useState(true);
  const idleTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pastHeroRef = useRef(false);
  const location   = useLocation();
  const navigate   = useNavigate();
  const isProjectPage = location.pathname.startsWith('/project/');

  /* ── scroll tracking (home only) ─────────────────────────── */
  useEffect(() => {
    if (isProjectPage) { setNavVisible(true); return; }

    let raf = 0;
    const update = () => {
      let current = '';
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = `#${id}`;
      }
      setActive(current);

      const pastHero = window.scrollY > window.innerHeight * 0.8;
      pastHeroRef.current = pastHero;
      if (!pastHero) {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        setNavVisible(true);
      } else {
        setNavVisible(true);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
          if (pastHeroRef.current) setNavVisible(false);
        }, 2000);
      }
    };
    const onScroll = () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isProjectPage]);

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
    if (isProjectPage) {
      // Navigate home then scroll to section
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <div
          className="nav-island pointer-events-auto flex items-center gap-1 px-2 py-2 md:px-3"
          style={{
            opacity:   navVisible ? 1 : 0,
            transform: navVisible ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.97)',
            transition: `opacity 0.45s ${EASE}, transform 0.45s ${EASE}`,
            pointerEvents: navVisible ? 'auto' : 'none',
          }}
        >
          {/* Logo / name */}
          <a
            href="/"
            onClick={e => { e.preventDefault(); navigate('/'); setIsOpen(false); }}
            aria-label="Gaurav Mahale — home"
            className="px-4 text-sm font-medium tracking-tight hover:opacity-70 transition-opacity duration-500"
            style={{ color: '#1A1410', transition: `opacity 0.5s ${EASE}` }}
          >
            Gaurav Mahale
          </a>

          <span className="hidden md:inline-block h-4 w-px bg-hairline mx-1" aria-hidden />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = !isProjectPage && activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => go(e, link.href)}
                  className="relative rounded-full px-3 py-1.5 text-sm transition-all duration-500"
                  style={{ color: active ? '#1A1410' : '#78716C', transition: `color 0.4s ${EASE}` }}
                >
                  {active && <span className="absolute inset-0 -z-10 rounded-full bg-paper" aria-hidden />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="relative md:hidden ml-1 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors duration-500"
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

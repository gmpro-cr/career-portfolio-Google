import React, { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#thesis', label: 'Thesis' },
  { href: '#trajectory', label: 'Trajectory' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#contact', label: 'Contact' },
];

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const ALL_SECTIONS = ['hero', 'work', 'thesis', 'trajectory', 'toolkit', 'contact'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navVisible, setNavVisible] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pastHeroRef = useRef(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      // Active section for nav highlight
      let current = '';
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = `#${id}`;
      }
      setActiveSection(current);

      // Navbar show/hide past hero
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
        }, 200);
      }
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <div
          className="nav-island pointer-events-auto flex items-center gap-1 px-2 py-2 md:px-3"
          style={{
            opacity: navVisible ? 1 : 0,
            transform: navVisible ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.97)',
            transition: `opacity 0.45s ${EASE}, transform 0.45s ${EASE}`,
            pointerEvents: navVisible ? 'auto' : 'none',
          }}
        >
          <a
            href="#hero"
            onClick={(e) => go(e, '#hero')}
            className="px-4 text-sm font-medium tracking-tight hover:opacity-70 transition-opacity duration-500 ease-spring"
            style={{
              color: '#1A1410',
              transition: `color 0.4s ${EASE}, opacity 0.5s`,
            }}
          >
            Gaurav Mahale
          </a>

          <span className="hidden md:inline-block h-4 w-px bg-hairline mx-1" aria-hidden />

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="relative rounded-full px-3 py-1.5 text-sm transition-all duration-500 ease-spring"
                  style={{
                    color: active ? '#1A1410' : '#78716C',
                    transition: `color 0.4s ${EASE}`,
                  }}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-paper" aria-hidden />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          <a
            href="mailto:mahalegauravk@gmail.com"
            className="hidden md:inline-flex ml-1 items-center gap-1 rounded-full bg-ink text-white pl-4 pr-1.5 py-1.5 text-xs font-medium transition-all duration-700 ease-spring hover:-translate-y-px"
          >
            Get in touch
            <span className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>

          {/* Mobile hamburger morph */}
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="relative md:hidden ml-1 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors duration-500 ease-spring"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 block h-px w-full bg-ink transition-all duration-500 ease-spring ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-1.5 block h-px w-full bg-ink transition-opacity duration-500 ease-spring ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 bottom-0 block h-px w-full bg-ink transition-all duration-500 ease-spring ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-white/85 backdrop-blur-2xl transition-opacity duration-700 ease-spring ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col items-start justify-center px-8 gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              style={{ transitionDelay: isOpen ? `${120 + i * 60}ms` : '0ms' }}
              className={`font-display text-5xl font-light text-ink transition-all duration-700 ease-spring ${
                isOpen ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-md'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:mahalegauravk@gmail.com"
            style={{ transitionDelay: isOpen ? `${120 + navLinks.length * 60}ms` : '0ms' }}
            className={`mt-8 text-sm text-ink-muted transition-all duration-700 ease-spring ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            mahalegauravk@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}

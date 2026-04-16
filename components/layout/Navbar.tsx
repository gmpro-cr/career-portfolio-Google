import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import ThemePicker from '../ThemePicker';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''));
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = `#${section}`;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-light-bg/80 backdrop-blur-md border-b border-black/5 shadow-lg' : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="font-bold text-xl text-light-text hover:text-accent transition-colors tracking-tight"
            >
              Gaurav Mahale
            </a>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 text-light-muted w-4 h-4 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Filter projects by tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-light-surface/50 border border-black/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-light-text placeholder:text-light-muted/50 focus:outline-none focus:border-accent-30 focus:bg-light-surface transition-all w-52 focus:w-72"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium transition-colors relative group ${activeSection === link.href ? 'text-accent' : 'text-light-muted hover:text-accent'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all ${activeSection === link.href
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                    }`}
                  style={{ backgroundColor: 'var(--accent-color)' }}
                />
              </a>
            ))}

            <div className="h-4 w-[1px] bg-black/10 mx-2"></div>
            <ThemePicker />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-light-muted hover:text-light-text"
            >
              <Search size={20} />
            </button>
            <ThemePicker />
            <button
              className="p-2 text-light-text hover:bg-black/5 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {showSearch && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Filter projects by tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-light-surface border border-black/10 rounded-lg py-2 pl-9 pr-4 text-sm text-light-text placeholder:text-light-muted/50 focus:outline-none focus:border-accent-30"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-light-surface border-t border-black/5 animate-fade-in absolute w-full shadow-2xl">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${activeSection === link.href
                    ? 'text-accent bg-black/5'
                    : 'text-light-muted hover:text-light-text hover:bg-black/5'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

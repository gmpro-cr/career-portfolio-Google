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
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="font-bold text-xl text-dark-text hover:text-accent-blue transition-colors tracking-tight"
            >
              Gaurav Mahale
            </a>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 text-dark-muted w-4 h-4 group-focus-within:text-accent-blue transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-surface/50 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-dark-text placeholder:text-dark-muted/50 focus:outline-none focus:border-accent-blue/50 focus:bg-dark-surface transition-all w-48 focus:w-64"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-dark-muted hover:text-accent-blue transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all group-hover:w-full"></span>
              </a>
            ))}

            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
            <ThemePicker />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-dark-muted hover:text-white"
            >
              <Search size={20} />
            </button>
            <ThemePicker />
            <button
              className="p-2 text-dark-text hover:bg-white/5 rounded-lg transition-colors"
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-dark-surface border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-dark-text placeholder:text-dark-muted/50 focus:outline-none focus:border-accent-blue/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-surface border-t border-white/5 animate-fade-in absolute w-full shadow-2xl">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-3 px-4 rounded-lg text-base font-medium text-dark-muted hover:text-white hover:bg-white/5 transition-all"
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

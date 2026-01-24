import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-charcoal">Let's build something together</p>
            <p className="text-muted mt-1">Open to opportunities and collaborations</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:mahalegauravk@gmail.com"
              className="p-3 rounded-full bg-warm-cream text-muted hover:text-terracotta hover:bg-terracotta/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mahalegauravk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-warm-cream text-muted hover:text-terracotta hover:bg-terracotta/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/gauravmahale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-warm-cream text-muted hover:text-terracotta hover:bg-terracotta/10 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Gaurav Mahale. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}

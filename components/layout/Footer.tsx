import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-white/5 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center">
          <p className="text-sm text-dark-muted">
            © {new Date().getFullYear()} Gaurav Mahale. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Gaurav Mahale. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}

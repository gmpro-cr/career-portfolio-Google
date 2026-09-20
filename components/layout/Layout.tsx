import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-paper overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1" style={{ animation: 'pageIn 0.6s cubic-bezier(0.32, 0.72, 0, 1) both' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

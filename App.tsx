import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/layout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
// Lazy: the seven reports are long, and the home page should not pay for them.
const TechReport = lazy(() => import('./pages/projects/TechReport'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/project/:slug" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/project/:slug/how-it-works" element={<Layout><Suspense fallback={<div className="min-h-screen" />}><TechReport /></Suspense></Layout>} />
      </Routes>
      {/* Inside the router on purpose — outside it, only the initial load
          would register and case-study navigations would go unreported. */}
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

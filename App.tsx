import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/layout';
import Home from './pages/Home';
// Lazy: each project page carries its full technical write-up, and the
// home page should not pay for seven of them.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

/* The technical report used to be its own page; it is now chapters 03–11
   of the project page, so old links land on its first chapter. */
function HowItWorksRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/project/${slug}#summary`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/project/:slug" element={<Layout><Suspense fallback={<div className="min-h-screen" />}><ProjectDetail /></Suspense></Layout>} />
        <Route path="/project/:slug/how-it-works" element={<HowItWorksRedirect />} />
      </Routes>
      {/* Inside the router on purpose — outside it, only the initial load
          would register and case-study navigations would go unreported. */}
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/layout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/project/:slug" element={<Layout><ProjectDetail /></Layout>} />
      </Routes>
      {/* Inside the router on purpose — outside it, only the initial load
          would register and case-study navigations would go unreported. */}
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

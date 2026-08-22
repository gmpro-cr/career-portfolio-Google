import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/layout';
import Home from './pages/Home';

/* Old /project/:slug case-study pages were folded into Home as inline
   expand-in-place panels. Bookmarked/shared links still land somewhere
   useful: redirect to home with the project pre-selected. */
function ProjectRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/?project=${slug ?? ''}#work`, { replace: true });
  }, [slug, navigate]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/project/:slug" element={<ProjectRedirect />} />
      </Routes>
      {/* Inside the router on purpose — outside it, only the initial load
          would register and case-study navigations would go unreported. */}
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Layout } from './components/layout';
import Home from './pages/Home';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Layout>
        <Home />
      </Layout>
    </SearchProvider>
  );
}

export default App;

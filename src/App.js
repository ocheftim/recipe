// App.js
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { pages } from './config/pages';
import { checkAndInitializeSampleData } from './utils/initializeSampleData';

const App = () => {
  const [activePage, setActivePage] = useState('settings');
  const currentPage = pages[activePage] || pages.settings;

  // Initialize sample data on first load
  useEffect(() => {
    checkAndInitializeSampleData();
  }, []);

  return (
    <Layout
      activePage={activePage}
      onPageChange={setActivePage}
      pages={pages} // Pass pages config to Layout
    >
      {currentPage.component}
    </Layout>
  );
};

export default App;
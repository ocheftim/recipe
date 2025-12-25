// src/components/Layout.js - Complete Restored Simple Layout
import React from 'react';
import Navigation from './Navigation';

const Layout = ({ activePage, onPageChange, pages, children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Navigation Sidebar */}
      <Navigation 
        activePage={activePage} 
        onPageChange={onPageChange} 
      />
      
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
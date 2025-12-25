// src/pages/Reports.js
import React from 'react';
import { THEME } from '../constants/theme';

const Reports = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: THEME.gunmetal }}>
          Reports
        </h1>
        <p className="text-sm mt-1" style={{ color: THEME.charcoal }}>
          Generate and view operational reports
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border" style={{ borderColor: THEME.silver }}>
        <p className="text-gray-500">Reporting features coming soon...</p>
      </div>
    </div>
  );
};

export default Reports;
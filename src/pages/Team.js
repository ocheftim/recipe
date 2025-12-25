// src/pages/Team.js
import React from 'react';
import { THEME } from '../constants/theme';

const Team = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: THEME.gunmetal }}>
          Team Management
        </h1>
        <p className="text-sm mt-1" style={{ color: THEME.charcoal }}>
          Manage staff and permissions
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border" style={{ borderColor: THEME.silver }}>
        <p className="text-gray-500">Team management features coming soon...</p>
      </div>
    </div>
  );
};

export default Team;
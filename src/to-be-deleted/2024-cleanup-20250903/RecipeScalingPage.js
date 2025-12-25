import React from 'react';
import { THEME } from '../constants/theme';

const RecipeScalingPage = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: THEME.gunmetal }}>
          Recipe Scaling
        </h1>
        <p className="text-sm mt-1" style={{ color: THEME.charcoal }}>
          Scale recipes for different serving sizes and batch production
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border" style={{ borderColor: THEME.silver }}>
        <p className="text-gray-500">Recipe scaling tools coming soon...</p>
      </div>
    </div>
  );
};

export default RecipeScalingPage;
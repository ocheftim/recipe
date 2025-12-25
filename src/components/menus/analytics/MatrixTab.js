// src/components/menus/analytics/MatrixTab.js
import React from 'react';
import { BarChart3, TrendingUp, Star, AlertTriangle } from 'lucide-react';

const MatrixTab = ({ analyticsData, getRecipeById }) => {
  if (!analyticsData?.matrix) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No matrix data available</p>
      </div>
    );
  }

  const { matrix } = analyticsData;

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPerformanceIcon = (score) => {
    if (score >= 80) return <TrendingUp size={16} />;
    if (score >= 60) return <Star size={16} />;
    return <AlertTriangle size={16} />;
  };

  return (
    <div className="space-y-6">
      {/* Performance Matrix Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold">Recipe Performance Matrix</h3>
        </div>
        <div className="text-sm text-gray-500">
          Based on sales volume × profit margin
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Star Performers */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h4 className="font-medium text-green-800">Star Performers</h4>
          </div>
          <div className="space-y-2">
            {matrix.starPerformers?.map((item) => (
              <div key={item.recipeId} className="flex items-center justify-between bg-white p-3 rounded border">
                <div>
                  <p className="font-medium">{getRecipeById ? getRecipeById(item.recipeId)?.name || 'Unknown Recipe' : `Recipe ${item.recipeId}`}</p>
                  <p className="text-sm text-gray-600">Volume: {item.volume} | Margin: {item.margin}%</p>
                </div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${getPerformanceColor(item.score)}`}>
                  {getPerformanceIcon(item.score)}
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Items */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h4 className="font-medium text-red-800">Problem Items</h4>
          </div>
          <div className="space-y-2">
            {matrix.problemItems?.map((item) => (
              <div key={item.recipeId} className="flex items-center justify-between bg-white p-3 rounded border">
                <div>
                  <p className="font-medium">{getRecipeById ? getRecipeById(item.recipeId)?.name || 'Unknown Recipe' : `Recipe ${item.recipeId}`}</p>
                  <p className="text-sm text-gray-600">Volume: {item.volume} | Margin: {item.margin}%</p>
                </div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${getPerformanceColor(item.score)}`}>
                  {getPerformanceIcon(item.score)}
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixTab;

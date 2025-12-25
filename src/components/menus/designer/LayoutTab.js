// src/components/menus/designer/LayoutTab.js
import React from 'react';
import { Layout, Grid, Spacing } from 'lucide-react';

const LayoutTab = ({ designConfig, updateDesignConfig }) => {
  const { layout } = designConfig;

  const templates = [
    { id: 'classic', name: 'Classic', description: 'Traditional menu layout' },
    { id: 'modern', name: 'Modern', description: 'Clean, minimalist design' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated styling' },
    { id: 'casual', name: 'Casual', description: 'Relaxed, friendly feel' }
  ];

  const handleLayoutChange = (field, value) => {
    updateDesignConfig('layout', { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Template Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleLayoutChange('template', template.id)}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                layout.template === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-sm text-gray-600">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Column Layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Grid className="inline w-4 h-4 mr-2" />
          Column Layout
        </label>
        <div className="flex space-x-3">
          {[1, 2, 3].map((cols) => (
            <button
              key={cols}
              onClick={() => handleLayoutChange('columns', cols)}
              className={`px-4 py-2 border rounded-lg ${
                layout.columns === cols
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {cols} Column{cols > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Layout className="inline w-4 h-4 mr-2" />
          Spacing
        </label>
        <div className="flex space-x-3">
          {['compact', 'normal', 'relaxed'].map((spacing) => (
            <button
              key={spacing}
              onClick={() => handleLayoutChange('spacing', spacing)}
              className={`px-4 py-2 border rounded-lg capitalize ${
                layout.spacing === spacing
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {spacing}
            </button>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Display Options
        </label>
        <div className="space-y-3">
          {[
            { key: 'showPrices', label: 'Show Prices' },
            { key: 'showDescriptions', label: 'Show Descriptions' },
            { key: 'showDietary', label: 'Show Dietary Information' }
          ].map((option) => (
            <label key={option.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={layout[option.key]}
                onChange={(e) => handleLayoutChange(option.key, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutTab;

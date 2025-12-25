// src/components/menus/designer/TypographyTab.js
import React from 'react';
import { Type, Palette } from 'lucide-react';

const TypographyTab = ({ designConfig, updateDesignConfig }) => {
  const { typography } = designConfig;

  const fonts = [
    { id: 'serif', name: 'Serif', example: 'Times New Roman' },
    { id: 'sans-serif', name: 'Sans Serif', example: 'Arial' },
    { id: 'script', name: 'Script', example: 'Brush Script' },
    { id: 'modern', name: 'Modern', example: 'Helvetica' }
  ];

  const sizes = [
    { id: 'small', name: 'Small' },
    { id: 'medium', name: 'Medium' },
    { id: 'large', name: 'Large' },
    { id: 'xlarge', name: 'Extra Large' }
  ];

  const handleTypographyChange = (field, value) => {
    updateDesignConfig('typography', { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Header Font */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Type className="inline w-4 h-4 mr-2" />
          Header Font
        </label>
        <div className="grid grid-cols-2 gap-3">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => handleTypographyChange('headerFont', font.id)}
              className={`p-3 border-2 rounded-lg text-left transition-colors ${
                typography.headerFont === font.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{font.name}</div>
              <div className="text-sm text-gray-600">{font.example}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Body Font */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Body Font
        </label>
        <div className="grid grid-cols-2 gap-3">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => handleTypographyChange('bodyFont', font.id)}
              className={`p-3 border-2 rounded-lg text-left transition-colors ${
                typography.bodyFont === font.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{font.name}</div>
              <div className="text-sm text-gray-600">{font.example}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Sizes */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Header Size
          </label>
          <select
            value={typography.headerSize}
            onChange={(e) => handleTypographyChange('headerSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Body Size
          </label>
          <select
            value={typography.bodySize}
            onChange={(e) => handleTypographyChange('bodySize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Font Colors */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Palette className="inline w-4 h-4 mr-2" />
            Header Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={typography.headerColor}
              onChange={(e) => handleTypographyChange('headerColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={typography.headerColor}
              onChange={(e) => handleTypographyChange('headerColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#1f2937"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Body Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={typography.bodyColor}
              onChange={(e) => handleTypographyChange('bodyColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={typography.bodyColor}
              onChange={(e) => handleTypographyChange('bodyColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#4b5563"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyTab;

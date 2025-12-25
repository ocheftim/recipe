// src/components/menus/designer/ColorsTab.js
import React from 'react';
import { Palette, RefreshCw } from 'lucide-react';

const ColorsTab = ({ designConfig, updateDesignConfig }) => {
  const { colors } = designConfig;

  const colorPresets = [
    {
      name: 'Classic',
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937'
      }
    },
    {
      name: 'Elegant',
      colors: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#d97706',
        background: '#f9fafb',
        text: '#111827'
      }
    },
    {
      name: 'Warm',
      colors: {
        primary: '#dc2626',
        secondary: '#7c2d12',
        accent: '#f59e0b',
        background: '#fffbeb',
        text: '#1c1917'
      }
    },
    {
      name: 'Cool',
      colors: {
        primary: '#0891b2',
        secondary: '#475569',
        accent: '#06b6d4',
        background: '#f0f9ff',
        text: '#0f172a'
      }
    }
  ];

  const handleColorChange = (field, value) => {
    updateDesignConfig('colors', { [field]: value });
  };

  const applyPreset = (preset) => {
    updateDesignConfig('colors', preset.colors);
  };

  const resetColors = () => {
    updateDesignConfig('colors', {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    });
  };

  return (
    <div className="space-y-6">
      {/* Color Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            <Palette className="inline w-4 h-4 mr-2" />
            Color Presets
          </label>
          <button
            onClick={resetColors}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
          >
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="font-medium mb-2">{preset.name}</div>
              <div className="flex space-x-1">
                {Object.values(preset.colors).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Custom Colors
        </label>
        <div className="space-y-4">
          {[
            { key: 'primary', label: 'Primary Color', description: 'Main brand color' },
            { key: 'secondary', label: 'Secondary Color', description: 'Supporting color' },
            { key: 'accent', label: 'Accent Color', description: 'Highlights and CTAs' },
            { key: 'background', label: 'Background Color', description: 'Main background' },
            { key: 'text', label: 'Text Color', description: 'Primary text color' }
          ].map((colorOption) => (
            <div key={colorOption.key} className="flex items-center space-x-3">
              <input
                type="color"
                value={colors[colorOption.key]}
                onChange={(e) => handleColorChange(colorOption.key, e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{colorOption.label}</div>
                <div className="text-xs text-gray-600">{colorOption.description}</div>
              </div>
              <input
                type="text"
                value={colors[colorOption.key]}
                onChange={(e) => handleColorChange(colorOption.key, e.target.value)}
                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Color Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Color Preview
        </label>
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: colors.background,
            color: colors.text,
            borderColor: colors.secondary
          }}
        >
          <h3 
            className="text-lg font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Sample Menu Header
          </h3>
          <p className="mb-2">
            This is how your menu text will appear with the selected colors.
          </p>
          <button
            className="px-4 py-2 rounded text-white font-medium"
            style={{ backgroundColor: colors.accent }}
          >
            Sample Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorsTab;

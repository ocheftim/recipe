// src/components/recipes/RecipesActions.js
import React, { useState } from 'react';
import { Download, Upload, ChevronDown } from 'lucide-react';

const RecipesActions = ({ onExport, onImport }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = () => {
    console.log('Export Recipes');
    onExport?.();
    setShowDropdown(false);
  };

  const handleImport = () => {
    console.log('Import Recipes');
    onImport?.();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium"
        style={{ color: '#2A3E51' }}
      >
        <Download size={16} />
        Export/Import
        <ChevronDown size={16} />
      </button>
      
      {showDropdown && (
        <>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: '#2A3E51' }}
              >
                <Download size={16} />
                Export Recipes
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: '#2A3E51' }}
              >
                <Upload size={16} />
                Import Recipes
              </button>
            </div>
          </div>
          
          {/* Click outside to close */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        </>
      )}
    </div>
  );
};

export default RecipesActions;
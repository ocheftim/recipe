import React, { useState } from 'react';
import { Download, Upload, ChevronDown } from 'lucide-react';
import styles from '../ingredients/ingredients.module.css';

const ExportImportDropdown = ({ onExport, onImport }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = () => {
    onExport();
    setShowDropdown(false);
  };

  const handleImport = () => {
    onImport();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.unifiedControl}
      >
        <Download className="w-4 h-4" />
        Export/Import
        <ChevronDown className="w-4 h-4" />
      </button>

      {showDropdown && (
        <>
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium hover:bg-gray-50 text-left text-gray-700"
              >
                <Download className="w-4 h-4" />
                Export Ingredients
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium hover:bg-gray-50 text-left text-gray-700"
              >
                <Upload className="w-4 h-4" />
                Import Ingredients
              </button>
            </div>
          </div>
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
        </>
      )}
    </div>
  );
};

export default ExportImportDropdown;
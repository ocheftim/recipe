// src/components/inventory/ColumnViewMenu.js - Simplified for Phase 2
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { BUTTON_STYLES, COLORS } from '../../constants/inventoryConstants';

const ColumnViewMenu = ({ 
  visibleColumns, 
  onVisibleColumnsChange 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleColumnToggle = (column) => {
    onVisibleColumnsChange({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };

  const columnLabels = {
    name: 'Item Name',
    code: 'Code',
    category: 'Category',
    supplier: 'Supplier',
    currentStock: 'Current Stock',
    unit: 'Unit',
    status: 'Status',
    costPerUnit: 'Cost/Unit',
    lastReceived: 'Last Received',
    expirationDate: 'Expires',
    location: 'Location'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={BUTTON_STYLES.primary}
        style={{ color: COLORS.primary }}
      >
        <Settings size={16} />
        Columns
      </button>
      
      {showMenu && (
        <>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Show Columns
              </div>
              {Object.entries(columnLabels).map(([key, label]) => (
                <label key={key} className="flex items-center px-3 py-1 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns[key] || false}
                    onChange={() => handleColumnToggle(key)}
                    className="mr-2"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Click outside to close */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
        </>
      )}
    </div>
  );
};

export default ColumnViewMenu;
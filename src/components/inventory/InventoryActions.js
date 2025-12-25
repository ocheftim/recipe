// src/components/inventory/InventoryActions.js
import React, { useState } from 'react';
import { Package, Plus, Minus, Download, Upload, ChevronDown } from 'lucide-react';
import { BUTTON_STYLES, COLORS } from '../../constants/inventoryConstants';

const InventoryActions = ({ 
  onReceiveStock, 
  onStockAdjustment, 
  onNewItem,
  onExport, 
  onImport 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleReceiveStock = () => {
    console.log('Receive Stock');
    onReceiveStock?.();
    setShowDropdown(false);
  };

  const handleStockAdjustment = () => {
    console.log('Stock Adjustment');
    onStockAdjustment?.();
    setShowDropdown(false);
  };

  const handleNewItem = () => {
    console.log('New Inventory Item');
    onNewItem?.();
    setShowDropdown(false);
  };

  const handleExport = () => {
    console.log('Export Inventory');
    onExport?.();
    setShowDropdown(false);
  };

  const handleImport = () => {
    console.log('Import Inventory');
    onImport?.();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={BUTTON_STYLES.primary}
        style={{ color: COLORS.primary }}
      >
        <Package size={16} />
        Inventory Actions
        <ChevronDown size={16} />
      </button>
      
      {showDropdown && (
        <>
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <button
                onClick={handleReceiveStock}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: COLORS.primary }}
              >
                <Plus size={16} />
                Receive Stock
              </button>
              <button
                onClick={handleStockAdjustment}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: COLORS.primary }}
              >
                <Minus size={16} />
                Stock Adjustment
              </button>
              <button
                onClick={handleNewItem}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: COLORS.primary }}
              >
                <Package size={16} />
                New Item
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: COLORS.primary }}
              >
                <Download size={16} />
                Export Inventory
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                style={{ color: COLORS.primary }}
              >
                <Upload size={16} />
                Import Inventory
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

export default InventoryActions;
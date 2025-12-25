// src/components/inventory/InventoryStats.js
import React from 'react';
import { COLORS, LAYOUT } from '../../constants/inventoryConstants';

const InventoryStats = ({ 
  inventoryCount, 
  totalInventoryCount, 
  viewMode,
  stats 
}) => {
  return (
    <div className={`${LAYOUT.statsMargin} space-y-4`}>
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalItems}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600">In Stock</div>
          <div className="text-2xl font-bold text-green-800">{stats.inStock}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-yellow-600">Low Stock</div>
          <div className="text-2xl font-bold text-yellow-800">{stats.lowStock}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-red-600">Out of Stock</div>
          <div className="text-2xl font-bold text-red-800">{stats.outOfStock}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600">Total Value</div>
          <div className="text-2xl font-bold text-blue-800">${stats.totalValue?.toFixed(2)}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-orange-600">Expiring Soon</div>
          <div className="text-2xl font-bold text-orange-800">{stats.expiringSoon}</div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm" style={{ color: COLORS.primary }}>
          Showing {inventoryCount} of {totalInventoryCount} inventory items
          {viewMode === 'list' && ' • Virtual scrolling enabled'}
        </p>
      </div>
    </div>
  );
};

export default InventoryStats;
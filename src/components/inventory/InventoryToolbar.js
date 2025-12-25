// src/components/inventory/InventoryToolbar.js - FIXED (No ViewModeToggle)
import React from 'react';
import { Plus } from 'lucide-react';
import InventorySearch from './InventorySearch';
import InventoryFilters from './InventoryFilters';
import InventoryActions from './InventoryActions';
// import ViewModeToggle from '../share../shared/ViewModeToggle'; // ✅ COMMENTED OUT for now
import ColumnViewMenu from './ColumnViewMenu';
import { BUTTON_STYLES, COLORS, LAYOUT } from '../../constants/inventoryConstants';

const InventoryToolbar = ({
  // Search props
  searchTerm,
  onSearchChange,
  
  // View props
  viewMode,
  onViewModeChange,
  
  // Filter props
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  supplierFilter,
  onSupplierFilterChange,
  categories,
  suppliers,
  statuses,
  
  // Column props
  visibleColumns,
  onVisibleColumnsChange,
  columnOrder,
  onColumnOrderChange,
  hoveredButton,
  setHoveredButton,
  
  // Action props
  onNewItem,
  onReceiveStock,
  onStockAdjustment,
  onExport,
  onImport
}) => {
  return (
    <div 
      className={`flex flex-col gap-4 p-5 rounded-lg shadow-sm ${LAYOUT.toolbarMargin} border border-gray-200`}
      style={{ backgroundColor: COLORS.background }}
    >
      
      {/* Top Row - Search and Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <InventorySearch 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />

          {/* View Mode Toggle - COMMENTED OUT for now */}
          {/* <ViewModeToggle 
            currentView={viewMode}
            onViewChange={onViewModeChange}
          /> */}

          {/* Simple View Toggle Buttons */}
          <div className="flex gap-1 bg-white rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cards
            </button>
          </div>

          {/* New Item Button */}
          <button
            onClick={onNewItem}
            className={BUTTON_STYLES.primary}
            style={{ color: COLORS.primary }}
            type="button"
          >
            <Plus size={16} />
            New Item
          </button>
        </div>

        {/* Right side - View controls and actions */}
        <div className="flex items-center gap-3">
          {/* Column Menu - Only show for list view */}
          {viewMode === 'list' && (
            <ColumnViewMenu
              visibleColumns={visibleColumns}
              columnOrder={columnOrder}
              onVisibleColumnsChange={onVisibleColumnsChange}
              onColumnOrderChange={onColumnOrderChange}
              setHoveredButton={setHoveredButton}
              hoveredButton={hoveredButton}
            />
          )}

          {/* Inventory Actions */}
          <InventoryActions 
            onReceiveStock={onReceiveStock}
            onStockAdjustment={onStockAdjustment}
            onNewItem={onNewItem}
            onExport={onExport}
            onImport={onImport}
          />
        </div>
      </div>

      {/* Bottom Row - Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <span className="text-sm font-medium" style={{ color: COLORS.primary }}>
          Filter by:
        </span>
        <InventoryFilters
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={onCategoryFilterChange}
          supplierFilter={supplierFilter}
          onSupplierFilterChange={onSupplierFilterChange}
          categories={categories}
          suppliers={suppliers}
          statuses={statuses}
        />
      </div>
    </div>
  );
};

export default InventoryToolbar;
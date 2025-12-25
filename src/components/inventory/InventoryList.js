// src/components/inventory/InventoryList.js
import React from 'react';
import InventoryCard from './InventoryCard';
import InventoryTable from './InventoryTable';
import { FIELD_WIDTHS } from '../../constants/inventoryConstants';

const InventoryList = ({
  inventory,
  viewMode = 'table',
  sortConfig,
  handleSort,
  openItemModal,
  handleItemAction,
  visibleColumns,
  columnOrder,
  loading = false,
  hoveredButton,
  setHoveredButton,
  className = ""
}) => {
  // Define field widths that InventoryTable expects
  const fieldWidths = FIELD_WIDTHS;

  const handleEdit = (item) => {
    openItemModal?.(item);
  };

  const handleReceive = (item) => {
    handleItemAction?.('receive', item);
  };

  const handleAdjust = (item) => {
    handleItemAction?.('adjust', item);
  };

  const handleDelete = (item) => {
    handleItemAction?.('delete', item);
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!inventory || inventory.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 mb-2">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No inventory items found</h3>
        <p className="text-gray-500">
          {inventory?.length === 0 ? 'Create your first inventory item to get started' : 'Try adjusting your search or filters'}
        </p>
      </div>
    );
  }

  // Table View
  if (viewMode === 'table') {
    // Define valid columns that exist in InventoryTable
    const validColumns = [
      'name', 'code', 'category', 'supplier', 'currentStock', 'unit',
      'status', 'costPerUnit', 'lastReceived', 'expirationDate', 'location'
    ];

    // Filter columnOrder to only include valid columns
    const filteredColumnOrder = columnOrder.filter(col => validColumns.includes(col));

    // Filter visibleColumns to only include valid columns
    const filteredVisibleColumns = Object.fromEntries(
      Object.entries(visibleColumns || {}).filter(([key]) => validColumns.includes(key))
    );

    return (
      <div className={className}>
        <InventoryTable
          inventory={inventory}
          visibleColumns={filteredVisibleColumns}
          columnOrder={filteredColumnOrder}
          sortColumn={sortConfig?.key}
          sortDirection={sortConfig?.direction}
          onSort={handleSort}
          onEditItem={handleEdit}
          onReceiveStock={handleReceive}
          onAdjustStock={handleAdjust}
          onDeleteItem={(itemId) => {
            // Find the full item object by ID
            const item = inventory.find(i => i.id === itemId);
            if (item) {
              handleDelete(item);
            }
          }}
          FIELD_WIDTHS={fieldWidths}
        />
      </div>
    );
  }

  // Cards View
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onReceive={handleReceive}
            onAdjust={handleAdjust}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
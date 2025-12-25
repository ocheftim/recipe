// src/components/inventory/InventoryFilters.js - COMPLETE FIXED VERSION
import React from 'react';
import { INPUT_STYLES, COLORS } from '../../constants/inventoryConstants';

const InventoryFilters = ({
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  supplierFilter,
  onSupplierFilterChange,
  categories,
  suppliers,
  statuses
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className={INPUT_STYLES.select}
        style={{ color: COLORS.primary }}
      >
        <option value="All">All Status</option>
        {statuses && statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryFilterChange(e.target.value)}
        className={INPUT_STYLES.select}
        style={{ color: COLORS.primary }}
      >
        <option value="All">All Categories</option>
        {categories && categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* Supplier Filter - FIXED: Handle supplier names (strings) */}
      <select
        value={supplierFilter}
        onChange={(e) => onSupplierFilterChange(e.target.value)}
        className={INPUT_STYLES.select}
        style={{ color: COLORS.primary }}
      >
        <option value="All">All Suppliers</option>
        {suppliers && suppliers.map(supplier => (
          <option key={supplier} value={supplier}>
            {supplier}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InventoryFilters;
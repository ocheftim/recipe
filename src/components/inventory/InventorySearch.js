// src/components/inventory/InventorySearch.js
import React from 'react';
import { Search } from 'lucide-react';
import { INPUT_STYLES, COLORS } from '../../constants/inventoryConstants';

const InventorySearch = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search inventory items..." 
}) => {
  return (
    <div className="relative">
      <Search size={20} className="absolute left-3 top-3" style={{ color: COLORS.gray400 }} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={INPUT_STYLES.search}
      />
    </div>
  );
};

export default InventorySearch;
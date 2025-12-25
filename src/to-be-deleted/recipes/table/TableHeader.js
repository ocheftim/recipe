// src/components/recipes/table/TableHeader.js
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import TableCell from './TableCell';

const TableHeader = ({ 
  visibleColumns, 
  columnOrder, 
  sortColumn, 
  sortDirection, 
  onSort, 
  headerConfig, 
  FIELD_WIDTHS 
}) => {
  const getSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="ml-1" /> : 
      <ChevronDown size={16} className="ml-1" />;
  };

  const renderHeaderCell = (columnKey) => {
    const config = headerConfig[columnKey];
    if (!config) return null;

    const content = (
      <button
        onClick={() => onSort(columnKey)}
        className="flex items-center justify-center w-full h-full text-left hover:bg-gray-100 transition-colors duration-150 px-2 py-1 rounded"
        disabled={!config.sortable}
        style={{ cursor: config.sortable ? 'pointer' : 'default' }}
      >
        <span className="truncate">{config.label}</span>
        {config.sortable && getSortIcon(columnKey)}
      </button>
    );

    const fieldConfig = FIELD_WIDTHS[columnKey];
    const width = typeof fieldConfig === 'string' ? fieldConfig : fieldConfig?.width || '100px';

    return (
      <TableCell
        key={columnKey}
        content={content}
        width={width}
        alignment={config.alignment}
        isHeader={true}
      />
    );
  };

  return (
    <div className="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
      {columnOrder
        .filter(column => visibleColumns[column])
        .map(renderHeaderCell)}
    </div>
  );
};

export default TableHeader;

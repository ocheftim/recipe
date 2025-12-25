// src/components/recipes/table/TableCell.js
import React from 'react';

const TableCell = ({ 
  content, 
  width, 
  alignment = 'center', 
  additionalClasses = '', 
  isHeader = false 
}) => {
  const justifyContent = alignment === 'right' ? 'flex-end' : alignment === 'center' ? 'center' : 'flex-start';
  
  const cellClasses = `
    flex items-center px-2 py-2 border-b border-gray-200 text-sm
    ${isHeader ? 'font-semibold text-gray-700 bg-gray-50' : 'text-gray-900'}
    ${additionalClasses}
  `.trim();

  return (
    <div
      className={cellClasses}
      style={{ 
        width,
        minWidth: width,
        justifyContent,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {content}
    </div>
  );
};

export default TableCell;

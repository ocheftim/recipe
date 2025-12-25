import React from 'react';
import { COLUMN_LABELS, REQUIRED_COLUMNS } from '../../config/columnConfig.js';

const ColumnItem = ({
  columnKey,
  index,
  isVisible,
  isDragged,
  isDraggedOver,
  onToggleVisibility,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd
}) => {
  const isRequired = REQUIRED_COLUMNS.includes(columnKey);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, columnKey, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`
        group flex items-center px-3 py-1.5 cursor-move select-none transition-all
        ${isDragged ? 'opacity-50' : ''}
        ${isDraggedOver ? 'bg-blue-50 border-y border-blue-200' : 'hover:bg-gray-50'}
      `}
    >
      {/* Drag Handle */}
      <div className="mr-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm2-6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm2 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm2 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
        </svg>
      </div>

      {/* Checkbox & Label */}
      <label className="flex items-center cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={isVisible}
          onChange={() => onToggleVisibility(columnKey)}
          onClick={(e) => e.stopPropagation()} // Prevent drag when clicking checkbox
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
        />
        
        {/* Column Name */}
        <span className="ml-2 text-sm text-gray-700">
          {COLUMN_LABELS[columnKey]}
        </span>
        
        {/* Required Badge */}
        {isRequired && (
          <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
            Required
          </span>
        )}
      </label>
    </div>
  );
};

export default ColumnItem;
// src/components/recipes/BulkActions.js
import React from 'react';
import { Download, Trash2, X } from 'lucide-react';
import { THEME } from '../../constants/theme';

export const BulkActions = ({ selectedCount, onExport, onDelete, onCancel }) => {
  return (
    <div 
      className="flex items-center justify-between px-4 py-2 mt-3 rounded-md border"
      style={{ 
        backgroundColor: '#f0fdf4',
        borderColor: THEME.yellowGreen 
      }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium" style={{ color: THEME.gunmetal }}>
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </span>
        
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-white transition-colors"
          style={{ borderColor: THEME.silver }}
        >
          <Download size={14} />
          Export Selected
        </button>
        
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-3 py-1 text-sm border border-red-300 rounded hover:bg-red-50 text-red-600 transition-colors"
        >
          <Trash2 size={14} />
          Delete Selected
        </button>
      </div>
      
      <button
        onClick={onCancel}
        className="p-1 rounded hover:bg-gray-200 transition-colors"
      >
        <X size={16} style={{ color: THEME.charcoal }} />
      </button>
    </div>
  );
};
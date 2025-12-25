// src/utils/ingredientsHelpers.js
import { FIELD_WIDTHS, COLUMN_CONFIG } from '../config/ingredientsConfig';
import { formatCurrency } from './formatters';

export const getPrimaryUnitCost = (ingredient) => {
  switch (ingredient.primaryRecipeUnit) {
    case 'each':
      return ingredient.costPerEach ? formatCurrency(ingredient.costPerEach) + '/ea' : '';
    case 'dozen':
      return ingredient.costPerDozen ? formatCurrency(ingredient.costPerDozen) + '/dz' : '';
    case 'lb':
      return ingredient.costPerPound ? formatCurrency(ingredient.costPerPound) + '/lb' : '';
    default:
      return ingredient.costPerPound ? formatCurrency(ingredient.costPerPound) + '/lb' : '';
  }
};

export const calculateTotalWidth = (visibleColumns, columnOrder) => {
  return columnOrder.reduce((width, column) => {
    // Safety check: only include columns that exist in config and are visible
    if (visibleColumns[column] && FIELD_WIDTHS[column] && COLUMN_CONFIG[column]) {
      return width + parseInt(FIELD_WIDTHS[column]);
    }
    return width;
  }, parseInt(FIELD_WIDTHS.actions));
};

export const getStoredValue = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent fail for localStorage issues
  }
};

// Helper to clean up old column configurations
export const sanitizeColumnOrder = (columnOrder, validColumns) => {
  return columnOrder.filter(column => validColumns.includes(column));
};

export const sanitizeVisibleColumns = (visibleColumns, validColumns) => {
  const sanitized = {};
  validColumns.forEach(column => {
    sanitized[column] = visibleColumns[column] !== undefined ? visibleColumns[column] : COLUMN_CONFIG[column]?.defaultVisible || false;
  });
  return sanitized;
};
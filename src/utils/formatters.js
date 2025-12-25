// src/utils/ingredients/formatters.js

export const formatCurrency = (value) => {
  // Handle undefined, null, or invalid values
  if (value === undefined || value === null || isNaN(value)) {
    return '$0.00';
  }
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '$0.00';
  }
  
  return `$${numValue.toFixed(2)}`;
};

export const formatPercentage = (value) => {
  // Handle undefined, null, or invalid values
  if (value === undefined || value === null || isNaN(value)) {
    return '0%';
  }
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0%';
  }
  
  return `${numValue.toFixed(1)}%`;
};

export const formatQuantity = (value, unit) => {
  // Handle undefined, null, or invalid values
  if (value === undefined || value === null || isNaN(value)) {
    return `0 ${unit || ''}`;
  }
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return `0 ${unit || ''}`;
  }
  
  // For whole numbers, don't show decimals
  if (Number.isInteger(numValue)) {
    return `${numValue} ${unit || ''}`.trim();
  }
  
  // For decimals, show up to 2 decimal places
  return `${numValue.toFixed(2)} ${unit || ''}`.trim();
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
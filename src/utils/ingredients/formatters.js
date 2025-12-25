// src/utils/ingredients/formatters.js

export const formatCurrency = (value) => {
  const num = parseFloat(value) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

export const formatNumber = (value, decimals = 2) => {
  const num = parseFloat(value) || 0;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

export const formatPercentage = (value, decimals = 1) => {
  const num = parseFloat(value) || 0;
  return `${num.toFixed(decimals)}%`;
};

export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(d);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

export const formatWeight = (value, unit = 'lb') => {
  const num = parseFloat(value) || 0;
  return `${formatNumber(num)} ${unit}`;
};

export const formatVolume = (value, unit = 'gal') => {
  const num = parseFloat(value) || 0;
  return `${formatNumber(num)} ${unit}`;
};

export const formatCount = (value, singular = 'item', plural = 'items') => {
  const num = parseInt(value) || 0;
  return `${num} ${num === 1 ? singular : plural}`;
};
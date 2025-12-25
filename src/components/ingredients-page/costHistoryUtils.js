import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

// Trend icon utility
export const getTrendIcon = (current, previous) => {
  if (current > previous) return <TrendingUp size={16} className="text-red-500" />;
  if (current < previous) return <TrendingDown size={16} className="text-green-500" />;
  return null;
};

// Calculate cost change utility
export const calculateCostChange = (current, previous) => {
  if (!previous) return null;
  
  if (current > previous) {
    return {
      type: 'increase',
      amount: current - previous,
      text: `+${formatCurrency(current - previous)} increase`,
      className: 'text-red-600'
    };
  } else if (current < previous) {
    return {
      type: 'decrease', 
      amount: previous - current,
      text: `-${formatCurrency(previous - current)} decrease`,
      className: 'text-green-600'
    };
  } else {
    return {
      type: 'same',
      amount: 0,
      text: 'No change',
      className: 'text-gray-500'
    };
  }
};

// Filter and sort cost history for an ingredient
export const getIngredientHistory = (costHistory, ingredientId) => {
  return costHistory
    .filter(entry => entry.ingredientId === ingredientId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
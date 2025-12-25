export const numberHelpers = {
  /**
   * Round to specified decimal places
   */
  roundTo: (num, decimals = 2) => {
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  /**
   * Calculate percentage change
   */
  percentageChange: (oldValue, newValue) => {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
  },

  /**
   * Check if number is within acceptable range
   */
  isInRange: (value, min, max) => {
    return value >= min && value <= max;
  },

  /**
   * Generate random ID
   */
  generateId: () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  },

  /**
   * Calculate compound annual growth rate
   */
  calculateCAGR: (startValue, endValue, periods) => {
    if (startValue <= 0 || endValue <= 0 || periods <= 0) return 0;
    return (Math.pow(endValue / startValue, 1 / periods) - 1) * 100;
  },

  /**
   * Calculate weighted average
   */
  weightedAverage: (values, weights) => {
    if (values.length !== weights.length) return 0;
    const numerator = values.reduce((sum, value, index) => sum + (value * weights[index]), 0);
    const denominator = weights.reduce((sum, weight) => sum + weight, 0);
    return denominator > 0 ? numerator / denominator : 0;
  }
};

/**
 * Array and data manipulation utilities
 */

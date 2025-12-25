export const dataHelpers = {
  /**
   * Group array of objects by key
   */
  groupBy: (array, key) => {
    return array.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  },

  /**
   * Sort array by multiple criteria
   */
  multiSort: (array, sortCriteria) => {
    return [...array].sort((a, b) => {
      for (const { key, direction = 'asc' } of sortCriteria) {
        let aVal = a[key];
        let bVal = b[key];
        
        // Handle null/undefined values
        if (aVal == null && bVal == null) continue;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        
        // Compare values
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  },

  /**
   * Remove duplicates from array of objects
   */
  uniqueBy: (array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  },

  /**
   * Get nested object value safely
   */
  getNestedValue: (obj, path, defaultValue = null) => {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
  },

  /**
   * Deep clone object
   */
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => dataHelpers.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      Object.keys(obj).forEach(key => {
        cloned[key] = dataHelpers.deepClone(obj[key]);
      });
      return cloned;
    }
  },

  /**
   * Check if two objects are equal (shallow comparison)
   */
  isEqual: (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    return keys1.every(key => obj1[key] === obj2[key]);
  }
};

/**
 * Validation utilities
 */

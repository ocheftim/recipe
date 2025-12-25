export const storageHelpers = {
  /**
   * Save data to localStorage with error handling
   */
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  },

  /**
   * Load data from localStorage with error handling
   */
  load: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all app data from localStorage
   */
  clearAppData: (appPrefix = 'toque_') => {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(appPrefix))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear app data:', error);
      return false;
    }
  }
};

/**
 * Export/Import utilities
 */

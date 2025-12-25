export const dateHelpers = {
  /**
   * Format date for display
   */
  formatDate: (date, options = {}) => {
    const defaultOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  },

  /**
   * Format date for input fields
   */
  formatInputDate: (date) => {
    return new Date(date).toISOString().split('T')[0];
  },

  /**
   * Get days between dates
   */
  daysBetween: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  /**
   * Check if date is recent (within specified days)
   */
  isRecent: (date, days = 30) => {
    const targetDate = new Date(date);
    const now = new Date();
    const diffDays = (now - targetDate) / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  },

  /**
   * Get next delivery date based on supplier schedule
   */
  getNextDeliveryDate: (deliveryDays = []) => {
    if (!deliveryDays.length) return null;
    
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayName = dayNames[nextDate.getDay()];
      
      if (deliveryDays.includes(dayName)) {
        return nextDate;
      }
    }
    
    return null;
  }
};

/**
 * Text and string utilities
 */

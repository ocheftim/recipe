export const textHelpers = {
  /**
   * Capitalize first letter of each word
   */
  titleCase: (str) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Truncate text with ellipsis
   */
  truncate: (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  },

  /**
   * Generate initials from name
   */
  getInitials: (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substr(0, 2);
  },

  /**
   * Clean and format phone numbers
   */
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.substr(0, 3)}) ${cleaned.substr(3, 3)}-${cleaned.substr(6)}`;
    }
    return phone; // Return original if not 10 digits
  },

  /**
   * Extract email from contact info string
   */
  extractEmail: (contactInfo) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const match = contactInfo.match(emailRegex);
    return match ? match[0] : null;
  },

  /**
   * Extract phone from contact info string
   */
  extractPhone: (contactInfo) => {
    const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/;
    const match = contactInfo.match(phoneRegex);
    return match ? match[0] : null;
  }
};

/**
 * Number and calculation utilities
 */

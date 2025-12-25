export const validationHelpers = {
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  /**
   * Validate required fields
   */
  validateRequired: (data, requiredFields) => {
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors[field] = `${field} is required`;
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  /**
   * Validate number ranges
   */
  validateNumberRange: (value, min, max, fieldName) => {
    if (value < min) return `${fieldName} must be at least ${min}`;
    if (value > max) return `${fieldName} must be no more than ${max}`;
    return null;
  },

  /**
   * Validate ingredient data specifically
   */
  validateIngredientData: (ingredient) => {
    const errors = [];
    
    if (!ingredient.name?.trim()) {
      errors.push('Ingredient name is required');
    }
    
    if (!ingredient.apCost || ingredient.apCost <= 0) {
      errors.push('AP cost must be greater than 0');
    }
    
    if (!ingredient.caseDescription?.trim()) {
      errors.push('Case description is required');
    }
    
    if (!ingredient.caseWeight && !ingredient.caseCount) {
      errors.push('Either case weight or case count is required');
    }
    
    if (ingredient.yieldPercentage < 0 || ingredient.yieldPercentage > 100) {
      errors.push('Yield percentage must be between 0 and 100');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

/**
 * Food service specific utilities
 */

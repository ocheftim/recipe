// src/services/recipeOptionsService.js

const STORAGE_KEY = 'toqueworks_recipe_options';

const defaultOptions = {
  categories: [
    'Appetizers',
    'Entrees', 
    'Desserts',
    'Beverages',
    'Sides',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Soups',
    'Salads',
    'Breads',
    'Sauces'
  ],
  cuisines: [
    'American',
    'Italian',
    'Mexican',
    'Chinese',
    'Japanese',
    'French',
    'Indian',
    'Thai',
    'Mediterranean',
    'Greek',
    'Spanish',
    'Korean'
  ],
  outlets: [
    'Main Kitchen',
    'Prep Kitchen',
    'Bakery',
    'Grill Station',
    'Cold Station',
    'Bar'
  ],
  menus: [
    'Regular Menu',
    'Lunch Menu',
    'Dinner Menu',
    'Brunch Menu',
    'Kids Menu',
    'Dessert Menu',
    'Bar Menu',
    'Seasonal Menu'
  ],
  yieldUnits: [
    'servings',
    'portions',
    'cups',
    'quarts',
    'gallons',
    'liters',
    'pieces',
    'dozen',
    'pounds',
    'kilograms',
    'ounces',
    'grams'
  ],
  dietary: [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Low-Carb',
    'Keto',
    'Paleo',
    'Halal',
    'Kosher',
    'Low-Sodium',
    'Sugar-Free'
  ]
};

export const getDefaultOptions = () => {
  return JSON.parse(JSON.stringify(defaultOptions));
};

export const getRecipeOptions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all categories exist
      return {
        ...defaultOptions,
        ...parsed
      };
    }
  } catch (error) {
    console.error('Error loading recipe options:', error);
  }
  return getDefaultOptions();
};

export const saveRecipeOptions = (options) => {
  try {
    // Validate that options is an object with arrays
    const validOptions = {};
    Object.keys(defaultOptions).forEach(key => {
      if (Array.isArray(options[key])) {
        validOptions[key] = options[key].filter(item => 
          typeof item === 'string' && item.trim().length > 0
        );
      } else {
        validOptions[key] = defaultOptions[key];
      }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validOptions));
    return true;
  } catch (error) {
    console.error('Error saving recipe options:', error);
    return false;
  }
};

export const resetToDefaults = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOptions));
    return true;
  } catch (error) {
    console.error('Error resetting recipe options:', error);
    return false;
  }
};

// Helper function to get a specific category of options
export const getOptionsByCategory = (category) => {
  const options = getRecipeOptions();
  return options[category] || [];
};

// Helper function to add an item to a category
export const addOptionToCategory = (category, item) => {
  const options = getRecipeOptions();
  if (!options[category]) {
    options[category] = [];
  }
  if (!options[category].includes(item)) {
    options[category].push(item);
    return saveRecipeOptions(options);
  }
  return false;
};

// Helper function to remove an item from a category
export const removeOptionFromCategory = (category, item) => {
  const options = getRecipeOptions();
  if (options[category]) {
    options[category] = options[category].filter(opt => opt !== item);
    return saveRecipeOptions(options);
  }
  return false;
};

// Export all options as a JSON file
export const exportOptions = () => {
  const options = getRecipeOptions();
  const dataStr = JSON.stringify(options, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `recipe-options-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Import options from a JSON file
export const importOptions = (fileContent) => {
  try {
    const imported = JSON.parse(fileContent);
    // Validate structure
    const validOptions = {};
    Object.keys(defaultOptions).forEach(key => {
      if (Array.isArray(imported[key])) {
        validOptions[key] = imported[key].filter(item => 
          typeof item === 'string' && item.trim().length > 0
        );
      } else {
        validOptions[key] = defaultOptions[key];
      }
    });
    return saveRecipeOptions(validOptions);
  } catch (error) {
    console.error('Error importing recipe options:', error);
    return false;
  }
};
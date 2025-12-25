// src/utils/ingredientsUtils.js

// Generate more sample data for scrolling demonstration - Updated with proper allergen/dietary format
export const generateMoreIngredients = (baseIngredients) => {
  // ✅ CRITICAL: Function to get today's date in MM/DD/YY format
  const getTodaysDate = () => {
    const now = new Date();
    return `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear().toString().slice(-2)}`;
  };

  // ✅ CRITICAL: Function to generate random past dates for variety
  const getRandomPastDate = () => {
    const now = new Date();
    const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const randomTime = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
    const randomDate = new Date(randomTime);
    return `${(randomDate.getMonth() + 1).toString().padStart(2, '0')}/${randomDate.getDate().toString().padStart(2, '0')}/${randomDate.getFullYear().toString().slice(-2)}`;
  };

  const categories = ['Produce', 'Protein', 'Dairy', 'Grain', 'Spice', 'Beverage', 'Condiment', 'Frozen'];
  const vendors = ['Sysco', 'US Foods', 'Performance Food', 'Gordon Food Service', 'Fresh Direct'];
  const allergenOptions = [
    [],
    ['Dairy'],
    ['Gluten'],
    ['Nuts'],
    ['Eggs'],
    ['Fish'],
    ['Shellfish'],
    ['Soy'],
    ['Dairy', 'Eggs'],
    ['Nuts', 'Peanuts'],
    ['Gluten', 'Soy']
  ];
  const dietaryOptions = [
    [],
    ['Vegan'],
    ['Vegetarian'],
    ['Gluten-Free'],
    ['Keto'],
    ['Paleo'],
    ['Vegan', 'Gluten-Free'],
    ['Keto', 'Paleo'],
    ['Vegetarian', 'Organic'],
    ['Vegan', 'Keto']
  ];

  // ✅ CRITICAL: Ensure base ingredients have updatedAtFormatted
  const baseWithDates = baseIngredients.map(ingredient => ({
    ...ingredient,
    updatedAtFormatted: ingredient.updatedAtFormatted || getTodaysDate()
  }));

  const moreIngredients = [];
  for (let i = 0; i < 200; i++) {
    moreIngredients.push({
      id: 1000 + i,
      name: `Sample Ingredient ${i + 1}`,
      productCode: `SI${1000 + i}`,
      category: categories[i % categories.length],
      vendorName: vendors[i % vendors.length],
      supplierId: (i % vendors.length) + 1,
      apCost: parseFloat((Math.random() * 50 + 5).toFixed(2)),
      caseDescription: `${Math.floor(Math.random() * 20 + 5)}lb case`,
      costPerPound: parseFloat((Math.random() * 10 + 1).toFixed(2)),
      costPerEach: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
      costPerDozen: parseFloat((Math.random() * 12 + 3).toFixed(2)),
      cases: Math.floor(Math.random() * 20),
      reorderPoint: Math.floor(Math.random() * 5 + 2),
      primaryRecipeUnit: ['lb', 'each', 'dozen'][i % 3],
      lastUpdated: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/24`,
      allergens: allergenOptions[i % allergenOptions.length],
      dietaryTags: dietaryOptions[i % dietaryOptions.length],
      // ✅ CRITICAL: Add the missing updatedAtFormatted field!
      updatedAtFormatted: getRandomPastDate()
    });
  }

  console.log(`✅ Generated ${moreIngredients.length} ingredients with updatedAtFormatted dates`);
  console.log(`✅ Base ingredients: ${baseWithDates.length} (all with dates)`);
  
  return [...baseWithDates, ...moreIngredients];
};

// Utility function to ensure all ingredients have dates
export const ensureIngredientsHaveDates = (ingredients) => {
  const todaysDate = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear().toString().slice(-2)}`;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    updatedAtFormatted: ingredient.updatedAtFormatted || todaysDate
  }));
};

// Migration function to fix existing data
export const migrateIngredientsWithDates = () => {
  const todaysDate = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear().toString().slice(-2)}`;
  
  // Update all localStorage ingredient data
  ['ingredients', 'migratedIngredients', 'persistedIngredients'].forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const ingredients = JSON.parse(data);
        if (Array.isArray(ingredients)) {
          const updated = ingredients.map(ing => ({
            ...ing,
            updatedAtFormatted: ing.updatedAtFormatted || todaysDate
          }));
          localStorage.setItem(key, JSON.stringify(updated));
          console.log(`✅ Updated ${key}: ${updated.length} ingredients`);
        }
      } catch (e) {
        console.warn(`Could not parse ${key}:`, e);
      }
    }
  });
  
  // Mark migration as complete
  localStorage.setItem('ingredientsMigrationCompleted', 'true');
  localStorage.setItem('ingredientsMigrationDate', todaysDate);
  
  return true;
};
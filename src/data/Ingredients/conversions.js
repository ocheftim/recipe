// src/data/ingredients/conversions.js

export const conversions = {
  // Weight conversions
  weight: {
    lbsToOz: 16,
    lbsToKg: 0.453592,
    kgToG: 1000
  },
  
  // Volume conversions
  volume: {
    galToQt: 4,
    qtToCups: 4,
    cupsToFlOz: 8,
    galToL: 3.78541,
    LToMl: 1000
  },
  
  // Ingredient-specific conversions
  ingredients: {
    flour: {
      lbsToCups: 3.75,
      cupsToOz: 4.25
    },
    sugar: {
      lbsToCups: 2.25,
      cupsToOz: 7.05
    },
    butter: {
      lbsToCups: 2,
      cupsToTbsp: 16
    }
  }
};
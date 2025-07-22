// src/utils/setupCategories.js
import { db } from '../firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

const setupCategories = async () => {
  const categories = [
    { id: "vegetables", category: "Vegetables", subcategories: ["Root Vegetables", "Leafy Greens", "Cruciferous", "Nightshades", "Alliums", "Squash/Gourds", "Pods/Seeds", "Mushrooms", "Sea Vegetables", "Sprouts", "Other"] },
    { id: "fruits", category: "Fruits", subcategories: ["Citrus", "Berries", "Stone Fruits", "Tropical", "Apples/Pears", "Melons", "Grapes", "Dried Fruits", "Exotic Fruits", "Other"] },
    { id: "meat", category: "Meat", subcategories: ["Beef", "Pork", "Lamb", "Veal", "Game Meat", "Organ Meat", "Cured Meat", "Sausages", "Ground Meat", "Other"] },
    { id: "poultry", category: "Poultry", subcategories: ["Chicken", "Duck", "Turkey", "Goose", "Game Birds", "Quail", "Other"] },
    { id: "fishSeafood", category: "Fish/Seafood", subcategories: ["Fresh Fish", "Saltwater Fish", "Freshwater Fish", "Shellfish", "Crustaceans", "Mollusks", "Cured/Smoked Fish", "Canned Fish", "Other"] },
    { id: "dairy", category: "Dairy", subcategories: ["Milk", "Cream", "Butter", "Cheese - Fresh", "Cheese - Aged", "Cheese - Blue", "Yogurt", "Sour Cream", "Buttermilk", "Other"] }
  ];

  try {
    for (const cat of categories) {
      const docRef = doc(collection(db, 'categories'), cat.id);
      await setDoc(docRef, {
        category: cat.category,
        subcategories: cat.subcategories
      });
      console.log(`Added category: ${cat.category}`);
    }
    console.log('Categories setup complete.');
  } catch (error) {
    console.error('Error setting up categories:', error);
  }
};

export { setupCategories };
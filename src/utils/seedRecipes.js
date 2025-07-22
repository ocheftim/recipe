// src/utils/seedRecipes.js
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const sampleRecipes = [
  {
    name: "Classic Chicken Alfredo",
    type: "Main Course",
    cuisine: "Italian",
    servings: 4,
    yield: 4,
    yieldUnit: "portions",
    prepTime: 15,
    cookTime: 25,
    cost: 18.50,
    dietary: "gluten-free",
    status: "active",
    lastMade: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    description: "Creamy, rich pasta dish with tender chicken and homemade Alfredo sauce.",
    instructions: "1. Cook pasta according to package directions\n2. Season and cook chicken until golden\n3. Make Alfredo sauce with butter, cream, and Parmesan\n4. Combine all ingredients and serve hot",
    tags: "pasta, chicken, creamy, comfort food",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Beef Stir Fry",
    type: "Main Course",
    cuisine: "Asian",
    servings: 3,
    yield: 3,
    yieldUnit: "portions",
    prepTime: 20,
    cookTime: 15,
    cost: 22.75,
    dietary: "dairy-free",
    status: "active",
    lastMade: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    description: "Quick and healthy stir fry with tender beef and fresh vegetables.",
    instructions: "1. Slice beef into thin strips\n2. Heat oil in wok or large pan\n3. Stir fry beef until browned\n4. Add vegetables and sauce\n5. Serve over rice",
    tags: "beef, vegetables, quick, healthy, asian",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Chocolate Chip Cookies",
    type: "Dessert",
    cuisine: "American",
    servings: 24,
    yield: 24,
    yieldUnit: "cookies",
    prepTime: 15,
    cookTime: 12,
    cost: 8.25,
    dietary: "vegetarian",
    status: "active",
    lastMade: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description: "Classic homemade chocolate chip cookies that are crispy on the outside and chewy inside.",
    instructions: "1. Cream butter and sugars\n2. Add eggs and vanilla\n3. Mix in flour, baking soda, and salt\n4. Fold in chocolate chips\n5. Bake at 375°F for 9-11 minutes",
    tags: "dessert, cookies, chocolate, baking, sweet",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Caesar Salad",
    type: "Appetizer",
    cuisine: "Mediterranean",
    servings: 4,
    yield: 4,
    yieldUnit: "portions",
    prepTime: 15,
    cookTime: 0,
    cost: 12.00,
    dietary: "vegetarian",
    status: "active",
    lastMade: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    description: "Fresh romaine lettuce with homemade Caesar dressing, croutons, and Parmesan cheese.",
    instructions: "1. Wash and chop romaine lettuce\n2. Make dressing with anchovies, garlic, lemon, and Parmesan\n3. Toss lettuce with dressing\n4. Top with croutons and extra Parmesan",
    tags: "salad, appetizer, vegetables, fresh, classic",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Beef Wellington",
    type: "Main Course",
    cuisine: "British",
    servings: 6,
    yield: 6,
    yieldUnit: "portions",
    prepTime: 45,
    cookTime: 35,
    cost: 65.00,
    dietary: "",
    status: "seasonal",
    lastMade: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    description: "Elegant beef tenderloin wrapped in puff pastry with mushroom duxelles.",
    instructions: "1. Sear beef tenderloin on all sides\n2. Prepare mushroom duxelles\n3. Wrap beef in prosciutto and mushrooms\n4. Encase in puff pastry\n5. Bake until pastry is golden and beef is medium-rare",
    tags: "beef, elegant, special occasion, pastry, gourmet",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Fluffy Pancakes",
    type: "Breakfast",
    cuisine: "American",
    servings: 4,
    yield: 8,
    yieldUnit: "pancakes",
    prepTime: 10,
    cookTime: 15,
    cost: 6.50,
    dietary: "vegetarian",
    status: "active",
    lastMade: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    description: "Fluffy buttermilk pancakes perfect for weekend breakfast.",
    instructions: "1. Mix dry ingredients in large bowl\n2. Whisk together wet ingredients\n3. Combine wet and dry ingredients until just mixed\n4. Cook on griddle until bubbles form\n5. Flip and cook until golden",
    tags: "breakfast, pancakes, fluffy, weekend, syrup",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Tomato Basil Soup",
    type: "Appetizer",
    cuisine: "Italian",
    servings: 6,
    yield: 6,
    yieldUnit: "bowls",
    prepTime: 15,
    cookTime: 30,
    cost: 9.75,
    dietary: "vegetarian, gluten-free",
    status: "active",
    lastMade: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    description: "Rich and creamy tomato soup with fresh basil and a hint of garlic.",
    instructions: "1. Sauté onions and garlic\n2. Add tomatoes and broth\n3. Simmer for 20 minutes\n4. Blend until smooth\n5. Add cream and fresh basil",
    tags: "soup, tomato, basil, comfort food, vegetarian",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Grilled Salmon",
    type: "Main Course",
    cuisine: "Scandinavian",
    servings: 4,
    yield: 4,
    yieldUnit: "fillets",
    prepTime: 10,
    cookTime: 12,
    cost: 28.00,
    dietary: "gluten-free, dairy-free, keto",
    status: "active",
    lastMade: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    description: "Perfectly grilled salmon with lemon herb seasoning.",
    instructions: "1. Preheat grill to medium-high\n2. Season salmon with herbs and lemon\n3. Oil grill grates\n4. Grill salmon 6 minutes per side\n5. Serve with lemon wedges",
    tags: "salmon, grilled, healthy, seafood, lemon",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Cold Brew Coffee",
    type: "Beverage",
    cuisine: "American",
    servings: 1,
    yield: 1,
    yieldUnit: "serving",
    prepTime: 5,
    cookTime: 0,
    cost: 3.25,
    dietary: "vegan, dairy-free",
    status: "active",
    lastMade: new Date().toISOString(), // Today
    description: "Refreshing cold brew coffee served over ice with optional cream.",
    instructions: "1. Brew strong coffee and let cool\n2. Fill glass with ice\n3. Pour coffee over ice\n4. Add cream or milk if desired\n5. Sweeten to taste",
    tags: "coffee, cold, refreshing, caffeine, drink",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Vegetable Curry",
    type: "Main Course",
    cuisine: "Indian",
    servings: 6,
    yield: 6,
    yieldUnit: "portions",
    prepTime: 20,
    cookTime: 35,
    cost: 14.50,
    dietary: "vegan, gluten-free, dairy-free",
    status: "active",
    lastMade: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    description: "Aromatic Indian-style curry with mixed vegetables in coconut milk.",
    instructions: "1. Sauté onions, ginger, and garlic\n2. Add curry spices and cook until fragrant\n3. Add vegetables and coconut milk\n4. Simmer until vegetables are tender\n5. Serve over rice with naan",
    tags: "curry, vegetarian, indian, spicy, coconut",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "BBQ Ribs",
    type: "Main Course",
    cuisine: "American",
    servings: 4,
    yield: 2,
    yieldUnit: "racks",
    prepTime: 30,
    cookTime: 180,
    cost: 35.00,
    dietary: "gluten-free, dairy-free",
    status: "seasonal",
    lastMade: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    description: "Slow-cooked pork ribs with homemade BBQ sauce.",
    instructions: "1. Season ribs with dry rub\n2. Smoke or slow cook for 3 hours\n3. Make BBQ sauce\n4. Brush ribs with sauce\n5. Finish on high heat for caramelization",
    tags: "bbq, ribs, pork, smoky, sauce",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Greek Salad",
    type: "Side Dish",
    cuisine: "Greek",
    servings: 4,
    yield: 4,
    yieldUnit: "portions",
    prepTime: 15,
    cookTime: 0,
    cost: 11.25,
    dietary: "vegetarian, gluten-free",
    status: "active",
    lastMade: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    description: "Fresh Mediterranean salad with feta, olives, and cucumber.",
    instructions: "1. Chop tomatoes, cucumber, and red onion\n2. Add olives and feta cheese\n3. Make dressing with olive oil and lemon\n4. Toss salad with dressing\n5. Season with oregano and salt",
    tags: "greek, salad, mediterranean, feta, fresh",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "French Toast",
    type: "Breakfast",
    cuisine: "French",
    servings: 4,
    yield: 8,
    yieldUnit: "slices",
    prepTime: 10,
    cookTime: 15,
    cost: 8.00,
    dietary: "vegetarian",
    status: "active",
    lastMade: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    description: "Classic French toast made with thick brioche and cinnamon.",
    instructions: "1. Whisk eggs, milk, vanilla, and cinnamon\n2. Dip bread slices in mixture\n3. Cook in buttered pan until golden\n4. Flip and cook other side\n5. Serve with syrup and powdered sugar",
    tags: "french toast, breakfast, brioche, cinnamon, syrup",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Mushroom Risotto",
    type: "Side Dish",
    cuisine: "Italian",
    servings: 4,
    yield: 4,
    yieldUnit: "portions",
    prepTime: 15,
    cookTime: 25,
    cost: 16.75,
    dietary: "vegetarian, gluten-free",
    status: "testing",
    lastMade: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    description: "Creamy Italian rice dish with wild mushrooms and Parmesan.",
    instructions: "1. Sauté mushrooms and set aside\n2. Toast arborio rice with onions\n3. Add warm broth one ladle at a time\n4. Stir constantly until creamy\n5. Fold in mushrooms and Parmesan",
    tags: "risotto, mushrooms, italian, creamy, rice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Acai Bowl",
    type: "Breakfast",
    cuisine: "Brazilian",
    servings: 2,
    yield: 2,
    yieldUnit: "bowls",
    prepTime: 10,
    cookTime: 0,
    cost: 7.50,
    dietary: "vegan, gluten-free, dairy-free",
    status: "active",
    lastMade: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description: "Healthy breakfast bowl with blended acai and fresh toppings.",
    instructions: "1. Blend frozen acai with banana and yogurt\n2. Pour into bowls\n3. Top with granola, fresh fruit\n4. Add nuts and seeds\n5. Drizzle with honey",
    tags: "smoothie, healthy, fruit, breakfast, bowl",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Fish Tacos",
    type: "Main Course",
    cuisine: "Mexican",
    servings: 4,
    yield: 8,
    yieldUnit: "tacos",
    prepTime: 20,
    cookTime: 10,
    cost: 19.50,
    dietary: "dairy-free",
    status: "active",
    lastMade: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    description: "Fresh white fish tacos with cabbage slaw and lime crema.",
    instructions: "1. Season and grill fish fillets\n2. Make cabbage slaw with lime dressing\n3. Prepare lime crema\n4. Warm tortillas\n5. Assemble tacos with fish, slaw, and crema",
    tags: "tacos, fish, mexican, fresh, lime",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Chicken Noodle Soup",
    type: "Main Course",
    cuisine: "American",
    servings: 6,
    yield: 6,
    yieldUnit: "bowls",
    prepTime: 15,
    cookTime: 45,
    cost: 13.75,
    dietary: "dairy-free",
    status: "archived",
    lastMade: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    description: "Classic comfort soup with tender chicken, vegetables, and egg noodles.",
    instructions: "1. Simmer chicken with vegetables for broth\n2. Remove chicken and shred\n3. Strain broth and return to pot\n4. Add noodles and cook until tender\n5. Return chicken to pot and season",
    tags: "soup, chicken, noodles, comfort food, classic",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Apple Pie",
    type: "Dessert",
    cuisine: "American",
    servings: 8,
    yield: 1,
    yieldUnit: "pie",
    prepTime: 30,
    cookTime: 55,
    cost: 12.25,
    dietary: "vegetarian",
    status: "seasonal",
    lastMade: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
    description: "Traditional apple pie with flaky crust and cinnamon-spiced filling.",
    instructions: "1. Make pie crust and chill\n2. Peel and slice apples\n3. Mix apples with sugar and spices\n4. Roll out crust and fill with apples\n5. Top with second crust and bake",
    tags: "pie, apple, dessert, baking, cinnamon",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Mango Lassi",
    type: "Beverage",
    cuisine: "Indian",
    servings: 2,
    yield: 2,
    yieldUnit: "glasses",
    prepTime: 5,
    cookTime: 0,
    cost: 5.50,
    dietary: "vegetarian, gluten-free",
    status: "active",
    lastMade: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    description: "Tropical mango smoothie with yogurt and honey.",
    instructions: "1. Peel and chop fresh mango\n2. Add to blender with yogurt\n3. Add honey and ice\n4. Blend until smooth\n5. Pour into glasses and serve",
    tags: "smoothie, mango, tropical, healthy, yogurt",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Stuffed Bell Peppers",
    type: "Main Course",
    cuisine: "Mediterranean",
    servings: 4,
    yield: 4,
    yieldUnit: "peppers",
    prepTime: 25,
    cookTime: 35,
    cost: 16.00,
    dietary: "gluten-free",
    status: "testing",
    lastMade: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    description: "Colorful bell peppers stuffed with ground beef, rice, and vegetables.",
    instructions: "1. Cut tops off peppers and remove seeds\n2. Cook ground beef with onions\n3. Mix beef with cooked rice and seasonings\n4. Stuff peppers with mixture\n5. Bake until peppers are tender",
    tags: "peppers, stuffed, beef, rice, baked",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const seedRecipes = async () => {
  try {
    console.log('🌱 Starting recipe seeding...');
    
    // Check if recipes already exist
    const recipesSnapshot = await getDocs(collection(db, 'recipes'));
    
    if (recipesSnapshot.size > 0) {
      console.log(`📋 ${recipesSnapshot.size} recipes already exist. Skipping seed.`);
      return { message: `Database already contains ${recipesSnapshot.size} recipes. No new recipes added.` };
    }

    // Add each recipe to Firestore
    const recipesCollection = collection(db, 'recipes');
    
    for (const recipe of sampleRecipes) {
      await addDoc(recipesCollection, recipe);
      console.log(`✅ Added: ${recipe.name}`);
    }
    
    console.log(`🎉 Successfully seeded ${sampleRecipes.length} recipes!`);
    return { message: `Successfully added ${sampleRecipes.length} test recipes!` };
    
  } catch (error) {
    console.error('❌ Error seeding recipes:', error);
    throw error;
  }
};

// Function to clear all recipes (for testing)
export const clearAllRecipes = async () => {
  try {
    const recipesSnapshot = await getDocs(collection(db, 'recipes'));
    const deletePromises = recipesSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log(`🗑️ Cleared ${recipesSnapshot.size} recipes`);
    return { message: `Cleared ${recipesSnapshot.size} recipes from database` };
  } catch (error) {
    console.error('❌ Error clearing recipes:', error);
    throw error;
  }
};
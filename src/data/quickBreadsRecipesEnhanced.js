// quickBreadsRecipesEnhanced.js - ToqueWorks Recipes with ACFEF Standards
// Enhanced version with Knowledge and Competency tracking for accreditation

import { startTransition } from "react";

export const acfefStandards = {
  // ACFEF Knowledge Areas
  knowledge: {
    K1: "Food safety and sanitation principles",
    K2: "Nutrition and nutritional cooking",
    K3: "Sustainability practices",
    K4: "Menu planning and management",
    K5: "Ingredient identification and selection",
    K6: "Recipe conversion and measurement",
    K7: "Cooking methods and techniques",
    K8: "Baking science and techniques",
    K9: "Cost control and purchasing",
    K10: "Kitchen equipment operation"
  },
  // ACFEF Competencies
  competencies: {
    C1: "Demonstrate professional cooking skills",
    C2: "Produce baked goods and desserts",
    C3: "Apply food safety and sanitation practices",
    C4: "Execute proper knife skills",
    C5: "Demonstrate station organization",
    C6: "Scale recipes accurately",
    C7: "Monitor cooking processes",
    C8: "Evaluate finished products",
    C9: "Work efficiently in teams",
    C10: "Follow standardized recipes"
  }
};

export const quickBreadsRecipesEnhanced = [
  {
    id: 1,
    name: "Classic Buttermilk Biscuits",
    category: "Quick Breads",
    courseCode: "CUL 140",
    weekNumber: 3,
    yieldAmount: 12,
    yieldUnit: "biscuits",
    prepTime: "15 minutes",
    bakeTime: "12-15 minutes",
    difficulty: "beginner",
    
    // ACFEF Standards Coverage
    acfefKnowledge: ["K5", "K6", "K7", "K8", "K10"],
    acfefCompetencies: ["C1", "C2", "C3", "C5", "C6", "C10"],
    
    // Learning Objectives
    learningObjectives: [
      "Demonstrate proper cutting-in technique for fat incorporation",
      "Understand chemical leavening with baking powder",
      "Execute proper dough handling to minimize gluten development",
      "Apply accurate measuring techniques for dry and liquid ingredients"
    ],
    
    // Scaling Information
    scalingNotes: "Recipe easily scales. Ideal for pairs (6 biscuits each)",
    minServings: 6,
    maxServings: 24,
    idealPairYield: 6,
    
    ingredients: [
      { name: "All-Purpose Flour", quantity: 2, unit: "cup", notes: "Sift before measuring" },
      { name: "Baking Powder", quantity: 1, unit: "tbsp", notes: "" },
      { name: "Granulated Sugar", quantity: 0.5, unit: "tbsp", notes: "" },
      { name: "Salt", quantity: 0.75, unit: "tsp", notes: "Kosher or sea salt" },
      { name: "Unsalted Butter", quantity: 0.5, unit: "cup", notes: "Cold, cubed" },
      { name: "Buttermilk", quantity: 0.75, unit: "cup", notes: "Full-fat, cold" }
    ],
    
    instructions: [
      "Preheat oven to 425F. Line baking sheet with parchment.",
      "Sift flour, baking powder, sugar, and salt together.",
      "Cut cold butter into flour mixture until pea-sized pieces form.",
      "Add buttermilk and mix until just combined. Do not overmix.",
      "Turn dough onto floured surface. Pat to 3/4 inch thickness.",
      "Cut with 2-inch biscuit cutter. Avoid twisting cutter.",
      "Place on prepared sheet. Bake 12-15 minutes until golden.",
      "Cool on wire rack 5 minutes before serving."
    ]
  },
  
  {
    id: 2,
    name: "Blueberry Streusel Muffins",
    category: "Quick Breads",
    courseCode: "CUL 140",
    weekNumber: 3,
    yieldAmount: 18,
    yieldUnit: "muffins",
    prepTime: "20 minutes",
    bakeTime: "18-22 minutes",
    difficulty: "intermediate",
    
    // ACFEF Standards Coverage
    acfefKnowledge: ["K5", "K6", "K7", "K8", "K10"],
    acfefCompetencies: ["C1", "C2", "C3", "C5", "C6", "C8", "C10"],
    
    // Learning Objectives
    learningObjectives: [
      "Apply muffin mixing method (avoid overmixing)",
      "Demonstrate proper creaming technique for streusel",
      "Execute even portioning for consistent baking",
      "Understand fruit incorporation techniques to prevent bleeding"
    ],
    
    // Scaling Information
    scalingNotes: "Best in multiples of 6. Pairs can make 6 muffins each",
    minServings: 6,
    maxServings: 24,
    idealPairYield: 6,
    
    ingredients: [
      { name: "All-Purpose Flour", quantity: 2.5, unit: "cup", notes: "For muffins" },
      { name: "Granulated Sugar", quantity: 1, unit: "cup", notes: "" },
      { name: "Baking Powder", quantity: 1, unit: "tbsp", notes: "" },
      { name: "Salt", quantity: 0.5, unit: "tsp", notes: "" },
      { name: "Eggs", quantity: 2, unit: "large", notes: "Room temperature" },
      { name: "Whole Milk", quantity: 1, unit: "cup", notes: "" },
      { name: "Unsalted Butter", quantity: 0.5, unit: "cup", notes: "Melted and cooled" },
      { name: "Vanilla Extract", quantity: 1, unit: "tsp", notes: "Pure" },
      { name: "Fresh Blueberries", quantity: 1.5, unit: "cup", notes: "Tossed in 1 tbsp flour" },
      { name: "All-Purpose Flour", quantity: 0.5, unit: "cup", notes: "For streusel" },
      { name: "Light Brown Sugar", quantity: 0.33, unit: "cup", notes: "Packed" },
      { name: "Ground Cinnamon", quantity: 0.5, unit: "tsp", notes: "" },
      { name: "Unsalted Butter", quantity: 0.25, unit: "cup", notes: "Cold, for streusel" }
    ],
    
    instructions: [
      "Preheat oven to 375F. Line muffin tins with paper liners.",
      "Make streusel: Combine 1/2 cup flour, brown sugar, cinnamon. Cut in cold butter until crumbly. Set aside.",
      "Whisk together 2.5 cups flour, sugar, baking powder, salt.",
      "In separate bowl, whisk eggs, milk, melted butter, vanilla.",
      "Pour wet ingredients into dry. Fold gently until just combined.",
      "Toss blueberries with 1 tbsp flour. Fold into batter.",
      "Fill muffin cups 2/3 full. Top with streusel.",
      "Bake 18-22 minutes until toothpick inserted comes out clean.",
      "Cool in pan 5 minutes, then transfer to wire rack."
    ]
  },
  
  {
    id: 3,
    name: "Cranberry Orange Scones",
    category: "Quick Breads",
    courseCode: "CUL 140",
    weekNumber: 3,
    yieldAmount: 8,
    yieldUnit: "scones",
    prepTime: "20 minutes",
    bakeTime: "18-20 minutes",
    difficulty: "intermediate",
    
    // ACFEF Standards Coverage
    acfefKnowledge: ["K5", "K6", "K7", "K8", "K10"],
    acfefCompetencies: ["C1", "C2", "C3", "C5", "C6", "C8", "C10"],
    
    // Learning Objectives
    learningObjectives: [
      "Execute proper lamination technique for flaky texture",
      "Demonstrate citrus zesting and juice extraction",
      "Apply egg wash technique for professional finish",
      "Understand ratio of liquid to dry ingredients for scone texture"
    ],
    
    // Scaling Information
    scalingNotes: "Scale in multiples of 8. Each pair makes full batch (4 scones each)",
    minServings: 4,
    maxServings: 16,
    idealPairYield: 4,
    
    ingredients: [
      { name: "All-Purpose Flour", quantity: 2, unit: "cup", notes: "" },
      { name: "Granulated Sugar", quantity: 0.33, unit: "cup", notes: "" },
      { name: "Baking Powder", quantity: 1, unit: "tbsp", notes: "" },
      { name: "Salt", quantity: 0.5, unit: "tsp", notes: "" },
      { name: "Unsalted Butter", quantity: 0.5, unit: "cup", notes: "Very cold, cubed" },
      { name: "Heavy Cream", quantity: 0.5, unit: "cup", notes: "Cold" },
      { name: "Eggs", quantity: 1, unit: "large", notes: "" },
      { name: "Orange Zest", quantity: 1, unit: "tbsp", notes: "Fresh" },
      { name: "Dried Cranberries", quantity: 0.75, unit: "cup", notes: "" },
      { name: "Eggs", quantity: 1, unit: "large", notes: "For egg wash" },
      { name: "Heavy Cream", quantity: 1, unit: "tbsp", notes: "For egg wash" },
      { name: "Coarse Sugar", quantity: 2, unit: "tbsp", notes: "For topping" }
    ],
    
    instructions: [
      "Preheat oven to 400F. Line baking sheet with parchment.",
      "Combine flour, sugar, baking powder, salt in large bowl.",
      "Cut in cold butter until mixture resembles coarse meal.",
      "Whisk together cream, egg, and orange zest.",
      "Add cranberries to dry mixture.",
      "Pour wet ingredients into dry. Mix until just combined.",
      "Turn onto floured surface. Pat into 8-inch circle.",
      "Cut into 8 wedges. Place on prepared sheet.",
      "Brush with egg wash (egg + 1 tbsp cream). Sprinkle with coarse sugar.",
      "Bake 18-20 minutes until golden brown.",
      "Cool on wire rack."
    ]
  },
  
  {
    id: 4,
    name: "Southern Style Cornbread",
    category: "Quick Breads",
    courseCode: "CUL 140",
    weekNumber: 3,
    yieldAmount: 9,
    yieldUnit: "pieces",
    prepTime: "10 minutes",
    bakeTime: "20-25 minutes",
    difficulty: "beginner",
    
    // ACFEF Standards Coverage
    acfefKnowledge: ["K5", "K6", "K7", "K8", "K10"],
    acfefCompetencies: ["C1", "C2", "C3", "C5", "C6", "C10"],
    
    // Learning Objectives
    learningObjectives: [
      "Demonstrate proper use of cast iron skillet",
      "Understand cornmeal ratios and types",
      "Execute proper pan preparation and preheating",
      "Apply simple mixing method for quick breads"
    ],
    
    // Scaling Information
    scalingNotes: "Best made in 9-inch pan. Can use individual cast iron for pairs",
    minServings: 6,
    maxServings: 18,
    idealPairYield: 6,
    
    ingredients: [
      { name: "Yellow Cornmeal", quantity: 1.5, unit: "cup", notes: "Medium grind" },
      { name: "All-Purpose Flour", quantity: 1, unit: "cup", notes: "" },
      { name: "Granulated Sugar", quantity: 0.25, unit: "cup", notes: "" },
      { name: "Baking Powder", quantity: 1, unit: "tbsp", notes: "" },
      { name: "Salt", quantity: 1, unit: "tsp", notes: "" },
      { name: "Buttermilk", quantity: 1.25, unit: "cup", notes: "" },
      { name: "Eggs", quantity: 2, unit: "large", notes: "" },
      { name: "Unsalted Butter", quantity: 0.33, unit: "cup", notes: "Melted" },
      { name: "Vegetable Oil", quantity: 2, unit: "tbsp", notes: "For pan" }
    ],
    
    instructions: [
      "Preheat oven to 425F. Place 9-inch cast iron skillet in oven to heat.",
      "Whisk together cornmeal, flour, sugar, baking powder, salt.",
      "In separate bowl, whisk buttermilk, eggs, melted butter.",
      "Pour wet ingredients into dry. Stir until just combined.",
      "Remove hot skillet from oven. Add oil, swirl to coat.",
      "Pour batter into hot skillet.",
      "Bake 20-25 minutes until golden and toothpick comes out clean.",
      "Cool in skillet 10 minutes. Cut into 9 pieces.",
      "Serve warm with butter."
    ]
  }
];

// Create default export object with both properties
const recipesData = {
  acfefStandards,
  quickBreadsRecipesEnhanced
};

export default recipesData;npm startTransition
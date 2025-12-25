// src/constants/recipeBooksConstants.js

// ✅ Core color palette - consistent with other pages
export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
    600: '#ea580c'
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626'
  }
};

// ✅ Button styles - consistent with other pages
export const BUTTON_STYLES = {
  primary: `bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors`,
  secondary: `bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors`,
  success: `bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors`,
  warning: `bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors`,
  danger: `bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors`,
  ghost: `hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded transition-colors`
};

// ✅ Input styles - consistent with other pages
export const INPUT_STYLES = {
  base: `w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`,
  error: `w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`,
  search: `w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`
};

// ✅ Recipe Book Categories
export const BOOK_CATEGORIES = [
  'Seasonal Collections',
  'Signature Dishes', 
  'Training Materials',
  'Menu Collections',
  'Dietary Specific',
  'Cooking Techniques',
  'Regional Cuisines',
  'Special Events',
  'Cost-Effective',
  'Quick Service',
  'Fine Dining',
  'Breakfast & Brunch',
  'Holiday Specials'
];

// ✅ Book Types - Different purposes for recipe books
export const BOOK_TYPES = [
  'Training Manual',
  'Menu Cookbook',
  'Seasonal Collection',
  'Signature Series',
  'Dietary Guide',
  'Technique Guide',
  'Regional Cookbook',
  'Cost Control Guide',
  'Quick Reference',
  'Special Events'
];

// ✅ Book Status
export const BOOK_STATUSES = [
  'Active',
  'Draft',
  'Under Review',
  'Archived',
  'Published'
];

// ✅ Access Levels - Who can view/edit books
export const ACCESS_LEVELS = [
  'Public',
  'Kitchen Staff',
  'Management Only',
  'Chefs Only',
  'Training Team',
  'Private'
];

// ✅ Book Formats for export
export const EXPORT_FORMATS = [
  'Digital Cookbook',
  'Training Manual',
  'Quick Reference Cards',
  'Full Recipe Collection',
  'Ingredient Lists Only',
  'Instruction Cards'
];

// ✅ Sample Recipe Data (would come from Recipe Management system)
export const SAMPLE_RECIPES = [
  {
    id: 1,
    name: "Pan-Seared Salmon",
    description: "Atlantic salmon with lemon herb butter, roasted vegetables",
    category: "Seafood",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    cost: 12.50,
    tags: ["Gluten-Free", "Heart-Healthy", "Signature"],
    rating: 4.8,
    popularity: 95
  },
  {
    id: 2,
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms and truffle oil",
    category: "Vegetarian", 
    difficulty: "Hard",
    prepTime: 10,
    cookTime: 25,
    servings: 6,
    cost: 8.75,
    tags: ["Vegetarian", "Gluten-Free", "Premium"],
    rating: 4.6,
    popularity: 88
  },
  {
    id: 3,
    name: "Classic Caesar Salad",
    description: "Crisp romaine, house croutons, parmesan, classic dressing",
    category: "Salads",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    cost: 4.50,
    tags: ["Quick", "Traditional"],
    rating: 4.4,
    popularity: 78
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream",
    category: "Desserts",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 12,
    servings: 6,
    cost: 3.75,
    tags: ["Vegetarian", "Signature", "Popular"],
    rating: 4.9,
    popularity: 91
  },
  {
    id: 5,
    name: "Grilled Chicken Breast",
    description: "Herb-marinated chicken with seasonal vegetables",
    category: "Entrees",
    difficulty: "Easy",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    cost: 9.50,
    tags: ["Gluten-Free", "High-Protein", "Healthy"],
    rating: 4.3,
    popularity: 82
  },
  {
    id: 6,
    name: "Lobster Bisque",
    description: "Rich and creamy soup with fresh lobster meat",
    category: "Soups",
    difficulty: "Hard",
    prepTime: 45,
    cookTime: 30,
    servings: 8,
    cost: 7.25,
    tags: ["Premium", "Gluten-Free", "Signature"],
    rating: 4.7,
    popularity: 85
  },
  {
    id: 7,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil on wood-fired crust",
    category: "Pizza",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 8,
    servings: 2,
    cost: 6.25,
    tags: ["Vegetarian", "Traditional", "Quick"],
    rating: 4.5,
    popularity: 87
  },
  {
    id: 8,
    name: "Duck Confit",
    description: "Slow-cooked duck leg with cherry gastrique",
    category: "Entrees",
    difficulty: "Hard",
    prepTime: 30,
    cookTime: 180,
    servings: 4,
    cost: 14.75,
    tags: ["Premium", "Signature", "Gluten-Free"],
    rating: 4.8,
    popularity: 89
  }
];

// ✅ Sample Recipe Books
export const SAMPLE_RECIPE_BOOKS = [
  {
    id: 1,
    title: "Signature Dishes Collection",
    description: "Our restaurant's most popular and acclaimed signature recipes",
    category: "Signature Dishes",
    type: "Menu Cookbook",
    status: "Active",
    accessLevel: "Kitchen Staff",
    coverImage: null,
    author: "Executive Chef",
    createdDate: "2024-07-15",
    lastUpdated: "2024-08-15",
    recipeIds: [1, 2, 4, 6, 8], // Pan-Seared Salmon, Truffle Risotto, Lava Cake, Lobster Bisque, Duck Confit
    tags: ["Signature", "Premium", "Bestsellers"],
    difficulty: "Medium-Hard",
    estimatedTime: "45-180 min",
    totalRecipes: 5,
    avgRating: 4.76,
    popularity: 90
  },
  {
    id: 2,
    title: "Quick Service Training Manual",
    description: "Essential recipes for new kitchen staff - easy to learn and execute",
    category: "Training Materials",
    type: "Training Manual", 
    status: "Active",
    accessLevel: "Kitchen Staff",
    coverImage: null,
    author: "Head Chef",
    createdDate: "2024-06-01",
    lastUpdated: "2024-08-10",
    recipeIds: [3, 5, 7], // Caesar Salad, Grilled Chicken, Margherita Pizza
    tags: ["Training", "Beginner", "Quick"],
    difficulty: "Easy-Medium",
    estimatedTime: "15-30 min",
    totalRecipes: 3,
    avgRating: 4.4,
    popularity: 82
  },
  {
    id: 3,
    title: "Gluten-Free Menu Collection",
    description: "Complete collection of gluten-free options for dietary restrictions",
    category: "Dietary Specific",
    type: "Dietary Guide",
    status: "Active", 
    accessLevel: "Public",
    coverImage: null,
    author: "Nutritionist Chef",
    createdDate: "2024-05-20",
    lastUpdated: "2024-08-12",
    recipeIds: [1, 2, 5, 6, 8], // Salmon, Risotto, Chicken, Bisque, Duck
    tags: ["Gluten-Free", "Healthy", "Dietary"],
    difficulty: "Easy-Hard",
    estimatedTime: "15-180 min",
    totalRecipes: 5,
    avgRating: 4.62,
    popularity: 86
  },
  {
    id: 4,
    title: "Summer Seasonal Specials",
    description: "Light, fresh recipes perfect for the summer season",
    category: "Seasonal Collections",
    type: "Seasonal Collection",
    status: "Active",
    accessLevel: "Kitchen Staff",
    coverImage: null,
    author: "Seasonal Chef",
    createdDate: "2024-05-01",
    lastUpdated: "2024-07-30",
    recipeIds: [1, 3, 5], // Salmon, Caesar, Chicken
    tags: ["Summer", "Fresh", "Light"],
    difficulty: "Easy-Medium", 
    estimatedTime: "15-30 min",
    totalRecipes: 3,
    avgRating: 4.5,
    popularity: 85
  },
  {
    id: 5,
    title: "Premium Dining Experience",
    description: "High-end recipes for special occasions and fine dining service",
    category: "Fine Dining",
    type: "Menu Cookbook",
    status: "Under Review",
    accessLevel: "Chefs Only",
    coverImage: null,
    author: "Executive Chef",
    createdDate: "2024-08-01",
    lastUpdated: "2024-08-14",
    recipeIds: [2, 4, 6, 8], // Truffle Risotto, Lava Cake, Lobster Bisque, Duck Confit
    tags: ["Premium", "Fine Dining", "Special Events"],
    difficulty: "Hard",
    estimatedTime: "60-180 min",
    totalRecipes: 4,
    avgRating: 4.75,
    popularity: 88
  }
];

// ✅ Status configurations with colors
export const STATUS_CONFIG = {
  'Active': {
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  'Draft': {
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  },
  'Under Review': {
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  'Archived': {
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  'Published': {
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  }
};

// ✅ Difficulty level colors
export const DIFFICULTY_CONFIG = {
  'Easy': {
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    indicator: '●'
  },
  'Easy-Medium': {
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    indicator: '●●'
  },
  'Medium': {
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    indicator: '●●'
  },
  'Medium-Hard': {
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    indicator: '●●●'
  },
  'Hard': {
    color: 'text-red-800',
    bgColor: 'bg-red-200',
    indicator: '●●●'
  },
  'Easy-Hard': {
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    indicator: '●-●●●'
  }
};
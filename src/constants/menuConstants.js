// src/constants/menuConstants.js - COMPLETE FINAL VERSION
// ✅ SAMPLE_RECIPES REMOVED - now handled by recipeDataService
// ✅ Menu collections and constants KEPT

// ✅ KEEP - Menu collections/structures (organizational data)
export const SAMPLE_MENUS = [
  {
    id: 1,
    name: "Summer Dinner Menu",
    type: "Dinner",
    status: "Active",
    description: "Fresh seasonal dishes featuring local summer produce",
    effectiveDate: "2024-06-01",
    expiryDate: "2024-08-31",
    averagePrice: 28.50,
    estimatedMargin: 72.5,
    totalItems: 24,
    sections: [
      {
        name: "Appetizers",
        displayOrder: 1,
        items: [
          {
            recipeId: 1,
            menuPrice: 14.00,
            displayName: "Grilled Chicken Breast",
            description: "Herb-crusted chicken with seasonal vegetables",
            dietary: ["Gluten-Free"],
            spiciness: 0,
            popularity: "High"
          },
          {
            recipeId: 2,
            menuPrice: 18.00,
            displayName: "Pan-Seared Salmon",
            description: "Atlantic salmon with lemon herb butter",
            dietary: ["Gluten-Free"],
            spiciness: 0,
            popularity: "High"
          }
        ]
      },
      {
        name: "Main Courses",
        displayOrder: 2,
        items: [
          {
            recipeId: 3,
            menuPrice: 42.00,
            displayName: "Beef Tenderloin",
            description: "Premium beef with truffle sauce",
            dietary: ["Gluten-Free"],
            spiciness: 0,
            popularity: "Medium"
          },
          {
            recipeId: 4,
            menuPrice: 16.00,
            displayName: "Vegetable Pasta",
            description: "Fresh pasta with seasonal vegetables",
            dietary: ["Vegetarian", "Vegan"],
            spiciness: 1,
            popularity: "Medium"
          }
        ]
      },
      {
        name: "Desserts",
        displayOrder: 3,
        items: [
          {
            recipeId: 5,
            menuPrice: 8.00,
            displayName: "Chocolate Cake",
            description: "Rich chocolate cake with berry compote",
            dietary: ["Vegetarian"],
            spiciness: 0,
            popularity: "High"
          }
        ]
      }
    ],
    designSettings: {
      theme: "summer-fresh",
      colorScheme: "green-gold",
      typography: "elegant-serif",
      layout: "traditional"
    }
  },
  {
    id: 2,
    name: "Business Lunch Menu",
    type: "Lunch",
    status: "Active",
    description: "Quick, professional lunch options for business diners",
    effectiveDate: "2024-01-01",
    expiryDate: null,
    averagePrice: 16.75,
    estimatedMargin: 68.2,
    totalItems: 12,
    sections: [
      {
        name: "Express Entrees",
        displayOrder: 1,
        items: [
          {
            recipeId: 1,
            menuPrice: 15.00,
            displayName: "Grilled Chicken",
            description: "Quick-grilled chicken with side salad",
            dietary: ["Gluten-Free"],
            spiciness: 0,
            popularity: "High"
          },
          {
            recipeId: 4,
            menuPrice: 14.00,
            displayName: "Pasta Primavera",
            description: "Fresh vegetable pasta",
            dietary: ["Vegetarian"],
            spiciness: 0,
            popularity: "Medium"
          }
        ]
      },
      {
        name: "Light Desserts",
        displayOrder: 2,
        items: [
          {
            recipeId: 5,
            menuPrice: 6.50,
            displayName: "Chocolate Cake Slice",
            description: "Single serving chocolate cake",
            dietary: ["Vegetarian"],
            spiciness: 0,
            popularity: "Medium"
          }
        ]
      }
    ],
    designSettings: {
      theme: "business-clean",
      colorScheme: "blue-gray",
      typography: "modern-sans",
      layout: "compact"
    }
  },
  {
    id: 3,
    name: "Weekend Brunch Menu",
    type: "Brunch", 
    status: "Seasonal",
    description: "Weekend brunch favorites with creative twists",
    effectiveDate: "2024-03-01",
    expiryDate: "2024-10-31",
    averagePrice: 19.25,
    estimatedMargin: 71.8,
    totalItems: 16,
    sections: [
      {
        name: "Brunch Mains",
        displayOrder: 1,
        items: [
          {
            recipeId: 2,
            menuPrice: 22.00,
            displayName: "Salmon Benedict",
            description: "Poached eggs over salmon with hollandaise",
            dietary: ["Gluten-Free"],
            spiciness: 0,
            popularity: "High"
          }
        ]
      },
      {
        name: "Sweet Treats",
        displayOrder: 2,
        items: [
          {
            recipeId: 5,
            menuPrice: 9.00,
            displayName: "Chocolate Cake Stack",
            description: "Mini chocolate cakes with fresh berries",
            dietary: ["Vegetarian"],
            spiciness: 0,
            popularity: "High"
          }
        ]
      }
    ],
    designSettings: {
      theme: "brunch-casual",
      colorScheme: "warm-orange",
      typography: "friendly-rounded",
      layout: "relaxed"
    }
  }
];

// ✅ KEEP - Menu-specific constants
export const MENU_TYPES = [
  'Breakfast',
  'Brunch', 
  'Lunch',
  'Dinner',
  'Dessert',
  'Drinks',
  'Special Event'
];

export const MENU_STATUSES = [
  'Draft',
  'Active', 
  'Seasonal',
  'Archived',
  'Coming Soon'
];

export const MENU_SECTIONS = [
  'Appetizers',
  'Soups & Salads',
  'Main Courses',
  'Sides',
  'Desserts',
  'Beverages',
  'Specials'
];

export const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Low-Carb',
  'Keto',
  'Paleo'
];

// ✅ KEEP - Design and display constants
export const MENU_THEMES = [
  { id: 'classic', name: 'Classic Elegance' },
  { id: 'modern', name: 'Modern Minimalist' },
  { id: 'rustic', name: 'Rustic Charm' },
  { id: 'summer-fresh', name: 'Summer Fresh' },
  { id: 'business-clean', name: 'Business Clean' },
  { id: 'brunch-casual', name: 'Brunch Casual' }
];

export const COLOR_SCHEMES = [
  { id: 'black-white', name: 'Classic B&W' },
  { id: 'green-gold', name: 'Green & Gold' },
  { id: 'blue-gray', name: 'Blue & Gray' },
  { id: 'warm-orange', name: 'Warm Orange' },
  { id: 'burgundy-cream', name: 'Burgundy & Cream' }
];

export const TYPOGRAPHY_OPTIONS = [
  { id: 'elegant-serif', name: 'Elegant Serif' },
  { id: 'modern-sans', name: 'Modern Sans-Serif' },
  { id: 'friendly-rounded', name: 'Friendly Rounded' },
  { id: 'classic-traditional', name: 'Classic Traditional' }
];

export const LAYOUT_OPTIONS = [
  { id: 'traditional', name: 'Traditional Layout' },
  { id: 'compact', name: 'Compact Layout' },
  { id: 'relaxed', name: 'Relaxed Layout' },
  { id: 'modern-grid', name: 'Modern Grid' }
];

// ✅ KEEP - Menu pricing constants
export const PRICE_RANGES = [
  { min: 0, max: 15, label: 'Budget ($0-$15)' },
  { min: 15, max: 30, label: 'Moderate ($15-$30)' },
  { min: 30, max: 50, label: 'Premium ($30-$50)' },
  { min: 50, max: 999, label: 'Fine Dining ($50+)' }
];

export const SPICINESS_LEVELS = [
  { level: 0, label: 'Mild', icon: '🟢' },
  { level: 1, label: 'Medium', icon: '🟡' },
  { level: 2, label: 'Hot', icon: '🟠' },
  { level: 3, label: 'Very Hot', icon: '🔴' }
];

export const POPULARITY_LEVELS = [
  'High',
  'Medium', 
  'Low',
  'New'
];

// ❌ REMOVED - SAMPLE_RECIPES 
// This was causing duplicate data issues
// Recipe data now comes from recipeDataService for:
// - Professional cost calculations
// - Vendor information
// - Dietary restrictions
// - Outlet assignments
// - Trim/cooking losses
// - Status tracking
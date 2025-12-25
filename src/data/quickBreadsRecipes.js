// Recipe data array
const recipesData = [
  {
    id: 'biscuits-1',
    name: 'Classic Buttermilk Biscuits',
    yield: '12 biscuits',
    yieldAmount: 12,
    yieldUnit: 'biscuits',
    prepTime: '15 min',
    bakeTime: '12-15 min',
    temperature: '425°F',
    ingredients: [
      { quantity: 3, unit: 'cups', name: 'All-Purpose Flour' },
      { quantity: 1.5, unit: 'tbsp', name: 'Baking Powder' },
      { quantity: 0.75, unit: 'tsp', name: 'Salt' },
      { quantity: 0.5, unit: 'tsp', name: 'Baking Soda' },
      { quantity: 0.75, unit: 'cup', name: 'Butter', notes: 'cold, cubed' },
      { quantity: 1.25, unit: 'cups', name: 'Buttermilk', notes: 'cold' },
    ],
    instructions: [
      'Preheat oven to 425°F. Line a baking sheet with parchment paper.',
      'In a large bowl, whisk together flour, baking powder, salt, and baking soda.',
      'Cut in cold butter using a pastry cutter or your fingers until mixture resembles coarse crumbs with pea-sized pieces.',
      'Make a well in the center and pour in cold buttermilk. Stir gently with a fork until just combined.',
      'Turn dough onto a floured surface and gently pat to 3/4-inch thickness.',
      'Cut biscuits using a 2.5-inch round cutter, pressing straight down without twisting.',
      'Place biscuits on prepared baking sheet, touching for soft sides or spaced apart for crispy sides.',
      'Bake for 12-15 minutes until golden brown on top.',
      'Brush with melted butter immediately after removing from oven.'
    ],
    notes: 'Do not overwork the dough - handle as little as possible for tender, flaky biscuits. Cold ingredients are essential.'
  },
  {
    id: 'muffins-1',
    name: 'Blueberry Streusel Muffins',
    yield: '18 muffins',
    yieldAmount: 18,
    yieldUnit: 'muffins',
    prepTime: '20 min',
    bakeTime: '18-22 min',
    temperature: '375°F',
    ingredients: [
      { quantity: 3, unit: 'cups', name: 'All-Purpose Flour' },
      { quantity: 1, unit: 'tbsp', name: 'Baking Powder' },
      { quantity: 0.5, unit: 'tsp', name: 'Baking Soda' },
      { quantity: 0.5, unit: 'tsp', name: 'Salt' },
      { quantity: 0.5, unit: 'cup', name: 'Butter', notes: 'melted' },
      { quantity: 1, unit: 'cup', name: 'Granulated Sugar' },
      { quantity: 2, unit: 'each', name: 'Eggs', notes: 'large' },
      { quantity: 1, unit: 'cup', name: 'Buttermilk' },
      { quantity: 1, unit: 'tsp', name: 'Vanilla Extract' },
      { quantity: 2, unit: 'cups', name: 'Fresh Blueberries' },
      { quantity: 0.5, unit: 'cup', name: 'All-Purpose Flour', notes: 'for streusel' },
      { quantity: 0.5, unit: 'cup', name: 'Brown Sugar' },
      { quantity: 0.25, unit: 'cup', name: 'Butter', notes: 'cold, for streusel' },
    ],
    instructions: [
      'Preheat oven to 375°F. Line muffin tins with paper liners.',
      'Make streusel: Mix flour and brown sugar, cut in cold butter until crumbly. Set aside.',
      'In a large bowl, whisk together flour, baking powder, baking soda, and salt.',
      'In another bowl, whisk melted butter and sugar until combined.',
      'Add eggs one at a time, whisking well. Stir in buttermilk and vanilla.',
      'Pour wet ingredients into dry ingredients and fold gently until just combined.',
      'Gently fold in blueberries, being careful not to overmix.',
      'Fill muffin cups 3/4 full and top generously with streusel.',
      'Bake 18-22 minutes until golden and a toothpick comes out clean.',
      'Cool in pan 5 minutes, then transfer to wire rack.'
    ],
    notes: 'Toss blueberries in a little flour before folding in to prevent sinking. Do not overmix batter.'
  },
  {
    id: 'scones-1',
    name: 'Cranberry Orange Scones',
    yield: '8 scones',
    yieldAmount: 8,
    yieldUnit: 'scones',
    prepTime: '20 min',
    bakeTime: '15-18 min',
    temperature: '400°F',
    ingredients: [
      { quantity: 2, unit: 'cups', name: 'All-Purpose Flour' },
      { quantity: 0.33, unit: 'cup', name: 'Granulated Sugar' },
      { quantity: 1, unit: 'tbsp', name: 'Baking Powder' },
      { quantity: 0.5, unit: 'tsp', name: 'Salt' },
      { quantity: 0.5, unit: 'cup', name: 'Butter', notes: 'cold, cubed' },
      { quantity: 0.67, unit: 'cup', name: 'Heavy Cream', notes: 'plus more for brushing' },
      { quantity: 1, unit: 'each', name: 'Eggs', notes: 'large' },
      { quantity: 1, unit: 'tbsp', name: 'Orange Zest' },
      { quantity: 0.75, unit: 'cup', name: 'Dried Cranberries' },
      { quantity: 2, unit: 'tbsp', name: 'Turbinado Sugar', notes: 'for topping' },
    ],
    instructions: [
      'Preheat oven to 400°F. Line a baking sheet with parchment paper.',
      'In a large bowl, whisk flour, sugar, baking powder, and salt.',
      'Cut in cold butter until mixture resembles coarse crumbs.',
      'In a small bowl, whisk together cream, egg, and orange zest.',
      'Add wet ingredients to dry, stirring just until dough comes together.',
      'Fold in dried cranberries gently.',
      'Turn dough onto floured surface and pat into an 8-inch circle, about 3/4 inch thick.',
      'Cut into 8 wedges and place on prepared baking sheet.',
      'Brush tops with cream and sprinkle with turbinado sugar.',
      'Bake 15-18 minutes until golden brown.',
      'Cool on wire rack. Optional: drizzle with orange glaze.'
    ],
    notes: 'Keep ingredients cold for flaky scones. Can substitute other dried fruits like cherries or apricots.'
  },
  {
    id: 'cornbread-1',
    name: 'Southern Style Cornbread',
    yield: '9-inch pan (9 pieces)',
    yieldAmount: 9,
    yieldUnit: 'pieces',
    prepTime: '10 min',
    bakeTime: '20-25 min',
    temperature: '400°F',
    ingredients: [
      { quantity: 1, unit: 'cup', name: 'Yellow Cornmeal' },
      { quantity: 1, unit: 'cup', name: 'All-Purpose Flour' },
      { quantity: 0.25, unit: 'cup', name: 'Granulated Sugar' },
      { quantity: 1, unit: 'tbsp', name: 'Baking Powder' },
      { quantity: 1, unit: 'tsp', name: 'Salt' },
      { quantity: 1, unit: 'cup', name: 'Buttermilk' },
      { quantity: 0.33, unit: 'cup', name: 'Vegetable Oil' },
      { quantity: 2, unit: 'each', name: 'Eggs', notes: 'large' },
      { quantity: 2, unit: 'tbsp', name: 'Butter', notes: 'for pan' },
    ],
    instructions: [
      'Preheat oven to 400°F. Place butter in 9-inch square or cast iron pan and put in oven to melt.',
      'In a large bowl, whisk together cornmeal, flour, sugar, baking powder, and salt.',
      'In another bowl, whisk buttermilk, oil, and eggs until combined.',
      'Pour wet ingredients into dry and stir just until combined (batter will be lumpy).',
      'Carefully remove hot pan from oven. Swirl melted butter to coat pan.',
      'Pour batter into hot, buttered pan.',
      'Bake 20-25 minutes until golden brown and toothpick comes out clean.',
      'Let cool 5-10 minutes before cutting into squares.',
      'Serve warm with butter and honey.'
    ],
    notes: 'Using a hot, buttered pan creates a crispy, golden crust. For sweeter cornbread, increase sugar to 1/3 cup.'
  }
];

// Export as quickBreadsRecipes for RequisitionsPage
export const quickBreadsRecipes = recipesData;

// Export as courseData for RecipePage (backward compatibility)
export const courseData = recipesData;

// Default export
export default recipesData;
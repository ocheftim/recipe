// src/components/recipes/RecipeList.js
import React from 'react';
import { calculateRecipeCost, calculateCostPerServing } from '../../utils/recipeCalculations';

const RecipeList = ({ 
  recipes, 
  selectedRecipes = [],
  onSelectRecipe,
  onEditRecipe,
  onDeleteRecipe,
  sortConfig,
  onSort
}) => {
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedRecipes.length === recipes.length && recipes.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelectRecipe(recipes.map(r => r.id));
                  } else {
                    onSelectRecipe([]);
                  }
                }}
              />
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('name')}
            >
              Recipe Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('category')}
            >
              Category
            </th>
            <th className="px-4 py-2">Servings</th>
            <th className="px-4 py-2">Cost</th>
            <th className="px-4 py-2">Per Serving</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => {
            const cost = calculateRecipeCost(recipe);
            const perServing = calculateCostPerServing(recipe);
            const isSelected = selectedRecipes.includes(recipe.id);
            
            return (
              <tr key={recipe.id} className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        onSelectRecipe(selectedRecipes.filter(id => id !== recipe.id));
                      } else {
                        onSelectRecipe([...selectedRecipes, recipe.id]);
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2 font-medium">{recipe.name}</td>
                <td className="px-4 py-2">{recipe.category}</td>
                <td className="px-4 py-2">{recipe.servings}</td>
                <td className="px-4 py-2">${cost.toFixed(2)}</td>
                <td className="px-4 py-2">${perServing.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEditRecipe(recipe)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteRecipe(recipe.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList;

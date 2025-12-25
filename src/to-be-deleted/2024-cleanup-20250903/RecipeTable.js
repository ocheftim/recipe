// src/components/recipes/RecipeTable.js
// COMPLETE FILE - CREATE THIS IF IT DOESN'T EXIST

import React from 'react';
import { Edit2, Trash2, Copy, AlertCircle } from 'lucide-react';

const RecipeTable = ({ recipes, onEdit, onDelete, onDuplicate }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Recipe Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Servings
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ingredients
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Verification
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {recipes.map((recipe) => (
          <tr key={recipe.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{recipe.name}</div>
              {recipe.cuisine && (
                <div className="text-xs text-gray-500">{recipe.cuisine}</div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {recipe.category}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {recipe.servings}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {recipe.ingredients?.length || 0}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                recipe.status === 'active' ? 'bg-green-100 text-green-800' :
                recipe.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                recipe.status === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recipe.status || 'draft'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {recipe.hasUnverifiedIngredients ? (
                <div className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {recipe.unverifiedIngredients?.length || 0} unverified
                </div>
              ) : (
                <span className="text-sm text-gray-500">-</span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(recipe)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDuplicate(recipe)}
                  className="text-gray-600 hover:text-gray-900"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(recipe.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecipeTable;
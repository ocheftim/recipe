import React, { useState } from 'react';
import { quickBreadsRecipes, courseData } from '../data/quickBreadsRecipes';

const RecipePage = () => {
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Use either quickBreadsRecipes or courseData (they're the same)
  const recipes = quickBreadsRecipes;

  // Filter recipes based on search
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRecipe = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="pl-8 pr-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
          <p className="text-gray-600 mt-2">
            CUL 140 Week 3: Quick Breads - {recipes.length} Recipes
          </p>
        </div>
      </div>

      <div className="pl-8 pr-6 py-6 max-w-5xl">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Recipes
          </label>
          <input
            type="text"
            placeholder="Search by recipe name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-2 text-sm text-gray-600">
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </div>
        </div>

        {/* Recipes List */}
        <div className="space-y-4">
          {filteredRecipes.map(recipe => {
            const isExpanded = expandedRecipe === recipe.id;
            
            return (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Recipe Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {recipe.name}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Yields: {recipe.yield}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Prep: {recipe.prepTime}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          </svg>
                          Bake: {recipe.bakeTime}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Temp: {recipe.temperature}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleRecipe(recipe.id)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      {isExpanded ? 'Hide Details' : 'View Recipe'}
                    </button>
                  </div>
                </div>

                {/* Expanded Recipe Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ingredients */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Ingredients
                        </h3>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>
                                <span className="font-medium">{ing.quantity} {ing.unit}</span> {ing.name}
                                {ing.notes && <span className="text-gray-500 italic"> ({ing.notes})</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Instructions
                        </h3>
                        <ol className="space-y-3">
                          {recipe.instructions.map((step, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="font-bold text-blue-600 mr-2 min-w-[1.5rem]">
                                {idx + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Chef's Notes */}
                    {recipe.notes && (
                      <div className="px-6 pb-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Chef's Notes:
                          </h4>
                          <p className="text-sm text-gray-700">{recipe.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500">No recipes found matching your search.</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {recipes.length}
              </div>
              <div className="text-sm text-gray-600">Total Recipes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {recipes.reduce((sum, r) => sum + r.yieldAmount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Servings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {recipes.reduce((sum, r) => sum + r.ingredients.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Ingredients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {new Set(recipes.flatMap(r => r.ingredients.map(i => i.name))).size}
              </div>
              <div className="text-sm text-gray-600">Unique Ingredients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
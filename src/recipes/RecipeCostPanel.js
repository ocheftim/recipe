// src/pages/RecipesPage.js - With PageLayout and inline search
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import PageLayout from '../components/PageLayout';

const RecipeTableRow = ({ recipe, onEdit, onPrint, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-900">
          {recipe.name}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {recipe.type || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {recipe.servings || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${(recipe.totalCost || 0).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button onClick={() => setShowActions(!showActions)} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button onClick={() => { onEdit(); setShowActions(false); }} className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                Edit
              </button>
              <button onClick={() => { onPrint(); setShowActions(false); }} className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                Print
              </button>
              <button onClick={() => { onDelete(); setShowActions(false); }} className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const RecipesPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const recipesQuery = query(collection(db, 'recipes'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(recipesQuery);
        const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [auth]);

  const handleDeleteRecipe = async (recipeId, recipeName) => {
    if (window.confirm(`Are you sure you want to delete "${recipeName}"?`)) {
      try {
        await deleteDoc(doc(db, 'recipes', recipeId));
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        alert('Recipe deleted successfully!');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Error deleting recipe');
      }
    }
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <PageLayout title="Recipes">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-600">Loading recipes...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Recipes">
      {/* Search field positioned to appear next to title */}
      <div className="flex items-center justify-between -mt-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={() => navigate('/recipes/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Recipe
        </button>
      </div>

      {/* Showing count */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {recipes.length === 0 ? (
                <>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new recipe.</p>
                </>
              ) : (
                <>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try a different search term.</p>
                </>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/recipes/new')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Recipe
              </button>
            </div>
          </div>
        ) : (
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servings</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecipes.map((recipe) => (
                  <RecipeTableRow 
                    key={recipe.id} 
                    recipe={recipe} 
                    onEdit={() => navigate(`/recipes/${recipe.id}`)}
                    onPrint={() => window.open(`/recipes/${recipe.id}/print`, '_blank')}
                    onDelete={() => handleDeleteRecipe(recipe.id, recipe.name)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
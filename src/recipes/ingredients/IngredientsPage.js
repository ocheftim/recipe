// src/recipes/ingredients/IngredientsPage.js - With inline search like recipes
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import PageLayout from '../../components/PageLayout';

const IngredientTableRow = ({ ingredient, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-900">
          {ingredient.name}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {ingredient.category || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {ingredient.unit || 'lb'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${(ingredient.apCostPerUnit || 0).toFixed(2)}
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

const IngredientsPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const ingredientsQuery = query(collection(db, 'ingredients'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(ingredientsQuery);
        const ingredientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIngredients(ingredientsData);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [auth]);

  const handleDeleteIngredient = async (ingredientId, ingredientName) => {
    if (window.confirm(`Are you sure you want to delete "${ingredientName}"?`)) {
      try {
        await deleteDoc(doc(db, 'ingredients', ingredientId));
        setIngredients(ingredients.filter(ingredient => ingredient.id !== ingredientId));
        alert('Ingredient deleted successfully!');
      } catch (error) {
        console.error('Error deleting ingredient:', error);
        alert('Error deleting ingredient');
      }
    }
  };

  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <PageLayout title="Ingredients">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-600">Loading ingredients...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <span>Ingredients</span>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={() => navigate('/ingredients/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Ingredient
          </button>
        </div>
      }
    >
      {/* Showing count */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Showing {filteredIngredients.length} of {ingredients.length} ingredients
        </p>
      </div>

      {/* Table */}
      {filteredIngredients.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            {ingredients.length === 0 ? (
              <>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No ingredients</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new ingredient.</p>
              </>
            ) : (
              <>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No ingredients found</h3>
                <p className="mt-1 text-sm text-gray-500">Try a different search term.</p>
              </>
            )}
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/ingredients/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Ingredient
            </button>
          </div>
        </div>
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Unit</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Cost/Unit</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIngredients.map((ingredient) => (
                <IngredientTableRow 
                  key={ingredient.id} 
                  ingredient={ingredient} 
                  onEdit={() => navigate(`/ingredients/${ingredient.id}`)}
                  onDelete={() => handleDeleteIngredient(ingredient.id, ingredient.name)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageLayout>
  );
};

export default IngredientsPage;
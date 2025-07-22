import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PageLayout from '../components/PageLayout';

const RecipeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [isEditing, setIsEditing] = useState(isNew);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [recipe, setRecipe] = useState({
    name: '',
    type: '',
    servings: '',
    prepTime: '',
    cookTime: '',
    description: '',
    instructions: '',
    ingredients: [],
    tags: '',
    difficulty: '',
    cost: 0
  });

  const recipeTypes = [
    'Appetizer', 'Main Course', 'Side Dish', 'Dessert', 
    'Beverage', 'Breakfast', 'Lunch', 'Dinner', 'Snack'
  ];

  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  useEffect(() => {
    if (!isNew) {
      loadRecipe();
    }
  }, [id, isNew]);

  const loadRecipe = async () => {
    try {
      const docRef = doc(db, 'recipes', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error('Recipe not found');
        navigate('/recipes');
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Validation
      if (!recipe.name.trim()) {
        alert('Recipe name is required');
        return;
      }

      const recipeData = {
        ...recipe,
        servings: parseInt(recipe.servings) || 1,
        prepTime: parseInt(recipe.prepTime) || 0,
        cookTime: parseInt(recipe.cookTime) || 0,
        cost: parseFloat(recipe.cost) || 0,
        updatedAt: new Date().toISOString()
      };

      if (isNew) {
        recipeData.createdAt = new Date().toISOString();
        const newDocRef = doc(db, 'recipes', Date.now().toString());
        await setDoc(newDocRef, recipeData);
        navigate(`/recipes/${newDocRef.id}`);
      } else {
        const docRef = doc(db, 'recipes', id);
        await updateDoc(docRef, recipeData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error saving recipe');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      await deleteDoc(doc(db, 'recipes', id));
      navigate('/recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting recipe');
    }
  };

  const handleInputChange = (field, value) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <PageLayout title="Loading Recipe...">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading recipe...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={
        <div className="flex items-center justify-between w-full">
          <span>{isNew ? 'New Recipe' : recipe.name}</span>
          <div className="flex space-x-3">
            {!isNew && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  Delete
                </button>
              </>
            )}
            {isEditing && (
              <>
                <button
                  onClick={() => isNew ? navigate('/recipes') : setIsEditing(false)}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </>
            )}
          </div>
        </div>
      }
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-6 py-4 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipe.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter recipe name..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{recipe.name || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                {isEditing ? (
                  <select
                    value={recipe.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select type...</option>
                    {recipeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{recipe.type || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={recipe.servings}
                    onChange={(e) => handleInputChange('servings', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Number of servings..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{recipe.servings || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                {isEditing ? (
                  <select
                    value={recipe.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select difficulty...</option>
                    {difficultyLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{recipe.difficulty || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (minutes)</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    value={recipe.prepTime}
                    onChange={(e) => handleInputChange('prepTime', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Preparation time..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{recipe.prepTime ? `${recipe.prepTime} minutes` : '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (minutes)</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    value={recipe.cookTime}
                    onChange={(e) => handleInputChange('cookTime', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Cooking time..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{recipe.cookTime ? `${recipe.cookTime} minutes` : '—'}</div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Description</h3>
            {isEditing ? (
              <textarea
                value={recipe.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe your recipe..."
              />
            ) : (
              <div className="text-sm text-gray-900 whitespace-pre-wrap">{recipe.description || '—'}</div>
            )}
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Instructions</h3>
            {isEditing ? (
              <textarea
                value={recipe.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                rows={6}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter step-by-step instructions..."
              />
            ) : (
              <div className="text-sm text-gray-900 whitespace-pre-wrap">{recipe.instructions || '—'}</div>
            )}
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Tags</h3>
            {isEditing ? (
              <input
                type="text"
                value={recipe.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter tags separated by commas..."
              />
            ) : (
              <div className="text-sm text-gray-900">{recipe.tags || '—'}</div>
            )}
          </div>

          {/* Ingredients Section - Placeholder for future development */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Ingredients</h3>
            <div className="bg-gray-50 rounded-md p-4">
              <div className="text-sm text-gray-500 italic">
                Ingredient management will be implemented in the next phase
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RecipeEditor;
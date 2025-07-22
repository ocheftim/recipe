import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PageLayout from '../../components/PageLayout';

const IngredientEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  console.log('IngredientEditor - id:', id);
  console.log('IngredientEditor - isNew:', isNew);

  const [isEditing, setIsEditing] = useState(isNew);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [ingredient, setIngredient] = useState({
    name: '',
    category: '',
    subcategory: '',
    unit: '',
    costPerUnit: '',
    supplier: '',
    notes: '',
    allergens: '',
    storage: ''
  });

  const categories = [
    'Produce', 'Meat & Poultry', 'Seafood', 'Dairy', 'Pantry', 
    'Spices & Herbs', 'Beverages', 'Frozen', 'Bakery', 'Other'
  ];

  const units = [
    'lb', 'oz', 'kg', 'g', 'cup', 'tbsp', 'tsp', 'ml', 'L', 
    'piece', 'bunch', 'head', 'clove', 'can', 'bottle', 'bag'
  ];

  const storageOptions = [
    'Refrigerated', 'Frozen', 'Pantry', 'Room Temperature', 'Cool & Dry'
  ];

  useEffect(() => {
    if (!isNew) {
      loadIngredient();
    }
  }, [id, isNew]);

  const loadIngredient = async () => {
    try {
      const docRef = doc(db, 'ingredients', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setIngredient({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error('Ingredient not found');
        navigate('/ingredients');
      }
    } catch (error) {
      console.error('Error loading ingredient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Validation
      if (!ingredient.name.trim()) {
        alert('Ingredient name is required');
        return;
      }

      const ingredientData = {
        ...ingredient,
        costPerUnit: parseFloat(ingredient.costPerUnit) || 0,
        updatedAt: new Date().toISOString()
      };

      if (isNew) {
        ingredientData.createdAt = new Date().toISOString();
        const newDocRef = doc(db, 'ingredients', Date.now().toString());
        await setDoc(newDocRef, ingredientData);
        console.log('Created new ingredient, navigating to:', `/ingredients/${newDocRef.id}`);
        navigate(`/ingredients/${newDocRef.id}`);
      } else {
        const docRef = doc(db, 'ingredients', id);
        await updateDoc(docRef, ingredientData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving ingredient:', error);
      alert('Error saving ingredient');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ingredient?')) return;
    
    try {
      await deleteDoc(doc(db, 'ingredients', id));
      navigate('/ingredients');
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      alert('Error deleting ingredient');
    }
  };

  const handleInputChange = (field, value) => {
    setIngredient(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <PageLayout title="Loading Ingredient...">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading ingredient...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={
        <div className="flex items-center justify-between w-full">
          <span>{isNew ? 'New Ingredient' : ingredient.name}</span>
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
                  onClick={() => isNew ? navigate('/ingredients') : setIsEditing(false)}
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
                    value={ingredient.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter ingredient name..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.name || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                {isEditing ? (
                  <select
                    value={ingredient.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select category...</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.category || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={ingredient.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter subcategory..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.subcategory || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                {isEditing ? (
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select unit...</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.unit || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost Per Unit ($)</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={ingredient.costPerUnit}
                    onChange={(e) => handleInputChange('costPerUnit', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="0.00"
                  />
                ) : (
                  <div className="text-sm text-gray-900">
                    {ingredient.costPerUnit ? `$${parseFloat(ingredient.costPerUnit).toFixed(2)}` : '—'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage</label>
                {isEditing ? (
                  <select
                    value={ingredient.storage}
                    onChange={(e) => handleInputChange('storage', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select storage type...</option>
                    {storageOptions.map(storage => (
                      <option key={storage} value={storage}>{storage}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.storage || '—'}</div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={ingredient.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter supplier name..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.supplier || '—'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergens</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={ingredient.allergens}
                    onChange={(e) => handleInputChange('allergens', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter allergens..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{ingredient.allergens || '—'}</div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Notes</h3>
            {isEditing ? (
              <textarea
                value={ingredient.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter any additional notes..."
              />
            ) : (
              <div className="text-sm text-gray-900 whitespace-pre-wrap">{ingredient.notes || '—'}</div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default IngredientEditor;
// src/components/recipe-books/RecipeBookModal.js
import React, { useState, useEffect } from 'react';
import { X, Save, BookOpen } from 'lucide-react';
import { COLORS, BUTTON_STYLES, INPUT_STYLES, BOOK_CATEGORIES, BOOK_TYPES, BOOK_STATUSES, ACCESS_LEVELS } from '../../constants/recipeBooksConstants';

const RecipeBookModal = ({ 
  isOpen, 
  book, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Training Materials',
    type: 'Training Manual',
    status: 'Draft',
    accessLevel: 'Kitchen Staff',
    author: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  // Update form data when book changes
  useEffect(() => {
    if (book && !book.isNew) {
      setFormData({
        title: book.title || '',
        description: book.description || '',
        category: book.category || 'Training Materials',
        type: book.type || 'Training Manual',
        status: book.status || 'Draft',
        accessLevel: book.accessLevel || 'Kitchen Staff',
        author: book.author || '',
        tags: book.tags || []
      });
    } else {
      // Reset form for new book
      setFormData({
        title: '',
        description: '',
        category: 'Training Materials',
        type: 'Training Manual',
        status: 'Draft',
        accessLevel: 'Kitchen Staff',
        author: '',
        tags: []
      });
    }
    setErrors({});
    setTagInput('');
  }, [book]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe book title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Book type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const bookData = {
        ...formData,
        id: book?.id || Date.now(), // Simple ID generation
        createdDate: book?.createdDate || new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        recipeIds: book?.recipeIds || [],
        totalRecipes: book?.totalRecipes || 0,
        avgRating: book?.avgRating || 0,
        popularity: book?.popularity || 0,
        difficulty: book?.difficulty || 'Easy',
        estimatedTime: book?.estimatedTime || '15-30 min'
      };
      
      onSave(bookData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ✅ Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {book && !book.isNew ? 'Edit Recipe Book' : 'Create New Recipe Book'}
              </h2>
              <p className="text-sm text-gray-600">
                {book && !book.isNew ? 'Update recipe book information' : 'Set up a new recipe collection'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* ✅ Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Book Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Signature Dishes Collection"
              className={errors.title ? INPUT_STYLES.error : INPUT_STYLES.base}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={errors.category ? INPUT_STYLES.error : INPUT_STYLES.base}
              >
                {BOOK_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className={errors.type ? INPUT_STYLES.error : INPUT_STYLES.base}
              >
                {BOOK_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-600 text-sm mt-1">{errors.type}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the purpose and contents of this recipe book..."
              rows={3}
              className={errors.description ? INPUT_STYLES.error : INPUT_STYLES.base}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Status and Access Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className={INPUT_STYLES.base}
              >
                {BOOK_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Level
              </label>
              <select
                value={formData.accessLevel}
                onChange={(e) => handleInputChange('accessLevel', e.target.value)}
                className={INPUT_STYLES.base}
              >
                {ACCESS_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="e.g., Executive Chef"
              className={errors.author ? INPUT_STYLES.error : INPUT_STYLES.base}
            />
            {errors.author && (
              <p className="text-red-600 text-sm mt-1">{errors.author}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add a tag..."
                className={INPUT_STYLES.base}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className={BUTTON_STYLES.secondary}
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Info Box for New Books */}
          {(!book || book.isNew) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Next Steps</h4>
              <p className="text-sm text-blue-700">
                After creating this recipe book, you'll be able to:
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Add recipes from your recipe database</li>
                <li>• Organize recipes by sections and categories</li>
                <li>• Design the book layout and format</li>
                <li>• Export and share the completed book</li>
              </ul>
            </div>
          )}
        </form>

        {/* ✅ Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className={BUTTON_STYLES.secondary}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={BUTTON_STYLES.primary}
          >
            <Save size={16} className="mr-2" />
            {book && !book.isNew ? 'Update Recipe Book' : 'Create Recipe Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeBookModal;
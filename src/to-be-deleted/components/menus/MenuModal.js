// src/components/menus/MenuModal.js
import React, { useState, useEffect } from 'react';
import { X, Save, Menu as MenuIcon } from 'lucide-react';
import { COLORS, BUTTON_STYLES, INPUT_STYLES, MENU_TYPES, MENU_STATUSES } from '../../constants/menuConstants';

const MenuModal = ({ 
  isOpen, 
  menu, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dinner Menu',
    status: 'Draft',
    description: '',
    sections: []
  });

  const [errors, setErrors] = useState({});

  // Update form data when menu changes
  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name || '',
        type: menu.type || 'Dinner Menu',
        status: menu.status || 'Draft',
        description: menu.description || '',
        sections: menu.sections || []
      });
    } else {
      // Reset form for new menu
      setFormData({
        name: '',
        type: 'Dinner Menu',
        status: 'Draft',
        description: '',
        sections: []
      });
    }
    setErrors({});
  }, [menu]);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Menu name is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Menu type is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Menu description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const menuData = {
        ...formData,
        id: menu?.id || Date.now(), // Simple ID generation
        lastUpdated: new Date().toISOString().split('T')[0],
        totalItems: formData.sections.reduce((sum, section) => sum + (section.items?.length || 0), 0),
        averagePrice: 0, // Will be calculated when items are added
        estimatedMargin: 0 // Will be calculated when items are added
      };
      
      onSave(menuData);
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
              <MenuIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {menu ? 'Edit Menu' : 'Create New Menu'}
              </h2>
              <p className="text-sm text-gray-600">
                {menu ? 'Update menu information' : 'Set up a new restaurant menu'}
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
          {/* Menu Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Spring Dinner Menu 2024"
              className={errors.name ? INPUT_STYLES.error : INPUT_STYLES.base}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Menu Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Menu Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className={errors.type ? INPUT_STYLES.error : INPUT_STYLES.base}
              >
                {MENU_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-600 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className={INPUT_STYLES.base}
              >
                {MENU_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Menu Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe this menu and its theme..."
              rows={3}
              className={errors.description ? INPUT_STYLES.error : INPUT_STYLES.base}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Menu Sections Preview */}
          {formData.sections.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Sections
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.sections.map((section, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {section.name} ({section.items?.length || 0} items)
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                You can add items to sections after creating the menu.
              </p>
            </div>
          )}

          {/* Info Box for New Menus */}
          {!menu && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Next Steps</h4>
              <p className="text-sm text-blue-700">
                After creating this menu, you'll be able to:
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Add recipes from your recipe database</li>
                <li>• Organize items into sections (Appetizers, Entrees, etc.)</li>
                <li>• Set menu-specific pricing</li>
                <li>• Design the menu layout</li>
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
            {menu ? 'Update Menu' : 'Create Menu'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
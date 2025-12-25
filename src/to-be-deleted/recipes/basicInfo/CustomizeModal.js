// src/components/recipes/basicInfo/CustomizeModal.js
import React, { useState, useEffect } from 'react';
import { X, Plus, Search, Trash2 } from 'lucide-react';

const CustomizeModal = ({ isOpen, title, items, originalItems, onSave, onCancel }) => {
  const [editableItems, setEditableItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditableItems([...items]);
      setNewItem('');
      setSearchTerm('');
    }
  }, [isOpen, items]);

  const addItem = () => {
    if (newItem.trim() && !editableItems.includes(newItem.trim())) {
      setEditableItems([...editableItems, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (itemToRemove) => {
    setEditableItems(editableItems.filter(item => item !== itemToRemove));
  };

  const handleSave = () => {
    onSave(editableItems);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  const filteredItems = editableItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Customize {title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Add new item */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add new option..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addItem}
              disabled={!newItem.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search options..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Items list */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm">{item}</span>
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && searchTerm && (
            <div className="text-center text-gray-500 py-4">
              No options found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;

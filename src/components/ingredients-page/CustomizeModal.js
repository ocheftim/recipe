import React, { useState, useEffect } from 'react';

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

  const removeItem = (index) => {
    const newItems = editableItems.filter((_, i) => i !== index);
    setEditableItems(newItems);
  };

  const moveItem = (fromIndex, direction) => {
    const newItems = [...editableItems];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    
    if (toIndex >= 0 && toIndex < newItems.length) {
      [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]];
      setEditableItems(newItems);
    }
  };

  const resetToDefault = () => {
    setEditableItems([...originalItems]);
  };

  const filteredItems = editableItems.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasChanges = JSON.stringify(editableItems.sort()) !== JSON.stringify(items.sort());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Add, remove, or reorder items. Changes will be saved to your current session.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add New Item */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Item
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new item..."
              />
              <button
                onClick={addItem}
                disabled={!newItem.trim() || editableItems.includes(newItem.trim())}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Items ({editableItems.length} total)
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search existing items..."
            />
          </div>

          {/* Items List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredItems.map((item, index) => {
              const actualIndex = editableItems.indexOf(item);
              return (
                <div key={item} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg group">
                  <span className="flex-1 text-sm text-gray-900">{item}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveItem(actualIndex, 'up')}
                      disabled={actualIndex === 0}
                      className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(actualIndex, 'down')}
                      disabled={actualIndex === editableItems.length - 1}
                      className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeItem(actualIndex)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {searchTerm && filteredItems.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No items match your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={resetToDefault}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset to Default
              </button>
              {hasChanges && (
                <span className="text-sm text-orange-600 flex items-center">
                  ⚠ Unsaved changes
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(editableItems)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
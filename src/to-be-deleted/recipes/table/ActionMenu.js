// src/components/recipes/table/ActionMenu.js
import React from 'react';
import { MoreVertical, Edit, Copy, Trash2, Archive } from 'lucide-react';

const ActionMenu = ({ 
  recipe, 
  isOpen, 
  onToggle, 
  onEditRecipe, 
  onCopyRecipe, 
  onDeleteRecipe, 
  onArchiveRecipe 
}) => {
  const handleAction = (action, event) => {
    event.stopPropagation();
    onToggle(false);
    action(recipe);
  };

  return (
    <div className="relative action-menu-container">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(!isOpen);
        }}
        className="p-1 hover:bg-gray-100 rounded"
        title="Recipe actions"
      >
        <MoreVertical size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="py-1">
            <button
              onClick={(e) => handleAction(onEditRecipe, e)}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit size={16} className="mr-2" />
              Edit Recipe
            </button>
            <button
              onClick={(e) => handleAction(onCopyRecipe, e)}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Copy size={16} className="mr-2" />
              Duplicate Recipe
            </button>
            <hr className="my-1" />
            <button
              onClick={(e) => handleAction(onArchiveRecipe, e)}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Archive size={16} className="mr-2" />
              {recipe.status === 'Archived' ? 'Unarchive' : 'Archive'} Recipe
            </button>
            <button
              onClick={(e) => handleAction(onDeleteRecipe, e)}
              className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;

// src/components/recipes/RecipeInstructionsTab.js
import React from 'react';

const RecipeInstructionsTab = ({ 
  instructions, 
  onUpdateInstruction, 
  onAddInstruction, 
  onRemoveInstruction 
}) => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Cooking Instructions</h3>
        <button
          onClick={onAddInstruction}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
        >
          + Add Step
        </button>
      </div>

      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
              {index + 1}
            </div>
            <div className="flex-1">
              <textarea
                value={instruction}
                onChange={(e) => onUpdateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1} instructions...`}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            {instructions.length > 1 && (
              <button
                onClick={() => onRemoveInstruction(index)}
                className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 w-7 h-7 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInstructionsTab;
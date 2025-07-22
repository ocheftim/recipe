// RecipeDetailsModal.js
import React, { useState } from "react";

function RecipeDetailsModal({ onClose, onSave, initialData }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [source, setSource] = useState(initialData.source || "");
  const [portions, setPortions] = useState(initialData.portions || 1);
  const [menuPrice, setMenuPrice] = useState(initialData.menuPrice || 0);

  const handleSubmit = () => {
    onSave({ title, source, portions, menuPrice });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Edit Recipe Details</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source or attribution"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Yield (portions)</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
              value={portions}
              onChange={(e) => setPortions(Number(e.target.value))}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Menu Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
              value={menuPrice}
              onChange={(e) => setMenuPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsModal;

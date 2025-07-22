// RecipeMetadata.jsx
import React from "react";

function RecipeMetadata({ metadata, setMetadata, totalCost }) {
  const handleChange = (field, value) => {
    setMetadata({ ...metadata, [field]: value });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
      <div>
        <label className="block font-medium text-gray-700 mb-1">Yield</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={metadata.yield || ""}
            onChange={(e) => handleChange("yield", parseFloat(e.target.value))}
            className="w-20 border px-2 py-1 rounded"
          />
          <select
            value={metadata.yieldUnit || "gal"}
            onChange={(e) => handleChange("yieldUnit", e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="gal">gal</option>
            <option value="qt">qt</option>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
            <option value="each">each</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Cost</label>
        <p className="px-2 py-1 bg-gray-100 rounded">${totalCost.toFixed(2)}</p>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Shelf Life (days)</label>
        <input
          type="number"
          value={metadata.shelfLife || ""}
          onChange={(e) => handleChange("shelfLife", parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Prep Time</label>
        <input
          type="text"
          placeholder="e.g. 0h 30m"
          value={metadata.prepTime || ""}
          onChange={(e) => handleChange("prepTime", e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Inventory Unit</label>
        <select
          value={metadata.inventoryUnit || "qt"}
          onChange={(e) => handleChange("inventoryUnit", e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="qt">qt</option>
          <option value="gal">gal</option>
          <option value="lb">lb</option>
          <option value="kg">kg</option>
          <option value="each">each</option>
        </select>
      </div>

      <div className="col-span-2 md:col-span-3">
        <label className="block font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          value={metadata.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
    </div>
  );
}

export default RecipeMetadata;

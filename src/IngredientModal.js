import React, { useState, useEffect } from "react";

function IngredientModal({
  ingredient,
  onSave,
  onCancel,
  unitOptions = [],
  categoryOptions = [],
  subcategoryOptions = {},
}) {
  const [local, setLocal] = useState({ ...ingredient });

  useEffect(() => {
    setLocal({ ...ingredient });
  }, [ingredient]);

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(local);
  };

  const subcats = subcategoryOptions[local.category] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] space-y-4">
        <h2 className="text-lg font-bold">Edit Ingredient</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Qty</label>
            <input
              value={local.qty || ""}
              onChange={(e) => handleChange("qty", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Unit</label>
            <select
              value={local.unit || ""}
              onChange={(e) => handleChange("unit", e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select unit</option>
              {unitOptions.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Ingredient Name</label>
            <input
              value={local.ingredient || ""}
              onChange={(e) => handleChange("ingredient", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={local.category || ""}
              onChange={(e) => {
                handleChange("category", e.target.value);
                handleChange("subcategory", ""); // reset subcategory
              }}
              className="w-full border p-2 rounded"
            >
              <option value="">Select category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Subcategory</label>
            <select
              value={local.subcategory || ""}
              onChange={(e) => handleChange("subcategory", e.target.value)}
              className="w-full border p-2 rounded"
              disabled={!local.category}
            >
              <option value="">Select subcategory</option>
              {subcats.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Modifier / Notes</label>
            <input
              value={local.modifier || ""}
              onChange={(e) => handleChange("modifier", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">AP Cost (per case)</label>
            <input
              type="text"
              value={local.apCost || ""}
              onChange={(e) => handleChange("apCost", e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="$00.00 / unit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">EP Cost (used amount)</label>
            <input
              type="text"
              value={local.cost || ""}
              onChange={(e) => handleChange("cost", e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="$00.00"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default IngredientModal;

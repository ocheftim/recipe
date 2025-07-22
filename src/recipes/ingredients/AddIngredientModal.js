// Updated AddIngredientModal.jsx with category/subcategory/unit dropdowns
import React, { useEffect, useState } from "react";

export default function AddIngredientModal({ initialData = null, onSave, onCancel, masterIngredients = [] }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setAmount(initialData.amount || "");
      setUnit(initialData.unit || "");
      setCategory(initialData.category || "");
      setSubcategory(initialData.subcategory || "");
    }
  }, [initialData]);

  const filteredMasterIngredients = masterIngredients.filter((ing) =>
    (ing?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(masterIngredients.map(i => i.category).filter(Boolean))];
  const subcategories = masterIngredients
    .filter(i => i.category === category)
    .map(i => i.subcategory)
    .filter(Boolean);

  const units = ["g", "kg", "oz", "lb", "tsp", "tbsp", "cup", "qt", "gal", "each", "piece"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, amount, unit, category, subcategory });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Ingredient" : "Add Ingredient"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Search Master Ingredients</label>
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-3 py-1 rounded"
            />
            {search && (
              <ul className="max-h-32 overflow-y-auto border rounded mt-1">
                {filteredMasterIngredients.map((ing, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setName(ing.name);
                      setUnit(ing.defaultUnit || "");
                      setCategory(ing.category || "");
                      setSubcategory(ing.subcategory || "");
                      setSearch("");
                    }}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {ing.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border rounded px-3 py-1"
            >
              <option value="">Select Unit</option>
              {units.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-1"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Subcategory</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border rounded px-3 py-1"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sub, i) => <option key={i}>{sub}</option>)}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

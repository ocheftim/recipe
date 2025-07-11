import React, { useState } from "react";
import IngredientModal from "./IngredientModal";

function IngredientManager({ ingredients, setIngredients }) {
  const [editingIndex, setEditingIndex] = useState(null);

  const unitOptions = ["g", "kg", "oz", "lb", "cup", "tbsp", "tsp", "each"];
  const categoryOptions = ["Dairy & Eggs", "Meat", "Produce"];
  const subcategoryOptions = {
    "Dairy & Eggs": ["Milk", "Cheese", "Eggs"],
    Meat: ["Chicken", "Beef", "Pork"],
    Produce: ["Leafy Greens", "Root Vegetables", "Fruits"]
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleClose = () => {
    setEditingIndex(null);
  };

  const updateIngredient = (index, updated) => {
    const updatedList = [...ingredients];
    updatedList[index] = updated;
    setIngredients(updatedList);
  };

  const addIngredient = () => {
    const newIngredient = {
      qty: "",
      unit: "",
      ingredient: "",
      category: "",
      subcategory: "",
      modifier: "",
      cost: ""
    };
    setIngredients([...ingredients, newIngredient]);
    setEditingIndex(ingredients.length);
  };

  return (
    <div className="space-y-2 max-w-[800px] w-full">
      <h2 className="text-lg font-semibold mb-1">Ingredients</h2>

      {ingredients.length === 0 && (
        <p className="text-sm italic text-gray-500">No ingredients yet.</p>
      )}

      <ul className="space-y-0.5">
        {ingredients.map((ing, index) => (
          <li
            key={index}
            className="group flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-gray-100"
          >
            <button
              onClick={() => handleEdit(index)}
              className="text-left flex-1"
            >
             <span className="font-medium text-gray-900">
  {ing.qty || <em className="text-gray-400">No qty</em>}{" "}
  {ing.unit || <em className="text-gray-400">No unit</em>}{" "}
  {ing.ingredient || <em className="text-gray-400">No ingredient</em>}
</span>
<span className="text-gray-500">
  {ing.modifier ? ` — ${ing.modifier}` : <em className="text-gray-400">No modifier</em>}
</span>

            </button>

            <button
              onClick={() =>
                setIngredients(ingredients.filter((_, i) => i !== index))
              }
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition ml-2 text-xs"
              title="Remove"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={addIngredient}
        className="mt-2 text-sm text-green-700 border border-green-600 px-3 py-1 rounded hover:bg-green-50 transition"
      >
        ➕ Add Ingredient
      </button>

      {editingIndex !== null && (
        <IngredientModal
          ingredient={ingredients[editingIndex]}
          onSave={(updated) => {
            updateIngredient(editingIndex, updated);
            handleClose();
          }}
          onCancel={handleClose}
          unitOptions={unitOptions}
          categoryOptions={categoryOptions}
          subcategoryOptions={subcategoryOptions}
        />
      )}
    </div>
  );
}

export default IngredientManager;

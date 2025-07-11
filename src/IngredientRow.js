import React from "react";

function IngredientRow({
  index,
  ingredient,
  updateIngredient,
  removeIngredient,
  unitOptions = [],
  categoryOptions = [],
  subcategoryOptions = {},
  ingredientOptions = [],
}) {
  const handleChange = (field, value) => {
    const updated = { ...ingredient, [field]: value };

    if (field === "category") {
      updated.subcategory = "";
      updated.ingredient = "";
    }

    if (field === "subcategory") {
      updated.ingredient = "";
    }

    updateIngredient(index, updated);
  };

  const subcategories = subcategoryOptions[ingredient.category] || [];

  const filteredIngredients = ingredientOptions.filter(
    (opt) =>
      opt.category === ingredient.category &&
      opt.subcategory === ingredient.subcategory
  );

  return (
    <div className="flex items-center gap-2 text-sm py-1 px-1 border-b border-gray-200">
      <input
        type="number"
        value={ingredient.qty}
        onChange={(e) => handleChange("qty", e.target.value)}
        className="w-12 px-1 border border-gray-300 rounded text-right"
        placeholder="Qty"
      />

      <select
        value={ingredient.unit}
        onChange={(e) => handleChange("unit", e.target.value)}
        className="w-16 px-1 border border-gray-300 rounded"
      >
        <option value="">Unit</option>
        {unitOptions.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      <select
        value={ingredient.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="w-28 px-1 border border-gray-300 rounded"
      >
        <option value="">Category</option>
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={ingredient.subcategory}
        onChange={(e) => handleChange("subcategory", e.target.value)}
        className="w-28 px-1 border border-gray-300 rounded"
      >
        <option value="">Subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <select
        value={ingredient.ingredient}
        onChange={(e) => handleChange("ingredient", e.target.value)}
        className="w-44 px-1 border border-gray-300 rounded"
      >
        <option value="">Ingredient</option>
        {filteredIngredients.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={ingredient.modifier}
        onChange={(e) => handleChange("modifier", e.target.value)}
        placeholder="e.g., diced"
        className="w-24 px-1 border border-gray-300 rounded"
      />

      <input
        type="number"
        value={ingredient.cost}
        onChange={(e) => handleChange("cost", e.target.value)}
        className="w-20 px-1 border border-gray-300 rounded text-right"
        placeholder="Cost"
        step="0.01"
      />

      {/* Remove Button */}
      <button
        onClick={() => removeIngredient(index)}
        className="text-gray-400 hover:text-red-600 text-sm"
        title="Remove"
      >
        ❌
      </button>
    </div>
  );
}

export default IngredientRow;

// IngredientRow.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const IngredientRow = ({
  ingredient,
  index,
  updateIngredient,
  removeIngredient,
  unitOptions,
  categoryOptions,
  subcategoryOptions,
  ingredientOptions
}) => {
  const [localIngredient, setLocalIngredient] = useState(ingredient || {});
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get("title") || "MainRecipe";

  useEffect(() => {
    setLocalIngredient(ingredient || {});
  }, [ingredient]);

  const handleChange = (field, value) => {
    const updated = { ...localIngredient, [field]: value };
    if (field === "category") {
      updated.subcategory = "";
    }
    setLocalIngredient(updated);
    updateIngredient(index, updated);
  };

  const handleSubrecipeRedirect = () => {
    const name = localIngredient.ingredient?.trim();
    if (localIngredient.isSubrecipe && name) {
      const params = new URLSearchParams({ title: name, returnTo });
      navigate(`/recipe?${params.toString()}`);
    }
  };

  const qty = parseFloat(localIngredient.qty) || 0;
  const cost = parseFloat(localIngredient.cost) || 0;
  const lineCost = (qty * cost).toFixed(2);

  const filteredIngredients = ingredientOptions.filter(
    (item) =>
      item.category === localIngredient.category &&
      item.subcategory === localIngredient.subcategory
  );

  return (
    <div className="grid grid-cols-[60px_80px_160px_160px_160px_160px_80px_100px_40px] gap-2 items-center text-sm border-b py-2">
      <input
        className="px-2 py-1 border rounded"
        placeholder="Qty"
        value={localIngredient.qty}
        onChange={(e) => handleChange("qty", e.target.value)}
      />

      <select
        className="px-2 py-1 border rounded bg-white text-sm"
        value={localIngredient.unit}
        onChange={(e) => handleChange("unit", e.target.value)}
      >
        <option value="">Unit</option>
        {unitOptions.map((unit) => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>

      <select
        className="px-2 py-1 border rounded bg-white text-sm"
        value={localIngredient.category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">Category</option>
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        className="px-2 py-1 border rounded bg-white text-sm"
        value={localIngredient.subcategory}
        onChange={(e) => handleChange("subcategory", e.target.value)}
      >
        <option value="">Subcategory</option>
        {(subcategoryOptions[localIngredient.category] || []).map((sub) => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>

      <div className="relative">
        <input
          className="w-full px-2 py-1 border rounded"
          placeholder="Ingredient"
          value={localIngredient.ingredient}
          list={`ingredient-options-${index}`}
          onChange={(e) => handleChange("ingredient", e.target.value)}
          onBlur={handleSubrecipeRedirect}
        />
        <datalist id={`ingredient-options-${index}`}>
          {filteredIngredients.map((item) => (
            <option key={item.name} value={item.name} />
          ))}
        </datalist>
      </div>

      <input
        className="px-2 py-1 border rounded"
        placeholder="Modifier"
        value={localIngredient.modifier}
        onChange={(e) => handleChange("modifier", e.target.value)}
      />

      <input
        className="px-2 py-1 border rounded text-right"
        placeholder="Cost"
        value={localIngredient.cost}
        onChange={(e) => handleChange("cost", e.target.value)}
      />

      <div className="text-right text-gray-800">${lineCost}</div>

      <div className="flex items-center space-x-1">
        <input
          type="checkbox"
          checked={localIngredient.isSubrecipe || false}
          onChange={(e) => handleChange("isSubrecipe", e.target.checked)}
        />
        <button
          className="text-red-500 hover:text-red-700 text-xs"
          onClick={() => removeIngredient(index)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default IngredientRow;

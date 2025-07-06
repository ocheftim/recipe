// IngredientManager.js
import React from "react";
import IngredientRow from "./IngredientRow";

function IngredientManager({
  ingredients,
  setIngredients,
  createEmptyIngredient,
  recipeTitle,
  unitOptions,
  categoryOptions,
  subcategoryOptions,
  ingredientOptions,
}) {
  const updateIngredient = (index, updated) => {
    const updatedList = [...ingredients];
    updatedList[index] = updated;
    setIngredients(updatedList);
  };

  const removeIngredient = (index) => {
    const updatedList = [...ingredients];
    updatedList.splice(index, 1);
    setIngredients(updatedList);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, createEmptyIngredient()]);
  };

  const totalCost = ingredients
    .reduce((sum, ing) => {
      const qty = parseFloat(ing.qty) || 0;
      const cost = parseFloat(ing.cost) || 0;
      return sum + qty * cost;
    }, 0)
    .toFixed(2);

  return (
    <div className="space-y-2">
      <div className="font-semibold border-b pb-1 text-lg">Ingredients</div>

      <div className="overflow-x-auto">
        <div className="min-w-[1300px] space-y-1">
          {ingredients.map((ingredient, index) => (
            <IngredientRow
              key={index}
              ingredient={ingredient}
              index={index}
              updateIngredient={updateIngredient}
              removeIngredient={removeIngredient}
              unitOptions={unitOptions}
              categoryOptions={categoryOptions}
              subcategoryOptions={subcategoryOptions}
              ingredientOptions={ingredientOptions}
            />
          ))}

          {/* Aligned Total Cost */}
          <div className="grid grid-cols-[60px_80px_160px_160px_160px_160px_80px_100px_40px] gap-2 items-center text-sm border-t pt-2">
            <div className="col-span-7"></div>
            <div className="text-right text-sm text-gray-800 pr-2 font-semibold w-[100px]">
              ${totalCost}
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Add Ingredient Button */}
      <div className="mt-4">
        <button
          onClick={addIngredient}
          className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          + Add Ingredient
        </button>
      </div>
    </div>
  );
}

export default IngredientManager;

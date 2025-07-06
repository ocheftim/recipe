// RecipeEditor.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IngredientManager from "./IngredientManager";

function RecipeEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialTitle = searchParams.get("title") || "Untitled Recipe";
  const returnTo = searchParams.get("returnTo");

  const [originalKey] = useState(initialTitle); // store the key for localStorage
  const [recipeTitle, setRecipeTitle] = useState(initialTitle);
  const [source, setSource] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [portions, setPortions] = useState(1);
  const [menuPrice, setMenuPrice] = useState(0);

  const unitOptions = ["g", "kg", "oz", "lb", "cup", "tbsp", "tsp", "each"];

  const categoryOptions = ["Dairy & Eggs", "Meat", "Produce"];
  const subcategoryOptions = {
    "Dairy & Eggs": ["Milk", "Cheese", "Eggs"],
    Meat: ["Chicken", "Beef", "Pork"],
    Produce: ["Leafy Greens", "Root Vegetables", "Fruits"]
  };

  const ingredientOptions = [
    { name: "Milk", category: "Dairy & Eggs", subcategory: "Milk" },
    { name: "Cheddar Cheese", category: "Dairy & Eggs", subcategory: "Cheese" },
    { name: "Spinach", category: "Produce", subcategory: "Leafy Greens" },
    { name: "Carrots", category: "Produce", subcategory: "Root Vegetables" },
    { name: "Chicken Breast", category: "Meat", subcategory: "Chicken" }
  ];

  const createEmptyIngredient = () => ({
    qty: "",
    unit: "",
    category: "",
    subcategory: "",
    ingredient: "",
    modifier: "",
    cost: "",
    isSubrecipe: false
  });

  const createEmptyInstruction = () => ({ title: "", detail: "" });

  useEffect(() => {
    const saved = localStorage.getItem(originalKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && Array.isArray(data.ingredients)) {
          setIngredients(data.ingredients);
          setInstructions(data.instructions || []);
          setRecipeTitle(data.title || initialTitle);
        } else {
          setIngredients([createEmptyIngredient()]);
          setInstructions([]);
        }
      } catch {
        setIngredients([createEmptyIngredient()]);
        setInstructions([]);
      }
    } else {
      setIngredients([createEmptyIngredient()]);
      setInstructions([]);
    }
  }, [originalKey]);

  const totalCost = ingredients.reduce((sum, ing) => {
    const qty = parseFloat(ing.qty) || 0;
    const cost = parseFloat(ing.cost) || 0;
    return sum + qty * cost;
  }, 0);

  const costPerPortion = portions > 0 ? totalCost / portions : 0;
  const foodCostPercent = menuPrice > 0 ? (costPerPortion / menuPrice) * 100 : 0;
  const profitPerPortion = menuPrice - costPerPortion;
  const suggestedMenuPrice = costPerPortion > 0 ? (costPerPortion / 0.35).toFixed(2) : "0.00";

  const saveRecipe = () => {
    const recipe = {
      title: recipeTitle,
      ingredients,
      instructions,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(originalKey, JSON.stringify(recipe));
    alert("Recipe saved!");
  };

  const updateInstruction = (index, field, value) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, createEmptyInstruction()]);
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-dm-sans">
      <header className="bg-[#14523F] text-white px-6 py-2 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <img src="/ToqueWorks.png" alt="Toque Logo" className="h-28 w-auto object-contain" />
            <nav className="flex gap-6 items-center ml-[80px]">
              <button onClick={() => navigate("/")} className="text-base font-medium text-white border-b-2 border-white pb-1">Recipes</button>
              <button onClick={() => navigate("/ingredients")} className="text-base font-medium text-white hover:text-gray-200">Ingredients</button>
              <button onClick={() => navigate("/menus")} className="text-base font-medium text-white hover:text-gray-200">Menus</button>
              <button onClick={() => navigate("/books")} className="text-base font-medium text-white hover:text-gray-200">Recipe Books</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="flex items-start justify-start gap-6 w-full max-w-screen-xl mx-auto">
          <div className="w-[600px] space-y-2">
            <input
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
              className="text-2xl font-bold w-[600px] pl-4 border-b-2 focus:outline-none"
            />
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Source"
              className="w-[300px] border px-2 py-1 rounded"
            />
            <div className="flex gap-6 pt-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yield Portions</label>
                <input
                  type="number"
                  value={portions}
                  onChange={(e) => setPortions(parseInt(e.target.value) || 0)}
                  className="w-[80px] border px-2 py-1 rounded"
                  placeholder="Servings"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Menu Price</label>
                <input
                  type="number"
                  value={menuPrice}
                  onChange={(e) => setMenuPrice(parseFloat(e.target.value) || 0)}
                  className="w-[100px] border px-2 py-1 rounded"
                  placeholder="$"
                />
              </div>
            </div>
          </div>

          <div className="w-[300px] bg-white border rounded p-4 shadow space-y-2 text-sm mt-2">
            <h2 className="text-base font-semibold border-b pb-1">Recipe Costing</h2>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Cost:</span>
              <span className="text-gray-900 font-medium">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cost Per Portion:</span>
              <span className="text-gray-900 font-medium">${costPerPortion.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Suggested Min Price:</span>
              <span className="text-gray-900 font-medium">${suggestedMenuPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Food Cost %:</span>
              <span className="text-gray-900 font-medium">{foodCostPercent.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Profit $:</span>
              <span className="text-gray-900 font-medium">${profitPerPortion.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <IngredientManager
          ingredients={ingredients}
          setIngredients={setIngredients}
          createEmptyIngredient={createEmptyIngredient}
          recipeTitle={recipeTitle}
          unitOptions={unitOptions}
          categoryOptions={categoryOptions}
          subcategoryOptions={subcategoryOptions}
          ingredientOptions={ingredientOptions}
        />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Instructions</h2>
          {instructions.map((step, index) => (
            <div key={index} className="space-y-1">
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateInstruction(index, "title", e.target.value)}
                placeholder={`Step ${index + 1} Title`}
                className="w-full border px-2 py-1 rounded"
              />
              <textarea
                value={step.detail}
                onChange={(e) => updateInstruction(index, "detail", e.target.value)}
                placeholder="Step details"
                className="w-full border px-2 py-1 rounded"
              />
              <button onClick={() => removeInstruction(index)} className="text-red-600 text-sm">Remove</button>
            </div>
          ))}
          <button onClick={addInstruction} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Add Step
          </button>
        </div>

        <button
          onClick={saveRecipe}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Recipe
        </button>
      </main>
    </div>
  );
}

export default RecipeEditor;

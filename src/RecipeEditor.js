// RecipeEditor.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IngredientManager from "./IngredientManager";
import PrepInstructions from "./PrepInstructions";
import RecipeDetailsModal from "./RecipeDetailsModal";
import { db } from "./Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Edit, Copy, RefreshCcw, MoreVertical } from "lucide-react";

function RecipeEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialTitle = searchParams.get("title") || "Untitled Recipe";
  const returnTo = searchParams.get("returnTo");

  const [originalKey] = useState(initialTitle);
  const [recipeTitle, setRecipeTitle] = useState(initialTitle);
  const [source, setSource] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [portions, setPortions] = useState(1);
  const [menuPrice, setMenuPrice] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const unitOptions = ["g", "kg", "oz", "lb", "cup", "tbsp", "tsp", "each"];

  const categoryOptions = ["Dairy & Eggs", "Meat", "Produce"];
  const subcategoryOptions = {
    "Dairy & Eggs": ["Milk", "Cheese", "Eggs"],
    Meat: ["Chicken", "Beef", "Pork"],
    Produce: ["Leafy Greens", "Root Vegetables", "Fruits"],
  };

  const ingredientOptions = [
    { name: "Milk", category: "Dairy & Eggs", subcategory: "Milk" },
    { name: "Cheddar Cheese", category: "Dairy & Eggs", subcategory: "Cheese" },
    { name: "Spinach", category: "Produce", subcategory: "Leafy Greens" },
    { name: "Carrots", category: "Produce", subcategory: "Root Vegetables" },
    { name: "Chicken Breast", category: "Meat", subcategory: "Chicken" },
  ];

  const createEmptyIngredient = () => ({
    qty: "",
    unit: "",
    category: "",
    subcategory: "",
    ingredient: "",
    modifier: "",
    cost: "",
    isSubrecipe: false,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", originalKey);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIngredients(data.ingredients || []);
          setInstructions(data.instructions || []);
          setRecipeTitle(data.title || initialTitle);
          setPortions(data.portions || 1);
          setMenuPrice(data.menuPrice || 0);
          setSource(data.source || "");
        } else {
          setIngredients([createEmptyIngredient()]);
          setInstructions([]);
        }
      } catch (error) {
        console.error("Error loading recipe:", error);
      }
    };

    fetchRecipe();
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

  const handleUpdateDetails = (updated) => {
    setRecipeTitle(updated.title);
    setSource(updated.source);
    setPortions(updated.portions);
    setMenuPrice(updated.menuPrice);
  };

  const saveRecipe = async () => {
    try {
      const docRef = doc(db, "recipes", recipeTitle);
      await setDoc(docRef, {
        title: recipeTitle,
        source,
        ingredients,
        instructions,
        portions,
        menuPrice,
        lastUpdated: new Date().toISOString(),
      });
      alert("Recipe saved to Firestore!");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
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

      <main className="p-6 max-w-screen-xl mx-auto">
        <div className="bg-white p-6 rounded shadow divide-y divide-gray-200 text-sm">
          <section className="pb-6 relative">
            <div className="absolute top-0 right-0">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="text-gray-500 hover:text-gray-700 transition text-xl"
                  title="Options"
                >
                  <MoreVertical size={20} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1 text-sm">
                      <button
                        onClick={() => {
                          setShowDetailsModal(true);
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        <Edit size={16} /> Edit Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-xl font-semibold">{recipeTitle}</h1>
            <p><span className="font-medium text-gray-700">Source:</span> <em className="text-gray-500">{source || "No source"}</em></p>
            <p><span className="font-medium text-gray-700">Yield:</span> {portions} portions</p>
            <p><span className="font-medium text-gray-700">Menu Price:</span> <em className="text-gray-500">${menuPrice.toFixed(2)}</em></p>
          </section>

          <section className="py-6">
            <h2 className="text-base font-semibold pb-1">Recipe Costing</h2>
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
          </section>

          <section className="py-6">
            <IngredientManager ingredients={ingredients} setIngredients={setIngredients} />
          </section>

          <section className="py-6">
            <PrepInstructions instructions={instructions} setInstructions={setInstructions} />
          </section>

          <div className="pt-6">
            <button onClick={saveRecipe} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Recipe
            </button>
          </div>
        </div>

        {showDetailsModal && (
          <RecipeDetailsModal
            onClose={() => setShowDetailsModal(false)}
            onSave={handleUpdateDetails}
            initialData={{ title: recipeTitle, source, portions, menuPrice }}
          />
        )}
      </main>
    </div>
  );
}

export default RecipeEditor;

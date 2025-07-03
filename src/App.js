import { useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ name: "", yield: "", ingredients: [] });
  const [currentIngredient, setCurrentIngredient] = useState({ name: "", quantity: "", cost: "" });

  const handleAddIngredient = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, currentIngredient],
    });
    setCurrentIngredient({ name: "", quantity: "", cost: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipes([...recipes, form]);
    setForm({ name: "", yield: "", ingredients: [] });
  };

  const calculateCostPerPortion = (recipe) => {
    const totalCost = recipe.ingredients.reduce((sum, ing) => sum + parseFloat(ing.cost || 0), 0);
    return (totalCost / parseFloat(recipe.yield || 1)).toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe MVP</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Recipe Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Yield (portions)"
          value={form.yield}
          onChange={(e) => setForm({ ...form, yield: e.target.value })}
          className="border p-2 w-full"
        />

        <div className="border p-2">
          <h2 className="font-semibold mb-2">Add Ingredient</h2>
          <input
            type="text"
            placeholder="Name"
            value={currentIngredient.name}
            onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
            className="border p-1 mr-2"
          />
          <input
            type="text"
            placeholder="Qty"
            value={currentIngredient.quantity}
            onChange={(e) => setCurrentIngredient({ ...currentIngredient, quantity: e.target.value })}
            className="border p-1 mr-2"
          />
          <input
            type="number"
            placeholder="Cost"
            value={currentIngredient.cost}
            onChange={(e) => setCurrentIngredient({ ...currentIngredient, cost: e.target.value })}
            className="border p-1 mr-2"
          />
          <button type="button" onClick={handleAddIngredient} className="bg-blue-500 text-white px-2 py-1">
            Add Ingredient
          </button>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          Save Recipe
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Saved Recipes</h2>
        {recipes.map((r, idx) => (
          <div key={idx} className="border p-4 mb-4">
            <h3 className="font-bold text-lg">{r.name}</h3>
            <p>Yield: {r.yield} portions</p>
            <ul className="list-disc ml-6">
              {r.ingredients.map((ing, i) => (
                <li key={i}>{ing.quantity} of {ing.name} @ ${ing.cost}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Cost per Portion: ${calculateCostPerPortion(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

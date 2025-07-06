import React from 'react';

export default function RecipeLayout() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-green-900">Recipes</h1>
          <div className="space-x-2">
            <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800">New</button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Duplicate</button>
            <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">Print</button>
            <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">Back</button>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Backup</button>
          </div>
        </div>

        {/* Recipe Details & Controls */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold mb-2">Recipe Details</h2>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Number" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Name" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Source" />
            <div className="flex gap-4 mb-2">
              <label><input type="checkbox" /> Menu</label>
              <label><input type="checkbox" /> SubRecipe</label>
              <label><input type="checkbox" /> Instruction</label>
              <label><input type="checkbox" /> Test</label>
            </div>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Quantity" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Portion" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Servings" />
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold mb-2">Recipe Scaling</h2>
            <div className="space-x-2 mb-2">
              <button className="px-2 py-1 border rounded">0.5x</button>
              <button className="px-2 py-1 border rounded">1x</button>
              <button className="px-2 py-1 border rounded">2x</button>
              <button className="px-2 py-1 border rounded">4x</button>
            </div>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Pan" />
            <h2 className="font-semibold mt-4 mb-2">Recipe Costing</h2>
            <div className="space-y-2">
              <input className="w-full p-2 border rounded" placeholder="Menu Price" />
              <input className="w-full p-2 border rounded" placeholder="Food Cost %" />
              <input className="w-full p-2 border rounded" placeholder="$ Per Serving" />
              <input className="w-full p-2 border rounded" placeholder="Margin $" />
              <input className="w-full p-2 border rounded" placeholder="Margin %" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold mb-2">Recipe Outlets</h2>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Outlet" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Cycle" />
            <textarea className="w-full p-2 border rounded" placeholder="Notes"></textarea>
          </div>
        </div>

        {/* Ingredients Table */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Ingredients</h2>
          <table className="w-full border rounded text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 border">QTY</th>
                <th className="p-2 border">Unit</th>
                <th className="p-2 border">Ingredient</th>
                <th className="p-2 border">Line</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i}>
                  <td className="p-2 border"><input className="w-full p-1 border rounded" /></td>
                  <td className="p-2 border"><input className="w-full p-1 border rounded" /></td>
                  <td className="p-2 border"><input className="w-full p-1 border rounded" /></td>
                  <td className="p-2 border text-right">$0.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instructions Section */}
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="font-semibold mb-2">Instructions</h2>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="mb-2">
              <label className="text-sm font-semibold">Step {step}</label>
              <textarea className="w-full p-2 border rounded" rows="2" placeholder={`Instruction step ${step}`}></textarea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

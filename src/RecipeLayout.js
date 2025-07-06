import React from 'react';
import {
  Plus, Copy, Trash, Printer, ArrowLeft, Save,
} from 'lucide-react';

export default function RecipeLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-[#14523F] h-[100px] flex items-center px-6 justify-between text-white">
        <div className="flex items-center space-x-4">
          <img src="/Toque_Logo_White.png" alt="Logo" className="h-[75px] w-[75px]" />
          <h1 className="text-3xl font-bold">Recipe Manager</h1>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1">
            <Plus size={20} />
            <span>New</span>
          </button>
          <button className="flex items-center space-x-1">
            <Copy size={20} />
            <span>Duplicate</span>
          </button>
          <button className="flex items-center space-x-1">
            <Trash size={20} />
            <span>Delete</span>
          </button>
          <button className="flex items-center space-x-1">
            <Printer size={20} />
            <span>Print</span>
          </button>
          <button className="flex items-center space-x-1">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <button className="flex items-center space-x-1">
            <Save size={20} />
            <span>Backup</span>
          </button>
        </div>
      </header>

      {/* Subheader */}
      <div className="bg-[#317A64] text-white text-lg font-semibold h-[25px] flex items-center px-6">
        Recipe Details
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-6 bg-white shadow-md">
        {/* Recipe Info */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div>
            <h2 className="font-semibold mb-2">Recipe Info</h2>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Recipe Number" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Recipe Name" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Source" />
            <div className="flex gap-3 mb-2 text-sm">
              <label><input type="checkbox" /> Menu</label>
              <label><input type="checkbox" /> SubRecipe</label>
              <label><input type="checkbox" /> Instruction</label>
              <label><input type="checkbox" /> Test</label>
            </div>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Quantity" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Portion" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Servings" />
          </div>

          {/* Middle Column */}
          <div>
            <h2 className="font-semibold mb-2">Scaling & Costing</h2>
            <div className="space-x-2 mb-2">
              <button className="px-2 py-1 border rounded">0.5x</button>
              <button className="px-2 py-1 border rounded">1x</button>
              <button className="px-2 py-1 border rounded">2x</button>
              <button className="px-2 py-1 border rounded">4x</button>
            </div>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Pan Size" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Menu Price" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Food Cost %" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="$ Per Serving" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Margin $" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Margin %" />
          </div>

          {/* Right Column */}
          <div>
            <h2 className="font-semibold mb-2">Outlets & Notes</h2>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Outlet" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Cycle" />
            <textarea className="w-full p-2 border rounded" rows="6" placeholder="Notes" />
          </div>
        </div>

       {/* Ingredients Table */}
<div className="mb-6">
  <h2 className="font-semibold mb-2">Ingredients</h2>
  <table className="w-full border text-sm table-fixed">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border w-1/12">QTY</th>
        <th className="p-2 border w-2/12">Unit</th>
        <th className="p-2 border w-7/12">Ingredient</th>
        <th className="p-2 border w-2/12 text-right">Line</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td className="p-2 border"><input className="w-full p-1 border rounded text-sm" /></td>
          <td className="p-2 border"><input className="w-full p-1 border rounded text-sm" /></td>
          <td className="p-2 border"><input className="w-full p-1 border rounded text-sm" /></td>
          <td className="p-2 border text-right">$0.00</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Instructions */}
        <div>
          <h2 className="font-semibold mb-2">Instructions</h2>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="mb-2">
              <label className="text-sm font-semibold">Step {i + 1}</label>
              <textarea className="w-full p-2 border rounded" rows="2" placeholder={`Instruction step ${i + 1}`} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

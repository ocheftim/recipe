import React, { useState, useMemo } from 'react';
import { 
  Scale, Calculator, Clock, Users, AlertTriangle, 
  ChefHat, Settings, Calendar, Zap, Target,
  Plus, Minus, RotateCcw, Save, Share2
} from 'lucide-react';

// Sample recipe data - will integrate with your actual recipe context
const sampleRecipe = {
  id: 1,
  name: "Classic Beef Bolognese",
  originalPortions: 8,
  prepTime: 30,
  cookTime: 180,
  ingredients: [
    { name: "Ground Beef", quantity: 2, unit: "lbs", cost: 12.00 },
    { name: "Yellow Onions", quantity: 2, unit: "medium", cost: 1.50 },
    { name: "Carrots", quantity: 3, unit: "medium", cost: 1.00 },
    { name: "Celery Stalks", quantity: 3, unit: "stalks", cost: 0.75 },
    { name: "Canned Tomatoes", quantity: 28, unit: "oz", cost: 2.25 },
    { name: "Red Wine", quantity: 1, unit: "cup", cost: 3.00 },
    { name: "Olive Oil", quantity: 0.25, unit: "cup", cost: 1.50 }
  ],
  totalCost: 22.00
};

// Equipment database with capacity constraints
const equipmentDatabase = [
  { id: 1, name: "Stand Mixer", capacity: 20, unit: "lbs", type: "mixing" },
  { id: 2, name: "Commercial Oven", capacity: 4, unit: "sheet pans", type: "baking" },
  { id: 3, name: "Stock Pot Large", capacity: 20, unit: "quarts", type: "cooking" },
  { id: 4, name: "Food Processor", capacity: 12, unit: "cups", type: "processing" },
  { id: 5, name: "Sheet Pan", capacity: 18, unit: "servings", type: "baking" }
];

const RecipeScalingSystem = () => {
  const [recipe] = useState(sampleRecipe);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [targetPortions, setTargetPortions] = useState(recipe.originalPortions);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [productionDate, setProductionDate] = useState('');
  const [activeTab, setActiveTab] = useState('scaling');

  // Calculate scaled values
  const scaledData = useMemo(() => {
    const factor = targetPortions / recipe.originalPortions;
    
    return {
      portions: targetPortions,
      scaleFactor: factor,
      ingredients: recipe.ingredients.map(ing => ({
        ...ing,
        scaledQuantity: (ing.quantity * factor).toFixed(2),
        scaledCost: (ing.cost * factor).toFixed(2)
      })),
      totalCost: (recipe.totalCost * factor).toFixed(2),
      costPerPortion: ((recipe.totalCost * factor) / targetPortions).toFixed(2),
      prepTime: Math.round(recipe.prepTime * Math.pow(factor, 0.7)),
      cookTime: Math.round(recipe.cookTime * Math.pow(factor, 0.5))
    };
  }, [targetPortions, recipe]);

  // Calculate batch requirements
  const batchCalculations = useMemo(() => {
    const totalWeight = scaledData.ingredients.reduce((sum, ing) => {
      return sum + parseFloat(ing.scaledQuantity);
    }, 0);

    const maxMixerCapacity = Math.max(...equipmentDatabase.filter(eq => eq.type === 'mixing').map(eq => eq.capacity));
    const batchesNeeded = Math.ceil(totalWeight / maxMixerCapacity);
    
    return {
      totalWeight: totalWeight.toFixed(1),
      batchesNeeded,
      batchSize: (targetPortions / batchesNeeded).toFixed(0),
      estimatedTotalTime: scaledData.prepTime + (scaledData.cookTime * batchesNeeded)
    };
  }, [scaledData]);

  const handleQuickScale = (portions) => {
    setTargetPortions(portions);
    setScaleFactor(portions / recipe.originalPortions);
  };

  const handleCustomScale = (factor) => {
    setScaleFactor(factor);
    setTargetPortions(Math.round(recipe.originalPortions * factor));
  };

  const resetScale = () => {
    setScaleFactor(1);
    setTargetPortions(recipe.originalPortions);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen" style={{ backgroundColor: '#F6F8F8' }}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: '#1F2D38' }}>
              <Scale style={{ color: '#8AC732' }} />
              Recipe Scaling & Batch Production
            </h1>
            <p className="mt-1" style={{ color: '#2A3E51' }}>Scale recipes and plan batch production for commercial kitchens</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: '#8AC732' }}
            >
              <Save size={16} />
              Save Configuration
            </button>
            <button 
              className="px-4 py-2 border rounded-lg hover:opacity-90 flex items-center gap-2"
              style={{ borderColor: '#BBBFC2', color: '#2A3E51', backgroundColor: '#F6F8F8' }}
            >
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#1F2D38' }}>{recipe.name}</h2>
            <div className="flex items-center gap-6 mt-2 text-sm" style={{ color: '#2A3E51' }}>
              <span className="flex items-center gap-1">
                <Users size={16} />
                Original: {recipe.originalPortions} portions
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                Prep: {recipe.prepTime}min | Cook: {recipe.cookTime}min
              </span>
              <span className="flex items-center gap-1">
                <Target size={16} />
                Cost: ${recipe.totalCost.toFixed(2)}
              </span>
            </div>
          </div>
          <button 
            onClick={resetScale}
            className="px-3 py-2 hover:opacity-80 flex items-center gap-1"
            style={{ color: '#2A3E51' }}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Quick Scale Buttons */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#1F2D38' }}>Quick Scale Options</h3>
        <div className="flex flex-wrap gap-3">
          {[10, 25, 50, 100, 200, 500].map(portions => (
            <button
              key={portions}
              onClick={() => handleQuickScale(portions)}
              className="px-4 py-2 rounded-lg border font-medium transition-colors"
              style={targetPortions === portions ? {
                backgroundColor: '#8AC732',
                color: 'white',
                borderColor: '#8AC732'
              } : {
                backgroundColor: 'white',
                color: '#2A3E51',
                borderColor: '#BBBFC2'
              }}
            >
              {portions} portions
            </button>
          ))}
        </div>
      </div>

      {/* Custom Scaling Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: '#1F2D38' }}>Custom Scaling</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2A3E51' }}>
                Target Portions
              </label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setTargetPortions(Math.max(1, targetPortions - 1))}
                  className="p-2 border rounded-lg hover:opacity-80"
                  style={{ borderColor: '#BBBFC2', backgroundColor: '#F6F8F8' }}
                >
                  <Minus size={16} style={{ color: '#2A3E51' }} />
                </button>
                <input
                  type="number"
                  value={targetPortions}
                  onChange={(e) => setTargetPortions(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-3 py-2 border rounded-lg text-center font-semibold"
                  style={{ borderColor: '#BBBFC2', color: '#1F2D38' }}
                  min="1"
                />
                <button 
                  onClick={() => setTargetPortions(targetPortions + 1)}
                  className="p-2 border rounded-lg hover:opacity-80"
                  style={{ borderColor: '#BBBFC2', backgroundColor: '#F6F8F8' }}
                >
                  <Plus size={16} style={{ color: '#2A3E51' }} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2A3E51' }}>
                Scale Factor: {scaledData.scaleFactor.toFixed(2)}x
              </label>
              <input
                type="range"
                min="0.1"
                max="50"
                step="0.1"
                value={scaledData.scaleFactor}
                onChange={(e) => handleCustomScale(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #8AC732 0%, #8AC732 ${(scaledData.scaleFactor / 50) * 100}%, #BBBFC2 ${(scaledData.scaleFactor / 50) * 100}%, #BBBFC2 100%)`
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: '#2A3E51' }}>
                <span>0.1x</span>
                <span>50x</span>
              </div>
            </div>
          </div>

          {/* Scaling Summary */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#C0E095' }}>
            <h4 className="font-semibold mb-3" style={{ color: '#1F2D38' }}>Scaling Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Original Portions:</span>
                <span className="font-medium" style={{ color: '#1F2D38' }}>{recipe.originalPortions}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Target Portions:</span>
                <span className="font-medium" style={{ color: '#1F2D38' }}>{scaledData.portions}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Scale Factor:</span>
                <span className="font-medium" style={{ color: '#1F2D38' }}>{scaledData.scaleFactor.toFixed(2)}x</span>
              </div>
              <hr style={{ borderColor: '#8AC732' }} />
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Total Cost:</span>
                <span className="font-bold" style={{ color: '#8AC732' }}>${scaledData.totalCost}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Cost per Portion:</span>
                <span className="font-bold" style={{ color: '#1F2D38' }}>${scaledData.costPerPortion}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Est. Prep Time:</span>
                <span className="font-medium" style={{ color: '#1F2D38' }}>{scaledData.prepTime} min</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#2A3E51' }}>Est. Cook Time:</span>
                <span className="font-medium" style={{ color: '#1F2D38' }}>{scaledData.cookTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scaled Ingredients */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#1F2D38' }}>Scaled Ingredients</h3>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg" style={{ borderColor: '#BBBFC2' }}>
            <thead style={{ backgroundColor: '#F6F8F8' }}>
              <tr>
                <th className="text-left p-3 font-medium" style={{ color: '#2A3E51' }}>Ingredient</th>
                <th className="text-right p-3 font-medium" style={{ color: '#2A3E51' }}>Original</th>
                <th className="text-right p-3 font-medium" style={{ color: '#2A3E51' }}>Scaled</th>
                <th className="text-right p-3 font-medium" style={{ color: '#2A3E51' }}>Unit</th>
                <th className="text-right p-3 font-medium" style={{ color: '#2A3E51' }}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {scaledData.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-t" style={{ borderColor: '#BBBFC2' }}>
                  <td className="p-3 font-medium" style={{ color: '#1F2D38' }}>{ingredient.name}</td>
                  <td className="p-3 text-right" style={{ color: '#2A3E51' }}>{ingredient.quantity}</td>
                  <td className="p-3 text-right font-semibold" style={{ color: '#8AC732' }}>
                    {ingredient.scaledQuantity}
                  </td>
                  <td className="p-3 text-right" style={{ color: '#2A3E51' }}>{ingredient.unit}</td>
                  <td className="p-3 text-right font-medium" style={{ color: '#8AC732' }}>
                    ${ingredient.scaledCost}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2" style={{ backgroundColor: '#F6F8F8', borderColor: '#BBBFC2' }}>
              <tr>
                <td colSpan="4" className="p-3 font-semibold text-right" style={{ color: '#1F2D38' }}>Total Cost:</td>
                <td className="p-3 text-right font-bold text-lg" style={{ color: '#8AC732' }}>
                  ${scaledData.totalCost}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecipeScalingSystem;

import React, { useState } from 'react';
import { 
  ChefHat, 
  DollarSign, 
  Users, 
  Clock, 
  MoreVertical, 
  ChevronDown, 
  ChevronUp,
  Edit,
  Copy,
  Archive,
  Trash2,
  Calculator,
  TrendingUp
} from 'lucide-react';

const RecipeCard = ({ 
  recipe, 
  onEdit, 
  onDuplicate, 
  onArchive, 
  onDelete,
  onCostAnalysis, // ADD THIS PROP
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatPercentage = (value) => {
    return `${(value || 0).toFixed(1)}%`;
  };

  const handleAction = (action, e) => {
    e.stopPropagation();
    setShowActions(false);
    
    switch (action) {
      case 'edit':
        onEdit?.(recipe);
        break;
      case 'duplicate':
        onDuplicate?.(recipe);
        break;
      case 'archive':
        onArchive?.(recipe);
        break;
      case 'delete':
        onDelete?.(recipe);
        break;
      case 'costAnalysis':
        onCostAnalysis?.(recipe);
        break;
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h3 className="font-semibold text-gray-900 truncate">{recipe.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(recipe.status)}`}>
                {recipe.status}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {recipe.code}
              </span>
              <span>{recipe.category}</span>
              <span>{recipe.cuisine}</span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={(e) => handleAction('edit', e)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Recipe
                </button>
                <button
                  onClick={(e) => handleAction('costAnalysis', e)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Cost Analysis
                </button>
                <button
                  onClick={(e) => handleAction('duplicate', e)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button
                  onClick={(e) => handleAction('archive', e)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={(e) => handleAction('delete', e)}
                  className="w-full px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Yield</span>
            </div>
            <div className="text-lg font-semibold text-blue-900">
              {recipe.yield} {recipe.yieldUnit}
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">Cost/Serving</span>
            </div>
            <div className="text-lg font-semibold text-green-900">
              {formatCurrency(recipe.costPerServing)}
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-800">Food Cost %</span>
            </div>
            <div className="text-lg font-semibold text-purple-900">
              {formatPercentage(recipe.foodCostPercent)}
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-800">Profit Margin</span>
            </div>
            <div className="text-lg font-semibold text-amber-900">
              {formatCurrency(recipe.profitMargin)}
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <div className="flex gap-6">
              <span className="text-gray-600">
                Total Cost: <span className="font-medium text-gray-900">{formatCurrency(recipe.totalCost)}</span>
              </span>
              <span className="text-gray-600">
                Menu Price: <span className="font-medium text-gray-900">{formatCurrency(recipe.menuPrice)}</span>
              </span>
            </div>
            <span className="text-xs text-gray-500">{recipe.outlet} • {recipe.menu}</span>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 px-3 py-2 text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md border border-indigo-200 hover:border-indigo-300 transition-colors flex items-center justify-center gap-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Details
            </>
          )}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          {/* Ingredients Summary */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Ingredients ({recipe.ingredients.length})</h4>
              <div className="space-y-2">
                {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <span className="text-gray-900">{ingredient.name}</span>
                      <span className="text-gray-500 ml-2">
                        {ingredient.quantity} {ingredient.unit || 'lb'}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {formatCurrency(ingredient.apCost)}
                    </span>
                  </div>
                ))}
                {recipe.ingredients.length > 5 && (
                  <div className="text-sm text-gray-500 italic">
                    And {recipe.ingredients.length - 5} more ingredients...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instructions Preview */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
              <div className="text-sm text-gray-700 space-y-1">
                {recipe.instructions.slice(0, 3).map((instruction, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-400 font-medium min-w-0 w-6">
                      {index + 1}.
                    </span>
                    <span className="flex-1">{instruction}</span>
                  </div>
                ))}
                {recipe.instructions.length > 3 && (
                  <div className="text-gray-500 italic ml-8">
                    {recipe.instructions.length - 3} more steps...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close actions menu */}
      {showActions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default RecipeCard;
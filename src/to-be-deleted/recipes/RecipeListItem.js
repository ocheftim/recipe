import React, { useState } from 'react';
import { 
  ChefHat, 
  DollarSign, 
  Users, 
  MoreVertical,
  Edit,
  Copy,
  Archive,
  Trash2
} from 'lucide-react';

const RecipeListItem = ({ 
  recipe, 
  onEdit, 
  onDuplicate, 
  onArchive, 
  onDelete,
  className = "" 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Recipe Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <ChefHat className="w-5 h-5 text-indigo-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{recipe.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(recipe.status)}`}>
                  {recipe.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  {recipe.code}
                </span>
                <span>{recipe.category}</span>
                <span className="text-gray-400">•</span>
                <span>{recipe.cuisine}</span>
                <span className="text-gray-400">•</span>
                <span>{recipe.outlet}</span>
              </div>
            </div>
          </div>

          {/* Center Section - Key Metrics */}
          <div className="hidden md:flex items-center gap-6 mx-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Yield</span>
              </div>
              <div className="text-sm font-semibold text-blue-900">
                {recipe.yield} {recipe.yieldUnit}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-medium">Cost</span>
              </div>
              <div className="text-sm font-semibold text-green-900">
                {formatCurrency(recipe.costPerServing)}
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs font-medium text-purple-600 mb-1">
                Food Cost %
              </div>
              <div className="text-sm font-semibold text-purple-900">
                {formatPercentage(recipe.foodCostPercent)}
              </div>
            </div>
          </div>

          {/* Right Section - Financial Summary & Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <div className="text-sm font-medium text-gray-900">
                {formatCurrency(recipe.menuPrice)}
              </div>
              <div className="text-xs text-gray-500">
                Profit: {formatCurrency(recipe.profitMargin)}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={(e) => handleAction('edit', e)}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Recipe
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

        {/* Mobile-only metrics */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <div className="flex gap-4">
              <span className="text-gray-600">
                <Users className="w-4 h-4 inline mr-1" />
                {recipe.yield} {recipe.yieldUnit}
              </span>
              <span className="text-gray-600">
                <DollarSign className="w-4 h-4 inline mr-1" />
                {formatCurrency(recipe.costPerServing)}
              </span>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">
                {formatCurrency(recipe.menuPrice)}
              </div>
              <div className="text-xs text-gray-500">
                {formatPercentage(recipe.foodCostPercent)} food cost
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default RecipeListItem;
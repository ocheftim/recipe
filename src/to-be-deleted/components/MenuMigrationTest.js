// src/components/MenuMigrationTest.js
import React from 'react';
import useMenuData from '../hooks/useMenuData';

const MenuMigrationTest = () => {
  const { 
    menus, 
    allRecipes,
    loading, 
    error, 
    stats,
    menuTypes,
    menuStatuses,
    getStatusColor,
    getRecipeById,
    calculateMenuProfitability
  } = useMenuData();

  if (loading) return (
    <div className="p-4 text-blue-600 flex items-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
      Loading menu collections and recipes from centralized service...
    </div>
  );
  
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🧪 Menu Collections Migration Test
      </h2>

      {/* Migration Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          ✅ Hybrid Migration Success
        </h3>
        <div className="text-sm text-green-700 space-y-1">
          <p>📋 <strong>Menu Collections:</strong> Using SAMPLE_MENUS (organizational structure)</p>
          <p>🍽️ <strong>Recipe Data:</strong> Loaded from centralized recipeDataService</p>
          <p>🔗 <strong>Integration:</strong> Real cost calculations using professional recipe data</p>
        </div>
      </div>

      {/* Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-700">Menu Collections</div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalMenus}</div>
            <div className="text-xs text-gray-500">{stats.activeMenus} active</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-700">Total Items</div>
            <div className="text-2xl font-bold text-purple-600">{stats.totalMenuItems}</div>
            <div className="text-xs text-gray-500">{stats.averageItemsPerMenu.toFixed(1)} avg per menu</div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-700">Revenue Potential</div>
            <div className="text-2xl font-bold text-green-600">${stats.totalMenuRevenue?.toFixed(0) || '0'}</div>
            <div className="text-xs text-gray-500">Across all menus</div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-700">Avg Margin</div>
            <div className="text-2xl font-bold text-orange-600">{stats.averageMargin?.toFixed(1) || '0'}%</div>
            <div className="text-xs text-gray-500">Profit margin</div>
          </div>
        </div>
      )}

      {/* Recipe Data Verification */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3">Recipe Data Source</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Recipes Available:</span>
              <span className="font-semibold text-blue-700">{allRecipes?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Source:</span>
              <span className="font-semibold text-green-600">recipeDataService</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Professional Features:</span>
              <span className="font-semibold text-green-600">✅ Active</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-3">Menu Types Available</h4>
          <div className="flex flex-wrap gap-2">
            {menuTypes?.map(type => (
              <span key={type} className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {type}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-600">
            Menu statuses: {menuStatuses?.join(', ')}
          </div>
        </div>
      </div>

      {/* Sample Menu Collections */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Menu Collections (First 2)</h4>
          <p className="text-sm text-gray-600 mt-1">
            Menu structures with real recipe cost calculations
          </p>
        </div>
        
        <div className="p-4">
          {menus?.length > 0 ? (
            <div className="space-y-6">
              {menus.slice(0, 2).map(menu => {
                const profitability = calculateMenuProfitability ? calculateMenuProfitability(menu) : { margin: 0 };
                
                return (
                  <div key={menu.id} className="border-l-4 border-green-400 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-800 text-lg">{menu.name}</h5>
                        <p className="text-sm text-gray-600">{menu.description}</p>
                        <div className="flex gap-4 mt-2 text-xs">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {menu.type}
                          </span>
                          <span className={`px-2 py-1 rounded border ${getStatusColor ? getStatusColor(menu.status) : 'bg-blue-50 text-blue-700'}`}>
                            {menu.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <div className="font-semibold text-gray-800">
                          {menu.totalItems || 0} items
                        </div>
                        <div className="text-green-600 font-medium">
                          ${menu.averagePrice?.toFixed(2) || '0.00'} avg price
                        </div>
                        <div className="text-orange-600">
                          {profitability.margin}% margin
                        </div>
                      </div>
                    </div>

                    {/* Sample menu sections */}
                    {menu.sections && menu.sections.length > 0 && (
                      <div className="mt-3 bg-gray-50 rounded p-3">
                        <h6 className="text-xs font-semibold text-gray-700 mb-2">
                          Sections ({menu.sections.length}):
                        </h6>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {menu.sections.slice(0, 4).map((section, idx) => (
                            <div key={idx} className="text-xs">
                              <span className="font-medium text-gray-600">
                                {section.name}
                              </span>
                              <span className="text-gray-500 ml-1">
                                ({section.items?.length || 0})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sample recipe integration test */}
                    {menu.sections?.[0]?.items?.[0] && (
                      <div className="mt-2 text-xs text-gray-600">
                        <span className="font-medium">Recipe Integration Test:</span>
                        {(() => {
                          const firstItem = menu.sections[0].items[0];
                          const recipe = getRecipeById?.(firstItem.recipeId);
                          return recipe ? 
                            ` ✅ Recipe "${recipe.name}" found with cost $${recipe.costPerServing?.toFixed(2) || '0.00'}` :
                            ` ⚠️ Recipe ${firstItem.recipeId} not found`;
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No menu collections available</p>
          )}
        </div>
      </div>

      {/* Console Log Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            console.log('=== MENU COLLECTIONS MIGRATION VERIFICATION ===');
            console.log('Menu Collections:', menus?.length);
            console.log('Available Recipes:', allRecipes?.length || 0);
            console.log('Menu Types:', menuTypes);
            console.log('Statistics:', stats);
            console.log('Sample Menu:', menus?.[0]);
            console.log('Sample Recipe:', allRecipes?.[0]);
            if (menus?.[0]?.sections?.[0]?.items?.[0]) {
              const item = menus[0].sections[0].items[0];
              const recipe = getRecipeById?.(item.recipeId);
              console.log('Recipe Integration:', { item, recipe });
            }
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Log Full Migration Data to Console
        </button>
      </div>
    </div>
  );
};

export default MenuMigrationTest;
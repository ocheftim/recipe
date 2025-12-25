// src/components/menus/MenuList.js
import React from 'react';
import { Menu as MenuIcon, Plus, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import MenuCard from './MenuCard';
import { BUTTON_STYLES } from '../../constants/menuConstants';

const MenuList = ({
  menus,
  viewMode,
  onMenuAction,
  getStatusColor,
  calculateMenuProfitability,
  handleSort,
  sortConfig
}) => {
  // ✅ Table view component
  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Menu Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? 
                    <TrendingUp size={14} className="ml-1" /> : 
                    <TrendingDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalItems')}
              >
                <div className="flex items-center">
                  Items
                  {sortConfig.key === 'totalItems' && (
                    sortConfig.direction === 'asc' ? 
                    <TrendingUp size={14} className="ml-1" /> : 
                    <TrendingDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('averagePrice')}
              >
                <div className="flex items-center">
                  Avg Price
                  {sortConfig.key === 'averagePrice' && (
                    sortConfig.direction === 'asc' ? 
                    <TrendingUp size={14} className="ml-1" /> : 
                    <TrendingDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Margin
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="flex items-center">
                  Last Updated
                  {sortConfig.key === 'lastUpdated' && (
                    sortConfig.direction === 'asc' ? 
                    <TrendingUp size={14} className="ml-1" /> : 
                    <TrendingDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {menus.map((menu) => {
              const profitability = calculateMenuProfitability(menu);
              
              return (
                <tr key={menu.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <MenuIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{menu.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{menu.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{menu.type}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(menu.status)}`}>
                      {menu.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{menu.totalItems}</div>
                    <div className="text-xs text-gray-500">
                      {menu.sections.length} sections
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign size={14} className="text-green-600 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        ${menu.averagePrice.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{profitability.margin}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              profitability.margin >= 70 ? 'bg-green-500' :
                              profitability.margin >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(profitability.margin, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(menu.lastUpdated).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onMenuAction('edit', menu)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onMenuAction('add-items', menu)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Items
                      </button>
                      <button
                        onClick={() => onMenuAction('analytics', menu)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Analytics
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ✅ Cards view component
  const CardsView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {menus.map(menu => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onMenuAction={onMenuAction}
          getStatusColor={getStatusColor}
          calculateMenuProfitability={calculateMenuProfitability}
        />
      ))}
    </div>
  );

  // ✅ Empty state
  const EmptyState = () => (
    <div className="text-center py-12">
      <MenuIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No menus found</h3>
      <p className="text-gray-500 mb-6">
        Create your first restaurant menu from your existing recipes
      </p>
      <button 
        onClick={() => onMenuAction('create', null)}
        className={BUTTON_STYLES.primary}
      >
        <Plus size={20} className="mr-2" />
        Create Your First Menu
      </button>
    </div>
  );

  // ✅ Render appropriate view
  if (menus.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {viewMode === 'table' ? <TableView /> : <CardsView />}
    </div>
  );
};

export default MenuList;
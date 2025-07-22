import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import PageLayout from '../components/PageLayout';

const RecipesPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [openActionDropdown, setOpenActionDropdown] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Column visibility state - Updated for professional use
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    type: true,
    cuisine: true,
    yield: true,
    totalTime: true,
    costPerPortion: true,
    dietary: true,
    lastMade: false,
    status: true,
    actions: true
  });

  // Professional column definitions
  const columnDefinitions = [
    { key: 'name', label: 'Recipe Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'cuisine', label: 'Cuisine', sortable: true },
    { key: 'yield', label: 'Yield', sortable: true },
    { key: 'totalTime', label: 'Total Time', sortable: true },
    { key: 'costPerPortion', label: 'Cost/Portion', sortable: true },
    { key: 'dietary', label: 'Dietary', sortable: false },
    { key: 'lastMade', label: 'Last Made', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    filterAndSortRecipes();
  }, [recipes, searchTerm, sortConfig]);

  useEffect(() => {
    paginateRecipes();
  }, [filteredRecipes, currentPage, itemsPerPage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showColumnSelector && !event.target.closest('.column-selector')) {
        setShowColumnSelector(false);
      }
      if (openActionDropdown && !event.target.closest('.action-dropdown')) {
        setOpenActionDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showColumnSelector, openActionDropdown]);

  const loadRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecipes(recipesData);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRecipes = () => {
    let filtered = recipes.filter(recipe =>
      recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        
        // Handle different data types
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        // Handle dates
        if (sortConfig.key === 'lastMade') {
          const aDate = new Date(aVal || 0);
          const bDate = new Date(bVal || 0);
          return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
        }
        
        const aStr = aVal.toString().toLowerCase();
        const bStr = bVal.toString().toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
        } else {
          return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
        }
      });
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  };

  const paginateRecipes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredRecipes.slice(startIndex, endIndex);
    setDisplayedRecipes(paginated);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleColumnVisibilityToggle = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      await deleteDoc(doc(db, 'recipes', recipeId));
      setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting recipe');
    }
  };

  // Pagination calculations
  const totalItems = filteredRecipes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Professional formatting functions
  const formatTotalTime = (prepTime, cookTime) => {
    const total = (prepTime || 0) + (cookTime || 0);
    if (!total) return '—';
    if (total < 60) return `${total}m`;
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatCostPerPortion = (totalCost, yield_amount) => {
    if (!totalCost || !yield_amount) return '—';
    const costPerPortion = totalCost / yield_amount;
    return `$${costPerPortion.toFixed(2)}`;
  };

  const formatYield = (yield_amount, yieldUnit) => {
    if (!yield_amount) return '—';
    return yieldUnit ? `${yield_amount} ${yieldUnit}` : `${yield_amount} portions`;
  };

  const formatLastMade = (lastMade) => {
    if (!lastMade) return '—';
    const date = new Date(lastMade);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getDietaryIcons = (dietary) => {
    if (!dietary) return '—';
    const dietaryArray = dietary.split(',').map(d => d.trim().toLowerCase());
    const icons = [];
    
    if (dietaryArray.includes('vegetarian')) icons.push('🌱 V');
    if (dietaryArray.includes('vegan')) icons.push('🌿 VG');
    if (dietaryArray.includes('gluten-free')) icons.push('🌾 GF');
    if (dietaryArray.includes('dairy-free')) icons.push('🥛 DF');
    if (dietaryArray.includes('keto')) icons.push('🥑 K');
    if (dietaryArray.includes('low-carb')) icons.push('🥬 LC');
    
    return icons.length > 0 ? icons.join(' ') : '—';
  };

  const getStatusBadge = (status) => {
    if (!status) status = 'active';
    
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      'testing': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Testing' },
      'archived': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Archived' },
      'seasonal': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Seasonal' }
    };
    
    const config = statusConfig[status.toLowerCase()] || statusConfig['active'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const SortIcon = ({ column }) => {
    if (!columnDefinitions.find(col => col.key === column)?.sortable) return null;
    
    if (sortConfig.key !== column) return null;
    
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const ColumnSelector = () => (
    <div className="relative column-selector">
      <button
        onClick={() => setShowColumnSelector(!showColumnSelector)}
        className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none font-normal"
        title="Column Visibility"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
      
      {showColumnSelector && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200" style={{zIndex: 9999}}>
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50">
              Show/Hide Columns
            </div>
            {columnDefinitions.map(column => (
              <label key={column.key} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleColumns[column.key]}
                  onChange={() => handleColumnVisibilityToggle(column.key)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <PageLayout title="Recipes">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading recipes...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <span>Recipes</span>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search recipes, cuisine, type..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-72 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button 
            onClick={() => navigate('/recipes/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Add Recipe
          </button>
        </div>
      }
    >
      <div className="bg-white shadow border-b border-gray-200 sm:rounded-lg" style={{position: 'relative', zIndex: 1}}>
        <div className="overflow-x-auto relative">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.name && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'name' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center justify-center">
                      Recipe Name
                      <SortIcon column="name" />
                    </div>
                  </th>
                )}
                {visibleColumns.type && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'type' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center justify-center">
                      Type
                      <SortIcon column="type" />
                    </div>
                  </th>
                )}
                {visibleColumns.cuisine && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'cuisine' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('cuisine')}
                  >
                    <div className="flex items-center justify-center">
                      Cuisine
                      <SortIcon column="cuisine" />
                    </div>
                  </th>
                )}
                {visibleColumns.yield && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'yield' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('yield')}
                  >
                    <div className="flex items-center justify-center">
                      Yield
                      <SortIcon column="yield" />
                    </div>
                  </th>
                )}
                {visibleColumns.totalTime && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'totalTime' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('totalTime')}
                  >
                    <div className="flex items-center justify-center">
                      Total Time
                      <SortIcon column="totalTime" />
                    </div>
                  </th>
                )}
                {visibleColumns.costPerPortion && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'costPerPortion' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('costPerPortion')}
                  >
                    <div className="flex items-center justify-center">
                      Cost/Portion
                      <SortIcon column="costPerPortion" />
                    </div>
                  </th>
                )}
                {visibleColumns.dietary && (
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Dietary
                  </th>
                )}
                {visibleColumns.lastMade && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'lastMade' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('lastMade')}
                  >
                    <div className="flex items-center justify-center">
                      Last Made
                      <SortIcon column="lastMade" />
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th 
                    className={`px-6 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sortConfig.key === 'status' ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center justify-center">
                      Status
                      <SortIcon column="status" />
                    </div>
                  </th>
                )}
                {visibleColumns.actions && (
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                )}
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider w-16">
                  <div className="flex justify-center">
                    <ColumnSelector />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-gray-50">
                  {visibleColumns.name && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="text-center">{recipe.name}</div>
                    </td>
                  )}
                  {visibleColumns.type && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{recipe.type || '—'}</div>
                    </td>
                  )}
                  {visibleColumns.cuisine && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{recipe.cuisine || '—'}</div>
                    </td>
                  )}
                  {visibleColumns.yield && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{formatYield(recipe.yield || recipe.servings, recipe.yieldUnit)}</div>
                    </td>
                  )}
                  {visibleColumns.totalTime && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{formatTotalTime(recipe.prepTime, recipe.cookTime)}</div>
                    </td>
                  )}
                  {visibleColumns.costPerPortion && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{formatCostPerPortion(recipe.cost, recipe.yield || recipe.servings)}</div>
                    </td>
                  )}
                  {visibleColumns.dietary && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center text-xs">{getDietaryIcons(recipe.dietary)}</div>
                    </td>
                  )}
                  {visibleColumns.lastMade && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{formatLastMade(recipe.lastMade)}</div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-center">{getStatusBadge(recipe.status)}</div>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-center">
                        <div className="relative action-dropdown">
                          <button
                            onClick={() => setOpenActionDropdown(openActionDropdown === recipe.id ? null : recipe.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          {openActionDropdown === recipe.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200" style={{zIndex: 9999}}>
                              <button
                                onClick={() => {
                                  navigate(`/recipes/${recipe.id}`);
                                  setOpenActionDropdown(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  // Mark as made today
                                  // You could add this functionality
                                  setOpenActionDropdown(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Mark as Made
                              </button>
                              <button
                                onClick={() => {
                                  navigate(`/recipes/${recipe.id}/print`);
                                  setOpenActionDropdown(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Print
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteRecipe(recipe.id);
                                  setOpenActionDropdown(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap w-16">
                    <div className="text-center"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayedRecipes.length === 0 && totalItems === 0 && (
          <div className="text-center py-12 bg-white">
            <div className="text-gray-500">
              {searchTerm ? 'No recipes found matching your search.' : 'No recipes yet. Add your first recipe!'}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-gray-700">
              {startIndex} - {endIndex} of {totalItems}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
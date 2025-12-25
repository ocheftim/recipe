// src/components/recipes/RecipesSearch.js
import React from 'react';
import { Search } from 'lucide-react';

const RecipesSearch = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search recipes..." 
}) => {
  return (
    <div className="relative">
      <Search size={20} className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-3 w-72 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default RecipesSearch;
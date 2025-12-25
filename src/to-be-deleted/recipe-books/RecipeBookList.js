// src/components/recipe-books/RecipeBookList.js
import React from 'react';
import { BookOpen, Plus, TrendingUp, TrendingDown, Calendar, Star, Users } from 'lucide-react';
import RecipeBookCard from './RecipeBookCard';
import { BUTTON_STYLES } from '../../constants/recipeBooksConstants';

const RecipeBookList = ({
  books,
  viewMode,
  onBookAction,
  getStatusColor,
  getDifficultyColor,
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
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  Book Title
                  {sortConfig.key === 'title' && (
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
                onClick={() => handleSort('totalRecipes')}
              >
                <div className="flex items-center">
                  Recipes
                  {sortConfig.key === 'totalRecipes' && (
                    sortConfig.direction === 'asc' ? 
                    <TrendingUp size={14} className="ml-1" /> : 
                    <TrendingDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('avgRating')}
              >
                <div className="flex items-center">
                  Rating
                  {sortConfig.key === 'avgRating' && (
                    sortConfig.direction === 'asc' ? 
                    <TrendingUp size={14} className="ml-1" /> : 
                    <TrendingDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
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
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{book.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.type}</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(book.status)}`}>
                    {book.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{book.totalRecipes}</div>
                  <div className="text-xs text-gray-500">
                    {book.estimatedTime}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-900">
                      {book.avgRating}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {book.popularity}% popular
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(book.difficulty)}`}>
                    {book.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(book.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    by {book.author}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onBookAction('view', book)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onBookAction('edit', book)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onBookAction('manage-recipes', book)}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Recipes
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ✅ Cards view component
  const CardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <RecipeBookCard
          key={book.id}
          book={book}
          onBookAction={onBookAction}
          getStatusColor={getStatusColor}
          getDifficultyColor={getDifficultyColor}
        />
      ))}
    </div>
  );

  // ✅ Empty state
  const EmptyState = () => (
    <div className="text-center py-12">
      <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No recipe books found</h3>
      <p className="text-gray-500 mb-6">
        Create your first recipe book to organize your recipes into collections
      </p>
      <button 
        onClick={() => onBookAction('create', null)}
        className={BUTTON_STYLES.primary}
      >
        <Plus size={20} className="mr-2" />
        Create Your First Recipe Book
      </button>
    </div>
  );

  // ✅ Render appropriate view
  if (books.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {viewMode === 'table' ? <TableView /> : <CardsView />}
    </div>
  );
};

export default RecipeBookList;
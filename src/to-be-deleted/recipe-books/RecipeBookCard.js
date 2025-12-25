// src/components/recipe-books/RecipeBookCard.js
import React, { useState } from 'react';
import { BookOpen, Star, Clock, MoreVertical, Eye, Edit, Copy, Share2, Download, Archive } from 'lucide-react';
import { BUTTON_STYLES } from '../../constants/recipeBooksConstants';

const RecipeBookCard = ({ 
  book, 
  onBookAction, 
  getStatusColor, 
  getDifficultyColor 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleActionClick = (action, e) => {
    e.stopPropagation();
    setShowDropdown(false);
    onBookAction(action, book);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
      {/* ✅ Book Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center flex-1">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">{book.type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(book.status)}`}>
              {book.status}
            </span>
            
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <MoreVertical size={16} className="text-gray-400" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={(e) => handleActionClick('view', e)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Eye size={14} className="mr-2" />
                      View Book
                    </button>
                    <button
                      onClick={(e) => handleActionClick('manage-recipes', e)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      📚 Manage Recipes
                    </button>
                    <button
                      onClick={(e) => handleActionClick('export', e)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Download size={14} className="mr-2" />
                      Export Book
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={(e) => handleActionClick('duplicate', e)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Copy size={14} className="mr-2" />
                      Duplicate
                    </button>
                    <button
                      onClick={(e) => handleActionClick('share', e)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Share2 size={14} className="mr-2" />
                      Share
                    </button>
                    {book.status !== 'Published' && (
                      <button
                        onClick={(e) => handleActionClick('publish', e)}
                        className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center"
                      >
                        ✅ Publish
                      </button>
                    )}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={(e) => handleActionClick('archive', e)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <Archive size={14} className="mr-2" />
                      Archive
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>
        
        {/* ✅ Book Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{book.totalRecipes}</p>
            <p className="text-xs text-gray-600">Recipes</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center">
              <Star size={16} className="text-yellow-500 mr-1" />
              <p className="text-2xl font-bold text-gray-900">{book.avgRating}</p>
            </div>
            <p className="text-xs text-gray-600">Avg Rating</p>
          </div>
        </div>

        {/* ✅ Category and Difficulty */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{book.category}</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(book.difficulty)}`}>
            {book.difficulty}
          </span>
        </div>

        {/* ✅ Time and Author */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {book.estimatedTime}
          </div>
          <span>by {book.author}</span>
        </div>

        {/* ✅ Popularity Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Popularity</span>
            <span className="font-bold text-blue-600">{book.popularity}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${
                book.popularity >= 90 ? 'bg-green-500' :
                book.popularity >= 80 ? 'bg-blue-500' :
                book.popularity >= 70 ? 'bg-yellow-500' : 'bg-gray-400'
              }`}
              style={{ width: `${book.popularity}%` }}
            ></div>
          </div>
        </div>

        {/* ✅ Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {book.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {book.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{book.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* ✅ Performance Indicators */}
        <div className="mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            {book.status === 'Active' && (
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Active
              </span>
            )}
            {book.avgRating >= 4.5 && (
              <span className="text-yellow-600">⭐ Top Rated</span>
            )}
            {book.totalRecipes >= 5 && (
              <span className="text-blue-600">📚 Comprehensive</span>
            )}
            {book.type === 'Training Manual' && (
              <span className="text-purple-600">🎓 Training</span>
            )}
          </div>
        </div>

        {/* ✅ Last Updated */}
        <div className="text-xs text-gray-500 mb-4">
          Last updated: {new Date(book.lastUpdated).toLocaleDateString()}
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => handleActionClick('view', e)}
            className={BUTTON_STYLES.primary + " flex-1 text-sm"}
          >
            View Book
          </button>
          <button 
            onClick={(e) => handleActionClick('edit', e)}
            className={BUTTON_STYLES.secondary + " flex-1 text-sm"}
          >
            Edit
          </button>
          <button 
            onClick={(e) => handleActionClick('manage-recipes', e)}
            className={BUTTON_STYLES.ghost + " flex items-center justify-center p-2"}
            title="Manage Recipes"
          >
            📚
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeBookCard;
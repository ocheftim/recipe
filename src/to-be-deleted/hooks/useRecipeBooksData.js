// src/hooks/useRecipeBooksData.js
import { useState, useMemo } from 'react';
import { SAMPLE_RECIPE_BOOKS, SAMPLE_RECIPES, BOOK_CATEGORIES, BOOK_STATUSES, BOOK_TYPES } from '../constants/recipeBooksConstants';

const useRecipeBooksData = () => {
  // ✅ Core state - managing RECIPE BOOKS
  const [allBooks] = useState(SAMPLE_RECIPE_BOOKS);
  const [allRecipes] = useState(SAMPLE_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [loading, setLoading] = useState(false);
  
  // ✅ Filter state for RECIPE BOOKS
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  
  // ✅ Sorting state
  const [sortConfig, setSortConfig] = useState({ 
    key: 'title', 
    direction: 'asc' 
  });
  
  // ✅ Modal state
  const [editingBook, setEditingBook] = useState(null);
  const [showRecipeManager, setShowRecipeManager] = useState(false);
  const [showBookViewer, setShowBookViewer] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedBookForModal, setSelectedBookForModal] = useState(null);

  // ✅ Computed values - unique categories, statuses, etc.
  const categories = useMemo(() => 
    [...new Set(allBooks.map(book => book.category))].sort()
  , [allBooks]);

  const statuses = useMemo(() => 
    [...new Set(allBooks.map(book => book.status))].sort()
  , [allBooks]);

  const types = useMemo(() => 
    [...new Set(allBooks.map(book => book.type))].sort()
  , [allBooks]);

  const allTags = useMemo(() => 
    [...new Set(allBooks.flatMap(book => book.tags))].sort()
  , [allBooks]);

  // ✅ Filtered and sorted recipe books
  const books = useMemo(() => {
    let filtered = allBooks.filter(book => {
      const matchesSearch = searchTerm === '' || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === '' || book.status === statusFilter;
      const matchesCategory = categoryFilter === '' || book.category === categoryFilter;
      const matchesType = typeFilter === '' || book.type === typeFilter;
      const matchesDifficulty = difficultyFilter === '' || book.difficulty === difficultyFilter;
      const matchesTag = tagFilter === '' || book.tags.includes(tagFilter);
      
      return matchesSearch && matchesStatus && matchesCategory && 
             matchesType && matchesDifficulty && matchesTag;
    });

    // Sort filtered results
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle special sorting cases
        if (sortConfig.key === 'lastUpdated' || sortConfig.key === 'createdDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortConfig.direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [allBooks, searchTerm, statusFilter, categoryFilter, typeFilter, 
      difficultyFilter, tagFilter, sortConfig]);

  // ✅ Statistics calculations
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const activeBooks = books.filter(book => book.status === 'Active').length;
    const draftBooks = books.filter(book => book.status === 'Draft').length;
    const publishedBooks = books.filter(book => book.status === 'Published').length;
    
    const totalRecipes = books.reduce((sum, book) => sum + book.totalRecipes, 0);
    const averageRecipesPerBook = totalBooks > 0 ? totalRecipes / totalBooks : 0;
    
    const averageRating = books.length > 0 ? 
      books.reduce((sum, book) => sum + book.avgRating, 0) / books.length : 0;
    
    const averagePopularity = books.length > 0 ?
      books.reduce((sum, book) => sum + book.popularity, 0) / books.length : 0;

    const trainingBooks = books.filter(book => book.type === 'Training Manual').length;
    const signatureBooks = books.filter(book => book.category === 'Signature Dishes').length;

    return {
      totalBooks,
      activeBooks,
      draftBooks,
      publishedBooks,
      totalRecipes,
      averageRecipesPerBook,
      averageRating,
      averagePopularity,
      trainingBooks,
      signatureBooks
    };
  }, [books]);

  // ✅ Helper functions
  const getRecipeById = (recipeId) => {
    return allRecipes.find(recipe => recipe.id === recipeId);
  };

  const getBookWithRecipeDetails = (book) => {
    return {
      ...book,
      recipes: book.recipeIds.map(recipeId => getRecipeById(recipeId)).filter(Boolean)
    };
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'text-green-700 bg-green-50 border-green-200',
      'Draft': 'text-gray-700 bg-gray-50 border-gray-200',
      'Under Review': 'text-orange-700 bg-orange-50 border-orange-200',
      'Archived': 'text-red-700 bg-red-50 border-red-200',
      'Published': 'text-blue-700 bg-blue-50 border-blue-200'
    };
    return colors[status] || 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-700 bg-green-100',
      'Easy-Medium': 'text-yellow-700 bg-yellow-100',
      'Medium': 'text-orange-700 bg-orange-100',
      'Medium-Hard': 'text-red-700 bg-red-100',
      'Hard': 'text-red-800 bg-red-200',
      'Easy-Hard': 'text-purple-700 bg-purple-100'
    };
    return colors[difficulty] || 'text-gray-700 bg-gray-100';
  };

  // ✅ Sorting handler
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // ✅ Modal handlers
  const openBookModal = (book = null) => {
    setEditingBook(book === null ? { isNew: true } : book);
  };

  const closeBookModal = () => {
    setEditingBook(null);
  };

  const openRecipeManager = (book) => {
    setSelectedBookForModal(book);
    setShowRecipeManager(true);
  };

  const closeRecipeManager = () => {
    setShowRecipeManager(false);
    setSelectedBookForModal(null);
  };

  const openBookViewer = (book) => {
    setSelectedBookForModal(book);
    setShowBookViewer(true);
  };

  const closeBookViewer = () => {
    setShowBookViewer(false);
    setSelectedBookForModal(null);
  };

  const openExportModal = (book) => {
    setSelectedBookForModal(book);
    setShowExportModal(true);
  };

  const closeExportModal = () => {
    setShowExportModal(false);
    setSelectedBookForModal(null);
  };

  // ✅ CRUD operations
  const handleBookAction = (action, book) => {
    console.log(`${action} action for book:`, book?.title || 'new book');
    
    switch (action) {
      case 'create':
      case 'edit':
        openBookModal(book);
        break;
      case 'view':
        openBookViewer(book);
        break;
      case 'manage-recipes':
        openRecipeManager(book);
        break;
      case 'export':
        openExportModal(book);
        break;
      case 'duplicate':
        console.log('Duplicating book:', book.title);
        break;
      case 'publish':
        console.log('Publishing book:', book.title);
        break;
      case 'archive':
        console.log('Archiving book:', book.title);
        break;
      case 'share':
        console.log('Sharing book:', book.title);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleBookSave = (bookData) => {
    console.log('Saving recipe book:', bookData);
    setLoading(true);
    
    setTimeout(() => {
      if (editingBook && !editingBook.isNew) {
        console.log('Updated recipe book:', bookData.title);
      } else {
        console.log('Created new recipe book:', bookData.title);
      }
      setLoading(false);
      closeBookModal();
    }, 500);
  };

  const handleRecipeManagement = (bookId, action, recipeIds) => {
    console.log('Managing recipes in book:', bookId, action, recipeIds);
    setLoading(true);
    
    setTimeout(() => {
      console.log('Recipe management completed');
      setLoading(false);
      closeRecipeManager();
    }, 500);
  };

  const handleBookExport = (bookId, exportConfig) => {
    console.log('Exporting book:', bookId, exportConfig);
    setLoading(true);
    
    setTimeout(() => {
      console.log('Book export completed');
      setLoading(false);
      closeExportModal();
    }, 500);
  };

  // ✅ Advanced search and filtering
  const searchRecipesInBooks = (searchQuery) => {
    return allRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const getBooksContainingRecipe = (recipeId) => {
    return allBooks.filter(book => book.recipeIds.includes(recipeId));
  };

  return {
    // ✅ Data
    books,
    allBooks,
    allRecipes,
    categories,
    statuses,
    types,
    allTags,
    stats,
    
    // ✅ Search & filters
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    difficultyFilter,
    setDifficultyFilter,
    tagFilter,
    setTagFilter,
    
    // ✅ View & sorting
    viewMode,
    setViewMode,
    sortConfig,
    handleSort,
    
    // ✅ Modal state
    editingBook,
    showRecipeManager,
    showBookViewer,
    showExportModal,
    selectedBookForModal,
    
    // ✅ Actions
    handleBookAction,
    handleBookSave,
    handleRecipeManagement,
    handleBookExport,
    openBookModal,
    closeBookModal,
    openRecipeManager,
    closeRecipeManager,
    openBookViewer,
    closeBookViewer,
    openExportModal,
    closeExportModal,
    
    // ✅ Utilities
    getRecipeById,
    getBookWithRecipeDetails,
    getStatusColor,
    getDifficultyColor,
    searchRecipesInBooks,
    getBooksContainingRecipe,
    loading
  };
};

export default useRecipeBooksData;
// RecipeBooksPage.js - ToqueWorks Professional Recipe Books Management (ALIGNED)
import React, { useState, useEffect } from 'react';
import STYLES from '../styles/globalStyles';

const {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BUTTONS,
  FORMS,
  TABLES,
  MODALS,
  CARDS,
  STATUS,
  UTILS,
  ANIMATIONS,
  combineStyles
} = STYLES;

const RecipeBooksPage = () => {
  const [recipeBooks, setRecipeBooks] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showDropdownId, setShowDropdownId] = useState(null);

  // Component-specific styles - ALIGNED with global styles
  const localStyles = {
    container: {
      ...UTILS.pageContainer,  // Using global utility
      padding: SPACING.xl
    },
    searchBar: {
      ...CARDS.base,  // Using global base card
      padding: `${SPACING.lg} ${SPACING.xl}`,
      marginBottom: SPACING.xl,
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md,
      flexWrap: 'wrap'
    },
    searchInput: {
      ...FORMS.input.base,
      flex: 1,
      minWidth: '200px'
    },
    select: {
      ...FORMS.select.base
    },
    btnPrimary: {
      ...BUTTONS.secondary,
      borderTop: `4px solid ${COLORS.accent}`,
      fontWeight: TYPOGRAPHY.fontWeight.semibold
    },
    statsText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: SPACING.xl
    },
    bookCard: {
      ...CARDS.base,  // Using global base card
      overflow: 'hidden',
      transition: ANIMATIONS.transition.normal,
      cursor: 'pointer'
    },
    bookCardHeader: {
      height: '8px',
      background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent}dd)`,
      position: 'relative'
    },
    bookCardBody: {
      padding: SPACING.lg,
      position: 'relative'
    },
    dropdownButton: {
      ...UTILS.iconButton,  // Using global icon button
      position: 'absolute',
      top: SPACING.lg,
      right: SPACING.lg
    },
    dropdown: {
      ...UTILS.actionsDropdown  // Using global actions dropdown
    },
    dropdownItem: {
      ...UTILS.dropdownItem  // Using global dropdown item
    },
    dropdownItemDanger: {
      ...UTILS.dropdownItem,  // Using global dropdown item as base
      color: COLORS.error
    },
    bookTitle: {
      margin: `0 0 ${SPACING.sm} 0`,
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.primary,
      paddingRight: '40px'
    },
    bookDescription: {
      margin: `0 0 ${SPACING.md} 0`,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary,
      lineHeight: '1.4',
      minHeight: '40px'
    },
    tagContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.sm,
      marginBottom: SPACING.md
    },
    tag: {
      ...STATUS.badge,
      padding: `${SPACING.xs} ${SPACING.sm}`,
      borderRadius: '12px',
      fontSize: TYPOGRAPHY.fontSize.xs,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      backgroundColor: COLORS.lightBackground,
      color: COLORS.primary
    },
    publicTag: {
      ...STATUS.badge,
      padding: `${SPACING.xs} ${SPACING.sm}`,
      borderRadius: '12px',
      fontSize: TYPOGRAPHY.fontSize.xs,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      backgroundColor: '#C0E095',
      color: COLORS.primary
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: SPACING.md,
      marginBottom: SPACING.md
    },
    statItem: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary
    },
    dateText: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.muted  // Using global muted color
    },
    emptyState: {
      ...CARDS.base,  // Using global base card
      gridColumn: '1 / -1',
      padding: '60px',
      textAlign: 'center'
    },
    emptyStateTitle: {
      margin: `0 0 ${SPACING.sm} 0`,
      fontSize: TYPOGRAPHY.fontSize.lg,
      color: COLORS.primary
    },
    emptyStateText: {
      margin: 0,
      color: COLORS.secondary,
      marginBottom: SPACING.lg
    },
    createButton: {
      ...BUTTONS.primary,
      padding: `${SPACING.md} ${SPACING.xl}`,
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.semibold
    }
  };

  // Load data from localStorage with sample data
  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem('toqueworks_recipe_books');
      const savedRecipes = localStorage.getItem('toqueworks_recipes');
      
      if (savedBooks) {
        setRecipeBooks(JSON.parse(savedBooks));
      } else {
        // Create sample books if none exist
        const sampleBooks = [
          {
            id: 1,
            name: "Main Course Collection",
            description: "Our favorite main dishes",
            category: "collection",
            isPublic: false,
            recipeIds: [1, 2],
            tags: [],
            coverColor: COLORS.accent,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
          }
        ];
        setRecipeBooks(sampleBooks);
        localStorage.setItem('toqueworks_recipe_books', JSON.stringify(sampleBooks));
      }
      
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      } else {
        // Create sample recipes if none exist
        const sampleRecipes = [
          {
            id: 1,
            name: "Classic Burger",
            category: "Entree",
            totalTime: 30,
            servings: 4
          },
          {
            id: 2,
            name: "Caesar Salad",
            category: "Salad",
            totalTime: 15,
            servings: 2
          }
        ];
        setRecipes(sampleRecipes);
        localStorage.setItem('toqueworks_recipes', JSON.stringify(sampleRecipes));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setRecipeBooks([]);
      setRecipes([]);
    }
  }, []);

  const handleNewBook = () => {
    setEditingBook({
      id: null,
      name: '',
      description: '',
      category: 'collection',
      isPublic: false,
      recipeIds: [],
      tags: [],
      coverColor: COLORS.accent,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook({ ...book });
    setShowModal(true);
    setShowDropdownId(null);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this recipe book?')) {
      const updatedBooks = recipeBooks.filter(book => book.id !== bookId);
      setRecipeBooks(updatedBooks);
      localStorage.setItem('toqueworks_recipe_books', JSON.stringify(updatedBooks));
    }
    setShowDropdownId(null);
  };

  const handleDuplicateBook = (book) => {
    const duplicatedBook = {
      ...book,
      id: Date.now(),
      name: `${book.name} (Copy)`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    const updatedBooks = [...recipeBooks, duplicatedBook];
    setRecipeBooks(updatedBooks);
    localStorage.setItem('toqueworks_recipe_books', JSON.stringify(updatedBooks));
    setShowDropdownId(null);
  };

  const handleSaveBook = (bookData) => {
    const book = {
      ...bookData,
      id: bookData.id || Date.now(),
      lastModified: new Date().toISOString(),
      createdAt: bookData.createdAt || new Date().toISOString()
    };

    let updatedBooks;
    if (bookData.id) {
      updatedBooks = recipeBooks.map(b => b.id === bookData.id ? book : b);
    } else {
      updatedBooks = [...recipeBooks, book];
    }

    setRecipeBooks(updatedBooks);
    localStorage.setItem('toqueworks_recipe_books', JSON.stringify(updatedBooks));
    setShowModal(false);
    setEditingBook(null);
  };

  const handleExportBook = (book) => {
    const bookRecipes = recipes.filter(recipe => book.recipeIds.includes(recipe.id));
    const exportData = {
      book: book,
      recipes: bookRecipes,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${book.name.replace(/\s+/g, '_')}_recipe_book.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    setShowDropdownId(null);
  };

  const getBookStats = (book) => {
    const bookRecipes = recipes.filter(recipe => book.recipeIds.includes(recipe.id));
    const totalTime = bookRecipes.reduce((sum, recipe) => sum + (recipe.totalTime || 0), 0);
    const avgTime = bookRecipes.length > 0 ? Math.round(totalTime / bookRecipes.length) : 0;
    
    const categories = [...new Set(bookRecipes.map(recipe => recipe.category))];
    
    return {
      recipeCount: bookRecipes.length,
      avgTime,
      categories: categories.length,
      lastUpdated: new Date(book.lastModified).toLocaleDateString()
    };
  };

  const filteredBooks = recipeBooks.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recipeCount':
        return b.recipeIds.length - a.recipeIds.length;
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'lastModified':
      default:
        return new Date(b.lastModified) - new Date(a.lastModified);
    }
  });

  const bookCategories = [...new Set(recipeBooks.map(book => book.category))];

  return (
    <div style={localStyles.container}>
      {/* Search and Filter Bar */}
      <div style={localStyles.searchBar}>
        <input
          type="text"
          placeholder="Search recipe books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={localStyles.searchInput}
          onFocus={(e) => e.target.style.borderColor = COLORS.accent}
          onBlur={(e) => e.target.style.borderColor = COLORS.border}
        />
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={localStyles.select}
          onFocus={(e) => e.target.style.borderColor = COLORS.accent}
          onBlur={(e) => e.target.style.borderColor = COLORS.border}
        >
          <option value="all">All Categories</option>
          {bookCategories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={localStyles.select}
          onFocus={(e) => e.target.style.borderColor = COLORS.accent}
          onBlur={(e) => e.target.style.borderColor = COLORS.border}
        >
          <option value="lastModified">Last Modified</option>
          <option value="name">Name</option>
          <option value="recipeCount">Recipe Count</option>
          <option value="created">Date Created</option>
        </select>
        
        <button
          onClick={handleNewBook}
          style={localStyles.btnPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          + New Recipe Book
        </button>
        
        <div style={localStyles.statsText}>
          {filteredBooks.length} of {recipeBooks.length} books
        </div>
      </div>

      {/* Recipe Books Grid */}
      <div style={localStyles.grid}>
        {filteredBooks.length === 0 ? (
          <div style={localStyles.emptyState}>
            <h3 style={localStyles.emptyStateTitle}>
              No recipe books found
            </h3>
            <p style={localStyles.emptyStateText}>
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first recipe book to get started'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button
                onClick={handleNewBook}
                style={localStyles.createButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.accentHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.accent}
              >
                Create First Recipe Book
              </button>
            )}
          </div>
        ) : (
          filteredBooks.map(book => {
            const stats = getBookStats(book);
            return (
              <div
                key={book.id}
                style={localStyles.bookCard}
                onClick={() => handleEditBook(book)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                {/* Book Cover */}
                <div style={{
                  ...localStyles.bookCardHeader,
                  background: `linear-gradient(135deg, ${book.coverColor || COLORS.accent}, ${book.coverColor || COLORS.accent}dd)`
                }} />

                {/* Book Info */}
                <div style={localStyles.bookCardBody}>
                  {/* Dropdown Menu */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdownId(showDropdownId === book.id ? null : book.id);
                    }}
                    style={localStyles.dropdownButton}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLORS.secondary}
                  >
                    ⋯
                  </button>
                  
                  {showDropdownId === book.id && (
                    <div style={localStyles.dropdown}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditBook(book);
                        }}
                        style={localStyles.dropdownItem}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Edit Book
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateBook(book);
                        }}
                        style={localStyles.dropdownItem}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Duplicate
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportBook(book);
                        }}
                        style={localStyles.dropdownItem}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Export
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBook(book.id);
                        }}
                        style={localStyles.dropdownItemDanger}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <h3 style={localStyles.bookTitle}>
                    {book.name}
                  </h3>
                  
                  <p style={localStyles.bookDescription}>
                    {book.description || 'No description provided'}
                  </p>
                  
                  <div style={localStyles.tagContainer}>
                    <span style={localStyles.tag}>
                      {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
                    </span>
                    {book.isPublic && (
                      <span style={localStyles.publicTag}>
                        Public
                      </span>
                    )}
                  </div>
                  
                  <div style={localStyles.statsGrid}>
                    <div style={localStyles.statItem}>
                      {stats.recipeCount} recipes
                    </div>
                    
                    <div style={localStyles.statItem}>
                      {stats.avgTime}m avg
                    </div>
                  </div>
                  
                  <div style={localStyles.dateText}>
                    Updated {stats.lastUpdated}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Recipe Book Modal */}
      {showModal && (
        <RecipeBookModal
          book={editingBook}
          recipes={recipes}
          onSave={handleSaveBook}
          onClose={() => {
            setShowModal(false);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
};

// Recipe Book Modal Component - ALIGNED
const RecipeBookModal = ({ book, recipes, onSave, onClose }) => {
  const [formData, setFormData] = useState(book);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Modal-specific styles - ALIGNED with global styles
  const modalStyles = {
    overlay: {
      ...MODALS.overlay
    },
    container: {
      ...MODALS.content,  // Using global modal content
      width: '90%',
      maxWidth: '900px'
    },
    header: {
      ...MODALS.header
    },
    title: {
      ...MODALS.title
    },
    closeButton: {
      ...MODALS.closeButton  // Using global close button
    },
    body: {
      ...MODALS.body
    },
    footer: {
      ...MODALS.footer,
      paddingTop: SPACING.lg,
      borderTop: `1px solid ${COLORS.border}`
    },
    formGroup: {
      marginBottom: SPACING.xl
    },
    formLabel: {
      ...FORMS.label,
      display: 'block',
      marginBottom: SPACING.sm
    },
    formInput: {
      ...FORMS.input.base,
      width: '100%'
    },
    formTextarea: {
      ...FORMS.textarea.base,
      width: '100%',
      minHeight: '80px',
      resize: 'vertical'
    },
    formSelect: {
      ...FORMS.select.base,
      width: '100%'
    },
    errorText: {
      color: COLORS.error,
      fontSize: TYPOGRAPHY.fontSize.xs,
      marginTop: SPACING.xs
    },
    colorButton: {
      width: '40px',
      height: '40px',
      borderRadius: SPACING.sm,
      cursor: 'pointer'
    },
    checkbox: {
      ...FORMS.checkbox.input
    },
    // ... rest of modal styles
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Book name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  // Rest of modal implementation remains the same but uses aligned styles
  return (
    <div style={modalStyles.overlay}>
      {/* Modal content implementation with aligned styles */}
    </div>
  );
};

export default RecipeBooksPage;
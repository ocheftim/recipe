import React from 'react';
import SearchInput from './SearchInput';
import ExportImportDropdown from './ExportImportDropdown';
// import FilterMenu from '../shared/FilterMenu';
// import ViewModeToggle from '../shared/ViewModeToggle';
import styles from '../ingredients/ingredients.module.css';

const IngredientsToolbar = ({
  // Search props
  searchTerm,
  onSearchChange,
  // Filter props
  selectedCategory,
  setSelectedCategory,
  selectedSupplier,
  setSelectedSupplier,
  excludedAllergens,
  setExcludedAllergens,
  suppliers,
  categories,
  activeFilters,
  clearFilters,
  // View props
  viewMode,
  onViewModeChange,
  // Column props (for list view)
  visibleColumns,
  setVisibleColumns,
  hoveredButton,
  setHoveredButton,
  columnOrder,
  setColumnOrder,
  // Action handlers
  onNewIngredient,
  onShowSuppliers,
  onExport,
  onImport,
  // Results count
  filteredCount,
  totalCount,
  // Theme
  theme = {}
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.seasalt || '#F6F8F8',
        padding: '20px 24px 16px 24px'
      }}
    >
      {/* Single Row: All controls on one line */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Left side: Search with results + Filters + New Ingredient */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          {/* Search Field with Results Text Under */}
          <div>
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              theme={theme}
            />
            {/* Dynamic Results Count */}
            <div style={{
              marginTop: '6px',
              fontSize: '13px',
              fontStyle: 'italic',
              color: theme.silver || '#BBBFC2',
              fontFamily: '"Inter", sans-serif'
            }}>
              Found {filteredCount || 0} of {totalCount || 0} ingredients
            </div>
          </div>

          {/* Filters */}
          <div style={{ marginTop: '0px' }}>
            <FilterMenu
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSupplier={selectedSupplier}
              setSelectedSupplier={setSelectedSupplier}
              excludedAllergens={excludedAllergens}
              setExcludedAllergens={setExcludedAllergens}
              suppliers={suppliers}
              categories={categories}
              activeFilters={activeFilters}
              clearFilters={clearFilters}
              theme={theme}
            />
          </div>

          {/* New Ingredient Button - Single instance */}
          <div style={{ marginTop: '0px' }}>
            <button
              onClick={onNewIngredient}
              className={styles.unifiedControl}
            >
              <span>+</span>
              New Ingredient
            </button>
          </div>
        </div>

        {/* Right side: View Mode, Suppliers, Export/Import */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '0px'
        }}>
          {/* View Mode Toggle */}
          <ViewModeToggle
            currentView={viewMode}
            onViewChange={onViewModeChange}
            theme={theme}
          />

          {/* Suppliers Button - Single instance */}
          <button
            onClick={onShowSuppliers}
            className={styles.unifiedControl}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            Suppliers
          </button>

          {/* Export/Import Dropdown */}
          <ExportImportDropdown
            onExport={onExport}
            onImport={onImport}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientsToolbar;
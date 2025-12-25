import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipeTable from './RecipeTable';
import IndividualRecipeCostAnalysis from './IndividualRecipeCostAnalysis';

const RecipesList = ({
  recipes,
  viewMode = 'table',
  sortConfig,
  handleSort,
  openRecipeModal,
  handleRecipeAction,
  visibleColumns,
  columnOrder,
  loading = false,
  hoveredButton,
  setHoveredButton,
  className = "",
  theme // Make sure theme is passed as a prop
}) => {
  // Cost Analysis Modal State
  const [costAnalysisModal, setCostAnalysisModal] = useState({
    isOpen: false,
    recipe: null
  });

  // Safety checks
  if (!recipes || !Array.isArray(recipes)) {
    return <div>No recipes available</div>;
  }
  if (recipes.length === 0) {
    return <div>No recipes found</div>;
  }

  // FLEXIBLE FIELD WIDTHS - Limited stretch to accommodate all fields
  const FIELD_WIDTHS = {
    name: { width: '180px', minWidth: '150px', maxWidth: '250px', flex: '2' },
    code: { width: '80px', minWidth: '60px', maxWidth: '100px', flex: '0.8' },
    category: { width: '100px', minWidth: '80px', maxWidth: '130px', flex: '1' },
    cuisine: { width: '100px', minWidth: '80px', maxWidth: '130px', flex: '1' },
    outlet: { width: '90px', minWidth: '70px', maxWidth: '120px', flex: '1' },
    menu: { width: '90px', minWidth: '70px', maxWidth: '120px', flex: '1' },
    yield: { width: '85px', minWidth: '70px', maxWidth: '110px', flex: '1' },
    totalCost: { width: '100px', minWidth: '90px', maxWidth: '130px', flex: '1.2' },
    costPerServing: { width: '100px', minWidth: '90px', maxWidth: '130px', flex: '1.2' },
    menuPrice: { width: '95px', minWidth: '85px', maxWidth: '120px', flex: '1.1' },
    foodCostPercent: { width: '100px', minWidth: '90px', maxWidth: '130px', flex: '1.2' },
    profitMargin: { width: '100px', minWidth: '90px', maxWidth: '130px', flex: '1.2' },
    lastUpdated: { width: '90px', minWidth: '80px', maxWidth: '110px', flex: '1' },
    status: { width: '90px', minWidth: '70px', maxWidth: '120px', flex: '1' },
    actions: { width: '50px', minWidth: '50px', maxWidth: '50px', flex: '0.5' }
  };

  // Existing handlers
  const handleEdit = (recipe) => {
    openRecipeModal?.(recipe);
  };

  const handleDuplicate = (recipe) => {
    handleRecipeAction?.('duplicate', recipe);
  };

  const handleArchive = (recipe) => {
    handleRecipeAction?.('archive', recipe);
  };

  const handleDelete = (recipe) => {
    handleRecipeAction?.('delete', recipe);
  };

  // New Cost Analysis handlers
  const handleCostAnalysis = (recipe) => {
    setCostAnalysisModal({
      isOpen: true,
      recipe: recipe
    });
  };

  const closeCostAnalysis = () => {
    setCostAnalysisModal({
      isOpen: false,
      recipe: null
    });
  };

  if (viewMode === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={() => handleEdit(recipe)}
            onDuplicate={() => handleDuplicate(recipe)}
            onArchive={() => handleArchive(recipe)}
            onDelete={() => handleDelete(recipe)}
            onCostAnalysis={() => handleCostAnalysis(recipe)}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            fieldWidths={FIELD_WIDTHS}
          />
        ))}
        
        {/* Cost Analysis Modal */}
        <IndividualRecipeCostAnalysis
          recipe={costAnalysisModal.recipe}
          isOpen={costAnalysisModal.isOpen}
          onClose={closeCostAnalysis}
          theme={theme}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <RecipeTable
        recipes={recipes}
        visibleColumns={visibleColumns}
        columnOrder={columnOrder}
        sortConfig={sortConfig}
        handleSort={handleSort}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onCostAnalysis={handleCostAnalysis}
        hoveredButton={hoveredButton}
        setHoveredButton={setHoveredButton}
        fieldWidths={FIELD_WIDTHS}
        theme={theme}
      />
      
      {/* Cost Analysis Modal */}
      <IndividualRecipeCostAnalysis
        recipe={costAnalysisModal.recipe}
        isOpen={costAnalysisModal.isOpen}
        onClose={closeCostAnalysis}
        theme={theme}
      />
    </div>
  );
};

export default RecipesList;
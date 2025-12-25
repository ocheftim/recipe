import React from 'react';
import IngredientsTable from './IngredientsTable';

const IngredientsContent = ({ 
  viewMode,
  filteredIngredients,
  suppliers,
  onEditIngredient,
  onDeleteIngredient,
  ...otherProps
}) => {
  return (
    <IngredientsTable
      ingredients={filteredIngredients}
      suppliers={suppliers}
      setEditingIngredient={onEditIngredient}
      onDelete={onDeleteIngredient}
      {...otherProps}
    />
  );
};

export default IngredientsContent;

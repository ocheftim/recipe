import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => {
    const stored = localStorage.getItem('recipes');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const clearRecipes = () => {
    setRecipes([]);
    localStorage.removeItem('recipes');
  };

  const updateRecipe = (index, updatedRecipe) => {
    const newRecipes = [...recipes];
    newRecipes[index] = updatedRecipe;
    setRecipes(newRecipes);
  };

  const deleteRecipe = (index) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(newRecipes);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        clearRecipes,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

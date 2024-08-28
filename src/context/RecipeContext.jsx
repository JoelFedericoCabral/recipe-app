import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [originalName, setOriginalName] = useState(''); // Estado para almacenar el nombre original

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.name === originalName ? updatedRecipe : recipe
      )
    );
    setRecipeToEdit(null); // Limpiar el estado de edición después de actualizar
    setOriginalName(''); // Limpiar el nombre original después de la actualización
  };

  const deleteRecipe = (name) => {
    setRecipes(recipes.filter((recipe) => recipe.name !== name));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        recipeToEdit,
        setRecipeToEdit,
        setOriginalName, // Pasar la función para establecer el nombre original
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

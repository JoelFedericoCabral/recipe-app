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

  // Agregar una nueva receta
  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  // Actualizar una receta existente
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.name === originalName ? updatedRecipe : recipe
      )
    );
    setRecipeToEdit(null); // Limpiar el estado de edición después de actualizar
    setOriginalName(''); // Limpiar el nombre original después de la actualización
  };

  // Eliminar una receta por nombre
  const deleteRecipe = (name) => {
    setRecipes(recipes.filter((recipe) => recipe.name !== name));
  };

  // Alternar el estado de favorito de una receta
  const toggleFavorite = (name) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.name === name ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite, // Incluyendo la función de favoritos en el contexto
        recipeToEdit,
        setRecipeToEdit,
        setOriginalName, // Pasar la función para establecer el nombre original
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

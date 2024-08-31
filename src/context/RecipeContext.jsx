import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Añadir una dependencia para generar IDs únicos

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [originalId, setOriginalId] = useState(''); // Cambiamos a originalId en lugar de originalName

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Agregar una nueva receta con un ID único
  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: uuidv4() }; // Generar un ID único para cada receta
    setRecipes([...recipes, newRecipe]);
  };

  // Actualizar una receta existente usando su ID
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === originalId ? updatedRecipe : recipe
      )
    );
    setRecipeToEdit(null);
    setOriginalId('');
  };

  // Eliminar una receta por ID
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
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
        toggleFavorite,
        recipeToEdit,
        setRecipeToEdit,
        setOriginalId, // Pasar la función para establecer el ID original
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
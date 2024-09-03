import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Contexto de las recetas.
 */
export const RecipeContext = createContext();

/**
 * Proveedor del contexto de recetas.
 * @param {Object} props - Las propiedades del proveedor.
 * @param {React.ReactNode} props.children - Los componentes hijos que serán envueltos por el proveedor.
 * @returns {JSX.Element} El proveedor del contexto.
 */
export const RecipeProvider = ({ children }) => {
  // Estado para almacenar las recetas, cargadas desde localStorage si existen
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  // Estado para almacenar las recetas favoritas por usuario
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    return savedFavorites;
  });

  const [recipeToEdit, setRecipeToEdit] = useState(null); // Estado para la receta que se va a editar
  const [originalId, setOriginalId] = useState(""); // Estado para el ID original de la receta

  // Guarda las recetas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Guarda las recetas favoritas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Agrega una nueva receta con un ID único.
   * @param {Object} recipe - Los datos de la receta.
   */
  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: uuidv4() };
    setRecipes([...recipes, newRecipe]);
  };

  /**
   * Actualiza una receta existente usando su ID.
   * @param {Object} updatedRecipe - La receta actualizada.
   */
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === originalId ? updatedRecipe : recipe,
      ),
    );
    setRecipeToEdit(null);
    setOriginalId("");
  };

  /**
   * Elimina una receta por su ID.
   * @param {string} id - El ID de la receta.
   */
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  /**
   * Alterna el estado de favorito de una receta para un usuario específico.
   * @param {string} userId - El ID del usuario.
   * @param {string} recipeId - El ID de la receta.
   */
  const toggleFavorite = (userId, recipeId) => {
    setFavorites((prevFavorites) => {
      const userFavorites = prevFavorites[userId] || [];
      if (userFavorites.includes(recipeId)) {
        return {
          ...prevFavorites,
          [userId]: userFavorites.filter((id) => id !== recipeId),
        };
      } else {
        return {
          ...prevFavorites,
          [userId]: [...userFavorites, recipeId],
        };
      }
    });
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
        setOriginalId,
        favorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

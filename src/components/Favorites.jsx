import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import RecipeList from "./RecipeList";

/**
 * Componente para mostrar las recetas favoritas del usuario logueado.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.loggedInUser - El ID del usuario logueado.
 * @returns {JSX.Element} El componente de lista de favoritos.
 */
function Favorites({ loggedInUser }) {
  const { recipes, favorites } = useContext(RecipeContext); // Obtener recetas y favoritos del contexto

  // Verificar que el usuario esté logueado
  if (!loggedInUser) {
    return (
      <p className="text-red-500 text-center mt-5">
        Debe estar logueado para ver sus favoritos.
      </p>
    );
  }

  // Obtener las recetas favoritas del usuario logueado
  const userFavorites = favorites[loggedInUser] || [];
  const favoriteRecipes = recipes.filter((recipe) =>
    userFavorites.includes(recipe.id),
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-center text-green-600">
        Mis Favoritos
      </h2>
      {favoriteRecipes.length > 0 ? (
        <RecipeList recipes={favoriteRecipes} loggedInUser={loggedInUser} />
      ) : (
        <p className="text-gray-500 text-center">
          No tienes recetas favoritas aún.
        </p>
      )}
    </div>
  );
}

export default Favorites;

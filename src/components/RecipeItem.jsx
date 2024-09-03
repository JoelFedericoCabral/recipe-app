import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

/**
 * RecipeItem - Componente que muestra la información básica de una receta,
 * incluyendo el nombre, descripción y opciones para marcar como favorita o eliminar.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.recipe - Los datos de la receta.
 * @param {string} props.loggedInUser - El nombre del usuario logueado.
 * @returns {JSX.Element} El componente que muestra la información de una receta.
 */
function RecipeItem({ recipe, loggedInUser }) {
  const { toggleFavorite, deleteRecipe, favorites } = useContext(RecipeContext);

  // Verificar si la receta es favorita para el usuario logueado
  const isFavorite = favorites[loggedInUser]?.includes(recipe.id);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center mb-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        <Link to={`/recipes/${recipe.id}`} className="hover:underline">
          {recipe.name}
        </Link>
      </h3>
      <p className="text-gray-600 mb-4">{recipe.description}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => toggleFavorite(loggedInUser, recipe.id)}
          className={`focus:outline-none ${isFavorite ? "text-red-500" : "text-gray-400"}`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <button
          onClick={() => deleteRecipe(recipe.id)}
          className="text-red-500 hover:bg-red-500 hover:text-white hover:underline px-4 py-2 border border-red-500 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default RecipeItem;

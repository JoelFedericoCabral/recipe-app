import React from "react";
import RecipeItem from "./RecipeItem";

/**
 * RecipeList - Componente que muestra una lista de recetas en formato de cuadrícula.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.recipes - Lista de recetas a mostrar.
 * @param {string} props.loggedInUser - El nombre del usuario logueado.
 * @returns {JSX.Element} El componente que muestra la lista de recetas.
 */
function RecipeList({ recipes, loggedInUser }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem
            key={recipe.name}
            recipe={recipe}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-xl text-gray-500">
          No hay recetas aún.
        </p>
      )}
    </div>
  );
}

export default RecipeList;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeItem({ recipe, loggedInUser }) {
  const { toggleFavorite, deleteRecipe, favorites } = useContext(RecipeContext);

  const isFavorite = favorites[loggedInUser]?.includes(recipe.id);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center mb-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        <Link to={`/recipes/${recipe.id}`} className="hover:underline">{recipe.name}</Link>
      </h3>
      <p className="text-gray-600 mb-4">{recipe.description}</p>
      <div className="flex space-x-4">
        <button 
          onClick={() => toggleFavorite(loggedInUser, recipe.id)}
          className={`focus:outline-none ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <button 
          onClick={() => deleteRecipe(recipe.id)}
          className="text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default RecipeItem;

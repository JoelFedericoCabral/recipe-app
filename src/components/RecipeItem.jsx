import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeItem({ recipe, loggedInUser }) {
  const { toggleFavorite, deleteRecipe, favorites } = useContext(RecipeContext);

  const isFavorite = favorites[loggedInUser]?.includes(recipe.id);

  return (
    <div className="recipe-item">
      <h3>
        <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
      </h3>
      <p>{recipe.description}</p>
      <div>
        <button onClick={() => toggleFavorite(loggedInUser, recipe.id)}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <button onClick={() => deleteRecipe(recipe.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default RecipeItem;

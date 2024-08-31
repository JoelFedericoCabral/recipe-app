import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeItem({ recipe, loggedInUser }) {
  const { toggleFavorite } = useContext(RecipeContext);

  return (
    <div className="recipe-item">
      <h3>
        <Link to={`/recipes/${recipe.name}`}>{recipe.name}</Link>
      </h3>
      <p>{recipe.description}</p>
      <div>
        <button onClick={() => toggleFavorite(recipe.name)}>
          {recipe.favorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}

export default RecipeItem;

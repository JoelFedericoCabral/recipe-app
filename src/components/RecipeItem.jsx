import React from 'react';
import { Link } from 'react-router-dom';

function RecipeItem({ recipe }) {
  return (
    <div className="recipe-item">
      <h3>
        <Link to={`/recipes/${recipe.name}`}>{recipe.name}</Link>
      </h3>
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeItem;

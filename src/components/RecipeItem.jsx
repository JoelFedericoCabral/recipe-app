import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeItem({ recipe, loggedInUser }) {
  const { toggleFavorite, deleteRecipe } = useContext(RecipeContext);

  return (
    <div className="recipe-item">
      <h3>
        <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link> {/* Cambiar a usar recipe.id */}
      </h3>
      <p>{recipe.description}</p>
      <div>
        <button onClick={() => toggleFavorite(recipe.id)}> {/* Cambiar a usar recipe.id */}
          {recipe.favorite ? '❤️' : '🤍'}
        </button>
        <button onClick={() => deleteRecipe(recipe.id)}>Eliminar</button> {/* Botón para eliminar la receta */}
      </div>
    </div>
  );
}

export default RecipeItem;
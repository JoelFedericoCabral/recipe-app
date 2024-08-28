import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeItem({ recipe, loggedInUser }) {
  const { deleteRecipe, setRecipeToEdit } = useContext(RecipeContext);

  return (
    <div className="recipe-item">
      <h3><Link to={`/recipes/${recipe.name}`}>{recipe.name}</Link></h3> {/* Enlace a detalles */}
      <p>{recipe.description}</p>
      {loggedInUser && (
        <>
          <button onClick={() => deleteRecipe(recipe.name)}>Eliminar</button>
          <button onClick={() => setRecipeToEdit(recipe)}>Editar</button>
        </>
      )}
    </div>
  );
}

export default RecipeItem;

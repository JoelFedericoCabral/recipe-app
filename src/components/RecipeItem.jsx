import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

function RecipeItem({ recipe, loggedInUser }) {
  const { deleteRecipe, setRecipeToEdit } = useContext(RecipeContext);

  return (
    <div className="recipe-item">
      <h3>{recipe.name}</h3>
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

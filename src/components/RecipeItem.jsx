import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import { RecipeContext } from '../context/RecipeContext';

/**
 * Componente para mostrar un ítem de receta individual
 * 
 * @param {Object} recipe - La receta a mostrar
 * @param {String} loggedInUser - El usuario logueado actual
 * @returns {JSX.Element} - Vista del ítem de la receta
 */
function RecipeItem({ recipe, loggedInUser }) {
  const { deleteRecipe, setRecipeToEdit } = useContext(RecipeContext);

  return (
    <div className="recipe-item">
      {/* Envolver el nombre de la receta en un Link */}
      <h3>
        <Link to={`/recipes/${recipe.name}`}>
          {recipe.name}
        </Link>
      </h3>
      <p>{recipe.description}</p>
      {/* Mostrar botones de editar y eliminar si el usuario es el creador */}
      {loggedInUser === recipe.author && (
        <div>
          <button onClick={() => deleteRecipe(recipe.name)}>Eliminar</button>
          <button onClick={() => setRecipeToEdit(recipe)}>Editar</button>
        </div>
      )}
    </div>
  );
}

export default RecipeItem;

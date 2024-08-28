import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

/**
 * Componente que muestra los detalles de una receta específica
 * 
 * @returns {JSX.Element} - Vista de detalles de la receta
 */
function RecipeDetails() {
  const { recipes } = useContext(RecipeContext);
  const { recipeName } = useParams();

  // Buscar la receta específica por nombre (o puedes usar un id si prefieres)
  const recipe = recipes.find(recipe => recipe.name === recipeName);

  if (!recipe) {
    return <p>Receta no encontrada.</p>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <Link to="/">Volver a la lista de recetas</Link>
    </div>
  );
}

export default RecipeDetails;

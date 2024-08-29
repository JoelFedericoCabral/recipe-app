import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

/**
 * Componente que muestra los detalles de una receta específica y permite editar o eliminar si es del usuario logueado
 * 
 * @returns {JSX.Element} - Vista de detalles de la receta
 */
function RecipeDetails() {
  const { recipes, deleteRecipe, setRecipeToEdit } = useContext(RecipeContext);
  const { recipeName } = useParams();
  const navigate = useNavigate();

  // Buscar la receta específica por nombre
  const recipe = recipes.find(recipe => recipe.name === recipeName);
  const loggedInUser = sessionStorage.getItem('loggedInUser'); // Obtener el usuario logueado

  if (!recipe) {
    return <p>Receta no encontrada.</p>;
  }

  const handleDelete = () => {
    deleteRecipe(recipe.name);
    navigate('/'); // Redirigir a la lista de recetas después de eliminar
  };

  const handleEdit = () => {
    setRecipeToEdit(recipe);
    navigate('/'); // Redirigir al formulario de edición
  };

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>

      {/* Mostrar botones de editar y eliminar si el usuario es el creador */}
      {loggedInUser === recipe.author && (
        <div>
          <button onClick={handleDelete}>Eliminar</button>
          <button onClick={handleEdit}>Editar</button>
        </div>
      )}
      
      <Link to="/">Volver a la lista de recetas</Link>
    </div>
  );
}

export default RecipeDetails;

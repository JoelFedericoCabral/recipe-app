import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeDetails({ loggedInUser }) {
  const { recipes, deleteRecipe, setRecipeToEdit, setOriginalId } = useContext(RecipeContext); // Agregar setOriginalId
  const { id } = useParams(); // Usar id en lugar de name
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id === id); // Buscar por id

  if (!recipe) {
    return <p>Receta no encontrada.</p>;
  }

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/'); 
  };

  const handleEdit = () => {
    setRecipeToEdit(recipe);
    setOriginalId(id); // Asegurarse de establecer el ID original
    navigate(`/edit-recipe/${id}`); // Navegar a la página de edición con el ID
  };

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredientes:</h3>
      <p>{recipe.ingredients}</p> {/* Mostrar los ingredientes */}
      <div>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button> {/* Botón para eliminar la receta */}
      </div>
      <p>
        <a href="/" onClick={() => navigate(-1)}>Volver a la lista de recetas</a>
      </p>
    </div>
  );
}

export default RecipeDetails;

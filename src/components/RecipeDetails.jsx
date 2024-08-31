import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeDetails({ loggedInUser }) {
  const { recipes, deleteRecipe, setRecipeToEdit } = useContext(RecipeContext);
  const { name } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.name === name);

  if (!recipe) {
    return <p>Receta no encontrada.</p>;
  }

  const handleDelete = () => {
    deleteRecipe(name);
    navigate('/'); 
  };

  const handleEdit = () => {
    setRecipeToEdit(recipe);
    navigate('/'); 
  };

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredientes:</h3>
      <p>{recipe.ingredients}</p> {/* Mostrar los ingredientes */}
      {recipe.author === loggedInUser && (
        <div>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      )}
      <p>
        <a href="/" onClick={() => navigate(-1)}>Volver a la lista de recetas</a>
      </p>
    </div>
  );
}

export default RecipeDetails;

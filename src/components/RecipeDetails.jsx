import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeDetails({ loggedInUser }) {
  const { recipes, deleteRecipe, setRecipeToEdit, setOriginalId } = useContext(RecipeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p>Receta no encontrada.</p>;
  }

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/'); 
  };

  const handleEdit = () => {
    setRecipeToEdit(recipe);
    setOriginalId(id);
    navigate(`/edit-recipe/${id}`); 
  };

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredientes:</h3>
      <p>{recipe.ingredients}</p>
      <div className='button-group'>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
      <p>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate(-1); }}>Volver</a>
      </p>
    </div>
  );
}

export default RecipeDetails;

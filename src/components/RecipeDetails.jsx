import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeDetails({ loggedInUser }) {
  const { recipes, deleteRecipe, setRecipeToEdit, setOriginalId } = useContext(RecipeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p className="text-center text-red-500">Receta no encontrada.</p>;
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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">{recipe.name}</h2>
      <p className="mb-6 text-gray-700">{recipe.description}</p>
      <h3 className="text-2xl font-semibold mb-3">Ingredientes:</h3>
      <p className="mb-6 text-gray-700">{recipe.ingredients}</p>
      <div className="flex justify-around mb-6">
        <button 
          onClick={handleEdit} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Editar
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
      <p className="text-center">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); navigate(-1); }} 
          className="text-blue-500 hover:underline"
        >
          Volver
        </a>
      </p>
    </div>
  );
}

export default RecipeDetails;

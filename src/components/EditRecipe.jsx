import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function EditRecipe() {
  const { recipes, updateRecipe, setOriginalId } = useContext(RecipeContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la receta desde los parámetros

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  useEffect(() => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      setName(recipe.name);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients || '');
      setOriginalId(id); // Establecer el ID original
    }
  }, [id, recipes, setOriginalId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id, name, description, ingredients }); // Pasar el ID con los datos actualizados
    navigate('/'); // Redirigir a la lista de recetas después de actualizar
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg transparent">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Editar Receta</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Nombre de la Receta:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 mb-2">Ingredientes:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;

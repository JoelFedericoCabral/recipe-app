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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre de la Receta:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="ingredients">Ingredientes:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditRecipe;

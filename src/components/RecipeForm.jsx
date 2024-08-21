import React, { useState, useEffect, useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

function RecipeForm() {
  const { addRecipe, updateRecipe, recipeToEdit, setRecipeToEdit } = useContext(RecipeContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setDescription(recipeToEdit.description);
    }
  }, [recipeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (recipeToEdit) {
      updateRecipe({ name, description });
    } else {
      addRecipe({ name, description });
    }

    setName('');
    setDescription('');
    setRecipeToEdit(null); // Limpiar la receta a editar después de guardar
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
          disabled={!!recipeToEdit} 
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
      <button type="submit">{recipeToEdit ? 'Actualizar Receta' : 'Agregar Receta'}</button>
    </form>
  );
}

export default RecipeForm;

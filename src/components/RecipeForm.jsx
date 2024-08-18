import React, { useState, useEffect } from 'react';

function RecipeForm({ addRecipe, recipes, recipeToEdit, updateRecipe }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Si estamos editando, rellenar el formulario con los valores actuales de la receta
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
      if (recipes.some(recipe => recipe.name.toLowerCase() === name.toLowerCase())) {
        alert('Ya existe una receta con ese nombre.');
        return;
      }
      addRecipe({ name, description });
    }

    setName('');
    setDescription('');
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
          disabled={!!recipeToEdit} // Deshabilitar el campo nombre al editar
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

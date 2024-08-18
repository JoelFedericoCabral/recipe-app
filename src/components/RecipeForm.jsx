import React, { useState, useEffect } from 'react';

function RecipeForm({ addRecipe, recipes, recipeToEdit, updateRecipe }) {
  // Estado para manejar el nombre y la descripción de la receta
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Rellenar el formulario con la receta que se está editando
  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setDescription(recipeToEdit.description);
    }
  }, [recipeToEdit]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (recipeToEdit) {
      // Actualizar receta existente
      updateRecipe({ name, description });
    } else {
      // Validar que no haya recetas duplicadas
      if (recipes.some(recipe => recipe.name.toLowerCase() === name.toLowerCase())) {
        alert('Ya existe una receta con ese nombre.');
        return;
      }
      // Agregar nueva receta
      addRecipe({ name, description });
    }

    // Limpiar el formulario después de agregar o actualizar la receta
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

import React, { useState } from 'react';

function RecipeForm({ addRecipe, recipes }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que no haya recetas duplicadas
    if (recipes.some(recipe => recipe.name.toLowerCase() === name.toLowerCase())) {
      alert('Ya existe una receta con ese nombre.');
      return;
    }

    addRecipe({ name, description });
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
      <button type="submit">Agregar Receta</button>
    </form>
  );
}

export default RecipeForm;

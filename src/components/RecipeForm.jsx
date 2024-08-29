import React, { useState, useEffect, useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

function RecipeForm({ loggedInUser }) {
  const { addRecipe, updateRecipe, recipeToEdit, setRecipeToEdit, recipes, setOriginalName } = useContext(RecipeContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setDescription(recipeToEdit.description);
      setOriginalName(recipeToEdit.name); // Guardar el nombre original
    } else {
      setName('');
      setDescription('');
    }
  }, [recipeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      description,
      author: loggedInUser, // Asignar el usuario logueado como autor
    };

    if (recipeToEdit) {
      if (
        recipes.some(
          (recipe) =>
            recipe.name.toLowerCase() === name.toLowerCase() &&
            recipe.name.toLowerCase() !== recipeToEdit.name.toLowerCase()
        )
      ) {
        alert('Ya existe una receta con ese nombre.');
        return;
      }
      updateRecipe(newRecipe);
    } else {
      if (recipes.some((recipe) => recipe.name.toLowerCase() === name.toLowerCase())) {
        alert('Ya existe una receta con ese nombre.');
        return;
      }
      addRecipe(newRecipe);
    }

    setName('');
    setDescription('');
    setRecipeToEdit(null);
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
      <button type="submit">{recipeToEdit ? 'Actualizar Receta' : 'Agregar Receta'}</button>
    </form>
  );
}

export default RecipeForm;

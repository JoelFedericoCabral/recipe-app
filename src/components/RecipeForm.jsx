import React, { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

/**
 * RecipeForm - Componente que maneja la creación y edición de recetas.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.loggedInUser - El nombre del usuario logueado.
 * @returns {JSX.Element} El formulario para agregar o editar recetas.
 */
function RecipeForm({ loggedInUser }) {
  const {
    addRecipe,
    updateRecipe,
    recipeToEdit,
    setRecipeToEdit,
    recipes,
    setOriginalName,
  } = useContext(RecipeContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  /**
   * useEffect - Rellena el formulario con los datos de la receta a editar,
   * o lo limpia si no hay ninguna receta seleccionada para editar.
   */
  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setDescription(recipeToEdit.description);
      setIngredients(recipeToEdit.ingredients || "");
      setOriginalName(recipeToEdit.name);
    } else {
      setName("");
      setDescription("");
      setIngredients("");
    }
  }, [recipeToEdit]);

  /**
   * handleSubmit - Maneja el envío del formulario, verificando si se está agregando
   * una nueva receta o actualizando una existente. También verifica si el nombre
   * de la receta ya existe para evitar duplicados.
   *
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      description,
      ingredients,
      author: loggedInUser, // Aseguramos que el autor se asigna correctamente
    };

    if (recipeToEdit) {
      // Verificar si el nombre de la receta ya existe al actualizar
      if (
        recipes.some(
          (recipe) =>
            recipe.name.toLowerCase() === name.toLowerCase() &&
            recipe.name.toLowerCase() !== recipeToEdit.name.toLowerCase(),
        )
      ) {
        alert("Ya existe una receta con ese nombre.");
        return;
      }
      updateRecipe(newRecipe);
    } else {
      // Verificar si el nombre de la receta ya existe al agregar
      if (
        recipes.some(
          (recipe) => recipe.name.toLowerCase() === name.toLowerCase(),
        )
      ) {
        alert("Ya existe una receta con ese nombre.");
        return;
      }
      addRecipe(newRecipe);
    }

    // Limpiar el formulario después de agregar o editar
    setName("");
    setDescription("");
    setIngredients("");
    setRecipeToEdit(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre de la Receta:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="ingredients"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Ingredientes:
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {recipeToEdit ? "Actualizar Receta" : "Agregar Receta"}
      </button>
    </form>
  );
}

export default RecipeForm;

import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

/**
 * RecipeDetails - Componente que muestra los detalles de una receta específica.
 * Permite a los usuarios ver los detalles, editar o eliminar la receta.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.loggedInUser - El nombre del usuario logueado.
 * @returns {JSX.Element} El componente de detalles de la receta.
 */
function RecipeDetails({ loggedInUser }) {
  const { recipes, deleteRecipe, setRecipeToEdit, setOriginalId } =
    useContext(RecipeContext);
  const { id } = useParams(); // Obtener el ID de la receta desde los parámetros de la URL
  const navigate = useNavigate();

  // Encontrar la receta correspondiente al ID obtenido
  const recipe = recipes.find((r) => r.id === id);

  // Mostrar mensaje si no se encuentra la receta
  if (!recipe) {
    return <p className="text-center text-red-500">Receta no encontrada.</p>;
  }

  /**
   * Maneja la eliminación de la receta y redirige al usuario a la página principal.
   */
  const handleDelete = () => {
    deleteRecipe(id);
    navigate("/");
  };

  /**
   * Maneja la edición de la receta y redirige al usuario a la página de edición.
   */
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
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="text-blue-500 hover:underline"
        >
          Volver
        </a>
      </p>
    </div>
  );
}

export default RecipeDetails;

import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeList from './RecipeList';

function MyRecipes({ loggedInUser }) {
  const { recipes } = useContext(RecipeContext);
  
  // Filtramos las recetas para obtener solo las del usuario logueado
  const myRecipes = recipes.filter(recipe => recipe.author === loggedInUser);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-center text-green-600">Mis Recetas</h2>
      {myRecipes.length > 0 ? (
        <RecipeList recipes={myRecipes} loggedInUser={loggedInUser} />
      ) : (
        <p className="text-gray-500 text-center">No has agregado ninguna receta aún.</p>
      )}
    </div>
  );
}

export default MyRecipes;

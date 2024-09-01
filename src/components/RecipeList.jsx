import React from 'react';
import RecipeItem from './RecipeItem';

function RecipeList({ recipes, loggedInUser }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem 
            key={recipe.name} 
            recipe={recipe} 
            loggedInUser={loggedInUser} 
          />
        ))
      ) : (
        <p className="col-span-full text-center text-xl text-gray-500">No hay recetas aún.</p>
      )}
    </div>
  );
}

export default RecipeList;

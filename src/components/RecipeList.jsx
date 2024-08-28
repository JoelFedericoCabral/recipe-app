import React from 'react';
import RecipeItem from './RecipeItem';

function RecipeList({ recipes, loggedInUser }) {
  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem 
            key={recipe.name} 
            recipe={recipe} 
            loggedInUser={loggedInUser} 
          />
        ))
      ) : (
        <p>No hay recetas aún.</p>
      )}
    </div>
  );
}

export default RecipeList;

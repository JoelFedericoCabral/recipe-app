import React from 'react';
import RecipeItem from './RecipeItem';

function RecipeList({ recipes }) {
  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem 
            key={recipe.name} 
            recipe={recipe} 
          />
        ))
      ) : (
        <p>No hay recetas aún.</p>
      )}
    </div>
  );
}

export default RecipeList;

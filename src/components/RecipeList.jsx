import React from 'react';
import RecipeItem from './RecipeItem';

function RecipeList({ recipes, onDelete, onEdit }) {
  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem 
            key={recipe.name} 
            recipe={recipe} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))
      ) : (
        <p>No hay recetas aún.</p>
      )}
    </div>
  );
}

export default RecipeList;

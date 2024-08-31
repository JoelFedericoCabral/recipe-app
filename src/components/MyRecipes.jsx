import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeList from './RecipeList';

function MyRecipes({ loggedInUser }) {
  const { recipes } = useContext(RecipeContext);
  const myRecipes = recipes.filter(recipe => recipe.author === loggedInUser);

  return (
    <div>
      <h2>Mis Recetas</h2>
      <RecipeList recipes={myRecipes} loggedInUser={loggedInUser} />
    </div>
  );
}

export default MyRecipes;

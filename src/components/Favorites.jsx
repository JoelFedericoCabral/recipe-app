import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeList from './RecipeList';

function Favorites({ loggedInUser }) {
  const { recipes } = useContext(RecipeContext);
  const favoriteRecipes = recipes.filter(recipe => recipe.favorite);

  return (
    <div>
      <h2>Mis Favoritos</h2>
      <RecipeList recipes={favoriteRecipes} loggedInUser={loggedInUser} />
    </div>
  );
}

export default Favorites;
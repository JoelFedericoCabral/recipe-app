import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeList from './RecipeList';

/**
 * Componente para mostrar las recetas favoritas del usuario logueado.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.loggedInUser - El ID del usuario logueado.
 * @returns {JSX.Element} El componente de lista de favoritos.
 */
function Favorites({ loggedInUser }) {
  const { recipes, favorites } = useContext(RecipeContext);

  // Verificar que el usuario esté logueado
  if (!loggedInUser) {
    return <p>Debe estar logueado para ver sus favoritos.</p>;
  }

  // Obtener las recetas favoritas del usuario logueado
  const userFavorites = favorites[loggedInUser] || [];
  const favoriteRecipes = recipes.filter(recipe => userFavorites.includes(recipe.id));

  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favoriteRecipes.length > 0 ? (
        <RecipeList recipes={favoriteRecipes} loggedInUser={loggedInUser} />
      ) : (
        <p>No tienes recetas favoritas aún.</p>
      )}
    </div>
  );
}

export default Favorites;

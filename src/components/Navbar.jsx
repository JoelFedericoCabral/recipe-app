import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

function Navbar({ loggedInUser, handleLogout }) {
  const { setRecipeToEdit } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setRecipeToEdit(null); // Limpiar el estado de edición
    navigate('/'); // Navegar al inicio
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <Link to="/">Gestor de Recetas</Link>
      </div>
      <div className="navbar-user">
        {loggedInUser ? (
          <span>Bienvenido, {loggedInUser}!</span>
        ) : null}
      </div>
      <ul className="navbar-links">
        {!loggedInUser && (
          <>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}
        {loggedInUser && (
          <>
            <li>
              <Link to="/favorites">Favoritos</Link>
            </li>
            <li>
              <Link to="/my-recipes">Mis Recetas</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

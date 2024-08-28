import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loggedInUser, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Gestor de Recetas</Link>
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
              <Link to="/all-recipes">Todas las Recetas</Link>
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

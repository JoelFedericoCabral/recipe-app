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
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="cursor-pointer text-2xl font-bold text-green-600" onClick={handleLogoClick}>
              <Link to="/" className="text-green-600 hover:text-green-800">Gestor de Recetas</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {loggedInUser && (
              <span className="text-gray-600">Bienvenido, {loggedInUser}!</span>
            )}
            <ul className="flex space-x-4">
              {!loggedInUser ? (
                <>
                  <li>
                    <Link to="/login" className="text-gray-600 hover:text-green-600">Iniciar Sesión</Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-gray-600 hover:text-green-600">Registrarse</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/favorites" className="text-gray-600 hover:text-green-600">Favoritos</Link>
                  </li>
                  <li>
                    <Link to="/my-recipes" className="text-gray-600 hover:text-green-600">Mis Recetas</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        navigate('/login'); // Redirigir después de cerrar sesión
                      }}
                      className="text-gray-600 hover:text-green-600 focus:outline-none"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute asegura que solo los usuarios logueados puedan acceder
 * a ciertas rutas. Redirige a la página de login si no está logueado.
 * 
 * @param {ReactNode} element - El componente que debe renderizarse.
 * @param {boolean} loggedInUser - Estado del usuario logueado.
 * @returns {ReactNode} - Retorna el componente si está logueado, o redirige al login.
 */
function ProtectedRoute({ element, loggedInUser }) {
  return loggedInUser ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
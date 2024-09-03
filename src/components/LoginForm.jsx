import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente para manejar el formulario de inicio de sesión.
 * @param {Function} setLoggedInUser - Función para establecer el usuario logueado en el estado global.
 * @returns {JSX.Element} El componente de formulario de inicio de sesión.
 */
function LoginForm({ setLoggedInUser }) {
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para la navegación

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Verifica las credenciales del usuario en localStorage y, si son correctas, lo loguea.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || []; // Obtener usuarios del localStorage
    const user = users.find(
      (user) => user.username === username && user.password === password,
    ); // Buscar usuario con credenciales correctas

    if (user) {
      sessionStorage.setItem("loggedInUser", username); // Guardar usuario logueado en sessionStorage
      setLoggedInUser(username); // Establecer usuario logueado en el estado global
      navigate("/"); // Redirigir a la vista principal
    } else {
      alert("Nombre de usuario o contraseña incorrectos"); // Mostrar alerta si las credenciales son incorrectas
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Nombre de Usuario:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

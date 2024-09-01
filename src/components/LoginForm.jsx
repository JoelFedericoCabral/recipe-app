import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setLoggedInUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      sessionStorage.setItem('loggedInUser', username);
      setLoggedInUser(username);
      navigate('/'); // Redirige a la vista principal
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg transparent">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg" // Cambia p-6 a p-8 y max-w-md a max-w-lg para agrandar el formulario
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 mb-2">Nombre de Usuario:</label>
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
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña:</label>
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

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
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Nombre de Usuario:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default LoginForm;

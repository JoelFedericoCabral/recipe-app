import React, { useState } from 'react';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para confirmar la contraseña

  const handleRegister = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Verificar si el nombre de usuario ya existe en localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === username)) {
      alert('El nombre de usuario ya existe.');
      return;
    }

    // Guardar el nuevo usuario en localStorage
    const newUser = { username, password };
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    // Limpiar los campos después de registrar al usuario
    setUsername('');
    setPassword('');
    setConfirmPassword(''); // Limpiar la confirmación de contraseña también
    alert('Usuario registrado exitosamente.');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg tgransparent">
      <form 
        onSubmit={handleRegister} 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Registrarse</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Nombre de Usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirmar Contraseña:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

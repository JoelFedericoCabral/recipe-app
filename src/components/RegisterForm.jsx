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
    <form onSubmit={handleRegister}>
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
      <div>
        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;
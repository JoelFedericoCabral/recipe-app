import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import RegisterForm from './components/RegisterForm'; 
import { RecipeContext } from './context/RecipeContext'; 

function App() {
  const { recipes } = useContext(RecipeContext); 
  const [query, setQuery] = useState(''); 
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para manejar el usuario logueado

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Filtrar las recetas según la consulta de búsqueda
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Gestor de Recetas</h1>
      {!loggedInUser ? (
        <>
          <h2>Registro de Usuarios</h2>
          <RegisterForm />
        </>
      ) : (
        <>
          <SearchBar query={query} setQuery={setQuery} />
          <h2>Agregar una receta</h2>
          <RecipeForm />
        </>
      )}
      <h2>Lista de Recetas</h2>
      <RecipeList recipes={filteredRecipes} loggedInUser={loggedInUser} />
    </div>
  );
}

export default App;

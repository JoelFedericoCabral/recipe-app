import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import { RecipeContext } from './context/RecipeContext'; 

function App() {
  const { recipes } = useContext(RecipeContext); 
  const [query, setQuery] = useState(''); 

  // Filtrar las recetas según la consulta de búsqueda
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  // Limpiar la barra de búsqueda cuando se actualizan las recetas
  useEffect(() => {
    setQuery(''); // Limpiar la barra de búsqueda
  }, [recipes]);


  return (
    <div className="container">
      <h1>Gestor de Recetas</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <h2>Agregar una receta</h2>
      <RecipeForm />
      <h2>Lista de Recetas</h2>
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default App;

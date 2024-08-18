import './App.css';
import React, { useState, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);

  // Cargar recetas desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  // Guardar recetas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (name) => {
    setRecipes(recipes.filter((recipe) => recipe.name !== name));
  };

  return (
    <div>
      <h1>Gestor de Recetas</h1>
      <RecipeForm addRecipe={addRecipe} />
      <RecipeList recipes={recipes} onDelete={deleteRecipe} />
    </div>
  );
}

export default App;

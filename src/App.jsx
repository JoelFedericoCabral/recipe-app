import './App.css';
import React, { useState, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.name === updatedRecipe.name ? updatedRecipe : recipe
      )
    );
    setRecipeToEdit(null);
  };

  const deleteRecipe = (name) => {
    setRecipes(recipes.filter((recipe) => recipe.name !== name));
  };

  const editRecipe = (recipe) => {
    setRecipeToEdit(recipe);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Gestor de Recetas</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <RecipeForm 
        addRecipe={addRecipe} 
        recipes={recipes} 
        recipeToEdit={recipeToEdit} 
        updateRecipe={updateRecipe} 
      />
      <h2>Lista de Recetas</h2>
      <RecipeList 
        recipes={filteredRecipes} 
        onDelete={deleteRecipe} 
        onEdit={editRecipe} 
      />
    </div>
  );
}

export default App;

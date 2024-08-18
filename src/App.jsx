import './App.css';
import React, { useState, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';

function App() {
  // Estado para almacenar las recetas
  const [recipes, setRecipes] = useState([]);

  // Estado para manejar la receta que está siendo editada
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  // Estado para manejar el texto de búsqueda
  const [query, setQuery] = useState('');

  // Cargar las recetas desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  // Guardar las recetas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Agregar una nueva receta
  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  // Actualizar una receta existente
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.name === updatedRecipe.name ? updatedRecipe : recipe
      )
    );
    setRecipeToEdit(null); // Limpiar el estado de edición después de actualizar
  };

  // Eliminar una receta
  const deleteRecipe = (name) => {
    setRecipes(recipes.filter((recipe) => recipe.name !== name));
  };

  // Seleccionar una receta para editar
  const editRecipe = (recipe) => {
    setRecipeToEdit(recipe);
  };

  // Filtrar las recetas según la consulta de búsqueda
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Gestor de Recetas</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <h2>Agregar una receta</h2>
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

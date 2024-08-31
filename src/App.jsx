import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import RecipeDetails from './components/RecipeDetails';
import { RecipeContext } from './context/RecipeContext';

function App() {
  const { recipes } = useContext(RecipeContext);
  const [query, setQuery] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  // Filtrar las recetas según la consulta de búsqueda
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Router>
      <div>
        <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <div className="container">
          <h1>Gestor de Recetas</h1>
          <Routes>
            <Route
              path="/register"
              element={!loggedInUser ? <RegisterForm /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!loggedInUser ? <LoginForm setLoggedInUser={setLoggedInUser} /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={
                loggedInUser ? (
                  <>
                    <SearchBar query={query} setQuery={setQuery} />
                    <h2>Agregar una receta</h2>
                    <RecipeForm loggedInUser={loggedInUser} />
                    <h2>Lista de Recetas</h2>
                    <RecipeList recipes={filteredRecipes} />
                  </>
                ) : (
                  <>
                    <h2>Lista de Recetas</h2>
                    <RecipeList recipes={filteredRecipes} />
                    <Navigate to="/login" />
                  </>
                )
              }
            />
            <Route
              path="/recipes/:name"
              element={<RecipeDetails loggedInUser={loggedInUser} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
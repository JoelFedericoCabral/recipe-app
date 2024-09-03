import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import MyRecipes from "./components/MyRecipes";
import EditRecipe from "./components/EditRecipe";
import { RecipeContext } from "./context/RecipeContext";

function App() {
  // Obtener las recetas desde el contexto
  const { recipes } = useContext(RecipeContext);

  // Estado para manejar la consulta de búsqueda
  const [query, setQuery] = useState("");

  // Estado para manejar el usuario que está logueado
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Efecto para cargar el usuario logueado desde sessionStorage al montar el componente
  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  // Filtra las recetas según la consulta de búsqueda
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <div className="container">
          <Routes>
            {/* Rutas para el registro y login */}
            <Route
              path="/register"
              element={!loggedInUser ? <RegisterForm /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={
                !loggedInUser ? (
                  <LoginForm setLoggedInUser={setLoggedInUser} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* Ruta para la página principal */}
            <Route
              path="/"
              element={
                loggedInUser ? (
                  <>
                    <SearchBar query={query} setQuery={setQuery} />
                    <h2 className="text-2xl font-bold mt-4">
                      Agregar una receta
                    </h2>
                    <RecipeForm loggedInUser={loggedInUser} />
                    <h2 className="text-2xl font-bold mt-4">
                      Lista de Recetas
                    </h2>
                    <RecipeList
                      recipes={filteredRecipes}
                      loggedInUser={loggedInUser}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mt-4">
                      Lista de Recetas
                    </h2>
                    <RecipeList recipes={filteredRecipes} />
                    <Navigate to="/login" />
                  </>
                )
              }
            />
            {/* Rutas para los detalles de la receta, edición, favoritos y recetas del usuario */}
            <Route
              path="/recipes/:id"
              element={<RecipeDetails loggedInUser={loggedInUser} />}
            />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route
              path="/favorites"
              element={<Favorites loggedInUser={loggedInUser} />}
            />
            <Route
              path="/my-recipes"
              element={<MyRecipes loggedInUser={loggedInUser} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

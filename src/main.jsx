import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RecipeProvider } from './context/RecipeContext'; 

createRoot(document.getElementById('root')).render(
  <RecipeProvider> 
    <App />
  </RecipeProvider>
);

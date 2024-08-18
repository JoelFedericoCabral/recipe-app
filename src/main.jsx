import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log("Application is mounting...");

createRoot(document.getElementById('root')).render(
  
    <App />
  
);

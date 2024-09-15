import express from 'express'; // Usamos import en vez de require
import { v4 as uuidv4 } from 'uuid'; // Para generar un ID único para cada receta

const app = express(); // Crear la app de Express
const port = 3001; // Definir el puerto donde correrá la API

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Array para almacenar las recetas en memoria
const recetas = [];

// Ruta base para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('API de Recetas Funcionando');
});

// Endpoint POST para agregar una nueva receta
app.post('/recetas', (req, res) => {
  const { nombre, ingredientes, instrucciones } = req.body;

  // Verificamos que los campos requeridos estén presentes
  if (!nombre || !ingredientes || !instrucciones) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Creamos una nueva receta con un ID único
  const nuevaReceta = {
    id: uuidv4(),
    nombre,
    ingredientes,
    instrucciones,
  };

  // Agregamos la nueva receta al array
  recetas.push(nuevaReceta);

  // Enviamos la receta recién creada como respuesta
  res.status(201).json(nuevaReceta);
});

// Endpoint GET para obtener todas las recetas
app.get('/recetas', (req, res) => {
  res.json(recetas); // Devolver todas las recetas en el array
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${port}`);
});

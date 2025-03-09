import express from 'express';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del negocio de helados!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

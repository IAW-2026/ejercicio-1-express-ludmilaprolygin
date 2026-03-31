const express = require('express');
const app = express();

// Archivos estáticos
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 
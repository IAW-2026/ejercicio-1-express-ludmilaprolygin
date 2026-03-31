const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/acerca', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'acerca.html'));
});

app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

app.get('/estilos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'estilos.html'));
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

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
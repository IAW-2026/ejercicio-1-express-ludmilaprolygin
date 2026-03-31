const express = require('express');
const path = require('path');
const app = express();

const escapeHtml = (value) => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

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

app.post('/contacto', (req, res) => {
  const nombre = escapeHtml(req.body.nombre || 'Anónimo');
  const mensaje = escapeHtml(req.body.mensaje || 'Sin mensaje');

  res.send(`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensaje recibido</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <main>
      <nav>
        <a href="/">Inicio</a>
        <a href="/acerca">Acerca</a>
        <a href="/contacto">Contacto</a>
        <a href="/estilos">Estilos</a>
      </nav>
      <h1>Gracias por tu mensaje</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    </main>
    <script src="/script.js"></script>
  </body>
</html>`);
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
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let visitas = 0;
let mensajes = [];
const productos = [
  { id: 1, nombre: 'Camisa', precio: 2500 },
  { id: 2, nombre: 'Pantalón', precio: 3200 },
  { id: 3, nombre: 'Gorra', precio: 1200 }
];

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
  visitas += 1;
  const template = fs.readFileSync(path.join(__dirname, 'public', 'visitas.html'), 'utf8');
  const html = template.replace(/{{visitas}}/g, String(visitas));
  res.send(html);
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

  const template = fs.readFileSync(path.join(__dirname, 'public', 'contacto-respuesta.html'), 'utf8');
  const html = template
    .replace(/{{nombre}}/g, nombre)
    .replace(/{{mensaje}}/g, mensaje);

  res.send(html);
});

app.get('/encuesta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'encuesta.html'));
});

app.post('/encuesta', (req, res) => {
  const opcion = escapeHtml(req.body.opcion || 'No seleccionada');
  const template = fs.readFileSync(path.join(__dirname, 'public', 'encuesta-respuesta.html'), 'utf8');
  const html = template.replace(/{{opcion}}/g, opcion);
  res.send(html);
});

app.get('/mensajes', (req, res) => {
  const template = fs.readFileSync(path.join(__dirname, 'public', 'mensajes.html'), 'utf8');
  const lista = mensajes.length
    ? mensajes.map((msg) => `<li>${msg}</li>`).join('')
    : '<li>No hay mensajes aún.</li>';
  const html = template.replace(/{{mensajes}}/g, lista);
  res.send(html);
});

app.post('/mensajes', (req, res) => {
  const mensaje = escapeHtml(req.body.mensaje || 'Sin mensaje');
  mensajes.push(mensaje);
  const template = fs.readFileSync(path.join(__dirname, 'public', 'mensajes.html'), 'utf8');
  const lista = mensajes.map((msg) => `<li>${msg}</li>`).join('');
  const html = template.replace(/{{mensajes}}/g, lista);
  res.send(html);
});

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/api/productos', (req, res) => {
  res.json(productos);
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
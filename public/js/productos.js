const productosList = document.getElementById('productos-list');

fetch('/api/productos')
  .then((res) => res.json())
  .then((productos) => {
    if (!Array.isArray(productos) || productos.length === 0) {
      productosList.innerHTML = '<p>No hay productos disponibles.</p>';
      return;
    }

    const html = productos
      .map((producto) => `
        <article class="producto-card">
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio}</p>
        </article>
      `)
      .join('');

    productosList.innerHTML = `<div class="productos-grid">${html}</div>`;
  })
  .catch((error) => {
    console.error(error);
    productosList.innerHTML = '<p>No se pudo cargar la lista de productos.</p>';
  });

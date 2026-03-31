const form = document.getElementById('contacto-fetch-form');
const resultado = document.getElementById('resultado');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    resultado.textContent = 'Enviando...';

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, mensaje })
      });

      if (!response.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await response.json();
      resultado.innerHTML = `<p>${data.mensaje}</p>`;
      form.reset();
    } catch (error) {
      console.error(error);
      resultado.textContent = 'Ocurrió un error al enviar el mensaje.';
    }
  });
}

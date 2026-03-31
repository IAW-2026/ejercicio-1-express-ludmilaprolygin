const saludoForm = document.getElementById('saludo-form');
const saludoResultado = document.getElementById('saludo-resultado');

if (saludoForm) {
  saludoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    saludoResultado.textContent = 'Enviando...';

    try {
      const response = await fetch('/api/saludo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
      });

      if (!response.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await response.json();
      saludoResultado.textContent = data.saludo || 'No se recibió saludo';
      saludoForm.reset();
    } catch (error) {
      console.error(error);
      saludoResultado.textContent = 'No se pudo enviar el formulario.';
    }
  });
}

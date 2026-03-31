const buttonFrase = document.getElementById('btn-frase');
const fraseTexto = document.getElementById('frase-texto');

if (buttonFrase) {
  buttonFrase.addEventListener('click', async () => {
    fraseTexto.textContent = 'Cargando frase...';

    try {
      const response = await fetch('/frase');
      if (!response.ok) {
        throw new Error('Error al obtener la frase');
      }

      const data = await response.json();
      fraseTexto.textContent = data.frase || 'No se obtuvo ninguna frase';
    } catch (error) {
      console.error(error);
      fraseTexto.textContent = 'No se pudo cargar la frase.';
    }
  });
}

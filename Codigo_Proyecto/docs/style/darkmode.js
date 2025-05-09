// Detectar la preferencia del sistema y cambiar el modo automáticamente
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function updateMode(event) {
    // Si el sistema está en modo oscuro, puedes hacer algo (en este caso no es necesario, porque el CSS lo maneja)
    if (event.matches) {
        console.log("Modo oscuro activado");
    } else {
        console.log("Modo claro activado");
    }
}

// Inicializa el modo en función de la preferencia del sistema
updateMode(mediaQuery);

// Escucha los cambios en la preferencia del sistema
mediaQuery.addEventListener('change', updateMode);

import GestorArmas from './Js/armas.js';

// Función para inicializar la aplicación
function inicializarValoapi() {
    const gestor = new GestorArmas();
    gestor.ejemploArmas(); // Llama a la función ejemploArmas para mostrar las armas
}


// Llama a la función para inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarValoapi);

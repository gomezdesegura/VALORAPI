// armas.js
import Armas from './llamadasApi.js';

class GestorArmas {
    constructor() {
        this.armaSeleccionada = null;
        this.vida = 150;
    }

    async ejemploArmas() {
        try {
            const armas = await Armas.iniciar();
            console.log(armas)
            const categorias = this.obtenerCategorias(armas);
            this.mostrarBotones(categorias);
            this.agregarEventos(armas);
        } catch (error) {
            console.error('Error al obtener las armas:', error);
        }
    }

    obtenerCategorias(armas) {
        const categorias = new Set(armas.map(arma => arma.categoria));
        return [...categorias];
    }

    mostrarBotones(categorias) {
        const botonContainer = document.getElementById('botones-categorias');
        const armasContainer = document.getElementById('armas-container');
        armasContainer.style.display = 'none';
        categorias.forEach(categoria => {
            const boton = document.createElement('button');
            boton.textContent = categoria;
            boton.addEventListener('click', () => {
                this.mostrarArmasPorCategoria(categoria);
            });
            botonContainer.appendChild(boton);
        });
    }

    mostrarArmasPorCategoria(categoria) {
        const armas = document.querySelectorAll('.arma');
        const armasContainer = document.getElementById('armas-container');
        const isVisible = armasContainer.style.display === 'block';    
        const isDifferentCategory = armasContainer.dataset.categoria !== categoria;
    
        if (isVisible && !isDifferentCategory) {
            armas.forEach(arma => {
                arma.style.display = 'none';
            });
            armasContainer.style.display = 'none';
        } else {
            armas.forEach(arma => {
                if (arma.dataset.categoria === categoria) {
                    arma.style.display = 'block';
                } else {
                    arma.style.display = 'none';
                }
            });
            armasContainer.style.display = 'block';
            armasContainer.dataset.categoria = categoria;
        }
    }

    aplicarDanioParteCuerpo(parteCuerpo) {
        console.log("Se ha llamado a aplicarDanioParteCuerpo con la parte del cuerpo:", parteCuerpo);
        if (this.armaSeleccionada) {
            const danioArmaSeleccionada = this.armaSeleccionada.danio;
    
            // Encontrar el rango de daño correspondiente al parte del cuerpo
            let danioParteCuerpo = 0;
            for (const rango in danioArmaSeleccionada) {
                const partesDeCuerpoEnRango = danioArmaSeleccionada[rango];
                if (parteCuerpo in partesDeCuerpoEnRango) {
                    danioParteCuerpo = partesDeCuerpoEnRango[parteCuerpo];
                    console.log(danioParteCuerpo)
                    break;
                }
            }    
            console.log("Tipo de vida antes de la resta:", typeof this.vida);
            console.log("Valor de vida antes de la resta:", this.vida);
            console.log("Tipo de daño de la parte del cuerpo:", typeof danioParteCuerpo);
            console.log("Valor de daño de la parte del cuerpo:", danioParteCuerpo);
    
            if (!isNaN(danioParteCuerpo) && !isNaN(this.vida)) {
                this.vida -= danioParteCuerpo;
                this.actualizarVidaEnHTML(this.vida); // Actualiza la vida en el HTML
                console.log(`Puntos de vida restantes: ${this.vida}`);
            } else {
                console.error("El valor de daño o vida no es numérico.");
            }
        } else {
            console.error("No hay ningún arma seleccionada.");
        }
    }

    agregarEventos(armas) {
        const armasContainer = document.getElementById('armas-container');
        armas.forEach(arma => {
            const armaElemento = document.createElement('div');
            armaElemento.classList.add('arma');
    
            const nombreArma = document.createElement('p');
            nombreArma.textContent = arma.nombre;
            armaElemento.appendChild(nombreArma);
    
            const checkboxSeleccionar = document.createElement('input');
            checkboxSeleccionar.type = 'checkbox';
            checkboxSeleccionar.classList.add('checkbox-seleccionar');
            checkboxSeleccionar.dataset.nombre = arma.nombre; // Agregar un atributo de dataset con el nombre del arma
            checkboxSeleccionar.addEventListener('change', () => {
                const checkboxes = document.querySelectorAll('.checkbox-seleccionar'); // Obtener todas las checkboxes
                checkboxes.forEach(checkbox => {
                    if (checkbox !== checkboxSeleccionar && checkbox.checked) {
                        // Si la checkbox actual no es la misma que la seleccionada, y está marcada, desmárcala
                        checkbox.checked = false;
                        const armaSeleccionada = armas.find(arma => arma.nombre === checkbox.dataset.nombre);
                        if (armaSeleccionada) {
                            this.deseleccionarArma(armaSeleccionada);
                        }
                    }
                });

                if (checkboxSeleccionar.checked) {
                    this.seleccionarArma(arma);
                } else {
                    this.deseleccionarArma(arma);
                }
            });
            armaElemento.appendChild(checkboxSeleccionar);
    
            armaElemento.dataset.categoria = arma.categoria; 
            armasContainer.appendChild(armaElemento);
        });

        // Agregar eventos de clic a las imágenes de las partes del cuerpo
        const imagenesPartesCuerpo = document.querySelectorAll('.parte-cuerpo');
        imagenesPartesCuerpo.forEach(imagen => {
            imagen.addEventListener('click', () => {
                const parteCuerpo = imagen.dataset.parte;
                this.aplicarDanioParteCuerpo(parteCuerpo); // Cambio el nombre de la función
            });
        });
    }

    seleccionarArma(arma) {
        if (this.armaSeleccionada && this.armaSeleccionada !== arma) {
            // Si hay un arma seleccionada y no es la misma que la nueva, deselecciónala
            const checkboxAnterior = document.querySelector(`.arma[data-nombre="${this.armaSeleccionada.nombre}"] .checkbox-seleccionar`);
            checkboxAnterior.checked = false;
        }
        this.armaSeleccionada = arma;
        console.log(`Arma seleccionada: ${arma.nombre}`);
    }

    deseleccionarArma(arma) {
        console.log(`Arma deseleccionada: ${arma.nombre}`);
        // Si lo deseas, aquí podrías realizar acciones adicionales al deseleccionar un arma.
    }

    actualizarVidaEnHTML(vida) {
        document.getElementById('vida').textContent = vida;
    }
}

export default GestorArmas;

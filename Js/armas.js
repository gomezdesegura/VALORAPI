// armas.js
import Armas from './llamadasApi.js';

class GestorArmas {
    constructor() {
        this.armaSeleccionada = null;
        this.vida = 150;
    }
/* Esta funcion unicamente llama a las funciones mostrarBotones, agregarEventos y actualizarVidaEnHTML.
 Llamamos a esta funcion desde index.js para inicializar la pagina */
    async ejemploArmas() {
        try {
            //Llamo al armas.iniciar para que me saque los datos de la API y me los devulva como se define en el fichero llamadasApi.js
            const armas = await Armas.iniciar();
            console.log(armas)
            //Necesito crear la constante categorias por que en el otro fichero tengo todas las caregorias respecto a las armas, con la funcion obtenerCategorias, almaceno las categorias de 1 en 1.
            const categorias = this.obtenerCategorias(armas);
            this.mostrarBotones(categorias);
            this.agregarEventos(armas);
            this.actualizarVidaEnHTML(this.vida);
        } catch (error) {
            console.error('Error al obtener las armas:', error);
        }
    }

    obtenerCategorias(armas) {
/*      Un Set en JavaScript es una colección de valores únicos,
        por lo que garantiza que solo haya una instancia de cada categoría en el conjunto,
        esto lo uso por que se recorre el array de armas y necesito solo me devuelva una vez la categoria y luego hago botones */
        const categorias = new Set(armas.map(arma => arma.categoria));
        return [...categorias]; //Creo un nuevo array sin las categorias repetidas.
    }

    mostrarBotones(categorias) {
        //creo la constante botonContainer y la asocio al id de armas.html botones-categorias
        const botonContainer = document.getElementById('botones-categorias');
/*         Utilizo el metodo foreach para que por cada uno de los elementos del nuevo array de categorias (sin categorias repetidas),
        me devuelva un boton, el nombre del boton sera el nombre de la categoria y por ultimo asocio el boton al id botones-categorias */
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
        //Esta funcion de inicializa al hacer click en alguna categoria, lo que conlleva a que se realize un evento y la clase armas este definida.
        //Asocio todos los elementos de la clase armas a constante armas
        const armas = document.querySelectorAll('.arma');
        //creo la constante armasContainer y la asocio al id de armas.html armas-container
        const armasContainer = document.getElementById('armas-container');
        //Creo una constante que identifica el display de las armas es block, lo que significa que la variable devolvera un true si el container de armas ya es visible
        const isVisible = armasContainer.style.display === 'block';   
        //Mas adelante cuando se hace click en una categoria se almacena el nombre de esta categoria en armasContainer.dataset.categoria, aqui se verifica si es la misma o no.
        const isDifferentCategory = armasContainer.dataset.categoria !== categoria;
        // Si hay alguna categoria visible y NO es diferente, esconde la categoria (En resumen, si es la misma categoria la oculta)
        if (isVisible && !isDifferentCategory) {
            armas.forEach(arma => {
                arma.style.display = 'none';
            });
            armasContainer.style.display = 'none';
        //Si la condición anterior no se cumple, significa que o bien el contenedor de armas no estaba visible o bien se ha seleccionado una categoría diferente
        //Mas adelante en el fichero a cada arma se le asocia una categoria a nivel de DOM/HTML, entonces se verica que armas coinciden con la categoria seleccionada y las despliega.
        // Y si no son de la categoria seleccionada, no las muestra
        } else {
            armas.forEach(arma => {
                if (arma.dataset.categoria === categoria) {
                    arma.style.display = 'block';
                } else {
                    arma.style.display = 'none';
                }
            });
            //Mostramos el container de armas y actualizamos el dataset
            armasContainer.style.display = 'block';
            armasContainer.dataset.categoria = categoria;
        }
    }

    aplicarDanioParteCuerpo(parteCuerpo) { // Esta funcion es llamada cuando tienes un arma seleccionada y ademas disparas en alguna parte del cuerpo
        console.log("Se ha llamado a aplicarDanioParteCuerpo con la parte del cuerpo:", parteCuerpo);
        //Se verifica si hay algun arma seleccionada
        if (this.armaSeleccionada) {
            //Aquí se obtiene el objeto que contiene los rangos de daño del arma seleccionada que se importa del fichero llamadasApi.js
            const danioArmaSeleccionada = this.armaSeleccionada.danio;
            //Se crea una variable con valor 0, para poder cambiarle el valor del daño en funcion de donde se dispara.
            let danioParteCuerpo = 0;
            //Los daños de las armas van en funcion del rango de distancia, aunque no hay posibilidad de elegir el rango
            //tenemos que acceder al objeto del primer rango para sacar el daño.
            for (const rango in danioArmaSeleccionada) {
                //El todos los rangos van en funcion de donde apuntas por lo que tenemos que sacar el dato cabeza, cuerpo y piernas
                const partesDeCuerpoEnRango = danioArmaSeleccionada[rango];
                //Se verifica si la parte del cuerpo en la que se ha hecho click coincide con alguna de las que tenemos datos
                if (parteCuerpo in partesDeCuerpoEnRango) {
                    //iguala danioParteCuerpo al daño correspondiente de la zona que se hace click
                    danioParteCuerpo = partesDeCuerpoEnRango[parteCuerpo];
                    break;
                }
            } //Se resta el valor del daño por parte del cuerpo a la salud total, el if es por que tube problemas con los tipos de datos y tube que hacer comprobaciones
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
        //creo la constante armasContainer y la asocio al id de armas.html armas-container
        const armasContainer = document.getElementById('armas-container');
        //Con el metodo foreach por cada arma creo un elemento div, le asocio la clase arma
        armas.forEach(arma => {
            const armaElemento = document.createElement('div');
            armaElemento.classList.add('arma');            
            //Tambien creo un elemento P que contendra el nombre de cada arma
            const nombreArma = document.createElement('p');
            nombreArma.textContent = arma.nombre;
            armaElemento.appendChild(nombreArma);
            //Por cada arma se crea un elemento input, que diremos que es de tipo checkbox para poder seleccionar cada  
            const checkboxSeleccionar = document.createElement('input');
            checkboxSeleccionar.type = 'checkbox';
            checkboxSeleccionar.classList.add('checkbox-seleccionar');
            checkboxSeleccionar.dataset.nombre = arma.nombre; // Agregar un atributo de dataset con el nombre del arma
            //Una vez definidas todas las checkboxes de las armas, le metemos el evento para que cuando ese seleccionada y le vuelvas a dar se deseleccione.
            //Tambien cuando hay una seleccionada y seleccionas otra diferente, la primera se deselecciona y se selecciona la segunda.
            checkboxSeleccionar.addEventListener('change', () => {
                const checkboxes = document.querySelectorAll('.checkbox-seleccionar'); // Obtener todas las checkboxes
                //Se recorre todas las checkbox para comprobar si la seleccionada es diferente a la actual y si hay alguna marcada, la desmarca
                checkboxes.forEach(checkbox => {
                    if (checkbox !== checkboxSeleccionar && checkbox.checked) {
                        checkbox.checked = false;
                        //Se busca el arma seleccionada y se deselecciona
                        const armaSeleccionada = armas.find(arma => arma.nombre === checkbox.dataset.nombre);
                        if (armaSeleccionada) {
                            this.deseleccionarArma(armaSeleccionada);
                        }
                    }
                });
                //Si aun no hay ningun arma marcada y haces click en la checkbox, llama a seleccionar arma
                if (checkboxSeleccionar.checked) {
                    this.seleccionarArma(arma);
                //Esta funcion simplemente es un comprobante para la consola que necesite en un punto, no es funcional como tal. Nacio como algo funcional y luego no me hacia falta.
                } else {
                    this.deseleccionarArma(arma);
                }
            });
            //Se agregan las checkbox como elemento para cada arma
            armaElemento.appendChild(checkboxSeleccionar);    
            //Se agrega la categoria al dataset de cada arma
            armaElemento.dataset.categoria = arma.categoria; 
            //metemos cada arma con su checkbox dentro del container de armas
            armasContainer.appendChild(armaElemento);
        });

        // Agregar eventos de clic a las imágenes de las partes del cuerpo
        //Se crea la constante imagenesPartesCuerpo y se asociA a los elementos que tengan la clase parte-cuerpo
        const imagenesPartesCuerpo = document.querySelectorAll('.parte-cuerpo');
        //Por cada imagen se añade un listener para capturar la parte del cuerpo donde se hace click
        imagenesPartesCuerpo.forEach(imagen => {
            imagen.addEventListener('click', () => {
                const parteCuerpo = imagen.dataset.parte;
                //Con la parte del cuerpo que se hace click se aplica el daño
                this.aplicarDanioParteCuerpo(parteCuerpo); 
            });
        });
    }

    seleccionarArma(arma) {//Aqui se define como deseleccionar el arma, en el paso anterior de agregar eventos es donde se hace la llamada
        if (this.armaSeleccionada && this.armaSeleccionada !== arma) {
            //sto busca un elemento que tenga la clase arma y además tenga un atributo data-nombre con el valor igual al nombre del arma seleccionada anteriormente, y dentro de este elemento busca un elemento con la clase checkbox-seleccionar
            const checkboxAnterior = document.querySelector(`.arma[data-nombre="${this.armaSeleccionada.nombre}"] .checkbox-seleccionar`);
            checkboxAnterior.checked = false;
        }
        this.armaSeleccionada = arma/*  */;
        console.log(`Arma seleccionada: ${arma.nombre}`);
    }

    deseleccionarArma(arma) {//Esto nacio como algo funcional y al final no hacia falta, solo es un console.log que no he querido tocar.
        console.log(`Arma deseleccionada: ${arma.nombre}`);
    }

    actualizarVidaEnHTML(vida) {//Esta funcion solo es para el texto que aparece al hacer click en una parte del cuerpo. Se llama a esta funcion desde aplicarDanioParteCuerpo
        const vidaElemento = document.getElementById('vida');
        let mensaje = "";
    
        // Verificar si se ha seleccionado un arma
        if (!this.armaSeleccionada) {
            mensaje = "¡Selecciona un arma y haz click en la parte del cuerpo donde quieras simular el danio!";
        } else {
            // Actualizar el color de fondo de las imágenes de las partes del cuerpo según la vida restante
            const imagenesPartesCuerpo = document.querySelectorAll('.parte-cuerpo');
            imagenesPartesCuerpo.forEach(imagen => {
                if (vida >= 100) {
                    imagen.style.backgroundColor = 'green'; // Verde si la vida es 100 o más
                    mensaje = "¡Vida alta! ¡Sigue adelante!";
                } else if (vida >= 50) {
                    imagen.style.backgroundColor = 'yellow'; // Amarillo si la vida es entre 50 y 99
                    mensaje = "Seguro que puedes hacerlo mejor";
                } else if (vida >= 0){
                    imagen.style.backgroundColor = 'red'; // Rojo si la vida es menor que 50
                    mensaje = "¡Barre el suelo con su cara!";
                }else {
                    imagen.style.backgroundColor = 'black'
                    mensaje = "¡Bien hecho soldado!";
                }            
            });
        }
        
        // Mostrar el mensaje en el HTML
        vidaElemento.textContent = `Puntos de vida restantes: ${vida}. ${mensaje}`;
    }
}
export default GestorArmas;

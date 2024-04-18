class Agents {
    constructor() {
        this.url = "https://valorant-api.com/v1/agents";
    }

    async obtenerDatosAgents() {// lamando
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data.data; // Devuelve solo la propiedad 'data' de la respuesta'
            
        } catch (error) {
            console.error('Error al obtener los datos de los agentes:', error);
            throw error;
        }
    }

    async obtenerTiposDeAgents() {//obetener los datos
        try {
            const agents = await this.obtenerDatosAgents();
            const tiposDeAgents = agents.map(agente => {
                return {
                    picture: agente.displayIcon,
                    name: agente.displayName,
                    description: agente.description,
                };
            });
            tiposDeAgents.splice(10,1);
            return tiposDeAgents;
            
        } catch (error) {
            console.error('Error al obtener los tipos de agentes:', error);
            throw error;
        }
    }
};


const prueba = new Agents();
console.log(prueba)

class AgentsPresent {
    static lastId = 0;
    constructor(picture, name, description) {
        this.picture = picture;
        this.name = name;
        this.description = description;
        this.id = ++AgentsPresent.lastId;
        this.section = null;
        
    }


    getHtml() {
        const section = document.createElement("section");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const description = document.createElement("p")
        const div = document.createElement("div")


        section.setAttribute("id", "section" + this.id);
        section.classList.add("AgentsPresent");
        description.classList.add("Description");
        

        /* 
            const elemento = document.getElementById('miElemento');
            elemento.textContent = 'Nuevo contenido de texto';
            elemento.setAttribute('class', 'nuevaClase'); */

        img.setAttribute("src", this.picture);

        h2.innerText = this.name;
        description.innerText = this.description;


        section.appendChild(img);
        section.appendChild(h2);
        section.appendChild(description);
        section.appendChild(div);
       
       

        this.section = section;
        return section;
    };
};
function createAgentes(picture, name, description) {
    const agentesPresent = new AgentsPresent(picture, name, description);
    const html = agentesPresent.getHtml();
    console.log(agentesPresent)
    document.getElementById("galery").appendChild(html);  
     
    
};


const agents = new Agents();
agents.obtenerTiposDeAgents().then(tipos => {
    console.log(tipos)
    for (let i = 0; i < tipos.length; i++) {
        createAgentes(tipos[i].picture, tipos[i].name, tipos[i].description);
    }
});



  
  const galleryContainer= document.getElementById("galery-container");
  
  data.forEach(item => {
    // Crear un botón por cada elemento en los datos
    const button = document.createElement("button");
    button.textContent = item.name; // Asignar el nombre del botón
    button.classList.add("galery-button"); // Añadir clase para estilos comunes
    button.addEventListener("click", () => {
      // Lógica para lo que sucede cuando se hace clic en el botón
      console.log("Haz clic en el botón:", item.name);
      // Aquí podrías abrir una modal con la imagen, por ejemplo
    });
  
    // Añadir el botón al contenedor de la galería
    galleryContainer.appendChild(button);
  });






/*document.getElementById("prueba").appendChild(agentesPresent.h2)
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
}*/
/*const agentes = new Agents();
const tipos = agentes.obtenerTiposDeAgents();

for (let i = 0; i < tipos.length; i++) {
    createProduct(tipos[i].picture, tipos[i].name, tipos[i].description)
};
*/
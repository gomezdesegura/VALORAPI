
var data = [];
async function geteventos() {
    const url = new URL("https://valorant-api.com/v1/events");
    //url.searchParams.append("language", "es_ES");
    try {
        const response = await fetch(url.toString());
        const res = await response.json();
        data = res.data;
        //console.log(data);
       // console.log(data.results);
        //createeventosLi(data.data);
       // createeventoHtml(data.data);
       
    }
    catch (error) {
        console.error(error);
    }
}

/* async function getevento(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        createeventoHtml(data);
    }
    catch (error) {
        console.error(error)
    }
} */

/* function createeventosLi(eventos) {
    const eventosList = document.getElementById("eventos");

    eventosList.innerHTML = "";
   
    eventos.forEach(evento => {
        const li = document.createElement("li");
        li.innerText = eventos.shortDisplayName;
        li.addEventListener("click",()=>{
            geteventos(eventos.assetPath)
        })
        eventosList.appendChild(li);
    });
} */

function muestraeventos(filtro){
    //const eventos = geteventos();
    console.log(data);

    const eventoDiv = document.getElementById("eventos");
    eventoDiv.innerHTML="";

    let ListaEventos = document.createElement("ul");
    
    ListaEventos.appendChild(document.createElement("br"));

    for(const evento of data) {
        //console.log(evento.shortDisplayName.toString());
        if (evento.shortDisplayName.toString().toLowerCase().includes(filtro.toLowerCase()) || evento.displayName.toString().toLowerCase().includes(filtro.toLowerCase())) {
            
            let title = document.createElement("h2");
        title.innerText="Nombre del evento : " + evento.shortDisplayName.toString().toUpperCase();
        ListaEventos.appendChild(title);

        title = document.createElement("h3");
        title.innerText="Fecha de Inicio del evento"
        ListaEventos.appendChild(title);

        let li = document.createElement("li");
        li.innerText = evento.startTime.replace("T"," , ");
        li.innerText = li.innerText.replace("Z","");
        ListaEventos.appendChild(li);

        title = document.createElement("h3");
        title.innerText="Fecha de Fin del evento"
        ListaEventos.appendChild(title);



        li = document.createElement("li");
        li.innerText = evento.endTime.replace("T"," , ");
        li.innerText = li.innerText.replace("Z","");
        ListaEventos.appendChild(li);


        }         
        
/*         li.addEventListener("click",()=>{
            geteventos(eventos.assetPath)
        }) */
        
       
    };

    eventoDiv.appendChild(ListaEventos);


/*     for(const type of evento.types){
        const typeLi = document.createElement("li");
        typeLi.innerText = type.shortDisplayName;
        typesList.appendChild(typeLi);
    } */
/*     eventoDiv.appendChild(title)

    eventoDiv.appendChild(typesList) */

}

geteventos();
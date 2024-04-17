
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

       
    }
    catch (error) {
        console.error(error);
    }
}


function muestraeventos(filtro){
    //const eventos = geteventos();
    console.log(data);

    const eventoDiv = document.getElementById("eventos");
    eventoDiv.innerHTML="";

    let ListaEventos = document.createElement("ul");
    
    ListaEventos.appendChild(document.createElement("br"));

    let encontrado = false;

    
    for(var evento of data) {
        //console.log(evento.shortDisplayName.toString());
        if (evento.shortDisplayName.toString().toLowerCase().includes(filtro.toLowerCase()) || evento.displayName.toString().toLowerCase().includes(filtro.toLowerCase())) {

            encontrado = true;

        }
    }


    if(encontrado === true){
        let title = document.createElement("h2");

        document.getElementById('galeria').style.display = 'none';
        title.innerText="Evento encontrado!";
        ListaEventos.appendChild(title);
    }else{

    alert("NO SE HA ENCONTRADO NINGUN EVENTO");
        return;
    }

    
    for(var evento of data) {
     
        if (evento.shortDisplayName.toString().toLowerCase().includes(filtro.toLowerCase()) || evento.displayName.toString().toLowerCase().includes(filtro.toLowerCase())) {
            
        let title4 = document.createElement("h2");
       title4.classList.add('titulo');
        title4.innerText=evento.shortDisplayName.toString().toUpperCase() + " (" + evento.displayName.toString().toUpperCase() + ")";
        ListaEventos.appendChild(title4);
        
    
       /*  ListaEventos.appendChild(document.createElement("br")); */

        let title3 = document.createElement("h3");
        title3.innerText="Fecha de inicio del evento";
        title3.classList.add('titulo2');
        ListaEventos.appendChild(title3);

        /* ListaEventos.appendChild(document.createElement("br")); */

        let li = document.createElement("li");
        li.innerText = evento.startTime.replace("T"," Hora: ");
        li.innerText = li.innerText.replace("Z","");
        
        ListaEventos.appendChild(li);

        /* ListaEventos.appendChild(document.createElement("br")); */


        let title2 = document.createElement("h3");
        title2.innerText="Fecha de Fin del evento";
        title2.classList.add('titulo2');
        ListaEventos.appendChild(title2);
        

        li = document.createElement("li");
        li.innerText = evento.endTime.replace("T"," Hora: ");
        li.innerText = li.innerText.replace("Z","");
        ListaEventos.appendChild(li);

        ListaEventos.appendChild(document.createElement("br"));



///BOTON
        let boton = document.createElement('button');
    boton.style.class = "animated-button";
    boton.textContent = 'VOLVER';
    boton.id = 'volver';
    boton.style.backgroundColor = 'red';
    boton.style.color = 'white';
/*     boton.style.padding = '10px';
    boton.style.border = 'none';
    boton.style.cursor = 'pointer'; */

    boton.addEventListener('click', function() {
        window.location.href = 'eventos.html';
    });

        ListaEventos.appendChild(boton);

///BOTON





        let linea = document.createElement("h3");
        linea.innerText="____________________________________________________"
        ListaEventos.appendChild(linea);


        }         
                
       
    };



   

    eventoDiv.appendChild(ListaEventos);


}

geteventos();
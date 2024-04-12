async function geteventos() {
    const url = new URL("https://valorant-api.com/v1/events");
    url.searchParams.append("language", "es_ES");
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        console.log(data);
        createeventosLi(data.results)
    }
    catch (error) {
        console.error(error);
    }
}

async function getevento(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        createeventoHtml(data);
    }
    catch (error) {
        console.error(error)
    }
}

function createeventosLi(eventos) {
    const eventosList = document.getElementById("displayName");
    eventosList.innerHTML = "";
    eventos.forEach(evento => {
        const li = document.createElement("li");
        li.innerText = eventos.name;
        li.addEventListener("click",()=>{
            geteventos(eventos.url)
        })
        eventosList.appendChild(li);
    });
}

function createeventoHtml(evento){
    const eventoDiv = document.getElementById("displayName");
    eventoDiv.innerHTML="";
    const title = document.createElement("h2");
    title.innerText=evento.name;

    const typesList = document.createElement("ul");
    for(const type of evento.types){
        const typeLi = document.createElement("li");
        typeLi.innerText = type.type.name
        typesList.appendChild(typeLi);
    }
    eventoDiv.appendChild(title)

    eventoDiv.appendChild(typesList)

}

geteventos();
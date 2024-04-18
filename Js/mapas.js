class Mapas {
    constructor(){
        this.url = "https://valorant-api.com/v1/maps";
    }

    async obtenerDatosMapas() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data.data; // Returns only the 'data' property of the response
        } catch (error) {
            console.error('Error fetching map data:', error);
            throw error;
        }
    }

    async obtenerSplashImages() {
        try {
            const mapas = await this.obtenerDatosMapas();
            const splashImages = mapas.map(mapa => mapa.splash);
            splashImages.splice(14, 1);
            return splashImages;
        } catch (error) {
            console.error('Error fetching map splash images:', error);
            throw error;
        }
    }

    async obtenerTiposDeMapas() {
        try {
            const mapas = await this.obtenerDatosMapas();
            const tiposDeMapas = mapas.map(mapa => {
                return {
                    nombre: mapa.displayName,
                };
            });
            return tiposDeMapas;
        } catch (error) {
            console.error('Error fetching map types:', error);
            throw error;
        }
    }

    async obtenerDescripcion(){
        try{
            const mapas = await this.obtenerDatosMapas();
            const descripcion = mapas.map(mapa => {
                return{
                    nombre: mapa.displayName,
                    descripcion: mapa.narrativeDescription,
                };
            });
            return descripcion;
        } catch(error){
            console.error("error fetching map description:", error);
            throw error;
        }
    }

    // Function to update HTML content with fetched data
    async getHtml() {
        try {
            const splashImages = await this.obtenerSplashImages();
            const descripcion = await this.obtenerDescripcion();

            const splashImagesDiv = document.getElementById('splashImages');
            //splashImagesDiv.innerHTML = "<h2>Splash Images:</h2>";

            // Create and append <img> elements for each splash image
            splashImages.forEach((imageUrl, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.classList.add('splash-image'); // Optional: Add a CSS class for styling
                // Append image above the description
                splashImagesDiv.appendChild(imgElement);

                // Add map name and description above each image
                const mapName = document.createElement('h3');
                mapName.textContent = descripcion[index].nombre;
                splashImagesDiv.appendChild(mapName);

                const mapDescription = document.createElement('p');
                mapDescription.textContent = descripcion[index].descripcion;
                splashImagesDiv.appendChild(mapDescription);
            });

            const mapDescriptionDiv = document.getElementById('mapDescription');
            mapDescriptionDiv.innerHTML = "<h2>Map Description:</h2>";
        } catch(error) {
            console.error("Error updating HTML content:", error);
            throw error;
        }
    }
}


const mapas = new Mapas();

// Call getHtml() to update HTML content
mapas.getHtml();

// Additional code to fetch and log data if needed
mapas.obtenerSplashImages()
    .then(splashImages => {
        console.log("Splash Images:", splashImages);
    })
    .catch(error => {
        console.error('Error:', error);
    });

mapas.obtenerDescripcion()
    .then(descripcion => {
        console.log("Map Description:", descripcion);
    })
    .catch(error => {
        console.error("Error:", error);
    });

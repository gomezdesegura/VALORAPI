// llamadasApi.js
class Armas {
    constructor(){
        this.url = "https://valorant-api.com/v1/weapons";
    }

    async obtenerDatosArmas() {//Esta funcion obtiene los datos de la API, aqui solo se define y esta pensado para que se llame solo una vez.
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de las armas: Respuesta no válida');
            }
            const { data } = await response.json();//Data esta entre llaves por que la API tiene jerarquicamente un campo mas aparte de data, como solo me interesa data le indico que es lo unico que debe importar
            if (!data || data.length === 0) { // Verificar que los datos no estén vacíos
                throw new Error('Error al obtener los datos de las armas: Respuesta sin datos válidos');
            }
            
            return data;
        } catch (error) {
            console.error('Error al obtener los datos de las armas:', error.message);
            throw error;
        }
    }

    async obtenerInfoArmas() {//En esta funcion en base a lo recibido de la API discrimino solo lo que me interesa, es decir, nombres, categorias y daños
        try {
            const armas = await this.obtenerDatosArmas();
            return armas.map(arma => {
                const categoria = this.extraerCategoria(arma.category);
                const danioPorRango = this.extraerDanioPorRango(arma.weaponStats);
                return {
                    nombre: arma.displayName,
                    categoria: categoria,
                    danio: danioPorRango
                };
            });
        } catch (error) {
            console.error('Error al obtener la información de las armas:', error.message);
            throw error;
        }
    }

    extraerCategoria(categoria) {//Aqui ajusto el formato de la categoria para quedarme unicamente con el nombre, el formato de la API es category :: Heavy por ejemplo
        const indiceSeparador = categoria.lastIndexOf('::');
        if (indiceSeparador !== -1) {
            return categoria.substring(indiceSeparador + 2);
        }
        return "";
    }

    extraerDanioPorRango(weaponStats) {//Aqui se captura el daño por arma
        const danioPorRango = {};
        if (weaponStats && weaponStats.damageRanges) {
            weaponStats.damageRanges.forEach(rango => {
                danioPorRango[`${rango.rangeStartMeters}-${rango.rangeEndMeters}`] = {//Como la api tiene daño en funcion de distancia lo capturo de manera que sea sencillo de leer en la respuesta. Me indica de 0 a 30 metros el daño y asi sucesivamente.
                    cabeza: (rango.headDamage),
                    cuerpo: (rango.bodyDamage),
                    piernas: (rango.legDamage)
                };
            });
        }
        return danioPorRango;
    }
    
    static async iniciar() {//Se llama a la funcion que captura todos los datos que esta a su vez se llamara desde el fichero que contiene la funcionalidad
        try {
            const armas = new Armas();
            return await armas.obtenerInfoArmas();
        } catch (error) {
            console.error('Error al iniciar el proceso:', error);
            throw error;
        }
    }
    obtenerIconoVisualizacion(armas) {//Esto no se usa, me saca fotos por armas pero no llegue a incluirlo
        return armas.map(arma => {
            return {
                nombre: arma.displayName,
                iconoVisualizacion: arma.displayIcon
            };
        });
    }
}

const prueba = new Armas;
console.log(prueba)

export default Armas;

// llamadasApi.js
class Armas {
    constructor(){
        this.url = "https://valorant-api.com/v1/weapons";
    }

    async obtenerDatosArmas() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de las armas: Respuesta no válida');
            }
            const { data } = await response.json();
            if (!data || data.length === 0) { // Verificar que los datos no estén vacíos
                throw new Error('Error al obtener los datos de las armas: Respuesta sin datos válidos');
            }
            return data;
        } catch (error) {
            console.error('Error al obtener los datos de las armas:', error.message);
            throw error;
        }
    }

    async obtenerInfoArmas() {
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

    extraerCategoria(categoria) {
        const indiceSeparador = categoria.lastIndexOf('::');
        if (indiceSeparador !== -1) {
            return categoria.substring(indiceSeparador + 2);
        }
        return "";
    }

    extraerDanioPorRango(weaponStats) {
        const danioPorRango = {};
        if (weaponStats && weaponStats.damageRanges) {
            weaponStats.damageRanges.forEach(rango => {
                danioPorRango[`${rango.rangeStartMeters}-${rango.rangeEndMeters}`] = {
                    cabeza: parseFloat(rango.headDamage),
                    cuerpo: parseFloat(rango.bodyDamage),
                    piernas: parseFloat(rango.legDamage)
                };
            });
        }
        return danioPorRango;
    }
    
    static async iniciar() {
        try {
            const armas = new Armas();
            return await armas.obtenerInfoArmas();
        } catch (error) {
            console.error('Error al iniciar el proceso:', error);
            throw error;
        }
    }
}

export default Armas;

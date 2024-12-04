class Personaje {
    constructor(nombre, peso, altura, color) {
        this.nombre = nombre;
        this.peso = peso;
        this.altura = altura;
        this.color = color;
    }
}

class PersonajesPrincipales extends Personaje {
    constructor(nombre, peso, altura) {
        super(nombre, peso, altura);
    }
}

class PersonajesSecundarios extends Personaje {
    constructor(nombre, peso, altura) {
        super(nombre, peso, altura);
    }
}

class PersonajesSignificativos extends Personaje {
    constructor(nombre, peso, altura) {
        super(nombre, peso, altura);
    }
}

class Personajes {
    constructor(tipoPersonaje) {
        this.personajes = [];
        this.tipoPersonaje = tipoPersonaje;
    }

    agregarPersonajes(nombre, peso, altura) {
        
            this.personajes.push({ nombre, peso, altura });
       
    }

    mostrarPersonajes(tipoPersonaje) {
        this.tipoPersonaje = tipoPersonaje;
        let contenido = '';
        let color = this.tipoPersonaje;

        for (const personaje of this.personajes) {
            contenido += `
                <div class="card">
                    <div class="circulo-personajes ${color}"></div>
                    <p><strong>${personaje.nombre.nombre}.</strong><br>
                    Estatura: ${personaje.nombre.altura} cm. Peso: ${personaje.nombre.peso} kg</p>
                </div>
            `;
        }

        if (this.tipoPersonaje === 'populares') {
            $("#caracter-container-populares").append(contenido);
        } else if (this.tipoPersonaje === 'secundarios') {
            $("#caracter-container-secundarios").append(contenido);
        } else if (this.tipoPersonaje === 'significativos') {
            $("#caracter-container-significativos").append(contenido);
        }
    }

    limpiarPersonajes() {
        this.personajes = [];
    }
}


async function personajes(tipo, rango) {
    try {
        for (const id of rango) {
            const response = await fetch(`https://swapi.dev/api/people/${id}`);
            if (!response.ok) {
                console.error(`Error con ID ${id}`);
                continue;
            }

            const data = await response.json();
            let personaje;

            if (tipo === 'populares') {
                personaje = new PersonajesPrincipales(data.name, data.mass, data.height);
            } else if (tipo === 'secundarios') {
                personaje = new PersonajesSecundarios(data.name, data.mass, data.height);
            } else if (tipo === 'significativos') {
                personaje = new PersonajesSignificativos(data.name, data.mass, data.height);
            }

            miP.agregarPersonajes(personaje);
        }

        miP.mostrarPersonajes(tipo);
    } catch (error) {
        console.error("Error al obtener personajes:", error);
    }
}


const miP = new Personajes();
const rangoPersonajesPopulares = [1, 2, 3, 4, 5];
const rangoPersonajesSecundarios = [6, 7, 8, 9, 10];
const rangoPersonajesSignificativos = [12, 13, 14, 15, 16];

$(document).ready(function () {
    $("#personajes-populares").mouseenter(() => {
        personajes('populares', rangoPersonajesPopulares);
    });

    $("#personajes-populares").mouseout(() => {
        miP.limpiarPersonajes();
        $("#caracter-container-populares").children().remove();
    });

    $("#personajes-secundarios").mouseenter(() => {
        personajes('secundarios', rangoPersonajesSecundarios);
    });

    $("#personajes-secundarios").mouseout(() => {
        miP.limpiarPersonajes();
        $("#caracter-container-secundarios").children().remove();
    });

    $("#personajes-significativos").mouseenter(() => {
        personajes('significativos', rangoPersonajesSignificativos);
    });

    $("#personajes-significativos").mouseout(() => {
        miP.limpiarPersonajes();
        $("#caracter-container-significativos").children().remove();
    });
});

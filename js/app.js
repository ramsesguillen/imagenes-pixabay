/** 
 * * App consimiendo API de Pixabay
*/

/** 
 * * VARIABLES
*/
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

//
const registroPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;




/** 
 * * FUNCIONES
*/
const validarFormulario = ( e ) => {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if ( terminoBusqueda === '' ) {
        mostrarAlerta('Agrega un termino de busqueda');
        return;
    }

    buscarImagen( );

}


/** 
 * * Mostrar alerta
*/
const mostrarAlerta = ( mensaje ) => {

    const existeAlerta = document.querySelector('.alerta');

    if ( !existeAlerta ) {
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
    
        formulario.appendChild( alerta );
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

/** 
 * * limpiar el html
*/
const limpiarHTML = ( elemento ) => {
    while ( elemento.firstChild ) {
        elemento.removeChild( elemento.firstChild );
    }
}

/** 
 * * Se realiza la consulta a la API
*/
const buscarImagen = ( ) => {

    const termino = document.querySelector('#termino').value;
    const key = '18604097-d314034e3a4bab3b9373cd1bb';
    const url =`https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;
    
    fetch( url ) 
        .then( resp => resp.json())
        .then( data => {
            totalPaginas = calcularPaginas( data.totalHits );
            mostrarImagenes( data.hits );
        });
}


/** 
 * * Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
*/
function *crearPaginador( total ) {
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}


/** 
 * * Mostrar imagen en html
*/
const mostrarImagenes = ( imagenes ) => {
    limpiarHTML( resultado );

    // iterar las imagenes 
    imagenes.forEach( imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;
        
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">
                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light">Me Gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Veces Vistas</span></p>

                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="nooperner noreferrer">Ver Imagen</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    limpiarHTML(paginacionDiv);
    imprimirPaginador();
}

/** 
 * * Imprimir paginador
*/
const imprimirPaginador = () => {
    iterador = crearPaginador( totalPaginas ); 
    
    while (true) {
        const { value, done } = iterador.next();
        if ( done ) return;

        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

        boton.onclick = () => {
            paginaActual = value;
            buscarImagen( );
        }

        paginacionDiv.appendChild( boton );
    }
}

/** 
 * * Calcular numero de paginanas
*/
const calcularPaginas = total => parseInt( Math.ceil( total / registroPorPagina ) );


/** 
 * * EVENTOS
*/

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario );
}
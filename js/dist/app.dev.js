"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(crearPaginador);

/** 
 * * App consimiendo API de Pixabay
*/

/** 
 * * VARIABLES
*/
var resultado = document.querySelector('#resultado');
var formulario = document.querySelector('#formulario');
var paginacionDiv = document.querySelector('#paginacion'); //

var registroPorPagina = 40;
var totalPaginas;
var iterador;
var paginaActual = 1;
/** 
 * * FUNCIONES
*/

var validarFormulario = function validarFormulario(e) {
  e.preventDefault();
  var terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda === '') {
    mostrarAlerta('Agrega un termino de busqueda');
    return;
  }

  buscarImagen();
};
/** 
 * * Mostrar alerta
*/


var mostrarAlerta = function mostrarAlerta(mensaje) {
  var existeAlerta = document.querySelector('.alerta');

  if (!existeAlerta) {
    var alerta = document.createElement('p');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    alerta.innerHTML = "\n            <strong class=\"font-bold\">Error!</strong>\n            <span class=\"block sm:inline\">".concat(mensaje, "</span>\n        ");
    formulario.appendChild(alerta);
    setTimeout(function () {
      alerta.remove();
    }, 3000);
  }
};
/** 
 * * limpiar el html
*/


var limpiarHTML = function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
};
/** 
 * * Se realiza la consulta a la API
*/


var buscarImagen = function buscarImagen() {
  var termino = document.querySelector('#termino').value;
  var key = '18604097-d314034e3a4bab3b9373cd1bb';
  var url = "https://pixabay.com/api/?key=".concat(key, "&q=").concat(termino, "&per_page=").concat(registroPorPagina, "&page=").concat(paginaActual);
  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    totalPaginas = calcularPaginas(data.totalHits);
    mostrarImagenes(data.hits);
  });
};
/** 
 * * Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
*/


function crearPaginador(total) {
  var i;
  return regeneratorRuntime.wrap(function crearPaginador$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 1;

        case 1:
          if (!(i <= total)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return i;

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/** 
 * * Mostrar imagen en html
*/


var mostrarImagenes = function mostrarImagenes(imagenes) {
  limpiarHTML(resultado); // iterar las imagenes 

  imagenes.forEach(function (imagen) {
    var previewURL = imagen.previewURL,
        likes = imagen.likes,
        views = imagen.views,
        largeImageURL = imagen.largeImageURL;
    resultado.innerHTML += "\n            <div class=\"w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4\">\n                <div class=\"bg-white\">\n                    <img class=\"w-full\" src=\"".concat(previewURL, "\">\n                    <div class=\"p-4\">\n                        <p class=\"font-bold\">").concat(likes, " <span class=\"font-light\">Me Gusta</span></p>\n                        <p class=\"font-bold\">").concat(views, " <span class=\"font-light\">Veces Vistas</span></p>\n\n                        <a class=\"block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1\" href=\"").concat(largeImageURL, "\" target=\"_blank\" rel=\"nooperner noreferrer\">Ver Imagen</a>\n                    </div>\n                </div>\n            </div>\n        ");
  });
  limpiarHTML(paginacionDiv);
  imprimirPaginador();
};
/** 
 * * Imprimir paginador
*/


var imprimirPaginador = function imprimirPaginador() {
  iterador = crearPaginador(totalPaginas);

  var _loop = function _loop() {
    var _iterador$next = iterador.next(),
        value = _iterador$next.value,
        done = _iterador$next.done;

    if (done) return {
      v: void 0
    };
    var boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

    boton.onclick = function () {
      paginaActual = value;
      buscarImagen();
    };

    paginacionDiv.appendChild(boton);
  };

  while (true) {
    var _ret = _loop();

    if (_typeof(_ret) === "object") return _ret.v;
  }
};
/** 
 * * Calcular numero de paginanas
*/


var calcularPaginas = function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registroPorPagina));
};
/** 
 * * EVENTOS
*/


window.onload = function () {
  formulario.addEventListener('submit', validarFormulario);
};
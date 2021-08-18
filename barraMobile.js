"use strict"
let boton = document.querySelector('#botonCambiar');
boton.addEventListener("click", mobile);

function mobile() {

    let barranavegacion = document.querySelector('#listanav');
    barranavegacion.classList.toggle('oculto'); // añade o remueve
}





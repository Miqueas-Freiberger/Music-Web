"use strict"

document.querySelector('#btn-agregar').addEventListener("click", agregarInstrumento);

let nombre = document.querySelector('#txtNombre');
let color = document.querySelector('#txtColor');
let tipo = document.querySelector('#txtTipo');
let tablaDOM = document.querySelector("#caractInstrum");
let filtroNombre = document.querySelector('#filtroNombre');
let filtroColor = document.querySelector('#filtroColor');

document.querySelector('#applyFilter').addEventListener('click', () => {
    filtrar(filtroNombre, filtroColor)
})

document.querySelector('#delFilter').addEventListener('click', () => {
    tablaDOM.innerHTML = ' '
    obtenerDatos();
})

const url = 'https://60ce264991cc8e00178dca47.mockapi.io/instrumentos';
obtenerDatos()

async function agregarInstrumento() {
    let instrumento = {
        "nombre": nombre.value,
        "color": color.value,
        "tipo": tipo.value
    }

    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(instrumento)// transforma json a string
        });
        if (res.ok) {
            console.log(instrumento);
            try {
                tablaDOM.innerHTML += `<tr>
                                            <td class = "celdaNombreInstrumento" >${nombre.value}</td>
                                            <td class = "celdaNombreInstrumento">${color.value}</td>
                                            <td class = "celdaNombreInstrumento">${tipo.value}</td>
                                        </tr>`
            }
            catch (error) {
                console.log(error);
            }

        }
        else {
            console.log("error")
        }

    } catch (error) {
        console.log(error);
    }
    tablaDOM.innerHTML = ' '
    obtenerDatos();
}

async function obtenerDatos() {
    try {
        let res = await fetch(url);
        let json = await res.json();
        console.log(json);
        for (const datosInstrumento of json) {
            let nombreInstrum = datosInstrumento.nombre;
            let colorInstrum = datosInstrumento.color;
            let tipoInstrum = datosInstrumento.tipo;
            let id = datosInstrumento.id;
            renderizarDatos(nombreInstrum, colorInstrum, tipoInstrum, id);
        }

    }
    catch (error) {
        console.log(error);
    }
}

function renderizarDatos(nombre, color, tipo, id) {

    tablaDOM.innerHTML += `<tr>
                                        <td class = "celdaNombreInstrumento">${nombre}</td>
                                        <td class = "celdaNombreInstrumento">${color}</td>
                                        <td class = "celdaNombreInstrumento">${tipo}</td>
                                        <td class = "celdaNombreInstrumento"><button class="btn-eliminar" data-id=${id}>Eliminar</button></td>
                                        <td class = "celdaNombreInstrumento"><button class="btn-editar" data-id=${id}>Editar</button></td>
                                    </tr>`
    obtenerBotones();
}

function obtenerBotones() {
    let btnEliminar = document.querySelectorAll('.btn-eliminar');
    let btnEditar = document.querySelectorAll('.btn-editar');

    for (let i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener("click", function (e) {
            e.preventDefault();
            let elemento = e.target;
            let dataID = elemento.getAttribute('data-id');
            eliminarElemento(dataID);
        });
    }
    for (let j = 0; j < btnEditar.length; j++) {
        btnEditar[j].addEventListener('click', function (e) {
            e.preventDefault();
            let elemento = e.target;
            let dataID = elemento.getAttribute('data-id');
            confirmarAccion(dataID);
        });

    }
}

async function eliminarElemento(id) {

    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE",
        });
        if (res.ok) {
            console.log("Se elimino con exito");
        }

    }
    catch (error) {
        console.log(error);
    }
    tablaDOM.innerHTML = ' '
    obtenerDatos();
}

function confirmarAccion(dataID) {
    let confirm = document.querySelector('.btn-confirmEdit');
    let nombreNuevo = document.querySelector('.editarNombre');
    let colorNuevo = document.querySelector('.editarColor');
    let tipoNuevo = document.querySelector('.editarTipo');
    ////////////////////////////////////////////////////////////////////////////
    confirm.classList.add('showBtn');
    nombreNuevo.classList.add('showName');
    colorNuevo.classList.add('showColor');
    tipoNuevo.classList.add('showType');

    confirm.addEventListener('click', () => {
        modificarElemento(dataID, nombreNuevo.value, colorNuevo.value, tipoNuevo.value);
        confirm.classList.remove('showBtn');
        nombreNuevo.classList.remove('showName');
        colorNuevo.classList.remove('showColor');
        tipoNuevo.classList.remove('showType');

    });
    nombreNuevo.scrollIntoView({ block: "end", behavior: "smooth" });
    tablaDOM.innerHTML = ' ';
    obtenerDatos();

}

async function modificarElemento(id, nombreNuevo, colorNuevo, tipoNuevo) {

    let instrumentoAModificar = {
        "nombre": nombreNuevo,
        "color": colorNuevo,
        "tipo": tipoNuevo
    }

    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(instrumentoAModificar)// transforma json a string

        });
        if (res.ok) {
            console.log("Se modifico con exito");
        }

    }
    catch (error) {
        console.log(error);
    }

    tablaDOM.innerHTML = ' '
    obtenerDatos();
}

async function filtrar(filtroNombre, filtroColor) {
    tablaDOM.innerHTML = ' '
    let nombreFiltrado = filtroNombre.value;
    let colorFiltrado = filtroColor.value;

    let nombreInstrum;
    let colorInstrum;
    let tipoInstrum;
    let id;
    
    try {
        let res = await fetch(url);
        let json = await res.json();
        //console.log(json);
        for (const datosInstrumento of json) {
            if (datosInstrumento.nombre == nombreFiltrado && datosInstrumento.color == colorFiltrado) {
                colorInstrum = datosInstrumento.color;
                nombreInstrum = datosInstrumento.nombre;
                tipoInstrum = datosInstrumento.tipo;
                id = datosInstrumento.id;

                tablaDOM.innerHTML += `<tr>
                                            <td class = "celdaNombreInstrumento">${nombreInstrum}</td>
                                            <td class = "celdaNombreInstrumento">${colorInstrum}</td>
                                            <td class = "celdaNombreInstrumento">${tipoInstrum}</td>
                                            <td class = "celdaNombreInstrumento"><button class="btn-eliminar" data-id=${id}>Eliminar</button></td>
                                            <td class = "celdaNombreInstrumento"><button class="btn-editar" data-id=${id}>Editar</button></td>
                                        </tr>`
                obtenerBotones();
            }


        }
    }
    catch (error) {
        console.log(error);
    }




}

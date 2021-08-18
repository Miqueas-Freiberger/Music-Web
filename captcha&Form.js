"use strict"
//vaciar formulario
document.querySelector('#btn-comment').addEventListener("click", function (e) {document.querySelector('#comentario').value = ' ' }); 
    
//Captcha de la pagina

console.log("El usuario debe ingresar el captcha");

let valorinput = document.getElementById('ingresocaptcha');
document.getElementById('enviar').addEventListener("click", verificarCaptcha);
let mensaje = document.getElementById('mensajecaptcha')


let cadena = generarCaptchaAleatorio(5);

//verifica si la cadena ingresada es la correcta
function verificarCaptcha() {

    if (valorinput.value == cadena) {

        mensaje.innerHTML = "Ingreso el captcha correctamente, continue navegando."
        console.log("Se valido el captcha")
        valorinput.value = ' ';
    }
    else {
        mensaje.innerHTML = "Ingreso el captcha incorrectamente, por favor intente de nuevo."
    }

}
//genera una cadena aleatoria de caracteres

function generarCaptchaAleatorio(length) {
    let cadena = '';
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let caracteresLength = caracteres.length;
    for (let i = 0; i < length; i++) {
        cadena += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    document.querySelector('#random_string').innerHTML = cadena;
    return cadena;
}





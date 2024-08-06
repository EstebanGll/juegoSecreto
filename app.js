let numeroSecreto = 0;
let intento = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximos = 5;

function asignarTextoElemento(etiqueta, texto) {
    let text = document.querySelector(etiqueta);
    text.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    //si llegamos a 5 intentos bloquear boton intentar y activar boton nuevo juego
    if (intento == intentosMaximos) {
        asignarTextoElemento('p',`Alcanzaste el maximo de intentos`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    }

    //verifica si el numero ingresado es igual al numero secreto
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el numero en ${intento} ${intento === 1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        //El usuario no acerto
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p',`El numero secreto es menor, te quedan ${intentosMaximos-intento} ${intentosMaximos-intento == 1 ? 'intento' :'intentos'}`);
        } else {
            asignarTextoElemento('p',`El numero secreto es mayor, te quedan ${intentosMaximos-intento} ${intentosMaximos-intento == 1 ? 'intento' :'intentos'}`);
        }
        intento++;

        //
        limpiarCaja();
    }
    return;
    
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value= '';
}

function generarNumeroSecreto() {  
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
        document.getElementById('#intentar').setAttribute('disabled', 'true');
    } else {
        // si el numero generado esta incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intento = 1;
}
function reiniciarJuego() {
    //Limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numeros
    //Generar el numero aleatorio
    //Inicializar el numero de intentos
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    //habilitar el boton de intentar
    document.querySelector('#intentar').removeAttribute('disabled');

    //si se alcanza el maximo de sorteos se reinician
    
}

condicionesIniciales();


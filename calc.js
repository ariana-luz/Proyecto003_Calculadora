const botonNumeros = document.getElementsByName('data-number'); //son constantes porque no van a cambiar
const botonOpera = document.getElementsByName('data-opera');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];
const botonNegativo = document.getElementsByName('data-negativo')[0];
const botonPorcentaje = document.getElementsByName('data-porcentaje')[0];
const botonDecimal = document.getElementsByName('data-decimal')[0];

var result = document.getElementById('result'); //es una variable porque va a ir cambiando su valor
var operaActual = '';
var operaAnterior = '';
var opera = undefined;

//recorrer el arreglo para ver qué boton se clickeó
//captura de eventos de los clicks

botonNumeros.forEach(function (boton) {
    boton.addEventListener('click', function () {
        agregarNumero(boton.innerText);
    })
})

botonOpera.forEach(function (boton) {
    boton.addEventListener('click', function () {
        seleccionaOperacion(boton.innerText);
    })
})

botonIgual.addEventListener('click', function () {
    calcular();
    actualizarDisplay();
})

botonDelete.addEventListener('click', function () {
    clear();
    actualizarDisplay();
})

botonNegativo.addEventListener('click', function () {
    negativo();
    actualizarDisplay();
})

botonPorcentaje.addEventListener('click', function () {
    porcentaje();
    actualizarDisplay();
})

botonDecimal.addEventListener('click', function () {
    decimal();
    actualizarDisplay();
})

function agregarNumero(num) {
    operaActual = operaActual.toString() + num.toString(); //convierto la operacion a texto porque el input es de tipo texto. No los suma, sino que los va concatenando
    actualizarDisplay();
}

function actualizarDisplay() {
    result.value = operaActual;
}

function clear() {//inicializa nuevamente las variables principales
    operaActual = '';
    operaAnterior = '';
    opera = undefined;
}

clear();

function seleccionaOperacion(opera) {
    if (operaActual === '') return; //si esta vacio, no devuelve nada, sigue en cero
    if (operaAnterior !== '') {//si es diferente de vacio, va a hacer un calculo
        calcular();
    }
    operacion = opera.toString();
    operaAnterior = operaActual;
    operaActual = '';
}

function calcular() {
    var calculo //donde se guarda la operacion
    const anterior = parseFloat(operaAnterior); //los convierte a numeros
    const actual = parseFloat(operaActual);
    if (isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '÷':
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    operaActual = calculo;
    operacion = undefined;
    operaAnterior = '';
}

function negativo() {
    operaActual = operaActual * (-1);
}

function porcentaje() {
    operaActual = operaActual / 100;
}

function decimal() {
    if (operaActual == '') {
        operaActual = '0.';
    }
    if (operaActual.includes('.')) return {
    }
    operaActual = operaActual + '.';
}
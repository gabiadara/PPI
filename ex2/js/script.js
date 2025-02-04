let tempoInicial = null;
let tempoTotal = 0;
let intervalo = null;

const listaPausas = document.querySelector('#pausas');
const display = document.getElementById('display');
const btnIniciar = document.getElementById('iniciar');
const btnPausar = document.getElementById('pausar');
const btnZerar = document.getElementById('zerar');

function iniciar() {
    if (!intervalo) {
        tempoInicial = Date.now() - tempoTotal;
        intervalo = setInterval(atualizar, 10);
    }
}

function pausar() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
        tempoTotal = Date.now() - tempoInicial;
        lista();
    }
}

function zerar() {
    clearInterval(intervalo);
    intervalo = null;
    tempoInicial = null;
    tempoTotal = 0;
    display.innerText = tempo(0);
    listaPausas.innerHTML = '';
}

function atualizar() {
    const atual = Date.now();
    const hora = atual - tempoInicial;
    display.innerText = tempo(hora);
}

function tempo(num) {
    const milisegundos = num % 1000;
    const totalSegundos = Math.floor(num / 1000);
    const segundos = totalSegundos % 60;
    const minutos = Math.floor(totalSegundos / 60) % 60;
    const horas = Math.floor(totalSegundos / 3600);

    return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}.${pad(milisegundos, 3)}`;
}

function lista() {
    const listaItem = document.createElement('li');
    listaItem.textContent = `${display.innerText}`;
    listaItem.classList.add('list-group-item');
    listaPausas.appendChild(listaItem);
}

function pad(num, tamanho = 2) {
    return String(num).padStart(tamanho, '0');
}

btnIniciar.addEventListener('click', iniciar);
btnPausar.addEventListener('click', pausar);
btnZerar.addEventListener('click', zerar);

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'i') iniciar();
    if (event.key.toLowerCase() === 'p') pausar();
    if (event.key.toLowerCase() === 'z') zerar();
});

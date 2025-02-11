const divMinutos = document.getElementById("minutos");
const divSegundos = document.getElementById("segundos");
const divMilisegundos = document.getElementById("milisegundos");
const divParadas = document.getElementById("divParadas");

let interval;
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let pause = false;
let horaInicio = 0;
let horaPausa = 0;

function iniciar() {

    if(pause) {
        horaInicio += Date.now() - horaPausa;
        pause = false;
    } else {
        horaInicio = Date.now();
    }
    
    interval = setInterval(() => {
        if (!pause) {
            const tempoPassado = Date.now() - horaInicio;

            minutos = Math.floor(tempoPassado / 60000);
            segundos = Math.floor((tempoPassado % 60000) / 1000);
            milisegundos = Math.floor((tempoPassado % 1000) / 10);

            divMinutos.textContent = formatarHora(minutos);
            divSegundos.textContent = formatarHora(segundos);
            divMilisegundos.textContent = formatarHora(milisegundos);

        }        
    }, 10);
}

function pausar() {
    pause = true;
    horaPausa = Date.now();
    
    const novaLinha = document.createElement("li");
    novaLinha.textContent = `${formatarHora(minutos)}:${formatarHora(segundos)}:${formatarHora(milisegundos)}`;
    divParadas.appendChild(novaLinha);
}

function zerar() {
    clearInterval(interval);
    pause = true;
    divParadas.innerHTML = '';
    horaInicio = 0;
    horaPausa = 0;
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    
    divMinutos.textContent = formatarHora(minutos);
    divSegundos.textContent = formatarHora(segundos);
    divMilisegundos.textContent = formatarHora(milisegundos);
}

function formatarHora(valor) {
    return valor < 10 ? `0${valor}` : valor;
}

document.addEventListener("keydown", function(event) {
    if(event.key == "i") {
        iniciar();
    }
    if(event.key == "p") {
        pausar();
    }
    if(event.key == "z") {
        zerar();
    }
});
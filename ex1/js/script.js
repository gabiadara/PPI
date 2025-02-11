const visor = document.getElementById('visor');
const btn = document.querySelectorAll(".btn");

let num = '';

btn.forEach(btn => {
    btn.addEventListener('click', () => {
        const numAtual = btn.textContent;
        const operadores = ['+', '-', '*', '/', '%'];

        if (numAtual == 'C') {
            num = '';
        } else if (numAtual == 'CE') {
            num = num.slice(0, -1);
        } else if(numAtual == '+/-') {
            trocarSinal();
        } else if(numAtual == '=') {
            try{
                if(operadores.includes(num.slice(-1))) {
                    return;
                }
                num = eval(num).toString();
            } catch {
                num = 'ERRO';
            } 
        } else {
            if (operadores.includes(numAtual) && operadores.includes(num.slice(-1))) {
                return;
            }
            num += numAtual
        }
        atualizar(num);
    })
});


function atualizar(numAtual) {
    visor.textContent = numAtual || '0';
}

function trocarSinal() {
    if (num) {
        num = num.startsWith('-') 
            ? num.slice(1) 
            : '-' + num;
        atualizar(num);
    }
}

atualizar();
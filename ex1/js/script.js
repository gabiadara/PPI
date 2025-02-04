
const resultado = document.querySelector('.resultado');
const btn = document.querySelectorAll('.btn');

let numAtual = '';

function atualizar(valor) {
    resultado.textContent = valor || '0';
}

function limpar() {
    numAtual = '';
    atualizar(numAtual);
}

function alterarSinal() {
    if (numAtual) {
        numAtual = numAtual.startsWith('-') 
            ? numAtual.slice(1) 
            : '-' + numAtual;
        atualizar(numAtual);
    }
}

btn.forEach(btn => {
    btn.addEventListener('click', () => {
        const num = btn.textContent;

        if (!isNaN(num) || num === ',') {
            numAtual += num === ',' ? '.' : num;
        } else if (num === 'C') {
            limpar();
        } else if (num === '+/-') {
            alterarSinal();
        } else if (num === '=') {
            try {
                numAtual = eval(numAtual).toString();
                atualizar(numAtual);
            } catch {
                atualizar('Erro');
                numAtual = '';
            }
        } else if (['+', '-', '*', '/', '%'].includes(num)) {
                numAtual += num;
            }

        atualizar(numAtual);
    });
});

atualizar();
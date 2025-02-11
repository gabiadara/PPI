const novaNota = document.getElementById("nova-nota");
const listaNotas = document.getElementById("notasSalvas");
const btnSalvar = document.getElementById("btn-salvar");
const bntSalvarEdicao = document.getElementById("btn-salvar-edicao");

let contador = localStorage.getItem("contador") ? Number(localStorage.getItem("contador")) : 0;
atualizarLista();

function salvarNota() {
    let texto = novaNota.value;

    if(texto !== "") {
        localStorage.setItem(contador, texto);
    
        contador++;
        localStorage.setItem("contador", contador);
        
        novaNota.value = '';

        atualizarLista();
    } else {
        alert("nota inválida");
    }
}

function atualizarLista(){
    listaNotas.innerHTML = '';

    Object.keys(localStorage).forEach(key => {
        if(key !== "contador") {
            let recuperarNota = localStorage.getItem(key);
            const novaLinha = document.createElement("li");
            novaLinha.textContent = recuperarNota;

            novaLinha.classList.add("pe-auto","list-group-item", "list-group-item-action", "list-group-item-secondary");

            const divBotoes =  document.createElement("div");
            divBotoes.style.textAlign = "right";

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.classList.add("btn", "btn-outline-danger", "btn-sm", "ms-1")

            botaoExcluir.onclick = () => {
                const confirmar = confirm("A nota será permanentemente excluída");
                if(confirmar) {
                    localStorage.removeItem(key);
                    atualizarLista();
                }
            }

            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.classList.add("btn", "btn-outline-dark", "btn-sm");

            botaoEditar.onclick = () => {
                btnSalvar.style.display = 'none';
                bntSalvarEdicao.style.display = 'inline-block';
    
                editarNota(key);
            }

            divBotoes.appendChild(botaoEditar);
            divBotoes.appendChild(botaoExcluir);

            novaLinha.appendChild(divBotoes);
            listaNotas.appendChild(novaLinha);
        }
    });
}

function editarNota(key) {
    novaNota.value = localStorage.getItem(key);
    
    bntSalvarEdicao.onclick = () => {
        let texto = novaNota.value;

        if(texto !== "") {
            localStorage.setItem(key, texto);
    
            novaNota.value = '';
    
            btnSalvar.style.display = 'inline-block';
            bntSalvarEdicao.style.display = 'none';

            atualizarLista();
        }
    }
}

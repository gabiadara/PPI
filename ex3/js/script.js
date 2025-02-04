function obterNotas() {
    return JSON.parse(localStorage.getItem("notas")) || [];
}

function atualizar() {
    let lista = document.getElementById("listaNotas");
    
    lista.innerHTML = "";
    let notas = obterNotas();

    notas.forEach((nota, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";

        let conteudo = document.createElement("span");
        conteudo.textContent = nota.length > 10 ? nota.substring(0, 10) + "..." : nota;
        conteudo.style.cursor = "pointer";

        conteudo.onclick = () => {
            botaoExcluir.style.display = "none";
            conteudo.style.display = "none";
            let input = document.createElement("textarea");
            input.value = nota;
            input.className = "form-control";
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    let novaNota = input.value.trim();
                    if (novaNota !== "") {
                        notas[index] = novaNota;
                        localStorage.setItem("notas", JSON.stringify(notas));
                        atualizar();
                    } else {
                        atualizar();
                    }
                }
            });
            li.appendChild(input);
            input.focus();
        };

        let botaoExcluir = document.createElement("button");
        botaoExcluir.className = "btn btn-outline-danger btn-sm";
        botaoExcluir.textContent = "EXCLUIR";
        botaoExcluir.onclick = (event) => {
            event.stopPropagation();
            excluir(index);
        };

        li.appendChild(conteudo);
        li.appendChild(botaoExcluir);
        lista.appendChild(li);
    });
}
function novaNota() {
    let novaNota = document.getElementById("notaTexto").value.trim();

    if(novaNota == ""){
        alert("Nada para salvar por aqui!");
        return;
    }

    let notas = obterNotas();
    notas.push(novaNota);
    localStorage.setItem("notas", JSON.stringify(notas));

    document.getElementById("notaTexto").value = "";
    atualizar();
}

function excluir(index) {
    if (confirm("Tem certeza que deseja excluir esta nota?")) {
        let notas = obterNotas();
        notas.splice(index, 1);
        localStorage.setItem("notas", JSON.stringify(notas));
        atualizar();
    }
}

document.addEventListener("DOMContentLoaded", atualizar);
function buscar() {
    const chaveApi = '13ae03338fde0b92606463be4ac43852';
    const termoBusca = document.getElementById('inputBusca').value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${chaveApi}&query=${encodeURIComponent(termoBusca)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            resultados(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
}

function resultados(filmes) {
    const divResultados = document.getElementById('resultados');
    divResultados.innerHTML = '';

    if (filmes.length === 0) {
        divResultados.innerHTML = `
        <div class="d-flex flex-column w-100 align-items-center justify-content-center mt-4">
            <img src="https://i.pinimg.com/736x/92/09/65/920965b5ea36c3e9ba1e97380322b94a.jpg" alt="Imagem 'nao encontrado'">
            <p class="text-center mt-2" >Nenhum resultado encortrado!</p></div>`;
    } else {
        filmes.forEach(filme => {
            const posterFilme = filme.poster_path
                ? `https://image.tmdb.org/t/p/w300${filme.poster_path}`
                : "https://i.pinimg.com/736x/92/09/65/920965b5ea36c3e9ba1e97380322b94a.jpg";

            const cardFilme = document.createElement('div');
            cardFilme.classList.add('col-md-4', 'col-lg-3', 'd-flex');

            cardFilme.innerHTML = `
            <div class="card cards bg-dark text-white w-100">
                <img src="${posterFilme}" class="card-img-top" alt="${filme.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${filme.title}</h5>
                    <p class="card-text"><strong>Lançamento:</strong> ${filme.release_date || 'Não informada'}</p>
                </div>
            </div>
        `
        divResultados.appendChild(cardFilme);
        });
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        buscar();
    }
});
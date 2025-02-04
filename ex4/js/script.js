document.getElementById('buscar').addEventListener('click', function () {
    const apiKey = '13ae03338fde0b92606463be4ac43852';
    const searchTerm = document.getElementById('inputBusca').value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            resultados(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
});

function resultados(filmes) {
    const divResultados = document.getElementById('resultados');
    divResultados.innerHTML = '';

    if (filmes.length === 0) {
        divResultados.innerHTML = '<p class="text-center">Nenhum filme encontrado.</p>';
        return;
    }

    filmes.forEach(filme => {
        const posterPath = filme.poster_path 
            ? `https://image.tmdb.org/t/p/w300${filme.poster_path}` 
            : 'https://via.placeholder.com/300x450?text=Imagem+Indisponível';

        const cardFilme = document.createElement('div');
        cardFilme.classList.add('col-md-4', 'col-lg-3', 'd-flex');

        cardFilme.innerHTML = `
            <div class="card cards bg-dark text-white w-100">
                <img src="${posterPath}" class="card-img-top" alt="${filme.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${filme.title}</h5>
                    <p class="card-text"><strong>Lançamento:</strong> ${filme.release_date || 'N/A'}</p>
                </div>
            </div>
        `;

        divResultados.appendChild(cardFilme);
    });
}

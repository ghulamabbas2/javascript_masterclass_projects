const movies = new Movie();

const searchButton = document.querySelector('#searchMovie');
const searchField = document.querySelector('#movieField');
const movieList = document.querySelector('#movie-list');
const movieResults = document.querySelector('#results');

searchButton.addEventListener('click', e => {
    const query = searchField.value;

    if(query !== '') {

        movieList.innerHTML = '';

        movies.getMovies(query)
        .then(data => {
            if(data.length === 0) {
                return movieResults.innerHTML = `<p class="mt-4"><b>No Movie Found.</b></p>`
            }

            displayMovies(data);
        });
    }
});

// Display all movies in browser
function displayMovies(data) {

    movieResults.innerHTML = `<p class="mt-4"><b>${data.length} Movie Found.</b></p>`;

    data.forEach(movie => {
        const markup = `<div class="card mt-4">
        <div class="row no-gutters">

            <div class="col-3">
                <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}" class="img-fluid card-img">
            </div>

            <div class="col-9">
                <div class="card-body">
                    <h2 class="card-title">${movie.original_title}</h2>
                    <p class="movie-date">Date Published: ${movie.release_date}</p>
                    <p class="card-text">${movie.overview.substring(0, 100)} ...</p>

                    <hr>

                    <p class="card-text">Total Votes: <b>${movie.vote_count}</b></p>
                    <p class="card-text">Rating: <b>${movie.vote_average}</b></p>

                </div>
            </div>

        </div>
    </div>`;

        movieList.insertAdjacentHTML('afterbegin', markup);

    });
}
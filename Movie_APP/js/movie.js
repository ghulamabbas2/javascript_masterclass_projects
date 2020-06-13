class Movie {
    constructor() {
        this.api_key = '19ad416db5f018cc8b2482a686deb0e4';
    }

    async getMovies(query) {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&query=${query}`;

        let data = [];

        // Get all movies from all pages of API
        const getAllMovies = async (page = 1) => {
            let results = await fetch(`${apiUrl}&page=${page}`);
            results = await results.json();

            results.results.forEach(movie => {
                data.push(movie);
            });

            if(page < results.total_pages) {
                return await getAllMovies(page + 1);
            } else {
                return data;
            }
        }

        const movies = await getAllMovies();

        return movies;
    }
}
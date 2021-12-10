import { makeAutoObservable } from "mobx";

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;

class Movies {
    movies = [];
    preview = {};
    title = "";

    constructor() {
        makeAutoObservable(this);
    }

    saveMovies(movies, title) {
        this.movies = movies;
        this.title = `Request: ${title}`;
    }

    getPopularMovies() {
        fetch(TOP_URL)
            .then(res => res.json())
            .then(data => {
            this.movies = data.results;
            this.preview = data.results[0];
            this.title = "Popular Movies";
        })
    }
}

export default new Movies();
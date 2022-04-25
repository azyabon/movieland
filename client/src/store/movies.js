import { makeAutoObservable } from "mobx";

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

class Movies {
    movies = [];
    preview = {};
    currentMovie = {};
    title = "";
    isLoad = false;
    open = false;

    constructor() {
        makeAutoObservable(this);
    }

    searchMovies(e) {
        e.preventDefault()
        const MOVIE = e.target[0].value;
        if (MOVIE) {
            this.isLoad = true;
            try {
                fetch(SEARCH_URL + MOVIE)
                    .then(res => res.json())
                    .then(data =>{
                        this.movies = data.results
                        this.isLoad = false;
                    })
            } catch(error) {
                alert(error);
            }
            this.title = `Request: ${MOVIE}`;
        } else {
            this.open = true;
            setTimeout(() => this.open = false, 3000);
        }
    }

    getInfoAboutCurrentMovie() {
        try {
            this.isLoad = true;
            fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem("RMovieID")}?${API_KEY}&language=en-US`)
                .then(res => res.json())
                .then(data => {
                    this.currentMovie = data
                    this.isLoad = false;
                });
        } catch (error) {
            alert(error)
            this.isLoad = false;
        }
    }

    getPopularMovies() {
        this.isLoad = true;
        fetch(TOP_URL)
            .then(res => res.json())
            .then(data => {
            this.movies = data.results;
            this.preview = data.results[0];
            this.title = "Popular Movies";
                this.isLoad = false;
        })
    }
}

export default new Movies();
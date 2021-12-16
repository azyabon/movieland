import { makeAutoObservable } from "mobx";

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

class Movies {
    movies = [];
    preview = {};
    currentMovie = {};
    title = "";
    isFetching = false;

    constructor() {
        makeAutoObservable(this);
    }

    searchMovies(e) {
        e.preventDefault()
        const MOVIE = e.target[0].value;
        if (MOVIE) {
            try {
                this.isFetching = true
                fetch(SEARCH_URL + MOVIE)
                    .then(res => res.json())
                    .then(data =>{
                        this.movies = data.results
                        this.isFetching = false
                    })
            } catch(error) {
                alert(error);
            }
        } else {
            alert("Enter the title of the movie!");
        }
        this.title = `Request: ${MOVIE}`;
    }

    getInfoAboutCurrentMovie() {
        try {
            this.isFetching = true
            fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem("RMovieID")}?${API_KEY}&language=en-US`)
                .then(res => res.json())
                .then(data => {
                    this.currentMovie = data
                    this.isFetching = false
                });
        } catch (error) {
            alert(error)
        }
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
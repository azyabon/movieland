import { makeAutoObservable } from "mobx";

class Movies {
    movies = [];
    constructor() {
        makeAutoObservable(this);
    }

    savePopularMovies(movies) {
        this.movies = movies;
    }
}

export default new Movies();
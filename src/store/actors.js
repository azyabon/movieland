import { makeAutoObservable } from "mobx";

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";

class Actors {
    actors = [];

    constructor() {
        makeAutoObservable(this);
    }

    getActors = () => {
        fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem("RMovieID")}/casts?${API_KEY}`)
        .then(response => response.json())
        .then(data => this.actors = data.cast);
    }
}

export default new Actors();
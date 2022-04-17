import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';

import styles from './details.module.scss';
import Actor from '../../components/Actor/Actor';
import actors from '../../store/actors';
import movies from '../../store/movies';
import YouTube from "react-youtube";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";

const IMG_URL = `https://image.tmdb.org/t/p/original`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";

const Details = observer((props) => {
    const [trailer, setTrailer] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        actors.getActors();
        movies.getInfoAboutCurrentMovie();
        getTrailer();
    }, [])

    const getTrailer = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem("RMovieID")}/videos?${API_KEY}&language=en-US`)
        const data = await response.json();
        if (data.results.length !== 0) {
            setTrailer(data.results[0].key);
        }
    }

    const getMoviesFromLC = () => {
        const moviesLocalStorage = localStorage.getItem("movies");
        if (moviesLocalStorage !== null) {
            return JSON.parse(moviesLocalStorage);
        }
        return [];
    }

    const putMovies = () => {
        let LS_movies = getMoviesFromLC();
        LS_movies = LS_movies.filter((elem) => {
            if (elem.id === movies.currentMovie.id) {
                return false
            }
            return true
        })
        LS_movies.push({title: movies.currentMovie.original_title, poster: movies.currentMovie.poster_path, id: movies.currentMovie.id});
        localStorage.setItem("movies", JSON.stringify(LS_movies));
        setOpen(true);
        setTimeout(() => setOpen(false), 3000)
    }

    return(
        <>
            <Loader />
            <Modal open={open}>
                <p><i>{movies.currentMovie.original_title}</i> has been added in your library</p>
            </Modal>
            <div className={styles.details}>
                <img className={styles.details__bgc} src={movies.currentMovie.backdrop_path ? IMG_URL + movies.currentMovie.backdrop_path : NO_IMG} alt={movies.currentMovie.original_title} />
                <div className={styles.favorite}>
                    <img className={styles.favourite__img} src="./favourite.png" alt="favourite" onClick={putMovies} />
                </div>
                <div className={styles.details__content}>
                    <img src={movies.currentMovie.poster_path ? IMG_URL + movies.currentMovie.poster_path : NO_IMG} alt="poster" />
                    <div className={styles.details__overview}>
                        <h1>{movies.currentMovie.original_title}</h1>
                        <span>{movies.currentMovie.status}: {movies.currentMovie.release_date}</span>
                        <p><h3>TagLine:</h3>{movies.currentMovie.tagline ? movies.currentMovie.tagline : "unknown"}</p>
                        <p><h3>Description:</h3>{movies.currentMovie.overview}</p>
                        <p>
                            <h3>IMDB Rating:</h3>
                            <span className={(+movies.currentMovie.vote_average) > 7 ? styles.raiting__green : (+movies.currentMovie.vote_average > 5) ? styles.raiting__yellow : styles.raiting__red}>{movies.currentMovie.vote_average}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.movie__info}>
                <span><img className={styles.info__img} src="./clock.png" alt="clock" />Runnig Time: {movies.currentMovie.runtime === 0 ? "unknown" : movies.currentMovie.runtime} min</span>
                <span><img className={styles.info__img} src="./money-bag.png" alt="moneybag" />Budget: ${movies.currentMovie.budget === 0 ? "unknown" : movies.currentMovie.budget}</span>
                <span><img className={styles.info__img} src="./tickets.png" alt="tickets" />Revenue: ${movies.currentMovie.revenue === 0 ? "unknown" : movies.currentMovie.revenue}</span>
            </div>
            <section className={styles.videoplayer}>
                <YouTube videoId={trailer} />
            </section>
            <section className={styles.actors}>
                {actors.actors.map(actor => {
                    return <Actor key={actor.id} {...actor} />
                })}
            </section>
        </>
    );
})

export default Details;
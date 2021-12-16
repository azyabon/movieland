import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './Details.module.scss';
import Actor from '../Actor/Actor';
import actors from '../store/actors';
import movies from "../store/movies";

const IMG_URL = `https://image.tmdb.org/t/p/original`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const Details = observer((props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        actors.getActors();
        movies.getInfoAboutCurrentMovie();
        }, [])

    const putMovies = () => {
        let LSmovies = props.local();
        LSmovies = LSmovies.filter((elem) => {
            if (elem.id === movies.currentMovie.id) {
                return false
            }
            return true
        })
        LSmovies.push({title: movies.currentMovie.original_title, poster: movies.currentMovie.poster_path, id: movies.currentMovie.id});
        localStorage.setItem("movies", JSON.stringify(LSmovies));
        alert(`${movies.currentMovie.original_title} has been added to your library`)
    }

    return(
        <div>
            {movies.isFetching ? <img className={styles.load} src="./spin.gif" alt="load" /> : null}
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
            <section className={styles.actors}>
                {actors.actors.map(actor => {
                    return <Actor key={actor.id} {...actor} />
                })}
            </section>
        </div>
    );
})

export default Details;
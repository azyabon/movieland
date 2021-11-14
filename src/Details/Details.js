import React, {useState, useEffect} from 'react';

import styles from './Details.module.scss';
import Actor from '../Actor/Actor';

const IMG_URL = `https://image.tmdb.org/t/p/original`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";

const Details = (props) => {
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}?${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                console.log(data)
            });
        fetch(`https://api.themoviedb.org/3/movie/${props.id}/casts?${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setActors(data.cast);
            });
        }, [])

    const putMovies = () => {
        let movies = props.local();
        movies = movies.filter((elem) => {
            if (elem.id === movie.id) {
                return false
            }
            return true
        })
        movies.push({title: movie.original_title, poster: movie.poster_path, id: movie.id});
        localStorage.setItem("movies", JSON.stringify(movies));
        alert(`${movie.original_title} has been added to your library`)
    }

    return(
        <div>
            <div className={styles.details}>
            <img className={styles.details__bgc} src={movie.backdrop_path ? IMG_URL + movie.backdrop_path : NO_IMG} alt={movie.original_title} />
            <div className={styles.favorite}>
                <img className={styles.favourite__img} src="./favourite.png" alt="favourite" onClick={putMovies} />
            </div>
                <div className={styles.details__content}>
                    <img src={movie.poster_path ? IMG_URL + movie.poster_path : NO_IMG} alt="poster" />
                    <div className={styles.details__overview}>
                        <h1>{movie.original_title}</h1>
                        <span>{movie.status}: {movie.release_date}</span>
                        <p><h3>TagLine:</h3>{movie.tagline ? movie.tagline : "unknown"}</p>
                        <p><h3>Description:</h3>{movie.overview}</p>
                        <p>
                            <h3>IMDB Rating:</h3>
                            <span className={(+movie.vote_average) > 7 ? styles.raiting__green : (+movie.vote_average > 5) ? styles.raiting__yellow : styles.raiting__red}>{movie.vote_average}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.movie__info}>
                <span><img className={styles.info__img} src="./clock.png" alt="clock" />Runnig Time: {movie.runtime === 0 ? "unknown" : movie.runtime} min</span>
                <span><img className={styles.info__img} src="./money-bag.png" alt="moneybag" />Budget: ${movie.budget === 0 ? "unknown" : movie.budget}</span>
                <span><img className={styles.info__img} src="./tickets.png" alt="tickets" />Revenue: ${movie.revenue === 0 ? "unknown" : movie.revenue}</span>
            </div>
            <section className={styles.actors}>
                {actors.map(actor => {
                    return <Actor key={actor.id} {...actor} />
                })}
            </section>
        </div>
    );
}

export default Details;
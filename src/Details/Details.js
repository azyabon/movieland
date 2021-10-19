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
            });
        fetch(`https://api.themoviedb.org/3/movie/${props.id}/casts?${API_KEY}`)
        .then(res => res.json())
        .then(data => {
        setActors(data.cast);
        console.log(data.cast)
        });
        }, [])

    return(
        <div>
            <div className={styles.details}>
            <img className={styles.details__bgc} src={movie.backdrop_path ? IMG_URL + movie.backdrop_path : NO_IMG} alt={movie.original_title} />
            <div className={styles.favorite}>
                <img className={styles.favourite__img} src="./favourite.png" alt="favourite" />
            </div>
                <div className={styles.details__content}>
                    <img src={movie.poster_path ? IMG_URL + movie.poster_path : NO_IMG} alt="poster" />
                    <div className={styles.details__overview}>
                        <h1>{movie.original_title}</h1>
                        <p>{movie.status}: {movie.release_date}</p>
                        <p>Plot: {movie.overview}</p>
                        {/* <p>Genres: {movie.genres.map(e => e.name + " ")}</p> */}
                        <p>IMDB Rating: {movie.vote_average}</p>
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
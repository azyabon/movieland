import React, {useState, useEffect} from 'react';

import styles from './Details.module.scss';

const IMG_URL = `https://image.tmdb.org/t/p/original`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const ACTORS = `https://api.themoviedb.org/3/movie/{id}/casts?api_key={api_key}`;

const Details = (props) => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}?${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
            console.log(data);
            setMovie(data);
            })
        }, [])

    return(
        <div>
            <div className={styles.preview}>
            <img className={styles.preview__bgc} src={movie.backdrop_path ? IMG_URL + movie.backdrop_path : NO_IMG} alt={movie.original_title} />
                <div className={styles.preview__info}>
                    <img src={movie.poster_path ? IMG_URL + movie.poster_path : NO_IMG} alt="poster" />
                    <h1>{movie.original_title}({movie.status}: {movie.release_date})</h1>
                    <p>Plot: {movie.overview}</p>
                    {/* <p>Genres: {movie.genres.map(e => e.name + " ")}</p> */}
                    <p>IMDB Rating: {movie.vote_average}</p>
                </div>
            </div>
            <div className={styles.movie__info}>
                <span><img className={styles.info__img} src="./clock.png" alt="clock" />Runnig Time: {movie.runtime === 0 ? "unknown" : movie.runtime} min</span>
                <span><img className={styles.info__img} src="./money-bag.png" alt="moneybag" />Budget: ${movie.budget === 0 ? "unknown" : movie.budget}</span>
                <span><img className={styles.info__img} src="./tickets.png" alt="tickets" />Revenue: ${movie.revenue === 0 ? "unknown" : movie.revenue}</span>
            </div>
            <section className={styles.actors}></section>
        </div>
    );
}

export default Details;
import React from 'react'
import { useEffect, useState} from 'react';
import Film from '../Film/Film';
import styles from './Library.module.scss';

export default function Library(props) {
    const [AllSavedMovies, setAllSavedMovies] = useState(JSON.parse(localStorage.getItem("movies")));

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const deleteMovieFromLibrary = (id) => {
        const arr = AllSavedMovies.filter(movie => movie.id !== id);
        setAllSavedMovies(arr);
        localStorage.setItem("movies", JSON.stringify(arr));
    }

    return (
        <section className={styles.library}>
                {AllSavedMovies ? AllSavedMovies.map(movie => {
                    return (
                        <Film
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            func={props.func}
                            delete={deleteMovieFromLibrary}
                        />
                    );
                    }) : ""}
                </section>
    )
}


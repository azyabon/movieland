import React from 'react'
import { useEffect, useState} from 'react';
import Film from '../../components/Film/Film';
import styles from './library.module.scss';

const Library = () => {
    const [AllSavedMovies, setAllSavedMovies] = useState(JSON.parse(localStorage.getItem("movies")));

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const deleteMovieFromLibrary = (id) => {
        const arr = AllSavedMovies.filter(movie => movie.id !== id);
        setAllSavedMovies(arr);
        localStorage.setItem("movies", JSON.stringify(arr));
    }

    function saveID(id) {
        localStorage.setItem("RMovieID", id);
    }

    return (
        <>
            <section className={styles.library}>
                {AllSavedMovies ? AllSavedMovies.map(movie => {
                    return (
                        <Film
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            func={saveID}
                            delete={deleteMovieFromLibrary}
                        />
                    );
                }) : ""}
            </section>
        </>
    )
};

export default Library;
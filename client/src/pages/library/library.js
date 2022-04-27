import React from 'react'
import { useEffect, useState} from 'react';
import Film from '../../components/Film/Film';
import styles from './library.module.scss';
import movies from "../../store/movies";
import Modal from "../../components/Modal/Modal";

const Library = () => {
    const [AllSavedMovies, setAllSavedMovies] = useState(JSON.parse(localStorage.getItem("movies")));
    const [modal, setModal] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const deleteMovieFromLibrary = (id) => {
        const arr = AllSavedMovies.filter(movie => movie.id !== id);
        setAllSavedMovies(arr);
        localStorage.setItem("movies", JSON.stringify(arr));
        setModal(true);
        setTimeout(() => setModal(false), 3000)
    }

    function saveID(id) {
        localStorage.setItem("RMovieID", id);
    }

    return (
        <div className={styles.container}>
            <h1>Library</h1>
            <Modal open={modal}>
                <p>Movie has been delete</p>
            </Modal>
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
        </div>
    )
};

export default Library;
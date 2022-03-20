import React from 'react'
import { useEffect} from 'react';
import Film from '../Film/Film';
import styles from './Library.module.scss';

export default function Library(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className={styles.library}>
                {JSON.parse(localStorage.getItem("movies")) ? JSON.parse(localStorage.getItem("movies")).map(movie => {
                    return (
                        <Film
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            func={props.func}
                        />
                    );
                    }) : ""}
                </section>
    )
}


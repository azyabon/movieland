import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Film from '../../components/Film/Film';
import Preview from '../../components/Preview/Preview';
import Search from '../../components/Search/Search';
import styles from './home.module.scss';
import movies from '../../store/movies';


const Home = observer(() => {

    useEffect(() => {
        movies.getPopularMovies();
    }, [])

    function saveID(id) {
        localStorage.setItem("RMovieID", id);
    }

    return (
            <div className={styles.wrapper}>
                {movies.isFetching ? <img className={styles.load} src="./spin.gif" alt="load" /> : null}
                <Preview
                    {...movies.preview}
                />
                <Search />
                <div className={styles.container}>
                    <div className={styles.head}>
                        <h1 className={styles.title}>{movies.title} </h1>
                        <img src="./filter.png" alt="sort" className={styles.sort} />
                    </div>
                    <div className={styles.movies}>
                        {movies.movies.length === 0 ? <span className={styles.error}>No such movie found</span> : movies.movies.map(movie => {
                            return (
                                <Film
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    poster={movie.poster_path}
                                    func={saveID}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
    );
});

export default Home;

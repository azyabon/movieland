import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Header from '../Header/Header';
import Film from '../Film/Film';
import Preview from '../Preview/Preview';
import Search from '../Search/Search';
import Details from '../Details/Details';
import styles from './App.module.scss';
import Library from '../Library/Library';
import movies from '../../store/movies';


const App = observer(() => {

  useEffect(() => {
      movies.getPopularMovies();
  }, [])

  function saveID(id) {
    localStorage.setItem("RMovieID", id);
  }

  const getMoviesFromLC = () => {
    const moviesLocalStorage = localStorage.getItem("movies");
    if (moviesLocalStorage !== null) {
      return JSON.parse(moviesLocalStorage);
    }
    return [];
  }

    return (
      <Router>
        <div className={styles.wrapper}>
        {movies.isFetching ? <img className={styles.load} src="./spin.gif" alt="load" /> : null}
          <Header />
          <Switch>
            <Route exact path="/">
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
            </Route>
            <Route path="/details">
              <Details
                local={getMoviesFromLC}
              />
            </Route>
            <Route path="/library">
            <div className={styles.container}>
              <h2>Your library</h2>
              <Library
                func={saveID}
              />
            </div>
            </Route>
          </Switch>
          <footer><a className={styles.footer} href="https://www.themoviedb.org/?language=ru" target="_blank" rel="noreferrer">Powered by TheMovieDB</a></footer>
        </div>
      </Router>
    );
});

export default App;

import React, {useState, useEffect} from 'react';
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
import movies from '../store/movies';

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

const App = observer(() => {

  const [load, setLoad] = useState(false);

  useEffect(() => {
    movies.getPopularMovies();
  }, [])

  async function searchMovies(e) {
    setLoad(true);
    e.preventDefault();
    const MOVIE = e.target[0].value;
    if (MOVIE) {
      try {
        const RESPONSE = await fetch(SEARCH_URL + MOVIE);
        const DATA = await RESPONSE.json();
        movies.saveMovies(DATA.results, MOVIE);
      } catch(e) {
        alert(e);
      }
    } else {
      alert("Enter the title of the movie!");
    }
    setLoad(false);
  }

  function saveID(id) {
    localStorage.setItem("RMovieID", id);
  }

  const getMovies = () => {
    const moviesLocalStorage = localStorage.getItem("movies");
    if (moviesLocalStorage !== null) {
      return JSON.parse(moviesLocalStorage);
    }
    return [];
  }

    return (
      <Router>
        <div className={styles.wrapper}>
        {load ? <img className={styles.load} src="./spin.gif" alt="load" /> : ""}
          <Header />
          <Switch>
            <Route exact path="/">
              <Preview 
              {...movies.preview}
              />
              <Search 
              func={searchMovies}
              />
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
                local={getMovies}
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

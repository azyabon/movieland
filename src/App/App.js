import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from '../Header/Header';
import Film from '../Film/Film';
import Preview from '../Preview/Preview';
import Search from '../Search/Search';
import Details from '../Details/Details';
import styles from './App.module.scss';
import Library from '../Library/Library';

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [preview, setPreview] = useState({});
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(TOP_URL)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setPreview(data.results[0]);
      })
  }, [])

  async function searchMovies(e) {
    setLoad(true);
    e.preventDefault();
    const MOVIE = e.target[0].value;
    if (MOVIE) {
      try {
        const RESPONSE = await fetch(SEARCH_URL + MOVIE);
        const DATA = await RESPONSE.json();
        setMovies(DATA.results);
        console.log(DATA.results)
        setTitle(MOVIE);
      } catch(e) {
        alert(e);
      }
    } else {
      alert("Enter the title of the movie!")
    }
    setLoad(false);
  }

  function changeId(id) {
    setId(id);
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
              {...preview}
              />
              <Search 
              func={searchMovies}
              />
              <div className={styles.container}>
                <div className={styles.head}>
                  <h1 className={styles.title}>{title ? `Request: ${title}` : "Popular Movies"} </h1>
                  <img src="./filter.png" alt="sort" className={styles.sort} />
                </div>
                  <div className={styles.movies}>
                    {movies.length === 0 ? <span className={styles.error}>No such movie found</span> : movies.map(movie => {
                      return (
                        <Film 
                          key={movie.id}
                          id={movie.id}
                          title={movie.title}
                          poster={movie.poster_path}
                          func={changeId}
                        />
                      );
                    })}
                  </div>
              </div>
            </Route>
            <Route path="/details">
              <Details
                id={id}
                local={getMovies}
              />
            </Route>
            <Route path="/library">
            <div className={styles.container}>
              <h2>Your library</h2>
              <Library
                movies={movies}
                func={changeId}
              />
            </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

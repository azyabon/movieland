import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from '../Header/Header';
import Film from '../Film/Film';
import Preview from '../Preview/Preview';
import Search from '../Input/Search';
import styles from './App.module.scss';

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(TOP_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        setMovies(data.results);
      })
  }, [])

  async function searchMovies(e) {
    e.preventDefault();
    const MOVIE = e.target[0].value;
    if (MOVIE) {
      const RESPONSE = await fetch(SEARCH_URL + MOVIE);
      const DATA = await RESPONSE.json();
      setMovies(DATA.results);
    } else {
      alert("Вы ничего не ввели!")
    }
  }

    return (
        <div className={styles.wrapper}>
          <Header />
          <Preview 
            {...movies[0]}
          />
          <Search 
            func={searchMovies}
          />
          <div className={styles.container}>
          <h1 className={styles.title}>Popular Movies</h1>
            <div className={styles.films}>
              {movies.map(movie => {
                return <Film key={movie.id} {...movie} />
              })}
            </div>
          </div>
        </div>
    );
}

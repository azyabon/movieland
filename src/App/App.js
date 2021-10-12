import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from '../Header/Header';
import Film from '../Film/Film';
import styles from './App.module.scss';

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const SEARCH = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(TOP_URL)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      })
  }, [])

    return (
        <div className={styles.wrapper}>
          <Header />
          {movies.length > 0 && movies.map(movie => {
            return <Film key={movie.id} {...movie} />
          })}
        </div>
    );
}

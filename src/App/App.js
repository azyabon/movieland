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
import Details from '../Details/Details';
import styles from './App.module.scss';

const API_KEY = "api_key=36d3b9492c7c489a5890ffdecffba2e5";
const TOP_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [preview, setPreview] = useState({});
  const [id, setId] = useState("");
  // const [isTitle, setIsTitle] = useState(false);
  // const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(TOP_URL)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setPreview(data.results[0]);
      })
  }, [])

  async function searchMovies(e) {
    e.preventDefault();
    const MOVIE = e.target[0].value;
    if (MOVIE) {
      try {
        const RESPONSE = await fetch(SEARCH_URL + MOVIE);
        const DATA = await RESPONSE.json();
        setMovies(DATA.results);
      } catch(e) {
        alert(e);
      }
    } else {
      alert("Вы ничего не ввели!")
    }
  }

  function changeId(id) {
    setId(id);
  }

    return (
      <Router>
        <div className={styles.wrapper}>
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
                <h1 className={styles.title}>Popular Movies</h1>
                  <div className={styles.films}>
                    {movies.map(movie => {
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
              />
            </Route>
            <Route path="/favorites">
              123
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

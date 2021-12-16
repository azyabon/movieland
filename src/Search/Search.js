import styles from './Search.module.scss';
import movies from '../store/movies';

const Search = (props) => {
    return(
        <form className={styles.form} onSubmit={e => movies.searchMovies(e)}>
            <div className={styles.container}>
                <input placeholder="Search" name="movie" className={styles.input} />
                <img  className={styles.loupe} src="./search.png" alt="loupe" />
            </div>
        </form>
    );
}

export default Search;
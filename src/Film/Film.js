import styles from './Film.module.scss';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const Film = ({title, poster_path}) => {
    return(
        <div className={styles.film}>
            <img className={styles.film__poster} src={poster_path  ? IMG_URL + poster_path : NO_IMG} alt={title} />
        </div>
    );
}

export default Film;
import styles from './Film.module.scss';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const RAND_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const Film = ({title, poster_path}) => {
    return(
        <div className={styles.header}>
            {title}
            <img src={IMG_URL + poster_path} alt={title} />
        </div>
    );
}

export default Film;
import styles from './Film.module.scss';

import {
    Link
} from 'react-router-dom';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const Film = (props) => {
    return(
        <div className={styles.film}>
            <Link to="/details" onClick={() => props.func(props.id)}>
                <img className={styles.film__poster} src={props.poster  ? IMG_URL + props.poster : NO_IMG} alt={props.title} />
                <img className={styles.favourite} src="./favourite.png" alt="favourite" />
            </Link>
        </div>
    );
}

export default Film;
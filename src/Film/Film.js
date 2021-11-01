import styles from './Film.module.scss';

import {
    Link
} from 'react-router-dom';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const Film = (props) => {
    return(
        <div className={styles.movie} onClick={() => props.func(props.id)}>
            <Link to="/details">
                <img className={styles.movie__poster} src={props.poster  ? IMG_URL + props.poster : NO_IMG} alt={props.title} />
            </Link>
        </div>
    );
}

export default Film;
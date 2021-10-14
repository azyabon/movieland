import styles from './Preview.module.scss';

const IMG_URL = `https://image.tmdb.org/t/p/w1280`;

const Preview = ({title, backdrop_path, overview}) => {
    return(
        <div className={styles.preview}>
            <img className={styles.preview__bgc} src={IMG_URL + backdrop_path} alt={title} />
                <div className={styles.preview__info}>
                    <h1 className={styles.poster__title}>{title}</h1>
                    <p className={styles.poster__overview}>{overview}</p>
                </div>
        </div>
    );
}

export default Preview;
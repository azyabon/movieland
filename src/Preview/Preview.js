import styles from './Preview.module.scss';

const IMG_URL = `https://image.tmdb.org/t/p/original`;

const Preview = ({title, backdrop_path, overview}) => {
    const WIDTH = 1833

    const handlePrevArrowClick = () => {
      console.log(1)
    }

    const handleNextArrowClick = () => {
      console.log(1)
    }

    return(
            <div className={styles.window}>
                <span className={styles.prev} onClick={handlePrevArrowClick}>prev</span>
                <div className={styles.previews}>
                    <div className={styles.preview}>
                        <img className={styles.preview__bgc} src={IMG_URL + backdrop_path} alt={title} />
                        <div className={styles.preview__info}>
                            <h1 className={styles.poster__title}>{title}</h1>
                            <p className={styles.poster__overview}>{overview}</p>
                        </div>
                    </div>
                    <div className={styles.preview}>
                        <img className={styles.preview__bgc} src={IMG_URL + backdrop_path} alt={title} />
                        <div className={styles.preview__info}>
                            <h1 className={styles.poster__title}>{title}</h1>
                            <p className={styles.poster__overview}>{overview}</p>
                        </div>
                    </div>
                    <div className={styles.preview}>
                        <img className={styles.preview__bgc} src={IMG_URL + backdrop_path} alt={title} />
                        <div className={styles.preview__info}>
                            <h1 className={styles.poster__title}>{title}</h1>
                            <p className={styles.poster__overview}>{overview}</p>
                        </div>
                    </div>
                </div>
                <span className={styles.next} onClick={handleNextArrowClick}>next</span>
            </div>
    );
}

export default Preview;
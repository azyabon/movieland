import styles from './Actor.module.scss';

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const NO_IMG = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const Actor = ({name, profile_path, character}) => {
    return(
            <div className={styles.actor}>
            <img src={profile_path ? IMG_URL + profile_path : NO_IMG} alt="actor" />
            <div className={styles.actor__info}>
                <h2>{name}</h2>
                <p>{character}</p>
            </div>
        </div>
    );
}

export default Actor;
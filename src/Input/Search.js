import styles from './Search.module.scss';

const Search = (props) => {
    return(
        <form className={styles.form} onSubmit={props.func}>
            <div className={styles.container}>
                <input placeholder="Search" name="movie" className={styles.input} />
                <img  className={styles.loupe} src="./loupe.png" alt="loupe" />
            </div>
        </form>
    );
}

export default Search;
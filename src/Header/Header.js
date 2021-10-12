import styles from './Header.module.scss';

const Header = (props) => {
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <ul className={styles.header__menu}>
                    <li><img className={styles.header__logo} src="./3d-movie.png" alt="" /></li>
                    <li>Home</li>
                    <li>Favorites</li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
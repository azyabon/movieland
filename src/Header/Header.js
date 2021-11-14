import styles from './Header.module.scss';

import {
    Link
} from 'react-router-dom';
import App from '../App/App';

const Header = (props) => {
    const style = {
        "color": "#fff",
        "textDecoration": "none",
    }
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <ul className={styles.header__menu}>
                    <li>
                        <img className={styles.header__logo} src="./3d-movie.png" alt="" />
                        <img className={styles.powered} src="./tmdb.png" alt="" />
                    </li>
                    <li><Link style={style} to="/">Home</Link></li>
                    <li><Link style={style} to="/library">Library</Link></li>
                    <li>
                        <a  target="_blank" href="https://github.com/azyabon/reactmovie_app"><img className={styles.git} src="./github.png" alt="" /></a>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
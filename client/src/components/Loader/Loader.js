import styles from './Loader.module.scss'
import movies from "../../store/movies";
import {observer} from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

const Loader = observer(()=> {
    //TODO: fix position
    return (
        <>
            <CSSTransition
                in={movies.isLoad}
                timeout={500}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterActive: styles.entering,
                    enterDone: styles.entered,
                    exitActive: styles.exiting,
                    exitDone: styles.exited
                }}
            >
                <div className={styles.circle} />
            </CSSTransition>
        </>
    );
});

export default Loader;
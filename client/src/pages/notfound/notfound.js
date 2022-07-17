import { Link } from "react-router-dom";

import styles from "./notfound.module.scss";

const Notfound = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>404</h1>
        <span>
          <Link to="/">Вернитесь на главную страницу</Link>
        </span>
      </div>
    </div>
  );
};

export default Notfound;

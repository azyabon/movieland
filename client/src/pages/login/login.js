import styles from './login.module.scss';
import axios from "axios";

const Login = () => {

    const SignIn = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/login", {
            username: e.target.elements[0].value,
            password: e.target.elements[1].value
        }).then(data => console.log(data)).catch(e => console.error(e))
    }

    return (
        <>
            <form className={styles.form} onSubmit={(e) => SignIn(e)}>
                <h3 className={styles.form__title}>Sign In</h3>
                <div className={styles.form__row}>
                    <input type="text" id="username" placeholder=" " className={styles.form__row_input} autoComplete="off"/>
                    <label htmlFor="username" className={styles.form__row_label}>Username</label>
                </div>
                <div className={styles.form__row}>
                    <input type="password" id="password" placeholder=" " className={styles.form__row_input} autoComplete="off"/>
                    <label htmlFor="password" className={styles.form__row_label}>Password</label>
                </div>
                <button className={styles.form__btn}>Submit</button>
            </form>
        </>
    );
};

export default Login;
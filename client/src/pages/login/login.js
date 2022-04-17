import styles from './login.module.scss';
import axios from "axios";

const Login = () => {

    const LogIn = (e) => {
        e.preventDefault()
        // axios.post({
        //     method: 'POST',
        //     url: "http://localhost:5000/auth/login",
        //     data: {
        //         username: "admin",
        //         password: "admin"
        //     },
        //     header: {
        //
        //     }
        // }).then(data => console.log(data)).catch(e => console.log(e))
    }

    return (
        <>
            <form className={styles.form} onSubmit={(e) => LogIn(e)}>
                <h3 className={styles.form_title}>Welcome!</h3>
                <label htmlFor="username">Username</label>
                <input className={styles.form_input} type="text" id="username"/>
                <label htmlFor="password">Password</label>
                <input className={styles.form_input} type="text" id="password"/>
                <button className={styles.form_submit}>Sign in</button>
            </form>
        </>
    );
};

export default Login;
import styles from './registration.module.scss';
import axios from "axios";
import {useEffect, useState} from "react";
import Modal from "../../components/Modal/Modal";

const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameDirty, setUsernameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [usernameError, setUsernameError] = useState("Имя пользователя не может быть пустым");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [emailError, setEmailError] = useState("Емэил не может быть пустым");
    const [formValid, setFormValid] = useState(false);
    const [modal, setModal] = useState(false);
    const [registrError, setRegistrError] = useState("")

    useEffect(() => {
        if (emailError || passwordError || usernameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError, usernameError])

    const SignUp = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/registration", {
            username: e.target.elements[0].value,
            password: e.target.elements[1].value,
            email: e.target.elements[2].value,
        }).then(data => console.log(data))
            .catch(error => {
                console.log(error.toJSON());
                setModal(true);
                setTimeout(() => {
                    setModal(false);
                }, 3000)
            })
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный емэил");
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 12) {
            setPasswordError("Пароль должен быть длиннее 3 и меньше 12 символов");
            if (!e.target.value) {
                setPasswordError("Пароль не может быть пустым")
            }
        } else {
            setPasswordError("")
        }
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 12) {
            setUsernameError("Имя пользователя должно быть длиннее 3 и меньше 20 символов");
            if (!e.target.value) {
                setUsernameError("Имя пользователя не может быть пустым")
            }
        } else {
            setUsernameError("")
        }
    }

    const blurHandler = (e) => {
        switch (e.target.id) {
            case "username":
                setUsernameDirty(true)
                break;
            case "password":
                setPasswordDirty(true)
                break;
            case "email":
                setEmailDirty(true)
                break;
        }
    }

    return (
        <>
            <form className={styles.form} onSubmit={(e) => SignUp(e)}>
                <Modal open={modal}>
                    <p>Ошибка регистрации</p>
                </Modal>
                <h3 className={styles.form__title}>Sign Up</h3>
                <div className={styles.form__row}>
                    {(usernameDirty && usernameError) && <div style={{color: "red"}}>{usernameError}</div>}
                    <input value={username} onChange={e => usernameHandler(e)} onBlur={e => blurHandler(e)} type="text" id="username" placeholder=" " className={styles.form__row_input} autoComplete="off"/>
                    <label htmlFor="username" className={styles.form__row_label}>Username</label>
                </div>
                <div className={styles.form__row}>
                    {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                    <input value={password} onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} type="password" id="password" placeholder=" " className={styles.form__row_input} autoComplete="off"/>
                    <label htmlFor="password" className={styles.form__row_label}>Password</label>
                </div>
                <div className={styles.form__row}>
                    {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
                    <input value={email} onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} type="email" id="email" placeholder=" " className={styles.form__row_input} autoComplete="off"/>
                    <label htmlFor="email" className={styles.form__row_label}>Email</label>
                </div>
                <button disabled={!formValid} className={styles.form__btn}>Submit</button>
            </form>
        </>
    );
};

export default Registration;
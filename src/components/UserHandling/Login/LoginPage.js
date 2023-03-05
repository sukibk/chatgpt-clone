import LoginForm from "./LoginForm";
import styles from './LoginPage.module.css';

const LoginPage = () =>{
    return <section className={styles['login-page']}>
        <div className={styles.elements}>
        <LoginForm></LoginForm>
        </div>
    </section>
}

export default LoginPage;
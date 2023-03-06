import LoginForm from "./Login/LoginForm";
import styles from './HomePage.module.css';
import RegisterForm from "./Register/RegisterForm";
import {useContext} from "react";
import LoginContext from "../store/login-context";

const HomePage = () =>{
    const ctx = useContext(LoginContext);

    return <section className={styles['login-page']}>
        <div className={styles.elements}>
            {ctx.currentPage}
        </div>
    </section>
}

export default HomePage;
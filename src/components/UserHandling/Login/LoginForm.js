import Input from "./Input";
import styles from "./LoginForm.module.css"
import useInput from "../../hooks/use-input";
import {useContext, useEffect, useState} from "react";
import ChatGPT from "../../ChatGPT";
import LoginContext from "../../store/login-context";

const LoginForm = (props) => {

    const [error, setError] = useState();
    const [users, setusers] = useState([]);
    const [changeScreen, setChangeScreen] = useState(false);
    const [initialRenderOver, setInitialRenderOver] = useState(false);

    const ctx = useContext(LoginContext);


    const {input: usernameValue,
        isInputValid: isUsernameValid,
        inputBlurHandler: onUsernameBlur,
        inputChangeHandler: onUsernameChange,
        resetInput: usernameReset,
        inputStyle: usernameStyle} = useInput((value) => value.trim().length > 4)

    const {input: passwordValue,
        isInputValid: isPasswordValid,
        inputBlurHandler: onPasswordBlur,
        inputChangeHandler: onPasswordChange,
        resetInput: passwordReset,
        inputStyle: passwordStyle} = useInput((value) => value.trim().length >= 8)

    let isFormValid = true;

    if(!isUsernameValid || !isPasswordValid) isFormValid = false;

    //-----------------------------

    const fetchMoviesHandler = async () => {
        // setIsLoading(true);
        // setError(null);
        try {
            const response = await fetch('https://react-http-app-9d66f-default-rtdb.firebaseio.com/users.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const users = [];


            for(const key in data){
                users.push(data[key])
            }

            setusers(users);
        } catch (error) {
            setError(error.message);
        }
        // setIsLoading(false);
    };

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        if(!isFormValid) return;
        fetchMoviesHandler();
    }

    useEffect(()=>{
        if(initialRenderOver) {
            const foundUser = [];
            for(let i = 1; i < users.length; i++){
                if(users[i].username === usernameValue && users[i].password === passwordValue)
                    foundUser.push(users[i])
            }
            if(foundUser.length !== 0){
                ctx.updatePage();
            }
        }
        else setInitialRenderOver(true);
    }, [users])


    return <>{!changeScreen ? <form className={styles['form-control']} onSubmit={loginSubmitHandler}>
        <Input styling={usernameStyle} placeholder='Username' value={usernameValue}
               type='text' onChange={onUsernameChange} onBlur={onUsernameBlur}/>

        <Input styling={passwordStyle} placeholder='Password' value={passwordValue}
               type='password' onChange={onPasswordChange} onBlur={onPasswordBlur}/>
        <button disabled={!isFormValid} type='submit'>LOG IN</button>
    </form> : <ChatGPT />}</>
}

export default LoginForm;
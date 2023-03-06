import Input from "../Input/Input";
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
    const [isLogging, setIsLogging] = useState(false);
    const [announcement, setAnnouncement] = useState('Logging in...');

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

    const fetchUsers = async () => {
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
        setIsLogging(true);
        setAnnouncement('Logging in...')
        e.preventDefault();
        if(!isFormValid) return;
        fetchUsers();
    }

    useEffect(()=>{
        if(initialRenderOver) {
            const foundUser = [];
            for(let i = 1; i < users.length; i++){
                if(users[i].username === usernameValue && users[i].password === passwordValue)
                    foundUser.push(users[i])
            }
            if(foundUser.length !== 0){
                setIsLogging(false);
                ctx.updatePage('ChatGPT');
                ctx.updateState(true);
            }
            else setAnnouncement('Wrong Credentials')
        }
        else setInitialRenderOver(true);
    }, [users])



    return <><form className={styles['form-control']} onSubmit={loginSubmitHandler}>
        <Input styling={usernameStyle} placeholder='Username' value={usernameValue}
               type='text' onChange={onUsernameChange} onBlur={onUsernameBlur}/>

        <Input styling={passwordStyle} placeholder='Password' value={passwordValue}
               type='password' onChange={onPasswordChange} onBlur={onPasswordBlur}/>
        <button disabled={!isFormValid} type='submit'>LOG IN</button>
        <p>Don't have an account yet? <span onClick={()=>ctx.updatePage('Register')}>Register here!</span></p>
        {isLogging && <><br/><br/><center>{announcement}</center></>}
    </form></>
}

export default LoginForm;
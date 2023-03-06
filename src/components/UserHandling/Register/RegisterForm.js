import {useContext, useEffect, useState} from "react";
import LoginContext from "../../store/login-context";
import useInput from "../../hooks/use-input";
import styles from "./RegisterForm.module.css";
import Input from "../Input/Input";


const RegisterForm = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [initialRenderOver, setInitialRenderOver] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [announcement, setAnnouncement] = useState('Creating account...');

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

            setUsers(users);
        } catch (error) {
            setError(error.message);
        }
        // setIsLoading(false);
    };

    async function addUserHandler(user) {
        const response = await fetch('https://react-http-app-9d66f-default-rtdb.firebaseio.com/users.json',
            {method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }});

    }


    const loginSubmitHandler = (e) => {
        setIsRegistering(true);
        setAnnouncement('Creating account...')
        e.preventDefault();
        if(!isFormValid) return;
        fetchUsers();
    }

    useEffect(()=>{
        if(initialRenderOver) {
            const foundUser = [];
            for(let i = 1; i < users.length; i++){
                if(users[i].username === usernameValue.trim())
                    foundUser.push(users[i])
            }
            if(foundUser.length === 0){
                addUserHandler({username: usernameValue, password: passwordValue})
                setAnnouncement('Account created! Redirecting back to Log In...')
                setTimeout(()=>{
                    setIsRegistering(false);
                    ctx.updatePage(0);
                }, 3000)
            }
            else setAnnouncement('User already registered!')
        }
        else setInitialRenderOver(true);
    }, [users])



    return <><form className={styles['form-control']} onSubmit={loginSubmitHandler}>
        <Input styling={usernameStyle} placeholder='Username' value={usernameValue}
               type='text' onChange={onUsernameChange} onBlur={onUsernameBlur}/>

        <Input styling={passwordStyle} placeholder='Password' value={passwordValue}
               type='password' onChange={onPasswordChange} onBlur={onPasswordBlur}/>
        <button disabled={!isFormValid} type='submit'>REGISTER</button>
        <p>Already have an account? <span onClick={ctx.updatePage.bind(0)}>Login here!</span></p>
        {isRegistering && <><br/><br/><center>{announcement}</center></>}
    </form></>
}

export default RegisterForm;
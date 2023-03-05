import Input from "./Input";
import styles from "./LoginForm.module.css"
import useInput from "../../hooks/use-input";

const LoginForm = (props) => {

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

    const loginSubmitHandler = () => {
        if(!isFormValid) return;

    }

    return <form className={styles['form-control']} onSubmit={loginSubmitHandler}>
        <Input styling={usernameStyle} placeholder='Username' value={usernameValue}
               type='text' onChange={onUsernameChange} onBlur={onUsernameBlur}/>

        <Input styling={passwordStyle} placeholder='Password' value={passwordValue}
               type='password' onChange={onPasswordChange} onBlur={onPasswordBlur}/>
        <button disabled={!isFormValid} type='submit'>LOG IN</button>
    </form>
}

export default LoginForm;
import {useState} from 'react';
import LoginContext from "./login-context";

const LoginProvider = (props) => {
    const [loginContext, setLoginContext] = useState(false)

    const updatePage = () => {
        setLoginContext(true);
    }

    return (
        <LoginContext.Provider value={{changeScreen: loginContext, updatePage: updatePage}}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
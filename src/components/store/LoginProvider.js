import {useState} from 'react';
import LoginContext from "./login-context";

const LoginProvider = (props) => {
    const [loginContext, setLoginContext] = useState(0)

    const updatePage = (state) => {
        setLoginContext(state);
    }

    return (
        <LoginContext.Provider value={{changeScreen: loginContext, updatePage: updatePage}}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
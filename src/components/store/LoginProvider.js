import {useState, useEffect} from 'react';
import LoginContext from "./login-context";
import LoginForm from "../UserHandling/Login/LoginForm";
import RegisterForm from "../UserHandling/Register/RegisterForm";
import ChatGPT from "../ChatGPT";

const LoginProvider = (props) => {

    const [showPage, setShowPage] = useState(false);
    const [elementToShow, setElementToShow] = useState(<LoginForm/>)

    useEffect(() => {
        const storedPage = localStorage.getItem('showPage');
        if(storedPage === 'Login'){
            setElementToShow(<LoginForm />);
            setShowPage(false);
        }
        if(storedPage === 'Register'){
            setElementToShow(<RegisterForm />)
            setShowPage(false);
        }
        if(storedPage === 'ChatGPT'){
            setElementToShow(<ChatGPT />)
            setShowPage(true);
        }
    }, [])

    const updatePage = (page) => {
        localStorage.setItem('showPage', page);
        switch (page){
            case 'Login':
                setElementToShow(<LoginForm />);
                break;
            case 'Register':
                setElementToShow(<RegisterForm />);
                break;
            case 'ChatGPT':
                setElementToShow(<ChatGPT />)
                break;
        }
    }

    const updateState = (state) =>{
        setShowPage(state);
    }


    return (
        <LoginContext.Provider value={{currentPage: elementToShow, updatePage: updatePage, showPage: showPage, updateState: updateState}}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
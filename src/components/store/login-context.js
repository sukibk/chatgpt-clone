import React from "react";

const LoginContext = React.createContext({
    changeScreen: false,
    updatePage: ()=>{}
})

export default LoginContext;
import React from "react";

const LoginContext = React.createContext({
    changeScreen: 0,
    updatePage: ()=>{}
})

export default LoginContext;
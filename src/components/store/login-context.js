import React from "react";

const LoginContext = React.createContext({
    currentPage: '',
    updatePage: () => {},
    showPage: false,
    updateState: () => {}
})

export default LoginContext;
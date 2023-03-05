import ChatGPT from "./components/ChatGPT";
import LoginPage from "./components/UserHandling/Login/LoginPage";
import {useContext} from "react";
import LoginContext from "./components/store/login-context";

function App() {
  const ctx = useContext(LoginContext);

  return <>
    {!ctx.changeScreen ? <LoginPage /> : <ChatGPT />}
    </>
}

export default App;

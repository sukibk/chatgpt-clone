import ChatGPT from "./components/ChatGPT";
import HomePage from "./components/UserHandling/HomePage";
import {useContext} from "react";
import LoginContext from "./components/store/login-context";

function App() {
  const ctx = useContext(LoginContext);
  let currentPage = <HomePage />

  if(ctx.changeScreen === 0 || ctx.changeScreen === 1) currentPage = <HomePage />
  if(ctx.changeScreen === 2) currentPage = <ChatGPT />

  return <>
    {currentPage}
    </>
}

export default App;

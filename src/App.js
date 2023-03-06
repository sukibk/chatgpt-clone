import ChatGPT from "./components/ChatGPT";
import HomePage from "./components/UserHandling/HomePage";
import {useContext} from "react";
import LoginContext from "./components/store/login-context";

function App() {
  const ctx = useContext(LoginContext);
  let currentPage;

  if(ctx.showPage === false) currentPage = <HomePage />
  if(ctx.showPage === true) currentPage = <ChatGPT />

  return <>
    {currentPage}
    </>
}

export default App;

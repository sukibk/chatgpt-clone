import {useEffect, useState, useRef, useContext} from "react";
import styles from './ChatGpt.module.css';
import LoginContext from "./store/login-context";

const { Configuration, OpenAIApi } = require("openai");

const ChatGPT = (props) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('Welcome to Utopia AI. How can I help you?');
    const [chat, setChat] = useState([{type: 'answer', content: answer}]);

    const didMountRef = useRef(false);

    const ctx = useContext(LoginContext);

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const updateQuestionHandler = e =>{
        setQuestion(e.target.value);
    }

    async function getResponse(){
        const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: question}],
            });
            setAnswer(completion.data.choices[0].message.content)
    }

    useEffect(()=>{
        if ( didMountRef.current ) {
            setChat([...chat, {type: 'answer', content: answer}])
        } else {
            didMountRef.current = true;
        }
    }, [answer])

    const submitFormHandler = e =>{
        e.preventDefault();
        setChat([...chat, {type: 'question', content: question}] );
        getResponse();
    }


    const chats = chat.map(item => {
        // if(item.key % 2 === 0)
        // return <><p key={item.key} className="name">{item.content}</p> <br/></>
        // else
        //     return <><p key={item.key} className="message">{item.content}</p> <br/></>
        if(item.type === 'answer')
        return <div className={styles["chatbox__messages__user-message--ind-message"]}>
            <p className={styles["name"]}>Utopia AI</p> <br/>
            <p className={styles["message"]}>{item.content}</p>
        </div>
        else
            return <div className={styles["chatbox__messages__user-message--ind-message-user"]}>
                <p className={styles["name"]}>User</p> <br/>
                <p className={styles["message"]}>{item.content}</p>
            </div>
    });

    const logOutHandler = () => {
        ctx.updatePage('Login');
        ctx.updateState(false);
    }

    return (
        <div className={styles["container"]}>
            <button className={styles["logout-button"]} onClick={logOutHandler}>LOG OUT</button>
            <h1>UTOPIA AI</h1>
            <div className={styles["chatbox"]}>
                <div className={styles['chatbox__user-list']}>
                    <h1>CHAT HISTORY</h1>
                    <div className={styles['chatbox__user--active']}>
                        <p>CHAT 1</p>
                    </div>
                    <div className={styles['chatbox__user--busy']}>
                        <p>CHAT 2</p>
                    </div>
                    <div className={styles['chatbox__user--active']}>
                        <p>CHAT 3</p>
                    </div>
                    <div className={styles['chatbox__user--active']}>
                        <p>CHAT 4</p>
                    </div>
                    <div className={styles['chatbox__user--away']}>
                        <p>CHAT 5</p>
                    </div>
                </div>
                <div className={styles["marko"]}>
                    <div className={styles["chatbox__messages__user-message"]}>
                            {chats}
                    </div>
                </div>
                <form onSubmit={submitFormHandler}>
                    <input type="text" onBlur={updateQuestionHandler} placeholder="Enter your message" />
                    <button type='submit'>SEND</button>
                </form>
            </div>
        </div>

    )

}

export default ChatGPT;
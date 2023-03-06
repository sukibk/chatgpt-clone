import styles from "./Input.module.css";


const Input = (props) => {
    return(
        <div className={styles['input-control']}>
        <input className={props.styling} placeholder={props.placeholder} type={props.type} onChange={props.onChange} onBlur={props.onBlur}/>
        </div>)
}

export default Input;
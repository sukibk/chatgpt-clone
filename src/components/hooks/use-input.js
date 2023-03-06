import {useReducer} from "react";
import styles from '../UserHandling/Input/Input.module.css'

const initialInput = {
    value: '',
    isTouched: false
}

const inputReducer = (state, action) => {
    if(action.type === 'INPUT')
        return {
            value: action.value, isTouched: state.isTouched
        }
    if(action.type === 'BLUR')
        return{
            value: state.value, isTouched: true
        }
    if(action.type === 'RESET')
        return initialInput

    return initialInput
}

const useInput = (inputValidator) => {
    const[input, dispatchInput] = useReducer(inputReducer, initialInput);

    let isInputValid = inputValidator(input.value);

    let inputStyle = '';

    if(!isInputValid && input.isTouched) inputStyle= styles.invalid;

    const inputChangeHandler = (e) =>{
        dispatchInput({type: 'INPUT', value: e.target.value});
    }

    const inputBlurHandler = () => {
        dispatchInput({type: 'BLUR'})
    }

    const resetInput = () => {
        dispatchInput({type: 'RESET'})
    }

    return{
        input:  input.value,
        isInputValid,
        inputBlurHandler,
        inputChangeHandler,
        resetInput,
        inputStyle
    }
}

export default useInput;
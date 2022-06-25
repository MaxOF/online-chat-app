import React, {useReducer} from 'react';
import './App.css';
import {JoinBlock} from "./components/JoinBlock";
import socket from './socket'
import reducer from "./reducer";



function App() {

    const [state, dispatch] = useReducer(reducer, {
        isAuth: false
    })

    const onLogin = () => {
        dispatch({
            type: 'IS-AUTH',
            payload: true
        })
    }
    console.log(state)

    return (
        <div className="wrapper">
            {!state.isAuth && <JoinBlock onLogin={onLogin}/>}
        </div>
    );
}

export default App;

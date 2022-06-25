import React, {useEffect, useReducer} from 'react';
import './App.css';
import {JoinBlock, ObjType} from "./components/JoinBlock";
import socket from './socket'
import reducer from "./reducer";
import {Chat} from "./components/Chat";
import axios, {AxiosResponse} from "axios";



function App() {

    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })
    const setUsers = (users: []) => {
        dispatch({
            type: 'SET-USERS',
            payload: users
        })
    }

    const onLogin = async (obj: ObjType) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj)
        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        setUsers(data.users)
    }
    useEffect(() => {
        socket.on('ROOM:SET-USERS', setUsers)
    }, [])

    return (
        <div className="wrapper">
            {
                !state.joined
                ? <JoinBlock onLogin={onLogin}/>
                : <Chat
                        users={state.users}
                        messages={state.messages}
                    />
            }
        </div>
    );
}

export default App;

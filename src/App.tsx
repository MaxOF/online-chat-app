import React, {useEffect, useReducer} from 'react';
import './App.css';
import {JoinBlock, ObjType} from "./components/JoinBlock";
import socket from './socket'
import reducer from "./reducer";
import {Chat, MessageType} from "./components/Chat";
import axios from "axios";



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
    const addMessage = (message: MessageType) => {
        dispatch({
            type: 'NEW-MESSAGE',
            payload: message
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
        dispatch({
            type: 'SET-DATA',
            payload: data
        })
    }


    useEffect(() => {
        socket.on('ROOM:SET-USERS', setUsers)
        socket.on('ROOM:NEW-MESSAGE', message => {
            addMessage(message)
        })
    }, [])

    return (
        <div className="wrapper">
            {
                !state.joined
                    ? <JoinBlock onLogin={onLogin}/>
                    : <Chat
                        users={state.users}
                        messages={state.messages}
                        userName={state.userName}
                        roomId={state.roomId}
                        onAddMessage={addMessage}
                    />
            }
        </div>
    );
}

export default App;

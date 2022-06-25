import React, {ChangeEvent, useState} from 'react';
import axios from "axios";

export type PropsType = {
    onLogin: () => void
}

export const JoinBlock = ({onLogin}: PropsType) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const roomIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRoomId(e.currentTarget.value)
    }
    const userNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Wrong data')
        }
        setLoading(true)
        await axios.post('/rooms', {roomId, userName})
        onLogin()
    }

    return (
        <div className="join-block">
            <input type="text" placeholder="room ID" value={roomId} onChange={roomIdHandler}/>
            <input type="text" placeholder="Ваше имя" value={userName} onChange={userNameHandler}/>
            <button disabled={isLoading} className="btn" onClick={onEnter}>
                {isLoading ? ' Вход...' : 'Войти'}
            </button>
        </div>
    );
};

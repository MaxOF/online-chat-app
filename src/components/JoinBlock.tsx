import React, {ChangeEvent, useState} from 'react';

import axios from "axios";

type PropsType = {
    onLogin: (obj: ObjType) => void
}
export type ObjType = {
    roomId: string
    userName: string
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
        const obj: ObjType = {
            roomId,
            userName
        }
        setLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)
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

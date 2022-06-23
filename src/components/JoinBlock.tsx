import React from 'react';
import socket from '../socket'


export const JoinBlock = () => {
    return (
        <div className="join-block">
            <input type="text" placeholder="room ID" />
            <input type="text" placeholder="Ваше имя" />
            <button className="btn">Войти</button>
        </div>
    );
};

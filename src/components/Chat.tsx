import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import socket from '../socket'

type PropsType = {
    users: []
    messages: MessageType[]
    userName: string
    roomId: string
    onAddMessage: (message: MessageType) => void
}
export type MessageType = {
    text: string
    userName: string
}

export const Chat = ({users, messages, userName, roomId, onAddMessage}: PropsType) => {
    const [messageValue, setMessageValue] = useState<string>('')
    const messagesRef = useRef<any>(null)

    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageValue(e.currentTarget.value)
    }
    const onSendMessage = () => {
        if (messageValue.trim() !== '') {
            socket.emit('ROOM:NEW-MESSAGE', {
                roomId,
                userName,
                text: messageValue
            })
            onAddMessage({
                userName,
                text: messageValue
            })
            setMessageValue('')
        }
    }

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999)
    }, [messages])

    return (
        <div className="chat">
            <div className="chat-users">
                Room: <b>{roomId}</b>
                <hr/>
                <b>Online ({users.length}):</b>
                <ul>
                    {users.map((name, index) => <li key={index + name}>{name}</li>)}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {
                        messages.map(message => {
                            return <div className="message">
                                <p>{message.text}</p>
                                <div>
                                    <span>{message.userName}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
                <form>
                     <textarea
                         value={messageValue}
                         onChange={textAreaHandler}
                         className='form-control'
                         rows={3}
                     />
                    <button onClick={onSendMessage} type="button">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};


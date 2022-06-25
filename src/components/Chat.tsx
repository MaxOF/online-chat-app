import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    users: []
    messages: []
}

export const Chat = ({users, messages}:PropsType) => {
    const [messageValue, setMessageValue] = useState<string>('')

    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageValue(e.currentTarget.value)
    }

    return (
        <div className="chat">
            <div className="chat-users">
                Room: <b>{}</b>
                <hr/>
                <b>Online ({users.length}):</b>
                <ul>
                    {users.map((name, index) => <li key={index + name}>{name}</li>)}
                </ul>
            </div>
            <div className="chat-messages">
                <div className="messages">

                </div>
                <form>
          <textarea
              value={messageValue}
              onChange={textAreaHandler}
              className='form-control'
              rows={3}
          />
                    <button type="button" className="btn btn-primary">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};


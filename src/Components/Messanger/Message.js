import React from 'react'

export default function Message({ username, message }) {
    const isUser = username === message.username
    return (
        <div className={`message ${isUser && 'message__user'}`}>
            {isUser ?
                <p>Me</p>
                :
                <p>{message.username}</p>

            }

            <p>{message.text}</p>
        </div>
    )
}

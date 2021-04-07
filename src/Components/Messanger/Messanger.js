import React, { useState, useEffect, useRef } from 'react'
import db from '../Firebase'
import Message from './Message'
import firebase from 'firebase'
import './messanger.css'
import CloseIcon from '@material-ui/icons/Close';

export default function Messanger({ user }) {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState('')
    const [forumClick, setForumClick] = useState(false)
    // const [{ user }] = useStateValue();
    const messagesEndRef = useRef(null)

    // const forumPopup = () => {
    //     setForumClick(true)
    // }

    useEffect(() => {
        if (forumClick) scrollToBottom()
    }, [messages, forumClick])

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', inline: 'end' })
    }

    useEffect(() => {
        setUsername(user)
        // setUsername(user.displayName)
        //Get data(messages) from firebase
        db.collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
    }, [user])

    // useEffect(() => {
    //     setUsername(prompt('Enter username'))
    // }, [])


    const sendMessage = (e) => {
        e.preventDefault()
        //Sending data(messages) to firebase
        db.collection('messages').add({
            text: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        // setMessages([...messages, { username: username, text: input }]);
        setInput('');
    }
    return (
        <>
            {forumClick ?
                <div className="chatbox">
                    <div className="chatbox__title">
                        <h1 className="chatbox__title-h1">FORUM 🌐</h1>
                        <button className="chatbox__close-btn" onClick={() => { setForumClick(!forumClick) }}>
                            <CloseIcon style={{ fontSize: 35 }} />
                        </button>
                    </div>
                    <div className="chatbox__chat">
                        {messages.map((message, index) => {
                            return (
                                <Message
                                    key={index}
                                    username={username}
                                    message={message}
                                />
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbox__form">
                        <input className="chatbox__input-text" value={input} type="text" onChange={(e) => setInput(e.target.value)}></input>
                        <button className="chatbox__input-btn" type="submit" disabled={!input} value="Send" onClick={sendMessage}>Send</button>
                    </form>
                </div>
                :
                <button className="forumBtn" onClick={() => { setForumClick(!forumClick) }}>💬</button>
            }
        </>
    )
}

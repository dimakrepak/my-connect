import React, { useState, useEffect, useRef } from 'react'
import db from './Firebase'
import Message from './Message'
import firebase from 'firebase'
import './messanger.css'

export default function Messanger() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    useEffect(scrollToBottom, [messages])

    useEffect(() => {
        //Get data(messages) from firebase
        db.collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
    }, [])

    useEffect(() => {
        setUsername(prompt('Enter username'))
    }, [])


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
    console.log(messages);

    return (
        <div className="chatbox">
            <h1>Chat {username}</h1>
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
            <form className="chatbox__form">
                <input className="chatbox__input-text" value={input} type="text" onChange={(e) => setInput(e.target.value)}></input>
                <input className="chatbox__input-btn" type='submit' disabled={!input} value='Send' onClick={sendMessage}></input>
            </form>
        </div>
    )
}

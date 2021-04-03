import React from 'react'
import './login.css'
import { auth, provider } from './Firebase'

export default function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            console.log(result)
        }).catch(error => console.log(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <h1>Welcome to myConnect</h1>
                <h3>Sing in with GOOGLE</h3>
                <button onClick={signIn}>Click to Connect</button>
            </div>
        </div>
    )
}

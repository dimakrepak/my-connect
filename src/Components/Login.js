import React from 'react'
import './login.css'
import { auth, provider } from './Firebase'
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';

export default function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            console.log(result.user)
            dispatch(({
                type: actionTypes.SET_USER,
                user: result.user,
            }))
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

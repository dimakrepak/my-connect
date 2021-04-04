// import React, { useState, useEffect } from 'react'
import Login from './Login'
import Messanger from './Messanger/Messanger'
import Newspage from './Newspage/Newspage';
import { useStateValue } from './StateProvider';
import './main.css'

export default function Main() {
    const [{ user }] = useStateValue()
    return (
        <>
            {!user ?
                <Login />
                :
                <div className="main-page">
                    <Newspage />
                    <Messanger user={user.displayName} />
                </div >
            }
        </>
    )
}

// import React, { useState, useEffect } from 'react'
import Login from './Login'
import Messanger from './Messanger/Messanger'
import { useStateValue } from './StateProvider';

export default function Main() {
    const [{ user }, dispatch] = useStateValue()
    return (
        <div>
            {!user ?
                <Login />
                :
                <Messanger
                //  user={username} 
                />
            }
        </div>
    )
}

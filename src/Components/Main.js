import React, { useState, useEffect } from 'react'
import Login from './Login'
import Messanger from './Messanger/Messanger'

export default function Main({user}) {
    const [username, setUsername] = useState(null)
    return (
        <div>
            {!username ?
                <Login />
                :
                <Messanger user={username} />
            }
        </div>
    )
}

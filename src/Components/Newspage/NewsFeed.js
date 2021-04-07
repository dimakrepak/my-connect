import { useState, useEffect } from 'react'
import React from 'react'
import NewsCard from './NewsCard'
import db from '../Firebase'
import firebase from 'firebase'
import { useStateValue } from '../StateProvider'

export default function NewsFeed({ data }) {
    const [favorite, setFavorite] = useState([])

    const [{ user }] = useStateValue()

    useEffect(() => {
        //send to firestore
        if (favorite.length !== 0) {
            db.collection(`${user.displayName}`).add({
                user: user.displayName,
                favorite: favorite,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }, [favorite])

    return (
        <>
            <div className="newspage__grid">
                {data.map((d, index) => {
                    return (
                        <NewsCard
                            key={index}
                            title={d.title}
                            imgUrl={d.image}
                            description={d.description}
                            sourceUrl={d.url}
                            onAdd={() => { setFavorite(d) }}
                        />
                    )
                })}
            </div>
        </>
    )
}

import React, { useState, useEffect } from 'react'
import db from '../Firebase'
import './favorites.css'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import CloseIcon from '@material-ui/icons/Close';
import FavoritesUrl from './FavoritesUrl';

export default function Favorites({ user }) {
    const [favorites, setFavorite] = useState([])
    const [favoriteClick, setFavoriteClick] = useState(false)

    useEffect(() => {
        db.collection(`${user}`)
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setFavorite(snapshot.docs.map(doc => doc.data()))
            })
    }, [])
    console.log(favorites)
    return (
        <>
            {favoriteClick ?
                <div className="favorites__container">
                    <div className="favorites__title">
                        <h1 className="favorites__title-h1">My Favorite ❤️</h1>
                        <button className="favorites__close-btn" onClick={() => (setFavoriteClick(!favoriteClick))}>
                            <CloseIcon style={{ fontSize: 35 }} />
                        </button>
                    </div>
                    <div className="favorites__grid">
                        {favorites.map((f, index) => {
                            return (
                                <FavoritesUrl
                                    key={index}
                                    data={f}
                                />
                            )
                        })}
                    </div>
                </div>
                :
                <div className="favorites-btn" onClick={() => setFavoriteClick(!favoriteClick)}>
                    <FavoriteOutlinedIcon style={{ fontSize: 40, color: 'red' }} />
                </div>
            }
        </>
    )
}

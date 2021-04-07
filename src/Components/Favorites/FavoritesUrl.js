import React from 'react'

export default function FavoritesUrl({ data }) {
    return (
        <div className="favoriteCard">
            <img src={data.favorite.image} alt={data.favorite.title} width='100%'></img>
            <p>{data.favorite.title}</p>
            <a className="favoriteCard__link" href={data.favorite.url} target="_blank" rel="noreferrer">Original source</a>
        </div>
    )
}

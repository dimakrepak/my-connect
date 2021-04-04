import React from 'react'

export default function NewsCard({ title, imgUrl, description, sourceUrl }) {
    return (
        <div className="newscard">
            <h3>{title}</h3>
            <img src={imgUrl} width='100%' />
            <p><span className="newscard__description">{description}</span></p>
            <a href={sourceUrl} target="_blank"><span className="newscard__source">Original source</span></a>
        </div>
    )
}

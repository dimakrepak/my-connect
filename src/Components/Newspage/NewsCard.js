import React from 'react'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

export default function NewsCard({ title, imgUrl, description, sourceUrl, onAdd }) {
    return (
        <div className="newscard">
            <h3>{title}</h3>
            <img src={imgUrl} width='100%' alt={title} />
            <p><span className="newscard__description">{description}</span></p>
            <a href={sourceUrl} target="_blank" rel="noreferrer"><span className="newscard__source">Original source</span></a>

            <div className="newscard__liked-label">
                <button className="newscard__liked" onClick={onAdd}><FavoriteOutlinedIcon /></button>
            </div>
        </div>
    )
}

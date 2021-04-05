import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newspage.css'
import NewsCard from './NewsCard'

export default function Newspage() {
    const [data, setData] = useState([])
    useEffect(() => {

        const getTopHeaders = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'us',
                        apiKey: '5c724d1552f446aba1a0535718b868b2'
                    }
                })
                setData(response.data.articles)
                console.log(response.data.articles);
            } catch (error) {
                console.log(error.response);
            }
        }
        getTopHeaders()
    }, [])
    return (
        <div className="newspage">
            <div className="newspage__navbar">
                <h1>News Connect📰</h1>
                <input className="newspage__input" type="text" placeholder="🔍"></input>
                <div>
                    <label className="newspage__label">Select your country</label>
                    <select className="newspage__dropdown" name="country">
                        <option value="US">USA</option>
                    </select>
                </div>
            </div>
            <div className="newspage__grid">
                {data.map((d, index) => {
                    return (
                        <NewsCard
                            key={index}
                            title={d.title}
                            imgUrl={d.urlToImage}
                            description={d.description}
                            sourceUrl={d.url}
                        />
                    )
                })}
            </div>
        </div>
    )
}

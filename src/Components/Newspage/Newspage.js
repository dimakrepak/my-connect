import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newspage.css'
import NewsCard from './NewsCard'

const apiKey = 'b168264335a62a015d4859525bc40f07'

export default function Newspage() {
    const [data, setData] = useState([])

    useEffect(() => {

        const fetchNews = async () => {
        
            const api_key = "00996750f97644cca91df97021253add";
            const api_endpoint = `https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&language=en&apiKey=${api_key}`;

            await axios.get(api_endpoint).then(function (response) {
                const data = response.data;
                const news = data.articles.slice(0, 30);

                console.log(data);
            }).catch(function (err) {
                console.log(err);
            })
        }
        fetchNews()
        const getTopHeaders = async () => {
            try {
                const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
                    params: {
                        q: 'russia',
                        topic: 'breaking-news',
                        token: apiKey,
                        country: 'Any',
                        max: '10'
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
            <h1>TOP World News</h1>
            <div className="newspage__grid">
                {data.map((d, index) => {
                    return (
                        <NewsCard
                            key={index}
                            title={d.title}
                            imgUrl={d.image}
                            description={d.description}
                            sourceUrl={d.url}
                        />
                    )
                })}
            </div>
        </div>
    )
}

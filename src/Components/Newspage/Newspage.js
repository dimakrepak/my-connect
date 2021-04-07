import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './newspage.css'
import NewsFeed from './NewsFeed'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const apiKey = '49553fc2f2ffc628c209dd0bd60d8925'
const topics = ['breaking-news', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health']
const countries = ['au', 'br', 'ca', 'ch', 'cn', 'de', 'eg', 'es', 'fr', 'gb', 'gr', 'hk', 'ie', 'il',
    'in', 'it', 'jp', 'nl', 'no', 'pe', 'ph', 'pk', 'pt', 'ro', 'ru', 'se', 'sg', 'tw', 'ua', 'us']

export default function Newspage() {
    const [data, setData] = useState([])
    const [topic, setTopic] = useState('breaking-news')
    const [country, setCountry] = useState([])
    const [countryOption, setCountryOption] = useState('Any')
    const [searchValue, setSearchValue] = useState('')
    // const [topicClick, setTopicClick] = useState(false)

    const getCountries = async () => {
        const contriesData = []
        countries.map(async c => {
            let response = await axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${c}`)
            contriesData.push(response.data[0])
        })
        setCountry(contriesData)
    }
    const getTopHeaders = async () => {
        try {
            const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
                params: {
                    q: searchValue,
                    topic: topic,
                    token: apiKey,
                    country: countryOption,
                }
            })
            setData(response.data.articles)
            console.log(response.data.articles);
        } catch (error) {
            console.log(error.response);
        }
    }
    //Search api
    const searchQuery = async () => {
        try {
            const response = await axios.get(`https://gnews.io/api/v4/search`, {
                params: {
                    q: searchValue,
                    token: apiKey,
                }
            })
            setData(response.data.articles)
            console.log(response.data.articles);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getCountries()
    }, [])

    useEffect(() => {
        setSearchValue('')
        getTopHeaders()
    }, [topic, countryOption])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchValue('')
        searchQuery()
    }

    return (
        <div className="newspage">
            <div className="newspage__navbar">
                <h1>News Connect📰</h1>
                <form className="newspage__searchbox">
                    <input className="newspage__input" type="text" value={searchValue} placeholder="Search" onChange={(e) => { setSearchValue(e.target.value) }}>
                    </input>

                    <button className="newspage__search-btn" type="submit" onClick={handleSearch}><SearchOutlinedIcon />
                    </button>
                </form>
                <div>
                    <label className="newspage__label">Select your country</label>
                    <select className="newspage__dropdown" name="country" onChange={(e) => setCountryOption(e.target.value)}>
                        <option value="Any">All</option>
                        {country.map((c, index) => {
                            return (
                                <option key={index} value={c.alpha2Code.toLowerCase()}>{c.name.length > 20 ? c.nativeName : c.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <nav className="newspage__topics-container">
                {topics.map((t, index) => {
                    return (
                        <button className={`newspage__topics ${topic === t && 'newspage__topics-clicked'}`} key={index} onClick={() => setTopic(t)} >{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                    )
                })}
            </nav>
            <NewsFeed data={data} />
        </div>
    )
}

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_WEATHERSTACK

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=m`)
      .then(response => {
        setWeather(response.data)
      })
    }, [])

  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}<br />population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>{country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}</ul>
      <img src={country.flag} alt={`flag of ${country.name}`}  width="180em" height="100em"/>

      <CapitalWeather capital={country.capital} weather={weather} />
    </>
  )
}

const CapitalWeather = ({ capital, weather }) => { 
  if (!weather) return null

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {weather.current.temperature} &#x2103;</p>
      <img src={weather.current.weather_icons[0]} alt={`weather icon for ${capital}`}  width="75em" height="75em"/>
      <p><b>wind:</b> {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
    </>
  )
}

export default CountryDetails

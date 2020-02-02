import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Filter = ({ filterInput, handleChange }) => {
  return (
    <form>
      <p>find countries <input value={filterInput} onChange={handleChange} /></p>
    </form>
  )
}

const DisplayCountries = ({ countries, handleClick }) => {
  console.log('length: ', countries.length)
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countries.length === 1) {
    return (
      <SingleCountry country={countries} />
    )
  }
    return (
      <ul style={{listStyleType: 'none'}}>
        {countries.map(country => <li key={country.numericCode}>{country.name}
        <button onClick={() => handleClick(country.name)}>show</button></li>)}
      </ul>
    ) 
}

const SingleCountry = ({ country }) => {
  console.log('country: ', country[0])
  country = country[0]
  return (
    <>
      <h2>{country.name}</h2>

      <p>capital {country.capital}<br />population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`}  width="180em" height="100em"/>
    </>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countryInfo, setCountryInfo] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryInfo(response.data)
      })
  }, [])

  const filteredCountries = countryInfo.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log('filterChange: ', event.target.value)
    setFilter(event.target.value)
  }

  const handleCountryClick = country => {setFilter(country)}
  

  return (
    <>
      <Filter filterInput={filter} handleChange={handleFilterChange} />
      <DisplayCountries countries={filteredCountries} handleClick={handleCountryClick} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

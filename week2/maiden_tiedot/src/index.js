import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import CountryDetails from './components/CountryDetails'

const Filter = ({ filterInput, handleChange }) => {
  return (
    <form>
      <p>find countries <input value={filterInput} onChange={handleChange} /></p>
    </form>
  )
}

const DisplayCountries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />

    )
  }
    return (
      <ul style={{listStyleType: 'none'}}>
        {countries.map(country => <li key={country.numericCode}>{country.name}
        <button onClick={() => handleClick(country.name)}>show</button></li>)}
      </ul>
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

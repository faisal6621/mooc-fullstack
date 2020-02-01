import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ country, setCountry }) =>
  <p>find countries <input value={country}
    onChange={event => setCountry(event.target.value)} /></p>

const Country = ({ country }) =>
  <div className="countryDetails">
    <h1>{country.name}</h1>
    <p>{country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt={country.name} />
  </div>

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = countries
    .filter(c => country !== '' && c.name.toLowerCase().includes(country.toLowerCase()))
    .reduce((a, b) => a.concat(b), [])

  if (filteredCountries.length > 10) {
    // too many countries
    return (
      <div className="App">
        <Filter country={country} setCountry={setCountry} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (filteredCountries.length === 1) {
    // country details
    return (
      <div className="App">
        <Filter country={country} setCountry={setCountry} />
        <Country country={filteredCountries[0]} />
      </div>
    )
  } else {
    // list of countries
    return (
      <div className="App">
        <Filter country={country} setCountry={setCountry} />
        {filteredCountries.map(country => {
          return (
            <p key={country.name}>{country.name}
              <button onClick={() => setCountry(country.name)} >show</button>
            </p>
          )
        })}
      </div>
    )
  }
}

export default App;

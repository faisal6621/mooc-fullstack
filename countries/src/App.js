import React, { useState, useEffect } from 'react';
import axios from 'axios';
import weatherstack from "./weatherstack.json";

const Filter = ({ country, setCountry }) =>
  <p>find countries <input value={country}
    onChange={event => setCountry(event.target.value)} /></p>

const Weather = ({ weather }) => {
  if (weather.current) {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p><b>temperature:</b> {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
        <p><b>wind:</b> {weather.current.wind_speed}kph direction {weather.current.wind_dir}</p>
      </div>
    )
  } else if (weather.error) {
    return (<div>
      <p>weather response: {weather.success}</p>
      <p>code: {weather.error.code}, type: {weather.error.type}<br />
        {weather.error.info}</p>
    </div>)
  } else {
    return (<></>)
  }
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})

  const updateWeather = () => {
    const weatherUrl = "http://api.weatherstack.com/current?access_key=" +
      weatherstack.key + "&query=" + country.capital + "&units=m"
    console.log(weatherUrl)

    axios.get(weatherUrl)
      .then(response => setWeather(response.data))
  }
  useEffect(updateWeather, [])

  return (
    <div className="countryDetails">
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width="200" height="200" />
      <Weather weather={weather} />
    </div>
  )
}

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

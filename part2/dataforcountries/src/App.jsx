import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryWeather, setselectedCountryWeather] = useState(null);

  const countriesToShow = value
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  const countryToDisplay =
    countriesToShow.length === 1 ? countriesToShow[0] : selectedCountry;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (countryToDisplay) {
      axios
        .get(
          `https://api.pirateweather.net/forecast/zFcYmLiKjyZGSZgzzwAeKvm2ixa4cHko/${countryToDisplay.latlng.join(
            ","
          )}`
        )
        .then((weatherResponse) => {
          console.log(weatherResponse.data);
          setselectedCountryWeather(weatherResponse.data.currently);
        });
    }
  }, [countryToDisplay]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedCountry(null); // reset when typing
  };

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>

      {countriesToShow.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {countryToDisplay && (
        <>
          <h1>{countryToDisplay.name.common}</h1>
          <p>Capital: {countryToDisplay.capital}</p>
          <p>Area: {countryToDisplay.area}</p>

          <h3>Languages</h3>
          <ul>
            {Object.values(countryToDisplay.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img src={countryToDisplay.flags.png} alt="flag" width="150" />

          {selectedCountryWeather && (
            <>
              <h1>Weather in {countryToDisplay.name.common}</h1>
              <p>
                temperature{" "}
                {(((selectedCountryWeather.temperature - 32) * 5) / 9).toFixed(
                  1
                )}{" "}
                Celsius
              </p>

              <p>Wind {selectedCountryWeather.windSpeed} m/s</p>
            </>
          )}
        </>
      )}

      {countriesToShow.length <= 10 &&
        countriesToShow.length > 1 &&
        countriesToShow.map((country) => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))}
    </div>
  );
}

export default App;

import { useState } from "react";
import { fetchCurrentWeather } from "../api/weatherApi";
import "./SearchPage.css";

const SearchPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchCurrentWeather(city);
      console.log("Weather Data:", data); // Log the fetched data
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error); // Log any error
      setError("City not found or error fetching weather data.");
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Search Weather by City</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-card">
          <h2>Current Weather in {weather.location.name}</h2>
          <div className="weather-details">
            <div>
              <p>Temperature: {weather.current.temp_c}°C</p>
              <p>Condition: {weather.current.condition.text}</p>
            </div>
            <img
              className="weather-icon"
              src={weather.current.condition.icon}
              alt="weather icon"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

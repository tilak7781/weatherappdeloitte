import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../api/weatherApi";
import ToggleSwitch from "../components/ToggleSwitch";
import "./Home.css";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCurrentWeather = async (location) => {
      try {
        const data = await fetchCurrentWeather(location);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching current weather data:", error);
        setError("Failed to fetch current weather data.");
      }
    };

    const getLocationAndFetchWeather = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          getCurrentWeather(location);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError("Failed to get your location.");
        }
      );
    };

    getLocationAndFetchWeather();
  }, []);

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  const temperature = isCelsius
    ? weather.current.temp_c
    : weather.current.temp_f;
  const temperatureUnit = isCelsius ? "°C" : "°F";

  return (
    <div className="home">
      <h1>Current Weather</h1>
      <div className="weather-info">
        <img src={weather.current.condition.icon} alt="weather icon" />
        <div>
          <p>{weather.location.name}</p>
          <p>
            {temperature}
            {temperatureUnit}
          </p>
          <p>{weather.current.condition.text}</p>
        </div>
      </div>
      <div className="toggle-container">
        <label>Toggle °C/°F</label>
        <ToggleSwitch isCelsius={isCelsius} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default Home;

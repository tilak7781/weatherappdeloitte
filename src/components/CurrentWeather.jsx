import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../api/weatherApi";
import "./CurrentWeather.css";

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationAndWeather = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchCurrentWeather(`${latitude},${longitude}`);
            console.log(data);
            setWeather(data);
          } catch (error) {
            setError("Failed to fetch weather data.");
          }
        },
        () => {
          setError("Failed to get your location.");
        }
      );
    };

    getLocationAndWeather();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default CurrentWeather;

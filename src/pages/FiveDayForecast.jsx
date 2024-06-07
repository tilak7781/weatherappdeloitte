import { useEffect, useState } from "react";
import { fetchFiveDayForecast } from "../api/weatherApi";
import "./FiveDayForecast.css";

const FiveDayForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFiveDayForecast = async (location) => {
      try {
        const data = await fetchFiveDayForecast(location);
        console.log("5-Day Forecast Data:", data); // Log the fetched data
        setForecast(data.forecast.forecastday);
      } catch (error) {
        console.error("Error fetching 5-day forecast data:", error); // Log any error
        setError("Failed to fetch 5-day forecast data.");
      }
    };

    const getLocationAndFetchForecast = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          getFiveDayForecast(location);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError("Failed to get your location.");
        }
      );
    };

    getLocationAndFetchForecast();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!forecast.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="five-day-forecast">
      <h1>5-Day Forecast</h1>
      <div className="five-day-forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="five-day-forecast-card">
            <p>{day.date}</p>
            <img src={day.day.condition.icon} alt="weather icon" />
            <p>Max: {day.day.maxtemp_c}°C</p>
            <p>Min: {day.day.mintemp_c}°C</p>
            <p>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;

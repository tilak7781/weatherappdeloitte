import { useEffect, useState } from "react";
import { fetchHourlyForecast } from "../api/weatherApi";
import "./HourlyForecast.css";

const HourlyForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHourlyForecast = async (location) => {
      try {
        const data = await fetchHourlyForecast(location);
        console.log("Hourly Forecast Data:", data); // Log the fetched data
        setForecast(data.forecast.forecastday[0].hour);
      } catch (error) {
        console.error("Error fetching hourly forecast data:", error); // Log any error
        setError("Failed to fetch hourly forecast data.");
      }
    };

    const getLocationAndFetchForecast = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          getHourlyForecast(location);
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
    <div className="hourly-forecast">
      <h1>Hourly Forecast</h1>
      <div className="hourly-forecast-grid">
        {forecast.map((hour, index) => (
          <div key={index} className="hourly-forecast-card">
            <p>{hour.time.split(" ")[1]}</p>
            <img src={hour.condition.icon} alt="weather icon" />
            <p>{hour.temp_c}°C</p>
            <p>{hour.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;

const API_KEY = "911d3533acae4811a41162954240606";
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchCurrentWeather = async (location) => {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchHourlyForecast = async (location) => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=1`
  );
  if (!response.ok) {
    console.error("Response status:", response.status);
    console.error("Response status text:", response.statusText);
    throw new Error("Failed to fetch hourly forecast data");
  }
  const data = await response.json();
  console.log("API Response Data:", data); // Log the entire response
  return data;
};

export const fetchFiveDayForecast = async (location) => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5`
  );
  if (!response.ok) {
    console.error("Response status:", response.status);
    console.error("Response status text:", response.statusText);
    throw new Error("Failed to fetch 5-day forecast data");
  }
  const data = await response.json();
  console.log("5-Day Forecast Data:", data); // Log the entire response
  return data;
};

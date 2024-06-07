import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FiveDayForecast from "./FiveDayForecast";
import * as weatherApi from "../api/weatherApi";

// Mock the weatherApi module
// eslint-disable-next-line no-undef
jest.mock("../api/weatherApi");

// eslint-disable-next-line no-undef
test("FiveDayForecast component renders loading state", () => {
  render(<FiveDayForecast />);
  // eslint-disable-next-line no-undef
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("FiveDayForecast component displays 5-day data", async () => {
  const mockFiveDayData = {
    forecast: {
      forecastday: [
        {
          date: "2024-06-06",
          day: {
            maxtemp_c: 25,
            mintemp_c: 15,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
          },
        },
        {
          date: "2024-06-07",
          day: {
            maxtemp_c: 22,
            mintemp_c: 14,
            condition: {
              text: "Partly Cloudy",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            },
          },
        },
      ],
    },
  };
  weatherApi.fetchFiveDayForecast.mockResolvedValue(mockFiveDayData);

  render(<FiveDayForecast />);

  // eslint-disable-next-line no-undef
  await waitFor(() =>
    // eslint-disable-next-line no-undef
    expect(screen.getByText("2024-06-06")).toBeInTheDocument()
  );
  // eslint-disable-next-line no-undef
  expect(screen.getByText("25°C")).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText("Sunny")).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("FiveDayForecast component handles API error", async () => {
  weatherApi.fetchFiveDayForecast.mockRejectedValue(
    new Error("Failed to fetch 5-day forecast data")
  );

  render(<FiveDayForecast />);

  // eslint-disable-next-line no-undef
  await waitFor(() =>
    // eslint-disable-next-line no-undef
    expect(
      screen.getByText("Failed to fetch 5-day forecast data.")
    ).toBeInTheDocument()
  );
});

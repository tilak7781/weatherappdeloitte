import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HourlyForecast from "./HourlyForecast";
import * as weatherApi from "../api/weatherApi";

// Mock the weatherApi module
// eslint-disable-next-line no-undef
jest.mock("../api/weatherApi");

// eslint-disable-next-line no-undef
test("HourlyForecast component renders loading state", () => {
  render(<HourlyForecast />);
  // eslint-disable-next-line no-undef
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("HourlyForecast component displays hourly data", async () => {
  const mockHourlyData = {
    forecast: {
      forecastday: [
        {
          hour: [
            {
              time: "2024-06-06 00:00",
              temp_c: 15,
              condition: {
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
              },
            },
            {
              time: "2024-06-06 01:00",
              temp_c: 14,
              condition: {
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
              },
            },
          ],
        },
      ],
    },
  };
  weatherApi.fetchHourlyForecast.mockResolvedValue(mockHourlyData);

  render(<HourlyForecast />);

  // eslint-disable-next-line no-undef
  await waitFor(() => expect(screen.getByText("00:00")).toBeInTheDocument());
  // eslint-disable-next-line no-undef
  expect(screen.getByText("15°C")).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText("Clear")).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("HourlyForecast component handles API error", async () => {
  weatherApi.fetchHourlyForecast.mockRejectedValue(
    new Error("Failed to fetch hourly forecast data")
  );

  render(<HourlyForecast />);

  await waitFor(() =>
    // eslint-disable-next-line no-undef
    expect(
      screen.getByText("Failed to fetch hourly forecast data.")
    ).toBeInTheDocument()
  );
});

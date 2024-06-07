import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";
import * as weatherApi from "../api/weatherApi";

// Mock the weatherApi module
// eslint-disable-next-line no-undef
jest.mock("../api/weatherApi");

// eslint-disable-next-line no-undef
test("Home component renders loading state", () => {
  render(<Home />);
  // eslint-disable-next-line no-undef
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("Home component displays weather data", async () => {
  const mockWeatherData = {
    location: { name: "San Francisco" },
    current: {
      temp_c: 20,
      temp_f: 68,
      condition: {
        text: "Clear",
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      },
    },
  };
  weatherApi.fetchCurrentWeather.mockResolvedValue(mockWeatherData);

  render(<Home />);

  await waitFor(() =>
    // eslint-disable-next-line no-undef
    expect(screen.getByText("San Francisco")).toBeInTheDocument()
  );
  // eslint-disable-next-line no-undef
  expect(screen.getByText("20°C")).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText("Clear")).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test("Home component handles geolocation error", async () => {
  const mockGeolocation = {
    // eslint-disable-next-line no-undef
    getCurrentPosition: jest
      .fn()
      .mockImplementationOnce((success, error) => error({ code: 1 })),
  };
  // eslint-disable-next-line no-undef
  global.navigator.geolocation = mockGeolocation;

  render(<Home />);

  await waitFor(() =>
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Failed to get your location.")).toBeInTheDocument()
  );
});

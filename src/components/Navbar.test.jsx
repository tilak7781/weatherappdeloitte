import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./Navbar";

// eslint-disable-next-line no-undef
test("Navbar component renders correctly", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // eslint-disable-next-line no-undef
  expect(getByText("Home")).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(getByText("Hourly Forecast")).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(getByText("Search City")).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(getByText("5-Day Forecast")).toBeInTheDocument();
});

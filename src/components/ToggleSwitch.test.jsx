import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ToggleSwitch from "./ToggleSwitch";

// eslint-disable-next-line no-undef
test("ToggleSwitch component renders correctly", () => {
  const { getByRole } = render(
    <ToggleSwitch isCelsius={true} onToggle={() => {}} />
  );
  const toggle = getByRole("checkbox");
  // eslint-disable-next-line no-undef
  expect(toggle).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(toggle).toBeChecked();
});

// eslint-disable-next-line no-undef
test("ToggleSwitch component toggles correctly", () => {
  // eslint-disable-next-line no-undef
  const handleToggle = jest.fn();
  const { getByRole } = render(
    <ToggleSwitch isCelsius={true} onToggle={handleToggle} />
  );
  const toggle = getByRole("checkbox");
  fireEvent.click(toggle);
  // eslint-disable-next-line no-undef
  expect(handleToggle).toHaveBeenCalledTimes(1);
});

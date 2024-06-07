import "./ToggleSwitch.css";

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ isCelsius, onToggle }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isCelsius} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;

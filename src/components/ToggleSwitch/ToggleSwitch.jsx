import "./ToggleSwitch.css";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const contextValue = useContext(currentTemperatureUnitContext);

  return (
    <label htmlFor="toggle-switch" className="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={contextValue.handleToggleSwitchChange}
      />

      <span className="toggle-switch__circle"></span>

      <span className="toggle-switch__value toggle-switch__value_left">F</span>
      <span className="toggle-switch__value toggle-switch__value_right">C</span>
    </label>
  );
}

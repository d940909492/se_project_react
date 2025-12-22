import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

export default function Header({ weatherData, handleOpenAddGarmentModal }) {
  // current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* left side */}
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <time className="header__datetime" dateTime={currentDate.toISOString()}>
        {formattedDate}, {weatherData.name}
      </time>

      {/* right side */}
      <ToggleSwitch />
      <button
        className="header__add-clothes-btn"
        onClick={handleOpenAddGarmentModal}
      >
        + Add clothes
      </button>
      <p className="header__username">Terrence Tegegne</p>
      <img className="header__avatar" src={avatar} alt="User avatar" />
    </header>
  );
}

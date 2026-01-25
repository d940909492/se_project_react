import logo from "../../assets/Logo.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Header({
  weatherData,
  handleOpenAddGarmentModal,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const firstLetter = (currentUser?.data.name || "?")
    .trim()
    .charAt(0)
    .toUpperCase();
  const hasAvatar = Boolean(currentUser?.data.avatar);

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </Link>

      <time className="header__datetime" dateTime={currentDate.toISOString()}>
        {formattedDate}, {weatherData.name}
      </time>

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes-btn"
            onClick={handleOpenAddGarmentModal}
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__link">
            <p className="header__username">
              {currentUser?.data.name || "User"}
            </p>
          </Link>

          <Link to="/profile" className="header__link">
            {hasAvatar ? (
              <img
                className="header__avatar"
                src={currentUser.data.avatar}
                alt="User avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">{firstLetter}</div>
            )}
          </Link>
        </>
      ) : (
        <div className="header__auth">
          <button
            className="header__auth-btn"
            type="button"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
          <button
            className="header__auth-btn"
            type="button"
            onClick={onLoginClick}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

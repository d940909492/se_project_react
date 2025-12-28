import "./WeatherCard.css";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherImages } from "../../utils/constants.js";

export default function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  const now = Date.now() / 1000;
  const isDay = now >= weatherData.sunrise && now < weatherData.sunset;
  const timeOfDay = isDay ? "day" : "night";
  const background =
    weatherImages[weatherData.weatherType]?.[timeOfDay] || weatherImages[0];

  return (
    <section className="weathercard">
      <img src={background} alt="weather card" className="weathercard__image" />
      <p className="weathercard__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

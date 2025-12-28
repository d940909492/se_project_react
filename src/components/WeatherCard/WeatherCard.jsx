import "./WeatherCard.css";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherImages } from "../../utils/constants.js";
import defaultWeatherImage from "../../assets/WeatherCard/Weather=Clear Sky, Time=Day.png";

export default function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  if (
    !weatherData ||
    !weatherData.weatherType ||
    !weatherData.sunrise ||
    !weatherData.sunset ||
    !weatherData.temp
  ) {
    return null;
  }

  const now = Date.now() / 1000;
  const isDay = now >= weatherData.sunrise && now < weatherData.sunset;
  const timeOfDay = isDay ? "day" : "night";
  const background =
    weatherImages[weatherData.weatherType]?.[timeOfDay] || defaultWeatherImage;

  return (
    <section className="weathercard">
      <img src={background} alt="weather card" className="weathercard__image" />
      <p className="weathercard__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

import "./WeatherCard.css";
import weather from "../../assets/weather.svg";

export default function WeatherCard() {
  return (
    <section className="weathercard">
      <img src={weather} alt="cloudy day" className="weathercard__image" />
      <p className="weathercard__temp">75°F</p>
    </section>
  );
}

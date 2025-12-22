import "./Weathertype.css";

export default function WeatherFilter({ onChange }) {
  return (
    <div className="weather-filter">
      <button className="weather-filter__button" onClick={() => onChange(null)}>
        Auto
      </button>
      <button
        className="weather-filter__button"
        onClick={() => onChange("hot")}
      >
        Hot
      </button>
      <button
        className="weather-filter__button"
        onClick={() => onChange("warm")}
      >
        Warm
      </button>
      <button
        className="weather-filter__button"
        onClick={() => onChange("cold")}
      >
        Cold
      </button>
      <button
        className="weather-filter__button"
        onClick={() => onChange("all")}
      >
        All
      </button>
    </div>
  );
}

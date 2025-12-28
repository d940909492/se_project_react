import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import WeatherFilter from "../WeatherType/Weathertype.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useOutletContext } from "react-router-dom";

export default function Main() {
  const {
    weatherData,
    clothingItems,
    handleOpenModal,
    handleCloseModal,
    getWeatherCondition,
    selectedWeatherType,
    setSelectedWeatherType,
  } = useOutletContext();

  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  const currentTemp = weatherData.temp[currentTemperatureUnit];
  const autoWeather = getWeatherCondition(currentTemp);

  let finalWeatherType = autoWeather;

  if (selectedWeatherType === "all") {
    finalWeatherType = "all";
  } else if (selectedWeatherType) {
    finalWeatherType = selectedWeatherType;
  }

  const filteredClothingItems =
    finalWeatherType === "all"
      ? clothingItems
      : clothingItems.filter((item) => item.weather === finalWeatherType);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temp[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>
      <WeatherFilter onChange={setSelectedWeatherType} />
      <ul className="main__cards">
        {filteredClothingItems.map((card) => (
          <ItemCard
            data={card}
            key={card._id}
            onCardClick={handleOpenModal}
            onCloseBtnClick={handleCloseModal}
          />
        ))}
      </ul>
    </main>
  );
}

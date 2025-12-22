import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";

import { defaultClothingItems } from "../../utils/DefaultClothingItems.js";
import { getWeatherData, getWeatherCondition } from "../../utils/weatherApi.js";

import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [selectedWeatherType, setSelectedWeatherType] = useState(null);

  function handleOpenModal(card) {
    setActiveModal("modal__item");
    setSelectCard(card);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("garment__modal");
  }

  function handleClosenGarmentModal() {
    setActiveModal("");
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <currentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          getWeatherCondition={getWeatherCondition}
          selectedWeatherType={selectedWeatherType}
          setSelectedWeatherType={setSelectedWeatherType}
        />

        <Footer />
        <ItemModal
          isOpen={activeModal === "modal__item"}
          data={selectCard}
          handleCloseModal={handleCloseModal}
        />
        <ModalWithForm
          isOpen={activeModal === "garment__modal"}
          handleClosenGarmentModal={handleClosenGarmentModal}
        />
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;

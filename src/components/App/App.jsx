import "./App.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";

import { defaultClothingItems } from "../../utils/DefaultClothingItems.js";
import { getWeatherData, getWeatherCondition } from "../../utils/weatherApi.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const location = useLocation();

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

  function handleCloseGarmentModal() {
    setActiveModal("");
  }

  function openConfirmationModal(card) {
    setSelectCard(card);
    setActiveModal("confirm-delete");
  }

  function handleAddItem(newItem) {
    addItem(newItem)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
      })
      .catch(console.error);

    handleCloseGarmentModal();
  }

  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems(clothingItems.filter((i) => i._id !== item._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items.reverse()))
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
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

        {location.pathname === "/" && (
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            handleOpenModal={handleOpenModal}
            getWeatherCondition={getWeatherCondition}
            selectedWeatherType={selectedWeatherType}
            setSelectedWeatherType={setSelectedWeatherType}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          />
        )}

        {location.pathname === "/profile" && (
          <Profile clothingItems={clothingItems} />
        )}

        <Footer />

        <ItemModal
          isOpen={activeModal === "modal__item"}
          data={selectCard}
          handleCloseModal={handleCloseModal}
          openConfirmationModal={openConfirmationModal}
        />

        <AddItemModal
          isOpen={activeModal === "garment__modal"}
          onAddItem={handleAddItem}
          onCloseModal={handleCloseGarmentModal}
        />

        <ConfirmationModal
          data={selectCard}
          isOpen={activeModal === "confirm-delete"}
          onClose={handleCloseModal}
          onConfirm={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

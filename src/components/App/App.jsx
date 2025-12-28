import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

import { defaultClothingItems } from "../../utils/DefaultClothingItems.js";
import { getWeatherData, getWeatherCondition } from "../../utils/weatherApi.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

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

  function openConfirmationModal(card) {
    setSelectCard(card);
    setActiveModal("confirm-delete");
  }

  function handleAddItem(newItem) {
    addItem(newItem)
      .then((data) => {
        console.log("after additem, data: ", data);
        setClothingItems([data, ...clothingItems]);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
    console.log("clothing items: ", clothingItems);
    handleClosenGarmentModal();
  }

  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        const newClothingItems = clothingItems.filter((Item) => {
          return Item._id !== item._id;
        });
        setClothingItems(newClothingItems);
        handleClosenGarmentModal();
        console.log("selected item has been deleted");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
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
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch(console.error);
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
        <Outlet
          context={{
            weatherData,
            clothingItems,
            handleOpenModal,
            handleCloseModal,
            getWeatherCondition,
            selectedWeatherType,
            setSelectedWeatherType,
            handleOpenAddGarmentModal,
          }}
        />
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
          onCloseModal={handleClosenGarmentModal}
        />
        <ConfirmationModal
          data={selectCard}
          isOpen={activeModal === "confirm-delete"}
          onClose={handleCloseModal}
          onConfirm={handleDeleteItem}
        />
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;

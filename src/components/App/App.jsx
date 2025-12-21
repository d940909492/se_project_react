import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";

import { defaultClothingItems } from "../../utils/DefaultClothingItems.js";
import { getWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });

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

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <Header
        weatherData={weatherData}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
      />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        handleOpenModal={handleOpenModal}
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
  );
}

export default App;

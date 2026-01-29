import "./App.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import ProtectedRoute from "../ProtectRoute/ProtectedRoute.jsx";

import { defaultClothingItems } from "../../utils/DefaultClothingItems.js";
import { getWeatherData, getWeatherCondition } from "../../utils/weatherApi.js";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";

import { signup, signin, checkSession, signout } from "../../utils/auth.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [selectedWeatherType, setSelectedWeatherType] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function handleOpenModal(card) {
    setActiveModal("modal__item");
    setSelectCard(card);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleOpenAddGarmentModal() {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("garment__modal");
  }

  function handleCloseGarmentModal() {
    setActiveModal("");
  }

  function openConfirmationModal(card) {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setSelectCard(card);
    setActiveModal("confirm-delete");
  }

  function openLoginModal() {
    setActiveModal("login");
  }

  function openRegisterModal() {
    setActiveModal("register");
  }

  function openEditProfileModal() {
    setActiveModal("edit-profile");
  }

  function handleAddItem(newItem) {
    if (!isLoggedIn) return;

    addItem(newItem)
      .then((res) => {
        const createdItem = res.data || res;
        setClothingItems((prev) => [createdItem, ...prev]);
      })
      .catch(console.error)
      .finally(() => handleCloseGarmentModal());
  }

  function handleDeleteItem(item) {
    if (!isLoggedIn) return;

    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  function handleLogin({ email, password }) {
    return signin({ email, password })
      .then(() => checkSession())
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
        return user;
      });
  }

  function handleRegister({ name, avatar, email, password }) {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then(() => checkSession())
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch(console.error);
  }

  function handleSignOut() {
    Promise.resolve()
      .then(() => signout())
      .catch(() => {})
      .finally(() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setActiveModal("");
        navigate("/");
      });
  }

  function handleUpdateUser(values) {
    if (!isLoggedIn) return;

    updateUser(values)
      .then((user) => {
        setCurrentUser(user);
        setActiveModal("");
      })
      .catch(console.error);
  }

  const handleCardLike = ({ id, isLiked }) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    const request = !isLiked ? addCardLike(id) : removeCardLike(id);

    request
      .then((res) => {
        const updatedItem = res.data || res;
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedItem : item)),
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then(({ data }) => setClothingItems(data.reverse()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    checkSession()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            weatherData={weatherData}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            isLoggedIn={isLoggedIn}
            onLoginClick={openLoginModal}
            onRegisterClick={openRegisterModal}
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
              isLoggedIn={isLoggedIn}
              onCardLike={handleCardLike}
            />
          )}

          {location.pathname === "/profile" && (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                clothingItems={clothingItems}
                handleOpenModal={handleOpenModal}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                onEditProfile={openEditProfileModal}
                onSignOut={handleSignOut}
                isLoggedIn={isLoggedIn}
                onCardLike={handleCardLike}
              />
            </ProtectedRoute>
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

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onSwitchToLogin={openLoginModal}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onSwitchToRegister={openRegisterModal}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

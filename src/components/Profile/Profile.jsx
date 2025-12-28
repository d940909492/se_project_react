import "./Profile.css";
import { useOutletContext } from "react-router-dom";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile() {
  const {
    weatherData,
    clothingItems,
    handleOpenModal,
    handleCloseModal,
    getWeatherCondition,
    selectedWeatherType,
    setSelectedWeatherType,
    handleOpenAddGarmentModal,
  } = useOutletContext();
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenModal={handleOpenModal}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
      />
    </main>
  );
}

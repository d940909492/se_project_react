import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({
  clothingItems,
  handleOpenModal,
  handleOpenAddGarmentModal,
}) {
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

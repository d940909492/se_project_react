import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({
  clothingItems,
  handleOpenModal,
  handleOpenAddGarmentModal,
  onEditProfile,
  onSignOut,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <ClothesSection
        clothingItems={clothingItems}
        handleOpenModal={handleOpenModal}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}

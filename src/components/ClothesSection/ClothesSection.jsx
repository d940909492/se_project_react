import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function ClothesSection({
  clothingItems,
  handleOpenModal,
  handleOpenAddGarmentModal,
  isLoggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentUserId = currentUser?.data?._id || currentUser?._id;

  const userItems = clothingItems.filter((item) => {
    const ownerId = item?.owner?._id || item?.owner;
    return ownerId && currentUserId && ownerId === currentUserId;
  });

  return (
    <section className="clothesSection">
      <div className="clothesSection__topbar">
        <p className="clothesSection__texts">Your Items</p>
        <button
          className="clothesSection__addbutton"
          onClick={handleOpenAddGarmentModal}
        >
          + Add New
        </button>
      </div>

      <ul className="clothesSection__card-list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={handleOpenModal}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </section>
  );
}

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({
  clothingItems,
  handleOpenModal,
  handleOpenAddGarmentModal,
}) {
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
        {clothingItems.map((item) => (
          <ItemCard key={item._id} data={item} onCardClick={handleOpenModal} />
        ))}
      </ul>
    </section>
  );
}

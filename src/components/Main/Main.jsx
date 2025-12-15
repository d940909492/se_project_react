import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function Main({
  clothingItems,
  handleOpenModal,
  handleCloseModal,
}) {
  return (
    <main className="main">
      <WeatherCard />
      <p className="main__text">Today is 75° F / You may want to wear:</p>
      <ul className="main__cards">
        {clothingItems.map((card) => {
          return (
            <ItemCard
              data={card}
              key={card._id}
              onCardClick={handleOpenModal}
              onCloseBtnClick={handleCloseModal}
            />
          );
        })}
      </ul>
    </main>
  );
}

import "./ItemCard.css";

export default function ItemCard({ data, onCardClick }) {
  function handleOpenCard() {
    onCardClick(data);
  }

  return (
    <div className="card" onClick={handleOpenCard}>
      <h2 className="card__title">{data.name}</h2>
      <img src={data.imageUrl} alt={data.name} className="card__image" />
    </div>
  );
}

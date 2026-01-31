import "./ItemCard.css";
import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ItemCard({
  data,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentUserId = currentUser?.data?._id || currentUser?._id || null;

  const isLiked = useMemo(() => {
    if (!currentUserId) return false;
    if (!Array.isArray(data?.likes)) return false;

    return data.likes.some((like) => {
      if (typeof like === "string") return like === currentUserId;
      if (like && typeof like === "object") return like._id === currentUserId;
      return false;
    });
  }, [data?.likes, currentUserId]);

  function handleOpenCard() {
    if (typeof onCardClick === "function") {
      onCardClick(data);
    }
  }

  function handleLikeClick(e) {
    e.stopPropagation();

    if (!isLoggedIn) return;
    if (typeof onCardLike !== "function") return;

    onCardLike({
      id: data._id,
      isLiked,
    });
  }

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  } ${!isLoggedIn ? "card__like-button_hidden" : ""}`;

  return (
    <div className="card" onClick={handleOpenCard}>
      <h2 className="card__title">{data.name}</h2>

      <img src={data.imageUrl} alt={data.name} className="card__image" />
      <button
        type="button"
        className={itemLikeButtonClassName}
        onClick={handleLikeClick}
        disabled={!isLoggedIn}
        aria-label={isLiked ? "Remove like" : "Like"}
      />
    </div>
  );
}

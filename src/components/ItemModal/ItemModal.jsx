import "./ItemModal.css";
import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ItemModal({
  data,
  isOpen,
  handleCloseModal,
  openConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const ownerId = useMemo(() => {
    if (!data) return null;

    const owner = data.owner;

    if (typeof owner === "string") return owner;

    if (owner && typeof owner === "object") {
      return owner._id || owner.id || null;
    }

    return null;
  }, [data]);

  const currentUserId = currentUser?._id || null;

  const isOwn = Boolean(ownerId && currentUserId && ownerId === currentUserId);

  if (!isOpen) return null;

  if (!data || !data.imageUrl) return null;

  function handleCloseBtn() {
    handleCloseModal();
  }

  function handleDeleteBtn() {
    if (!isOwn) return;
    openConfirmationModal(data);
  }

  return (
    <div className="modal modal_is-opened">
      <div className="modal__container modal__item">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleCloseBtn}
        >
          x
        </button>

        <img src={data.imageUrl} alt={data.name} className="modal__image" />

        <div className="modal__card-botom">
          <div className="modal__texts-container">
            <p className="modal__card-name">{data.name}</p>
            <p className="modal__card-weather">{`Weather: ${data.weather}`}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              onClick={handleDeleteBtn}
              className="modal__delete-button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

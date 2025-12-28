import "./ItemModal.css";

export default function ItemModal({
  data,
  isOpen,
  handleCloseModal,
  openConfirmationModal,
}) {
  function handleCloseBtn() {
    handleCloseModal();
  }

  function handleDeleteBtn() {
    openConfirmationModal(data);
  }

  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container modal__item">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleCloseBtn}
        ></button>
        <img src={data.imageUrl} alt={data.name} className="modal__image" />
        <div className="modal__card-botom">
          <div className="modal__texts-container">
            <p className="modal__card-name">{data.name}</p>
            <p className="modal__card-weather">{`Weather: ${data.weather}`}</p>
          </div>
          <button
            type="button"
            onClick={handleDeleteBtn}
            className="modal__delete-button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

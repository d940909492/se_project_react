import "./ItemModal.css";

export default function ItemModal({ data, isOpen, handleCloseModal }) {
  function handleCloseBtn() {
    handleCloseModal();
  }

  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={handleCloseBtn}
        ></button>
        <img src={data.link} alt={data.name} className="modal__image" />
        <div className="modal__texts-container">
          <p className="modal__card-name">{data.name}</p>
          <p className="modal__card-weather">{`Weather: ${data.weather}`}</p>
        </div>
      </div>
    </div>
  );
}

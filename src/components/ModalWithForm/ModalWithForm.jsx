import "../ItemModal/ItemModal.css";
import "./ModalWithForm.css";

export default function ModalWithForm({
  isOpen,
  handleClosenGarmentModal,
  handleSubmit,
  children,
}) {
  function handleCloseGarmentBtn() {
    handleClosenGarmentModal();
  }

  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container_form">
        <h2 className="modal__title">New garment</h2>

        <button
          type="button"
          className="modal__close-button modal__close-button_form"
          onClick={handleCloseGarmentBtn}
        />

        <form onSubmit={handleSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">
            <span className="modal__submit-button_text">Add garment</span>
          </button>
        </form>
      </div>
    </div>
  );
}

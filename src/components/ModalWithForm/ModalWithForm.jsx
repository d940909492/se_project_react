import "../ItemModal/ItemModal.css";
import "./ModalWithForm.css";

export default function ModalWithForm({
  isOpen,
  handleClosenGarmentModal,
  handleSubmit,
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
          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              placeholder="Name"
              required
            />
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              placeholder="Image URL"
              required
            />
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__selection">
              Select the weather type:
            </legend>

            <label className="modal__radio-label">
              <input type="radio" name="weather" value="hot" required />
              Hot
            </label>

            <label className="modal__radio-label">
              <input type="radio" name="weather" value="warm" />
              Warm
            </label>

            <label className="modal__radio-label">
              <input type="radio" name="weather" value="cold" />
              Cold
            </label>
          </fieldset>

          <button type="submit" className="modal__submit-button">
            <span className="modal__submit-button_text">Add garment</span>
          </button>
        </form>
      </div>
    </div>
  );
}

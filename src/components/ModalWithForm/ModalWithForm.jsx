import "../ItemModal/ItemModal.css";
import "./ModalWithForm.css";

export default function ModalWithForm({
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  footer,
}) {
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_form">
        <button
          type="button"
          className="modal__close-button modal__close-button_form"
          onClick={onClose}
        />

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit-button">
              <span className="modal__submit-button_text">{buttonText}</span>
            </button>

            {footer}
          </div>
        </form>
      </div>
    </div>
  );
}

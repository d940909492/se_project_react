import "../ItemModal/ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import "./ConfirmationModal.css";

export default function ConfirmationModal({
  data,
  isOpen,
  onClose,
  onConfirm,
}) {
  function handleDeleteBtn() {
    onConfirm(data);
  }
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container modal__confirmation">
        <button
          type="button"
          className="modal__confirmation-closeBtn"
          onClick={onClose}
        ></button>
        <h2 className="modal__confirmation-texts">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          type="button"
          onClick={handleDeleteBtn}
          className="modal__delete-button modal__confirmation-button"
        >
          Yes, delete item
        </button>
        <button
          type="button"
          onClick={onClose}
          className="modal__cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

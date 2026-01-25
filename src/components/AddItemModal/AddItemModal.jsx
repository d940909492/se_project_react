import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm";
import "../ItemModal/ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";

const initialValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, setValues } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    Promise.resolve(onAddItem(values))
      .then(() => {
        setValues(initialValues);
      })
      .catch(console.error);
  };

  const handleClose = () => {
    onCloseModal();
    setValues(initialValues);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__selection">Select the weather type:</legend>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

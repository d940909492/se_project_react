import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm";
import "../ItemModal/ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import "../ModalWithForm/Modal_extra.css";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      footer={
        <span className="modal__footer">
          or{" "}
          <button
            type="button"
            className="modal__link"
            onClick={onSwitchToRegister}
          >
            Sign Up
          </button>
        </span>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

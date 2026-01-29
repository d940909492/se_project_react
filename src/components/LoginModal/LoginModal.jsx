import { useEffect, useState } from "react";
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
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAuthError("");
    }
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");

    Promise.resolve(onLogin(values)).catch((err) => {
      const msg = String(err);

      if (msg.includes("401")) {
        setAuthError("Incorrect email or password");
      } else {
        setAuthError("Something went wrong. Please try again.");
      }
    });
  }

  const inputClassName = `modal__input ${authError ? "modal__input_error" : ""}`;

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
          className={inputClassName}
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => {
            setAuthError("");
            handleChange(e);
          }}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className={inputClassName}
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => {
            setAuthError("");
            handleChange(e);
          }}
          required
        />
      </label>

      {authError && <p className="modal__error">{authError}</p>}
    </ModalWithForm>
  );
}

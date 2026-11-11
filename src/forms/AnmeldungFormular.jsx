import { useState } from "react";
import "./TodoFormular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import FormularMessageBox from "../components/FormularMessagebox/FormularMessageBox";

function AnmeldungFormular({ users, onSubmit, onRegister, successMessage = "" }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enteredEmail = formData.get("email").trim().toLowerCase();
    const enteredPassword = formData.get("password");

    const matchingUser = users.find(
      (user) => user.email?.toLowerCase() === enteredEmail
    );

    if (!matchingUser) {
      setError("Diese E-Mail-Adresse existiert nicht.");
      return;
    }

    if (matchingUser.password !== enteredPassword) {
      setError("Das Passwort ist falsch.");
      return;
    }

    onSubmit(matchingUser);
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <section
        className="todo-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <Seitenkopf
          eyebrowText="ToDo Web-App"
          header="Anmeldung"
        />

        <form onSubmit={handleSubmit}>

          {successMessage && (
            <FormularMessageBox type="success" message={successMessage} />
          )}

          <FormularEingabe
            label="E-Mail-Adresse"
            name="email"
            type="email"
            placeholder="E-Mail-Adresse eingeben"
            onChange={() => {
              if (error) setError("");
            }}
          />

          <FormularEingabe
            label="Passwort"
            name="password"
            type="password"
            placeholder="Passwort eingeben"
            onChange={() => {
              if (error) setError("");
            }}
          />

          <FormularMessageBox type="error" message={error} />

          <div className="todo-form__actions">
            <button type="button" onClick={onRegister}>
              Registrieren
            </button>
            <button type="submit">Anmelden</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AnmeldungFormular;
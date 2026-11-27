import { useState } from "react";
import "./Formular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import FormularMessageBox from "../components/FormularMessagebox/FormularMessageBox";

function AnmeldungFormular({ onSubmit, onRegister, successMessage = "" }) {
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const enteredEmail = formData.get("email").trim().toLowerCase();
    const enteredPassword = formData.get("password");

    try {
      await onSubmit({ email: enteredEmail, password: enteredPassword });
    } catch (submitError) {
      setError(submitError.message || "Anmeldung fehlgeschlagen.");
    }
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
import { useState } from "react";
import "./Formular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import FormularMessageBox from "../components/FormularMessagebox/FormularMessageBox";

function RegistrierungFormular({ onSubmit, onBack }) {
  const [error, setError] = useState("");

  function clearError() {
    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");

    if (password !== passwordConfirmation) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      await onSubmit({ email, password });
    } catch (submitError) {
      setError(submitError.message || "Registrierung fehlgeschlagen.");
    }
  }

  return (
    <div className="modal-backdrop">
      <section
        className="todo-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <Seitenkopf
          eyebrowText="ToDo Web-App"
          header="Registrierung"
        />

        <form onSubmit={handleSubmit}>
          <FormularEingabe
            label="E-Mail-Adresse"
            name="email"
            type="email"
            placeholder="E-Mail-Adresse eingeben"
            onChange={clearError}
          />

          <FormularEingabe
            label="Neues Passwort"
            name="password"
            type="password"
            placeholder="Passwort eingeben"
            onChange={clearError}
          />

          <FormularEingabe
            label="Passwort bestätigen"
            name="passwordConfirmation"
            type="password"
            placeholder="Passwort erneut eingeben"
            onChange={clearError}
          />

          <FormularMessageBox type="error" message={error} />

          <div className="todo-form__actions">
            <button type="button" onClick={onBack}>
              Zurück
            </button>
            <button type="submit">Konto erstellen</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default RegistrierungFormular;
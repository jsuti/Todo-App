import { useState } from "react";
import "./TodoFormular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import FormularMessageBox from "../components/FormularMessagebox/FormularMessageBox";

function GruppeErstellenFormular({ groups, onSubmit, onClose }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enteredName = formData.get("groupName").trim();

    const groupAlreadyExists = groups.some(
      (group) => group.name.toLowerCase() === enteredName.toLowerCase()
    );

    if (groupAlreadyExists) {
      setError("Eine Gruppe mit diesem Namen existiert bereits.");
      return;
    }

    onSubmit(enteredName);
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <section
        className="todo-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-group-title"
      >
        <Seitenkopf
          eyebrowText="Sei Motivator einer neuen Gruppe"
          header="Gruppe erstellen"
        />

        <form onSubmit={handleSubmit}>
          <FormularEingabe
            label="Name der Gruppe"
            name="groupName"
            placeholder="Gruppennamen eingeben"
            onChange={() => {
              if (error) {
                setError("");
              }
            }}
          />

          <FormularMessageBox type="error" message={error} />

          <div className="todo-form__actions">
            <button type="button" onClick={onClose}>
              Zurück
            </button>
            <button type="submit">Erstellen</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default GruppeErstellenFormular;
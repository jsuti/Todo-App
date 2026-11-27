import { useState } from "react";
import "./Formular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import FormularMessageBox from "../components/FormularMessagebox/FormularMessageBox";

function GruppeBeitretenFormular({ groups, onSubmit, onClose }) {
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const enteredName = formData.get("groupName").trim();

    const group = groups.find(
      (item) => item.name.toLowerCase() === enteredName.toLowerCase()
    );

    if (!group) {
      setError("Diese Gruppe existiert nicht.");
      return;
    }

    try {
      await onSubmit(group.id);
      onClose();
    } catch (submitError) {
      setError(submitError.message || "Beitritt zur Gruppe fehlgeschlagen.");
    }
  }

  return (
    <div className="modal-backdrop">
      <section
        className="todo-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-group-title"
      >
        <Seitenkopf
          eyebrowText="Suche deine Freunde"
          header="Gruppe beitreten"
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
            <button type="submit">Beitreten</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default GruppeBeitretenFormular;
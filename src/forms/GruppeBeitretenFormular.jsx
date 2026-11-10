import { useState } from "react";
import "./TodoFormular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import FormularMessageBox from "../components/FormularMessagebox/FormularMessageBox";

function GruppeBeitretenFormular({ groups, onSubmit, onClose }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enteredName = formData.get("groupName").trim();

    const group = groups.find(
      (item) => item.name.toLowerCase() === enteredName.toLowerCase()
    );

    if (!group) {
      setError("Diese Gruppe existiert nicht.");
      return;
    }

    onSubmit(group.id);
    onClose();
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
import "./Formular.css";
import { useState } from "react";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import KategorienAuswahl from "../components/KategorienAuswahl/KategorienAuswahl";
import FormularMessagebox from "../components/FormularMessagebox/FormularMessageBox";

function TodoBearbeitenFormular({ todo, onSubmit, onClose, categories }) {
const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      await onSubmit({
        id: todo.id,
        title: formData.get("title").trim(),
        categoryId: Number(formData.get("categoryId")) || null,
      });
      onClose();
    } catch (submitError) {
      setError(submitError.message || "To-do konnte nicht bearbeitet werden.");
    }
  }

  return (
    <div className="modal-backdrop">
      <section
        className="todo-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="todo-form-title"
      >
        <Seitenkopf
          eyebrowText="Was gibt es zu tun?"
          header="ToDo bearbeiten"
        />

        <form onSubmit={handleSubmit}>
          <FormularEingabe
            label="Name des Eintrags"
            name="title"
            placeholder="Namen eingeben"
            defaultValue={todo.title}
          />

          <KategorienAuswahl
            categories={categories}
            selectedCategoryId={todo.categoryId}
          />

          <FormularMessagebox type="error" message={error} />

          <div className="todo-form__actions">
            <button type="button" onClick={onClose}>Zurück</button>
            <button type="submit">Übernehmen</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TodoBearbeitenFormular;
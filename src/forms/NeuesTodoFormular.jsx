import "./TodoFormular.css";
import Seitenkopf from "../components/Seitenkopf/Seitenkopf";
import FormularEingabe from "../components/FormularEingabe/FormularEingabe";
import KategorienAuswahl from "../components/KategorienAuswahl/KategorienAuswahl";

function NeuesTodoFormular({ onSubmit, onClose, categories }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      title: formData.get("title").trim(),
      categoryId: Number(formData.get("categoryId")) || null,
    });

    onClose();
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
          header="ToDo hinzufügen"
        />

        <form onSubmit={handleSubmit}>
          <FormularEingabe
            label="Name des Eintrags"
            name="title"
            placeholder="Namen eingeben"
          />

          <KategorienAuswahl categories={categories} />

          <div className="todo-form__actions">
            <button type="button" onClick={onClose}>Zurück</button>
            <button type="submit">Übernehmen</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NeuesTodoFormular;
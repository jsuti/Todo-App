import { UsersRound, Plus, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Einstellungen.css";
import Seitenkopf from "../../components/Seitenkopf/Seitenkopf";
import FormularMessagebox from "../../components/FormularMessagebox/FormularMessageBox";

function Einstellungen({
  hasGroup,
  onLeaveGroup,
  onJoinGroup,
  onCreateGroup,
  displayName,
  onDisplayNameChange,
  onAdd,
}) {
  const [editedName, setEditedName] = useState(displayName);

  useEffect(() => {
    setEditedName(displayName);
  }, [displayName]);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");
    setSaved(false);

    const trimmedName = editedName.trim();

    if (!trimmedName) {
      setError("Der Anzeigename darf nicht leer sein.");
      return;
    }

    try {
      await onDisplayNameChange(trimmedName);
      setSaved(true);
    } catch (submitError) {
      setError(
        submitError.message || "Anzeigename konnte nicht gespeichert werden."
      );
    }
  }

  async function handleLeaveGroup() {
    setError("");

    const confirmed = window.confirm(
      "Möchtest du diese Gruppe wirklich verlassen?"
    );

    if (!confirmed) return;

    try {
      await onLeaveGroup();
    } catch (leaveError) {
      setError(leaveError.message || "Gruppe konnte nicht verlassen werden.");
    }
  }

  return (
    <main className="settings">
      <Seitenkopf
        eyebrowText="Dein Bereich"
        header="Einstellungen"
      />

      <FormularMessagebox type="error" message={error} />

      <section className="settings-card">
        <label className="settings-card__label" htmlFor="group-name">
          Anzeigename
        </label>
        <div className="settings-card__input-row">
          <input
            className="settings-card__input"
            id="group-name"
            type="text"
            placeholder="Deinen Namen eingeben"
            value={editedName}
            onChange={(event) => {
              setEditedName(event.target.value);
              setSaved(false);
              setError("");
            }}
          />

          <button
            className={`settings-card__save${saved ? " settings-card__save--saved" : ""}`}
            type="button"
            onClick={handleSave}
          >
            {saved ? "✓" : "Speichern"}
          </button>
        </div>
      </section>

      <div className="settings-options">
        <button
          className="settings-option"
          type="button"
          onClick={onAdd}
        >
          <span className="settings-option__icon settings-option__icon--green">
            <Plus size={22} aria-hidden="true" />
          </span>

          <span className="settings-option__text">
            <span className="settings-option__title">Neues ToDo</span>
            <span className="settings-option__description">
              Eine neue Aufgabe planen
            </span>
          </span>

          <ChevronRight
            className="settings-option__arrow"
            size={22}
            aria-hidden="true"
          />
        </button>

        {hasGroup ? (
          <button
            className="settings-option"
            type="button"
            onClick={handleLeaveGroup}
          >
            <span className="settings-option__icon settings-option__icon--purple">
              <UsersRound size={22} aria-hidden="true" />
            </span>

            <span className="settings-option__text">
              <span className="settings-option__title">Aus Gruppe austreten</span>
              <span className="settings-option__description">
                Einer anderen Gruppe anschließen
              </span>
            </span>

            <ChevronRight
              className="settings-option__arrow"
              size={22}
              aria-hidden="true"
            />
          </button>
        ) : (
          <>
            <button
              className="settings-option"
              type="button"
              onClick={onJoinGroup}
            >
              <span className="settings-option__icon settings-option__icon--purple">
                <UsersRound size={22} aria-hidden="true" />
              </span>

              <span className="settings-option__text">
                <span className="settings-option__title">Gruppe beitreten</span>
                <span className="settings-option__description">
                  Mit Freunden motiviert bleiben
                </span>
              </span>

              <ChevronRight
                className="settings-option__arrow"
                size={22}
                aria-hidden="true"
              />
            </button>

            <button
              className="settings-option"
              type="button"
              onClick={onCreateGroup}
            >
              <span className="settings-option__icon settings-option__icon--purple">
                <Plus size={22} aria-hidden="true" />
              </span>

              <span className="settings-option__text">
                <span className="settings-option__title">Neue Gruppe erstellen</span>
                <span className="settings-option__description">
                  Lade deine Freunde ein
                </span>
              </span>

              <ChevronRight
                className="settings-option__arrow"
                size={22}
                aria-hidden="true"
              />
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Einstellungen;
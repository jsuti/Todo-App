import { UsersRound, Plus, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Einstellungen.css";
import Seitenkopf from "../../components/Seitenkopf/Seitenkopf";

function Einstellungen({
  hasGroup,
  displayName,
  onDisplayNameChange,
}) {
  const [editedName, setEditedName] = useState(displayName);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setEditedName(displayName);
  }, [displayName]);

  function handleSave() {
    onDisplayNameChange(editedName.trim());
    setSaved(true);
  }

  return (
    <main className="settings">
      <Seitenkopf
        eyebrowText="Dein Bereich"
        header="Einstellungen"
      />

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
        <button className="settings-option" type="button">
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
          <button className="settings-option" type="button">
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
            <button className="settings-option" type="button">
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

            <button className="settings-option" type="button">
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
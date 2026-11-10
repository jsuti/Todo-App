import { useState } from "react";
import "./TodoItem.css";

function TodoItem({
  todo,
  category,
  onToggle,
  onDelete,
  onEdit,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="todo-item">
        <article
          className={`todo-card ${
            todo.completed ? "todo-card--completed" : ""
          }`}
        >
          <button
            className="todo-card__check"
            type="button"
            onClick={() => onToggle(todo.id)}
            aria-label={
              todo.completed
                ? `${todo.title} als offen markieren`
                : `${todo.title} als erledigt markieren`
            }
            aria-pressed={todo.completed}
          >
            {todo.completed ? "✓" : ""}
          </button>

          <div className="todo-card__content">
            <h3 className="todo-card__title">
              {todo.title}
            </h3>

            {category && (
              <span
                className="todo-card__category"
                style={{
                  backgroundColor: category.color,
                  color: category.textColor,
                }}
              >
                {category.name}
              </span>
            )}
          </div>

          <button
            className="todo-menu__icon"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={`Optionen für ${todo.title}`}
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true">⋮</span>
          </button>
        </article>
      </div>

      {menuOpen && (
        <div className="todo-menu__content">
          <button
            type="button"
            onClick={() => {
              onToggle(todo.id);
              setMenuOpen(false);
            }}
          >
            {todo.completed
              ? "Als offen markieren"
              : "Als erledigt markieren"}
          </button>

          <button
            type="button"
            onClick={() => {
              onEdit(todo);
              setMenuOpen(false);
            }}
          >
            Aufgabe bearbeiten
          </button>

          <button
            type="button"
            onClick={() => onDelete(todo.id)}
          >
            Aufgabe löschen
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;

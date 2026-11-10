import "./Home.css";
import TodoItem from "../../components/TodoItem/TodoItem";
import Seitenkopf from "../../components/Seitenkopf/Seitenkopf";

function Home({ displayName, todos, categories, onToggle, onDelete, onAdd, onEdit }) {

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const openTodos = todos.length - completedTodos;

  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedTodos / todos.length) * 100);

  const today = new Date();

  const weekday = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
  }).format(today);

  const date = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
  }).format(today);

  return (
    <div>
      <Seitenkopf
        date={`${weekday}, ${date}`}
        header={`Hallo, ${displayName}`}
      />

      <section className="progress-card">

        <div className="progress-card__top">

          <div className="progress-card__info">
            <p className="eyebrow">Tagesfortschritt</p>

            <p className="progress-card__summary">
              {completedTodos} von {todos.length} Aufgaben erledigt
            </p>
          </div>

          <p className="progress-card__percentage">
            {progress}%
          </p>

        </div>

        <div className="progress-track">
          <div
            className="progress-track__fill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </section>

      <section className="tasks">

        <div className="tasks__header">

          <div>
            <p className="eyebrow">Dein Tag</p>
            <h2>{openTodos} Aufgaben offen</h2>
          </div>

          <button
            className="add-button"
            type="button"
            onClick={onAdd}
          >
            +
          </button>

        </div>

        <div className="todo-list">

          {todos.map((todo) => {
            const category = categories.find(
              (item) => item.id === todo.categoryId
            );

            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                category={category}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })}

          {todos.length === 0 && (
            <p className="empty-state">
              Keine Aufgaben vorhanden. Füge eine neue Aufgabe hinzu!
            </p>
          )}

        </div>

      </section>
    </div>
  );
}

export default Home;

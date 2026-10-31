import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem/TodoItem";
import Navigation from "./components/Navigation/Navigation";

const initialCategories = [ 
  { id: 1, name: "Arbeit", color: "#EDE9FE", textColor: "#6D28D9" },
  { id: 2, name: "Fitness", color: "#FFEDD4", textColor: "#C2410C" },
  { id: 3, name: "Zuhause", color: "#D0FAE5", textColor: "#047857" },
  { id: 4, name: "Lernen", color: "#DFF2FE", textColor: "#0369A1" },
];

function App() { 
  
const [todos, setTodos] = useState([]);
const [categories] = useState(initialCategories);

const completedTodos = todos.filter((todo) => todo.completed).length;
const openTodos = todos.length - completedTodos;

const progress = todos.length === 0 ? 0 : Math.round((completedTodos / todos.length) * 100);

const today = new Date();

const weekday = new Intl.DateTimeFormat("de-DE", { weekday: "long", }).format(today);

const date = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", }).format(today);

function toggleTodo(id) {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
}

function addTodo() {
  const title = window.prompt("Wie heißt deine neue Aufgabe?");

  if (!title?.trim()) {
    return;
  }

  const categoryOptions = categories.map((category) => `${category.id}: ${category.name}`).join("\n");

  const selectedCategory = window.prompt(`Zu welcher Kategorie gehört die Aufgabe?\n\n${categoryOptions}\n\nGib die Kategorie-ID ein oder lasse das Feld leer.`);

  let categoryId = null;

  if (selectedCategory?.trim()) {
    categoryId = Number(selectedCategory);

    const categoryExists = categories.some((category) => category.id === categoryId);

    if (!categoryExists) {
      window.alert("Diese Kategorie existiert nicht.");
      return;
    }
  }

  setTodos((currentTodos) => [
    ...currentTodos,
    {
      id: Date.now(),
      title: title.trim(),
      categoryId,
      completed: false,
    },
  ]);

}

function deleteTodo(id) {
  setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id) );
}

return ( 

<div className="app">
  
  <header className="welcome">
    <p className="date"> {weekday}, {date} </p>
    <h1>Hallo, Justin</h1>
  </header>

  <main className="dashboard">
    <section
      className="progress-card"
      aria-labelledby="progress-title"
    >
      <div className="progress-card__top">
        <div className="progress-card__info">
          <p className="eyebrow" id="progress-title">
            Tagesfortschritt
          </p>

          <p className="progress-card__summary">
            {completedTodos} von {todos.length} Aufgaben erledigt
          </p>
        </div>

        <p className="progress-card__percentage">
          {progress}%
        </p>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Tagesfortschritt"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-track__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>

    <section className="tasks" aria-labelledby="tasks-title">
      <div className="tasks__header">
        <div>
          <p className="eyebrow">Dein Tag</p>

          <h2 id="tasks-title">
            {openTodos} Aufgaben offen
          </h2>
        </div>

        <button
          className="add-button"
          type="button"
          onClick={addTodo}
          aria-label="Neue Aufgabe hinzufügen"
        >
          +
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => {
          const category = categories.find((item) => item.id === todo.categoryId);

          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              category={category}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
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
  </main>

  <Navigation>
  </Navigation>

</div>


); }

export default App;
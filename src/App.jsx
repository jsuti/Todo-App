import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Rangliste from "./pages/Rangliste/Rangliste";
import Einstellungen from "./pages/Einstellungen/Einstellungen";
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

    if (!title?.trim()) return;

    const categoryOptions = categories
      .map((category) => `${category.id}: ${category.name}`)
      .join("\n");

    const selectedCategory = window.prompt(
      `Zu welcher Kategorie gehört die Aufgabe?\n\n${categoryOptions}`
    );

    let categoryId = null;

    if (selectedCategory?.trim()) {
      categoryId = Number(selectedCategory);

      const categoryExists = categories.some(
        (category) => category.id === categoryId
      );

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
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  return (
    <div className="app">

      <main className="dashboard">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                todos={todos}
                categories={categories}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onAdd={addTodo}
              />
            }
          />

          <Route
            path="/rangliste"
            element={
              <Rangliste
                todos={todos}
                categories={categories}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onAdd={addTodo}
              />
            }
          />

          <Route
            path="/einstellungen"
            element={<Einstellungen />}
          />
        </Routes>
      </main>

      <Navigation />

    </div>
  );
}

export default App;
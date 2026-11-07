import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Rangliste from "./pages/Rangliste/Rangliste";
import Einstellungen from "./pages/Einstellungen/Einstellungen";
import Navigation from "./components/Navigation/Navigation";
import NeuesTodoFormular from "./forms/NeuesTodoFormular/NeuesTodoFormular";

const initialCategories = [
  { id: 1, name: "Arbeit", color: "#EDE9FE", textColor: "#6D28D9" },
  { id: 2, name: "Fitness", color: "#FFEDD4", textColor: "#C2410C" },
  { id: 3, name: "Zuhause", color: "#D0FAE5", textColor: "#047857" },
  { id: 4, name: "Lernen", color: "#DFF2FE", textColor: "#0369A1" },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [categories] = useState(initialCategories);
  const [displayName, setDisplayName] = useState("Justin");
  const [hasGroup] = useState(false);
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function addTodo({ title, categoryId }) {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now(),
        title,
        categoryId,
        completed: false,
      },
    ]);

    setIsTodoFormOpen(false);
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
                displayName={displayName}
                todos={todos}
                categories={categories}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onAdd={() => setIsTodoFormOpen(true)}
              />
            }
          />

          <Route
            path="/rangliste"
            element={
              <Rangliste
                categories={categories}
                displayName={displayName}
              />
            }
          />

          <Route
            path="/einstellungen"
            element={
              <Einstellungen
                displayName={displayName}
                onDisplayNameChange={setDisplayName}
                hasGroup={hasGroup}
                onAdd={() => setIsTodoFormOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      <Navigation />

      {isTodoFormOpen && (
        <NeuesTodoFormular
          categories={categories}
          onSubmit={addTodo}
          onClose={() => setIsTodoFormOpen(false)}
        />
      )}

    </div>
  );
}

export default App;
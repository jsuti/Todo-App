import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Rangliste from "./pages/Rangliste/Rangliste";
import Einstellungen from "./pages/Einstellungen/Einstellungen";
import Navigation from "./components/Navigation/Navigation";
import NeuesTodoFormular from "./forms/NeuesTodoFormular";
import TodoBearbeitenFormular from "./forms/TodoBearbeitenFormular";
import GruppeBeitretenFormular from "./forms/GruppeBeitretenFormular";
import GruppeErstellenFormular from "./forms/GruppeErstellenFormular";
import AnmeldungFormular from "./forms/AnmeldungFormular";
import RegistrierungFormular from "./forms/RegistrierungFormular";

const initialCategories = [
  { id: 1, name: "Arbeit", color: "#EDE9FE", textColor: "#6D28D9" },
  { id: 2, name: "Fitness", color: "#FFEDD4", textColor: "#C2410C" },
  { id: 3, name: "Zuhause", color: "#D0FAE5", textColor: "#047857" },
  { id: 4, name: "Lernen", color: "#DFF2FE", textColor: "#0369A1" },
];

function App() {
  const [todos, setTodos] = useState([]);
  const categories = initialCategories;
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const currentUser = users.find((user) => user.id === currentUserId);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const displayName = currentUser?.name ?? "";
  const currentGroup = groups.find((group) => group.id === currentGroupId);
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isJoinGroupFormOpen, setIsJoinGroupFormOpen] = useState(false);
  const [isCreateGroupFormOpen, setIsCreateGroupFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => {
        if (!response.ok) throw new Error("Benutzer konnten nicht geladen werden");
        return response.json();
      })
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/groups")
      .then((response) => {
        if (!response.ok) throw new Error("Gruppen konnten nicht geladen werden");
        return response.json();
      })
      .then(setGroups)
      .catch(console.error);
  }, []);

  async function loadTodos(userId) {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/todos`
    );

    if (!response.ok) {
      throw new Error("To-dos konnten nicht geladen werden");
    }

    setTodos(await response.json());
  }

  async function addTodo({ title, categoryId }) {
    const response = await fetch(
      `http://localhost:3001/users/${currentUserId}/todos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, categoryId }),
      }
    );

    if (!response.ok) {
      console.error("To-do konnte nicht gespeichert werden:", await response.json());
      return;
    }

    const neuesTodo = await response.json();
    setTodos((bisherigeTodos) => [...bisherigeTodos, neuesTodo]);
    setIsTodoFormOpen(false);
  }

  async function toggleTodo(id) {
    try {
      const response = await fetch(`http://localhost:3001/users/${currentUserId}/todos/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Abhaken: HTTP ${response.status}`);
      }

      const updatedTodo = await response.json();

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("To-do konnte nicht abgehakt werden:", error);
    }
  }

  async function updateTodo(updatedTodo) {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${currentUserId}/todos/${updatedTodo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: updatedTodo.title,
            categoryId: updatedTodo.categoryId,
            completed: updatedTodo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Fehler beim Bearbeiten: HTTP ${response.status}`);
      }

      const savedTodo = await response.json();

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === savedTodo.id ? savedTodo : todo
        )
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("To-do konnte nicht bearbeitet werden:", error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:3001/users/${currentUserId}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Löschen: HTTP ${response.status}`);
      }

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("To-do konnte nicht gelöscht werden:", error);
    }
  }

  async function updateDisplayName(name) {
    const trimmedName = name.trim();

    const response = await fetch(
      `http://localhost:3001/users/${currentUserId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Anzeigename konnte nicht gespeichert werden.");
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) => (user.id === data.id ? data : user))
    );
  }

  async function joinGroup(groupId) {
    const response = await fetch(
      `http://localhost:3001/groups/${groupId}/members`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      }
    );

    const updatedGroup = await response.json();

    if (!response.ok) {
      throw new Error(updatedGroup.error || "Beitritt zur Gruppe fehlgeschlagen");
    }

    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );

    setCurrentGroupId(updatedGroup.id);
  }

  async function createGroup(name) {
    const response = await fetch("http://localhost:3001/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId: currentUserId }),
    });

    const newGroup = await response.json();

    if (!response.ok) {
      throw new Error(newGroup.error || "Gruppe konnte nicht erstellt werden");
    }

    setGroups((currentGroups) => [...currentGroups, newGroup]);
    setCurrentGroupId(newGroup.id);
  }

  async function leaveGroup() {
    if (!currentGroupId) return;

    const response = await fetch(
      `http://localhost:3001/groups/${currentGroupId}/members/${currentUserId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Gruppe konnte nicht verlassen werden");
    }

    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === currentGroupId
          ? {
              ...group,
              memberIds: group.memberIds.filter((id) => id !== currentUserId),
            }
          : group
      )
    );

    setCurrentGroupId(null);
  }

  async function handleLogin({ email, password }) {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Anmeldung fehlgeschlagen.");
    }

    const user = data;

    setUsers((currentUsers) => [
      ...currentUsers.filter((item) => item.id !== user.id),
      user,
    ]);
    setCurrentUserId(user.id);

    const userGroup = groups.find((group) => group.memberIds.includes(user.id));
    setCurrentGroupId(userGroup?.id ?? null);

    await loadTodos(user.id);

    setIsLoggedIn(true);
    navigate("/");
  }

  async function handleRegister({ email, password }) {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registrierung fehlgeschlagen.");
    }

    setIsRegistering(false);
    setLoginSuccessMessage(
      "Registrierung erfolgreich. Du kannst dich jetzt anmelden."
    );
  }

  if (!isLoggedIn) {
    if (isRegistering) {
      return (
        <RegistrierungFormular
          onSubmit={handleRegister}
          onBack={() => setIsRegistering(false)}
        />
      );
    }

    return (
      <AnmeldungFormular
        onSubmit={handleLogin}
        onRegister={() => {
          setLoginSuccessMessage("");
          setIsRegistering(true);
        }}
        successMessage={loginSuccessMessage}
      />
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
                onEdit={setEditingTodo}
              />
            }
          />

          <Route
            path="/rangliste"
            element={
              <Rangliste
                categories={categories}
                currentGroup={currentGroup}
                users={users}
                currentUserId={currentUserId}
              />
            }
          />

          <Route
            path="/einstellungen"
            element={
              <Einstellungen
                displayName={displayName}
                onDisplayNameChange={updateDisplayName}
                hasGroup={Boolean(currentGroup)}
                onAdd={() => setIsTodoFormOpen(true)}
                onLeaveGroup={leaveGroup}
                onJoinGroup={() => setIsJoinGroupFormOpen(true)}
                onCreateGroup={() => setIsCreateGroupFormOpen(true)}
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

      {/* Alle Formulare im Vorhinein rendern */}

      {editingTodo && (
        <TodoBearbeitenFormular
          todo={editingTodo}
          categories={categories}
          onSubmit={updateTodo}
          onClose={() => setEditingTodo(null)}
        />
      )}

      {isJoinGroupFormOpen && (
        <GruppeBeitretenFormular
          groups={groups.filter((group) => group.id !== currentGroupId)}
          onSubmit={(groupId) => {
            joinGroup(groupId);
            setIsJoinGroupFormOpen(false);
          }}
          onClose={() => setIsJoinGroupFormOpen(false)}
        />
      )}

      {isCreateGroupFormOpen && (
        <GruppeErstellenFormular
          groups={groups}
          onSubmit={createGroup}
          onClose={() => setIsCreateGroupFormOpen(false)}
        />
      )}

    </div>
  );
}

export default App;
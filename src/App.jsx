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

  async function apiRequest(url, options = {}) {
    let response;

    try {
      response = await fetch(url, options);
    } catch {
      throw new Error(
        "Der Server ist nicht erreichbar. Bitte versuche es später erneut."
      );
    }

    if (response.status === 204) {
      if (!response.ok) {
        throw new Error("Die Anfrage ist fehlgeschlagen.");
      }

      return null;
    }

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Der Server hat eine ungültige Antwort gesendet.");
    }

    if (!response.ok) {
      throw new Error(data.error || "Die Anfrage ist fehlgeschlagen.");
    }

    return data;
  }

  async function loadTodos(userId) {
    const data = await apiRequest(
      `http://localhost:3001/users/${userId}/todos`
    );

    setTodos(data);
  }

  async function addTodo({ title, categoryId }) {
    const newTodo = await apiRequest(
      `http://localhost:3001/users/${currentUserId}/todos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, categoryId }),
      }
    );

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setIsTodoFormOpen(false);
  }

  async function toggleTodo(id) {
    const updatedTodo = await apiRequest(
      `http://localhost:3001/users/${currentUserId}/todos/${id}`,
      { method: "PATCH" }
    );

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  }

  async function updateTodo(updatedTodo) {
    const savedTodo = await apiRequest(
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

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === savedTodo.id ? savedTodo : todo
      )
    );

    setEditingTodo(null);
  }

  async function deleteTodo(id) {
    await apiRequest(
      `http://localhost:3001/users/${currentUserId}/todos/${id}`,
      { method: "DELETE" }
    );

    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  async function updateDisplayName(name) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      throw new Error("Der Anzeigename darf nicht leer sein.");
    }

    const updatedUser = await apiRequest(
      `http://localhost:3001/users/${currentUserId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      }
    );

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }

  async function joinGroup(groupId) {
    const updatedGroup = await apiRequest(
      `http://localhost:3001/groups/${groupId}/members`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      }
    );

    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );

    setCurrentGroupId(updatedGroup.id);
  }

  async function createGroup(name) {
    const newGroup = await apiRequest("http://localhost:3001/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId: currentUserId }),
    });

    setGroups((currentGroups) => [...currentGroups, newGroup]);
    setCurrentGroupId(newGroup.id);
  }

  async function leaveGroup() {
    if (!currentGroupId) return;

    await apiRequest(
      `http://localhost:3001/groups/${currentGroupId}/members/${currentUserId}`,
      { method: "DELETE" }
    );

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
    let response;

    try {
      response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    } catch {
      throw new Error("Der Server ist nicht erreichbar. Bitte versuche es später erneut.");
    }
    
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
    let response;

    try {
      response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error("Der Server ist nicht erreichbar. Bitte versuche es später erneut.");
    }

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
          onSubmit={async (groupId) => {
            await joinGroup(groupId);
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
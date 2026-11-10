import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Rangliste from "./pages/Rangliste/Rangliste";
import Einstellungen from "./pages/Einstellungen/Einstellungen";
import Navigation from "./components/Navigation/Navigation";
import NeuesTodoFormular from "./forms/NeuesTodoFormular";
import TodoBearbeitenFormular from "./forms/TodoBearbeitenFormular";
import GruppeBeitretenFormular from "./forms/GruppeBeitretenFormular";
import GruppeErstellenFormular from "./forms/GruppeErstellenFormular";

const initialCategories = [
  { id: 1, name: "Arbeit", color: "#EDE9FE", textColor: "#6D28D9" },
  { id: 2, name: "Fitness", color: "#FFEDD4", textColor: "#C2410C" },
  { id: 3, name: "Zuhause", color: "#D0FAE5", textColor: "#047857" },
  { id: 4, name: "Lernen", color: "#DFF2FE", textColor: "#0369A1" },
];

const initialUsers = [
  { id: "current-user", name: "Justin", points: 980, bestCategoryId: 4 },
  { id: "user-1", name: "Leonie", points: 1250, bestCategoryId: 2 },
  { id: "user-2", name: "Jonas", points: 760, bestCategoryId: 3 },
  { id: "user-3", name: "Aylin", points: 660, bestCategoryId: 1 },
];

const initialGroups = [
  {
    id: "dummy-group",
    name: "Fokus-Freunde",
    memberIds: ["user-1", "current-user", "user-2", "user-3"],
  },
];

function App() {
  const [todos, setTodos] = useState([]);
  const categories = initialCategories;
  const [users, setUsers] = useState(initialUsers);
  const [groups, setGroups] = useState(initialGroups);
  const [currentUserId] = useState("current-user");

  /* hier default zu null, um App-Ansicht ohne Gruppe zu sehen*/
  const [currentGroupId, setCurrentGroupId] = useState("dummy-group");

  const currentUser = users.find((user) => user.id === currentUserId);
  const displayName = currentUser?.name ?? "";
  const currentGroup = groups.find((group) => group.id === currentGroupId);
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isJoinGroupFormOpen, setIsJoinGroupFormOpen] = useState(false);
  const [isCreateGroupFormOpen, setIsCreateGroupFormOpen] = useState(false);

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

  function updateTodo(updatedTodo) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, ...updatedTodo }
          : todo
      )
    );

    setEditingTodo(null);
  }

  function deleteTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  function updateDisplayName(name) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === currentUserId ? { ...user, name } : user
      )
    );
  }

  function joinGroup(groupId) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              memberIds: group.memberIds.includes(currentUserId)
                ? group.memberIds
                : [...group.memberIds, currentUserId],
            }
          : group
      )
    );

    setCurrentGroupId(groupId);
  }

  function createGroup(name) {
    const newGroup = {
      id: crypto.randomUUID(),
      name: name.trim(),
      memberIds: [currentUserId],
    };

    setGroups((currentGroups) => [...currentGroups, newGroup]);
    setCurrentGroupId(newGroup.id);
  }

  function leaveGroup() {
    if (!currentGroupId) return;

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
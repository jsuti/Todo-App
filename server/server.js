import express from "express";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const users = [
  {
    id: "dummy-user",
    email: "justin@example.de",
    password: "password",
    name: "Justin",
    points: 980,
    bestCategoryId: 4,
  },
  {
    id: "user-1",
    name: "Leonie",
    points: 1250,
    bestCategoryId: 2,
  },
  {
    id: "user-2",
    name: "Jonas",
    points: 760,
    bestCategoryId: 3,
  },
  {
    id: "user-3",
    name: "Aylin",
    points: 660,
    bestCategoryId: 1,
  },
];

let todos = [];

let nextTodoId = 2;

function publicUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

// Öffentliche Benutzerdaten für z.B. die Rangliste
app.get("/users", (req, res) => {
  res.json(users.map(publicUser));
});

// Registrierung
app.post("/users", (req, res) => {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password.trim()
  ) {
    return res.status(400).json({ error: "E-Mail und Passwort sind erforderlich" });
  }

  const existingUser = users.find(
    (user) => user.email?.toLowerCase() === email.trim().toLowerCase()
  );

  if (existingUser) {
    return res.status(400).json({ error: "Diese E-Mail-Adresse existiert bereits." });
  }

  const user = {
    id: crypto.randomUUID(),
    email: email.trim(),
    password,
    name: email.trim(),
    points: 0,
    bestCategoryId: null,
  };

  users.push(user);
  res.status(201).json(publicUser(user));
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const normalizedEmail = String(email ?? "").trim().toLowerCase();

  const user = users.find(
    (item) => item.email?.toLowerCase() === normalizedEmail
  );

  if (!user) {
    return res.status(404).json({
      error: "Diese E-Mail-Adresse existiert nicht.",
    });
  }

  if (user.password !== password) {
    return res.status(400).json({
      error: "Das Passwort ist falsch.",
    });
  }

  res.json(publicUser(user));
});

// Anzeigenamen ändern
app.patch("/users/:id", (req, res) => {
  const user = users.find((item) => item.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "Benutzer nicht gefunden" });
  }

  const { name } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name darf nicht leer sein" });
  }

  user.name = name.trim();
  res.json(publicUser(user));
});

// Alle ToDos eines Benutzers abrufen
app.get("/users/:userId/todos", (req, res) => {
  const user = users.find((item) => item.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ error: "Benutzer nicht gefunden" });
  }

  res.json(todos.filter((todo) => todo.userId === user.id));
});

// ToDo für einen Benutzer anlegen
app.post("/users/:userId/todos", (req, res) => {
  const user = users.find((item) => item.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ error: "Benutzer nicht gefunden" });
  }

  const { title, categoryId } = req.body ?? {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title darf nicht leer sein" });
  }

  const todo = {
    id: nextTodoId++,
    userId: user.id,
    title: title.trim(),
    categoryId: categoryId ?? null,
    completed: false,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// ToDo als erledigt markieren bzw. zurücksetzen
app.patch("/users/:userId/todos/:todoId", (req, res) => {
  const todo = todos.find(
    (item) =>
      item.userId === req.params.userId &&
      item.id === Number(req.params.todoId)
  );

  if (!todo) {
    return res.status(404).json({ error: "ToDo nicht gefunden" });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// ToDo bearbeiten
app.put("/users/:userId/todos/:todoId", (req, res) => {
  const todo = todos.find(
    (item) =>
      item.userId === req.params.userId &&
      item.id === Number(req.params.todoId)
  );

  if (!todo) {
    return res.status(404).json({ error: "ToDo nicht gefunden" });
  }

  const { title, categoryId, completed } = req.body ?? {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title darf nicht leer sein" });
  }

  todo.title = title.trim();
  todo.categoryId = categoryId ?? null;

  if (typeof completed === "boolean") {
    todo.completed = completed;
  }

  res.json(todo);
});

// ToDo löschen
app.delete("/users/:userId/todos/:todoId", (req, res) => {
  const todoId = Number(req.params.todoId);
  const index = todos.findIndex(
    (item) => item.userId === req.params.userId && item.id === todoId
  );

  if (index === -1) {
    return res.status(404).json({ error: "ToDo nicht gefunden" });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(3001, () => {
  console.log("Server läuft unter http://localhost:3001");
});
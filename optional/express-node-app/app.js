const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Basit bir notlar dizisi
let notes = [
  { id: 1, title: "Not 1", content: "Bu bir nottur." },
  { id: 2, title: "Not 2", content: "Express.js kullanarak yapıldı." },
];

// Ana sayfa
app.get("/", (req, res) => {
  res.render("index", { notes });
});

// Not ekleme formu gösterme
app.get("/add", (req, res) => {
  res.render("add");
});

// Not ekleme
app.post("/add", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  res.redirect("/");
});

// Not detayları
app.get("/note/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);
  res.render("note", { note });
});

// Not güncelleme formu gösterme
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);
  res.render("edit", { note });
});

// Not güncelleme
app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const noteIndex = notes.findIndex((note) => note.id === id);
  notes[noteIndex] = { id, title, content };
  res.redirect("/");
});

// Not silme
app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.redirect("/");
});

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

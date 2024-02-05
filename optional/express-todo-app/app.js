const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Yapılacaklar listesi
let todos = [];

// Ana sayfa - Tüm görevleri listeleyen sayfa
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// Yeni görev eklemek için POST isteği
app.post("/add-todo", (req, res) => {
  const { todo } = req.body;
  todos.push({ text: todo, done: false });
  res.redirect("/");
});

// Görevi işaretlemek veya işareti kaldırmak için POST isteği
app.post("/toggle-todo/:index", (req, res) => {
  const todoIndex = parseInt(req.params.index);
  todos[todoIndex].done = !todos[todoIndex].done;
  res.redirect("/");
});

// Görevi silmek için GET isteği
app.get("/delete-todo/:index", (req, res) => {
  const todoIndex = parseInt(req.params.index);
  todos.splice(todoIndex, 1);
  res.redirect("/");
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});

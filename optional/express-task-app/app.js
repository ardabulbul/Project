const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Görevleri saklamak için basit bir dizi kullanıyoruz
let tasks = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Ana sayfa - Tüm görevleri listeleyen sayfa
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

// Yeni görev eklemek için POST isteği
app.post("/add-task", (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.redirect("/");
});

// Görevi silmek için GET isteği
app.get("/delete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((_, index) => index !== taskId);
  res.redirect("/");
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});

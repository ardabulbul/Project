const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB bağlantısı
mongoose.connect("mongodb://localhost/express-crud-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB bağlantı hatası:")
);

// Model oluştur
const Item = mongoose.model("Item", {
  name: String,
  description: String,
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Ana sayfa
app.get("/", async (req, res) => {
  const items = await Item.find();
  res.render("index", { items });
});

// Yeni öğe oluştur formu
app.get("/new", (req, res) => {
  res.render("new");
});

// Yeni öğe oluştur
app.post("/new", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect("/");
});

// Öğe detayları
app.get("/item/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("show", { item });
});

// Öğe düzenle formu
app.get("/item/:id/edit", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("edit", { item });
});

// Öğe güncelle
app.post("/item/:id/edit", async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// Öğe sil
app.post("/item/:id/delete", async (req, res) => {
  await Item.findByIdAndRemove(req.params.id);
  res.redirect("/");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

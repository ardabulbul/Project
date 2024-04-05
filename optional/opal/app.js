// app.js

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Ana Sayfa" });
});

app.get("/posts", (req, res) => {
  res.render("posts", { title: "Makaleler" });
});

app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  // Burada veritabanından ilgili makaleyi çekerek gösterme işlemi yapılabilir.
  res.render("post", { title: "Makale", postId });
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  // Yeni bir makale oluşturma işlemi burada gerçekleştirilebilir.
  res.redirect("/posts");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

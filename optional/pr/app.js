const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Veritabanı yerine basit bir array kullanıyoruz
let articles = [
  {
    id: 1,
    title: "Express.js Nedir?",
    content: "Express.js, Node.js tabanlı bir web uygulama çerçevesidir.",
  },
  {
    id: 2,
    title: "JavaScript Promises",
    content:
      "JavaScript Promises, asenkron programlamayı daha etkili hale getirmek için kullanılır.",
  },
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Ana sayfa - Tüm makaleleri listeleyen sayfa
app.get("/", (req, res) => {
  res.render("index", { articles });
});

// Makale detay sayfası
app.get("/article/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = articles.find((article) => article.id === articleId);
  res.render("article", { article });
});

// Yeni makale formu sayfası
app.get("/new-article", (req, res) => {
  res.render("new-article");
});

// Yeni makale eklemek için POST isteği
app.post("/new-article", (req, res) => {
  const { title, content } = req.body;
  const newArticle = {
    id: articles.length + 1,
    title,
    content,
  };
  articles.push(newArticle);
  res.redirect("/");
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});

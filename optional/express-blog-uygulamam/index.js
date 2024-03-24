const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware'ler
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs"); // EJS şablon motorunu kullanacağımızı belirtiyoruz

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Makaleler sayfası
app.get("/articles", (req, res) => {
  fs.readFile(__dirname + "/data/articles.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Makaleler alınamadı");
    }
    const articles = JSON.parse(data);
    res.render("articles.ejs", { articles: articles });
  });
});

// Makale detay sayfası
app.get("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  fs.readFile(__dirname + "/data/articles.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Makaleler alınamadı");
    }
    const articles = JSON.parse(data);
    const article = articles.find(
      (article) => article.id === parseInt(articleId)
    );
    if (!article) {
      return res.status(404).send("Makale bulunamadı");
    }
    res.render("article.ejs", { article: article });
  });
});

// Yeni makale ekleme formu
app.get("/new-article", (req, res) => {
  res.render("new-article.ejs");
});

// Yeni makale ekleme işlemi
app.post("/new-article", (req, res) => {
  const newArticle = req.body;
  fs.readFile(__dirname + "/data/articles.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Makaleler alınamadı");
    }
    const articles = JSON.parse(data);
    newArticle.id = articles.length + 1;
    articles.push(newArticle);
    fs.writeFile(
      __dirname + "/data/articles.json",
      JSON.stringify(articles),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Makale oluşturulamadı");
        }
        res.redirect("/articles");
      }
    );
  });
});

// Sunucuyu dinlemeye başla
app.listen(port, () => {
  console.log(`Uygulama ${port} numaralı port üzerinde çalışıyor`);
});

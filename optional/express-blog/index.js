const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

// EJS view engine'i kullanacağımızı belirtiyoruz
app.set("view engine", "ejs");

// body-parser middleware'ini kullanarak gelen isteklerin JSON formatında alınmasını sağlıyoruz
app.use(bodyParser.urlencoded({ extended: true }));

// Basit bir blog yazısı veritabanı
let blogPosts = [];

// Ana sayfa: tüm blog yazılarını listele
app.get("/", (req, res) => {
  res.render("index", { blogPosts: blogPosts });
});

// Yeni blog yazısı ekleme formu
app.get("/new", (req, res) => {
  res.render("new");
});

// Yeni blog yazısı ekleme formu gönderildiğinde
app.post("/new", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const newPost = { title: title, content: content };
  blogPosts.push(newPost);
  res.redirect("/");
});

// Herhangi bir blog yazısının ayrıntıları
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = blogPosts[id];
  res.render("post", { post: post });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor...`);
});

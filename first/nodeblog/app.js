const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();

const dbURL =
  "mongodb+srv://ardabulbul:X28arda1@node-blog.iby4ftc.mongodb.net/node-blog?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Anasayfa", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blog: result, title: "Detay" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Sayfa Bulunamadi" });
    });
});

app.get("/admin", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/admin/add", (req, res) => {
  res.render("add", { title: "Yeni yazi" });
});

app.post("/admin/add", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ link: "/admin" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Hakkimizda" });
});

app.get("/aboutus", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Giriş" });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "Sayfa Bulunamadi" });
});

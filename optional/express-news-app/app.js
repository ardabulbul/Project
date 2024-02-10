const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const news = [
  { title: "Başlık 1", content: "İçerik 1" },
  { title: "Başlık 2", content: "İçerik 2" },
  { title: "Başlık 3", content: "İçerik 3" },
];

app.get("/", (req, res) => {
  res.render("index", { news });
});

app.post("/add-news", (req, res) => {
  const { title, content } = req.body;
  const newNews = { title, content };
  news.push(newNews);
  res.redirect("/");
});

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

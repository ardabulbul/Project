const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Sabit veri (örnek olarak kullanılıyor)
const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  {
    id: 2,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
  { id: 3, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 },
];

// Ana sayfa
app.get("/", (req, res) => {
  res.render("index", { movies });
});

// Film ekleme sayfası
app.get("/add", (req, res) => {
  res.render("add");
});

// Film ekleme formunu işleme
app.post("/add", (req, res) => {
  const { title, director, year } = req.body;
  const id = movies.length + 1;
  const newMovie = { id, title, director, year };
  movies.push(newMovie);
  res.redirect("/");
});

// Film detay sayfası
app.get("/movie/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  res.render("movie", { movie });
});

// Film düzenleme sayfası
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  res.render("edit", { movie });
});

// Film düzenleme formunu işleme
app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year } = req.body;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  movies[movieIndex] = { id, title, director, year };
  res.redirect("/");
});

// Film silme işlemi
app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMovies = movies.filter((movie) => movie.id !== id);
  movies.length = 0;
  Array.prototype.push.apply(movies, updatedMovies);
  res.redirect("/");
});

// 404 Sayfası
app.use((req, res) => {
  res.status(404).render("404");
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

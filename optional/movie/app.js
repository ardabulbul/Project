const express = require("express");
const ejs = require("ejs");
const app = express();

// EJS şablon motorunu ayarla
app.set("view engine", "ejs");

// Form verilerini alabilmek için body-parser'ı kullan
app.use(express.urlencoded({ extended: true }));

// Film verilerini tutacak olan dizi
let films = [
  { id: 1, title: "Interstellar", director: "Christopher Nolan", year: 2014 },
  { id: 2, title: "Inception", director: "Christopher Nolan", year: 2010 },
  {
    id: 3,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
];

// Ana sayfa
app.get("/", (req, res) => {
  res.render("index", { films });
});

// Belirli bir filmi gösteren sayfa
app.get("/film/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find((f) => f.id === id);
  res.render("film", { film });
});

// Film ekleme formunu gösteren endpoint
app.get("/film/ekle", (req, res) => {
  res.render("film_ekle");
});

// Yeni film eklemek için endpoint
app.post("/film/ekle", (req, res) => {
  // Formdan gelen verileri al
  const { title, director, year } = req.body;

  // Yeni film nesnesini oluştur
  const newFilm = {
    id: films.length + 1, // Mevcut filmlerin sayısını baz alarak yeni bir ID oluştur
    title,
    director,
    year,
  };

  // Yeni filmi films dizisine ekle
  films.push(newFilm);

  // Ana sayfaya yönlendir
  res.redirect("/");
});

// Film silme endpoint'i
app.get("/film/sil/:id", (req, res) => {
  const id = parseInt(req.params.id);
  films = films.filter((f) => f.id !== id);
  res.redirect("/");
});

// Sunucuyu dinle
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

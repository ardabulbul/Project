const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let liste = ["Öğe 1", "Öğe 2", "Öğe 3"];

app.get("/", (req, res) => {
  res.render("anasayfa", { liste });
});

app.post("/ekle", (req, res) => {
  const yeniOge = req.body.yeniOge;
  liste.push(yeniOge);
  res.redirect("/");
});

app.post("/sil", (req, res) => {
  const silinecekOgeIndex = req.body.silinecekOgeIndex;
  liste.splice(silinecekOgeIndex, 1);
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).send("Sayfa bulunamadı");
});

app.listen(port, () => {
  console.log(`Uygulama ${port} portunda çalışıyor.`);
});

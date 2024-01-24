const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use("/urunler/:id", function (req, res) {
  res.render("urun-details", { id: req.params.id });
});

app.use("/urunler", function (req, res) {
  res.render("urunler");
});

app.use("/", function (req, res) {
  res.render("index");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

const express = require("express");
const app = express();

app.set("view engine", "ejs");

const data = [
  { id: 1, name: "iphone 14", price: 30000, isActive: true },
  { id: 2, name: "iphone 15", price: 40000, isActive: false },
  { id: 3, name: "iphone 16", price: 50000, isActive: true },
];

app.use("/urunler/:id", function (req, res) {
  res.render("urun-details", { id: req.params.id });
});

app.use("/urunler", function (req, res) {
  res.render("urunler", {
    liste: data,
  });
});

app.use("/", function (req, res) {
  res.render("index");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

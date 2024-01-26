const express = require("express");
const app = express();

app.set("view engine", "ejs");

const data = [
  { id: 1, name: "iphone 14", price: 30000, isActive: true },
  { id: 2, name: "iphone 15", price: 40000, isActive: true },
  { id: 3, name: "iphone 16", price: 50000, isActive: true },
];

app.use("/urunler/:id", function (req, res) {
  const urun = data.find((u) => u.id == req.params.id);
  res.render("urun-details", {
    name: urun.name,
    price: urun.price,
    isActive: urun.isActive,
  });
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
  console.log("Port 3000 üzerinde dinleniyor");
});

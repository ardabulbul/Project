const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const data = [
  {
    id: 1,
    name: "iphone 14",
    price: 30000,
    isActive: true,
    imageUrl: "1.jpeg",
  },
  {
    id: 2,
    name: "iphone 15",
    price: 40000,
    isActive: true,
    imageUrl: "2.jpeg",
  },
  {
    id: 3,
    name: "iphone 16",
    price: 50000,
    isActive: true,
    imageUrl: "3.jpeg",
  },
];

app.use("/urunler/:id", function (req, res) {
  const urun = data.find((u) => u.id == req.params.id);
  if (!urun) {
    return res.status(404).send("Ürün bulunamadı");
  }
  res.render("urun-details", {
    name: urun.name,
    price: urun.price,
    isActive: urun.isActive,
    imageUrl: urun.imageUrl,
  });
});

app.use("/urunler", function (req, res) {
  if (!data || data.length === 0) {
    return res.status(404).send("Ürün bulunamadı");
  }
  res.render("urunler", {
    liste: data,
  });
});

app.use("/", function (req, res) {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Uygulama ${port} portunda dinleniyor`);
});

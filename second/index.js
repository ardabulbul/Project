const express = require("express");
const app = express();

app.use("/urunler/:id", function (req, res) {
  res.send("urunler details " + req.params.id);
});

app.use("/urunler", function (req, res) {
  res.send("urunler");
});

app.use("/", function (req, res) {
  res.send("anasayfa");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

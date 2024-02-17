const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("products", { title: "Products" });
});

router.get("/:id", (req, res) => {
  res.render("show", { title: "Product Detail", id: req.params.id });
});

module.exports = router;

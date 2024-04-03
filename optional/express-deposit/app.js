// app.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Multer file upload
const upload = multer({
  dest: "uploads/",
});

// Routes
app.get("/", (req, res) => {
  // List uploaded files
  fs.readdir("uploads", (err, files) => {
    if (err) throw err;
    res.render("index", { files });
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

app.get("/delete/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.unlink(`uploads/${filename}`, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

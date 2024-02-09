const express = require("express");
const app = express();
const port = 3000;

// Middlewares
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { news: getSampleNews() });
});

// Sample News Data
function getSampleNews() {
  return [
    { title: "Başlık 1", content: "İçerik 1" },
    { title: "Başlık 2", content: "İçerik 2" },
    { title: "Başlık 3", content: "İçerik 3" },
  ];
}

// Set EJS as the view engine
app.set("view engine", "ejs");

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const surveyQuestions = [
  "En sevdiğiniz renk nedir?",
  "Hangi programlama dillerini kullanıyorsunuz?",
  "En sevdiğiniz programlama dili nedir?",
];

let surveyResults = {
  color: {},
  languages: {},
  favoriteLanguage: {},
};

app.get("/", (req, res) => {
  res.render("survey", { questions: surveyQuestions });
});

app.post("/submit-survey", (req, res) => {
  const { color, languages, favoriteLanguage } = req.body;

  if (surveyResults.color[color]) {
    surveyResults.color[color]++;
  } else {
    surveyResults.color[color] = 1;
  }

  if (Array.isArray(languages)) {
    languages.forEach((language) => {
      if (surveyResults.languages[language]) {
        surveyResults.languages[language]++;
      } else {
        surveyResults.languages[language] = 1;
      }
    });
  }

  surveyResults.favoriteLanguage[favoriteLanguage] =
    (surveyResults.favoriteLanguage[favoriteLanguage] || 0) + 1;

  res.redirect("/results");
});

app.get("/results", (req, res) => {
  res.render("results", { results: surveyResults });
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});

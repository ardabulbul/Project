const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/factorial", (req, res) => {
  try {
    const userInput = req.query.number;

    if (userInput === undefined || isNaN(userInput)) {
      throw new Error("Lütfen geçerli bir sayı girin.");
    }

    const number = parseInt(userInput);
    const result = calculateFactorial(number);

    res.json({ number, factorial: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function calculateFactorial(n) {
  if (n < 0) {
    throw new Error("Negatif sayıların faktöriyeli tanımsızdır.");
  } else if (n === 0 || n === 1) {
    return 1;
  } else {
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
      factorial *= i;
    }
    return factorial;
  }
}

app.listen(port, () => {
  console.log(`Uygulama ${port} portunda çalışıyor.`);
});

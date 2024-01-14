const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const { log } = require("console");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "text/html");

  let path = "./";
  switch (req.url) {
    case "/":
      path += "text.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;

      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      break;
    default:
      path += "404.html";
      res.statusCode = 404;

      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("3000 portu dinleniyor");
});

let nums = [23, 45, 65, 89];

_.each(nums, (vall, keys) => {
  console.log(vall);
});

let num = _.random(0, 20);
console.log(num);

let greeting = _.once(() => {
  console.log("merhaba");
});

greeting();
greeting();

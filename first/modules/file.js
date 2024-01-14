/*let os = require("os");

console.log(os.platform(), os.homedir());


let fs = require("fs");
//console.log(fs);

fs.readFile("./docs/test.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

let fs = require("fs");
fs.writeFile("./docs/test2.txt", "Heisenberg", (err) => {
  if (err) throw err;
  console.log("You're God damn right");
});
*/

let fs = require("fs");

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) throw err;
    console.log("Klasör Oluştu");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) throw err;
    console.log("Klasör Silindi");
  });
}
fs.unlink("./docs/test2.txt", (err) => {
  if (err) throw err;
  console.log("Dosya Silindi");
});

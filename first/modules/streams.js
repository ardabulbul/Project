const fs = require("fs");
let readStream = fs.createReadStream("./docs/chunktest.txt", {
  encoding: "utf-8",
});
let writeStream = fs.createWriteStream("./docs/chunktest3.txt");
/*
let writeStream = fs.createWriteStream("./docs/chunktest2.txt");
readStream.on("data", (chunk) => {
  console.log("----------Yeni CHUNK----------");
  console.log(chunk);
  writeStream.write(chunk);
});
*/
readStream.pipe(writeStream);

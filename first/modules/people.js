let names = ["ahmet", "mehmet", "sinan"];
let ages = [23, 43, 38];
let greeting = (name) => {
  return `Merhaba, ${name}`;
};
//console.log(names);

//exports.names = names;
//exports.age = ages;

module.exports = {
  names,
  ages,
  greeting,
};

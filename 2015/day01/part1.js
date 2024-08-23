const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

let result = input.split("(").length - input.split(")").length;

console.log(result);

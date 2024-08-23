const fs = require("fs");
let input = fs.readFileSync("input.txt").toString().split("\n");

let hasDoubleCharPairs = (string) => string.match(/(..).*?\1/);
let hasMiniPalindrome = (string) => string.match(/(.).\1/);

let solution = input.filter(hasDoubleCharPairs).filter(hasMiniPalindrome);
console.log(solution.length);

const fs = require("fs");
let input = fs.readFileSync("input.txt").toString().split("\n");

let hasMinimumVowels = (string) => string.split(/[aeiou]/).length > 3;
let hasDoubleLetters = (string) => string.match(/(.)\1/) !== null;
let hasNoForbiddenStrings = (string) =>
  !["ab", "cd", "pq", "xy"].some((bad) => string.includes(bad));

let solution = input
  .filter(hasMinimumVowels)
  .filter(hasDoubleLetters)
  .filter(hasNoForbiddenStrings);

console.log(solution.length);

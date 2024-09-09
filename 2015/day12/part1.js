const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim();

const numberRegex = /-?\d+/gm;

let cleanedInput = input.match(numberRegex);
let result = 0;

for (let i = 0; i < cleanedInput.length; i++) {
  result += parseInt(cleanedInput[i]);
}

console.log(result);

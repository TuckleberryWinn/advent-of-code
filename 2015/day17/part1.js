const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

const TOTAL_VOLUME = 150;
let successCases = 0;

for (let i = 0; i < input.length; i++) {
  input[i] = Number(input[i]);
}

function combinations(array) {
  return new Array(2 ** array.length)
    .fill(undefined)
    .map((element, index) => array.filter((nextElement, j) => index & (2 ** j)));
}
let comboArray = combinations(input);

for (let i = 0; i < comboArray.length; i++) {
  if (comboArray[i].reduce(sumArray, 0) === TOTAL_VOLUME) {
    successCases += 1;
  }
}

function sumArray(accumulator, a) {
  return accumulator + a;
}
console.log(`Unique ways to hold 150 liters: ${successCases}`);

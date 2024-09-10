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

let successArray = [];

for (let i = 0; i < comboArray.length; i++) {
  if (comboArray[i].reduce(sumArray, 0) === TOTAL_VOLUME) {
    successArray.push(comboArray[i]);
  }
}
function sumArray(accumulator, a) {
  return accumulator + a;
}

// sort through success cases to find minimum number of containers required
let minimumContainers;

for (let i = 0; i < successArray.length; i++) {
  if (minimumContainers === undefined || successArray[i].length < minimumContainers) {
    minimumContainers = successArray[i].length;
  }
}

// count the number of times the minimum number of containers is able to be constructed
let minimumContainerCombinations = 0;

for (let i = 0; i < successArray.length; i++) {
  if (successArray[i].length === minimumContainers) {
    minimumContainerCombinations += 1;
  }
}

console.log(
  `Minimum number of containers (${minimumContainers}) can be constructed ${minimumContainerCombinations} times.`
);

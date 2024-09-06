const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim();

let result;
const iterations = 40;

lookAndSayLooper(input, iterations);

function lookAndSayLooper(inputString, iterationCount) {
  let inputStepHolder = inputString;

  for (let i = 0; i < iterationCount; i++) {
    inputStepHolder = lookAndSay(inputStepHolder);
  }
  console.log(inputStepHolder.length);
}

function lookAndSay(inputString) {
  let result = "";
  let count = 0;
  let currentChar = inputString[0];
  for (var i = 0; i < inputString.length; i++) {
    if (currentChar == null || currentChar == inputString[i]) {
      count += 1;
    } else {
      result += count + currentChar;
      currentChar = inputString[i];
      count = 1;
    }
  }
  result += count + currentChar;

  return result;
}

const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim();

input = JSON.parse(input);

function* sumNumbersIgnoringRed(value) {
  const hasRedInObject = Object.values(value).includes("red");
  if (Array.isArray(value)) {
    for (let item of value) {
      yield* sumNumbersIgnoringRed(item);
    }
  } else if (typeof value === "string") {
    // Skip string values
  } else if (typeof value === "number") {
    // Only return number values
    yield value;
  } else {
    // Break open objects if red is not present
    if (!hasRedInObject) {
      for (let key in value) {
        yield* sumNumbersIgnoringRed(value[key]);
      }
    }
  }
}

runningTotal = 0;
for (let numberValue of sumNumbersIgnoringRed(input)) {
  runningTotal += numberValue;
}

console.log(`Total w/o red: ${runningTotal}`);

const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim();

console.log(input);

let presentCount = 0;
let currentHouse = 0;
let highScore = 0;
do {
  currentHouse += 1;
  presentCount = getPresentCountOfHouse(currentHouse);
  if (presentCount > highScore) {
    console.log(presentCount);
    highScore = presentCount;
  }
} while (presentCount < input);

console.log(`First house to beat the target score is ${currentHouse}`);

function getPresentCountOfHouse(houseNumber) {
  let presentCount = 0;
  for (let i = 1; i < Math.sqrt(houseNumber) + 0.1; i++) {
    if (houseNumber % i === 0) {
      if (houseNumber % i !== i) {
        presentCount += i * 10;
        presentCount += (houseNumber / i) * 10;
      } else {
        presentCount += i * 10;
      }
    }
  }
  return presentCount;
}

const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
const inputKeyPath = path.join(path.dirname(require.main.filename), "inputKey.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n")[0];
let inputKey = fs.readFileSync(inputKeyPath).toString().trim().split("\r\n");

//get a cleaned input/output pairing
let cleanedInputKey = [];
for (i = 0; i < inputKey.length; i++) {
  let replacementKey = {};

  let splitInput = inputKey[i].split(" ");
  replacementKey.input = splitInput[2];
  replacementKey.output = splitInput[0];
  cleanedInputKey.push(replacementKey);
}
//the input has no overlaps, so iterate through the list and increment every time a replacement is made until we arrive at 'e'
let stepsTaken = 0;
while (input !== "e") {
  for (let i = 0; i < cleanedInputKey.length; i += 1) {
    input = input.replace(cleanedInputKey[i].input, function (matched) {
      stepsTaken += 1;
      return cleanedInputKey[i].output;
    });
  }
}
console.log(stepsTaken);

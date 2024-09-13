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
  replacementKey.input = splitInput[0];
  replacementKey.output = splitInput[2];
  cleanedInputKey.push(replacementKey);
}

//iterate through replacement key and note all possible molecule changes
let possibleMoleculeCombinations = new Set();

for (let i = 0; i < cleanedInputKey.length; i++) {
  findAndReplaceNextInstance(cleanedInputKey[i], 0);
}

function findAndReplaceNextInstance(key, index) {
  let nextIndex = input.indexOf(key.input, index);
  if (nextIndex === -1) {
    return;
  }
  let testString = replaceAt(input, nextIndex, key.input.length, key.output);
  possibleMoleculeCombinations.add(testString);
  findAndReplaceNextInstance(key, nextIndex + 1);
}

function replaceAt(string, index, replacementLength, replacement) {
  return "".concat(string.substring(0, index), replacement, string.substring(index + replacementLength, string.length));
}

console.log(possibleMoleculeCombinations.size);

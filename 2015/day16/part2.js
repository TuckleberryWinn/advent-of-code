const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

const auntSue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

let possibleAuntSueMatches = [];
// clean input and populate the possible match chart
for (let i = 0; i < input.length; i++) {
  let sueTemplate = {};
  let splitInput = input[i].split(" ");
  sueTemplate.number = Number(splitInput[1].slice(0, -1));

  let firstProp = splitInput[2].slice(0, -1);
  let firstVal = Number(splitInput[3].slice(0, -1));
  sueTemplate[firstProp] = firstVal;

  let secondProp = splitInput[4].slice(0, -1);
  let secondVal = Number(splitInput[5].slice(0, -1));
  sueTemplate[secondProp] = secondVal;

  let thirdProp = splitInput[6].slice(0, -1);
  let thirdVal = Number(splitInput[7]);
  sueTemplate[thirdProp] = thirdVal;

  possibleAuntSueMatches.push(sueTemplate);
}

for (let i = 161; i < possibleAuntSueMatches.length; i++) {
  let matchCount = 0;
  //  console.log(possibleAuntSueMatches[i]);
  for (const prop in possibleAuntSueMatches[i]) {
    if (prop === "trees" || prop === "cats") {
      if (possibleAuntSueMatches[i][prop] > auntSue[prop]) {
        matchCount += 1;
      }
    } else if (prop === "pomeranians" || prop === "goldfish") {
      if (possibleAuntSueMatches[i][prop] < auntSue[prop]) {
        matchCount += 1;
      }
    } else if (possibleAuntSueMatches[i][prop] === auntSue[prop]) {
      matchCount += 1;
    }
    if (matchCount === 3) {
      console.log(`Match found: ${possibleAuntSueMatches[i].number}`);
    }
  }
}

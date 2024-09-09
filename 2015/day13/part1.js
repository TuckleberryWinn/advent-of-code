const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

let cleanedScores = [];
let dinnerGuests = [];
let highestHappiness;

//iterate through provided information to get happiness scores + dinner guest list
for (let i = 0; i < input.length; i++) {
  addHappinessScore(input[i]);
  addToGuestList(input[i]);
}

function addHappinessScore(currentLine) {
  let splitLine = currentLine.split(" ");
  //slice method to remove trailing '.'
  let relation = splitLine[0] + splitLine[10].slice(0, -1);
  let happiness;
  if (splitLine[2] === "lose") {
    happiness = Number(splitLine[3]) * -1;
  } else {
    happiness = Number(splitLine[3]);
  }
  cleanedScores.push({ relation, happiness });
}

function addToGuestList(currentLine) {
  let splitLine = currentLine.split(" ");
  if (!dinnerGuests.includes(splitLine[0])) {
    dinnerGuests.push(splitLine[0]);
  }
}

//get all guest permutations
getAllGuestSeatings(dinnerGuests, []);

function getAllGuestSeatings(guestList, perms) {
  if (guestList.length === 0) {
    testSeatingConfig(perms);
  } else {
    for (let i = 0; i < guestList.length; i++) {
      let trimmedList = [...guestList];
      let removed = trimmedList.splice(i, 1);
      perms.push(removed[0]);
      getAllGuestSeatings(trimmedList, perms);
      perms.pop();
    }
  }
}

//as each guest order is generated, it will be tested for highest happiness
function testSeatingConfig(seatingOrder) {
  let happinessTotal = 0;
  for (let i = 0; i < seatingOrder.length; i++) {
    let getRelationCW =
      seatingOrder[i] + seatingOrder[(i + 1) % seatingOrder.length];
    let getRelationCCW =
      seatingOrder[(i + 1) % seatingOrder.length] + seatingOrder[i];

    happinessTotal += findHappinessByRelation(getRelationCW);
    happinessTotal += findHappinessByRelation(getRelationCCW);
  }
  testforHighestHappiness(happinessTotal);
}

function testforHighestHappiness(testCase) {
  if (highestHappiness === undefined) {
    highestHappiness = testCase;
  }
  if (testCase > highestHappiness) {
    highestHappiness = testCase;
  }
}

function findHappinessByRelation(search) {
  return cleanedScores.find((obj) => obj.relation === search).happiness;
}

console.log(`Highest happiness is: ${highestHappiness}`);
